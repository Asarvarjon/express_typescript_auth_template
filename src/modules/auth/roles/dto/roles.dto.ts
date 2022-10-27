import { ICreatRoleModule } from './../interface/roles.interface';
import { ICreateRole } from '../interface/roles.interface';
import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'; 

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

export class CreateRoleModuleDTO implements ICreatRoleModule {
    @IsString()
    @IsDefined()
    @IsUUID()
    @IsNotEmpty()
    role_id: string; 

    @IsString()
    @IsDefined()
    @IsUUID()
    @IsNotEmpty()
    module_id: string;
}