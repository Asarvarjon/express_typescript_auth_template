import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { 
  ISignin, 
} from '../interface/auth.interface'; 

export class SigninDTO implements ISignin {
  @IsDefined()
  @IsNotEmpty() 
  @IsString()
  phone_number: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
} 