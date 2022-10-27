import { ICreateRole } from '../interface/roles.interface';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator'; 

export class CreateRoleDTO implements ICreateRole {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    description: string;
}


export class UpdateRoleDTO implements ICreateRole {
    @IsString()
    @MaxLength(64)
    name: string; 

    @IsString()
    @MaxLength(64)
    description: string;
}