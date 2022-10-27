import { ICheckUser } from './../interface/users.interface';
import { IsArray, IsDefined, IsNotEmpty, IsString,  MaxLength } from 'class-validator'; 


export class CreateUserDTO implements ICheckUser {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    first_name: string; 

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    last_name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    address: string; 

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    birtdate: Date;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    phone_number: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    gender: string;

    @IsArray()
    @IsDefined()
    @IsNotEmpty() 
    roles: string[];
 
}


export class UpdateUserDTO implements ICheckUser {
    @IsString()
    @MaxLength(64)
    first_name: string; 

    @IsString()
    @MaxLength(64)
    last_name: string;

    @IsString()
    @MaxLength(128)
    address: string; 

    @IsString()
    @MaxLength(64)
    birtdate: Date;

    @IsString()
    @MaxLength(64)
    password: string;

    @IsString()
    @MaxLength(64)
    phone_number: string;

    @IsString()
    @MaxLength(64)
    gender: string;

    @IsArray() 
    roles: string[]; 
}