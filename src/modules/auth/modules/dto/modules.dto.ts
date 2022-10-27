import { ICreateModule } from './../interface/modules.interface';
import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'; 

export class CreateModuleDTO implements ICreateModule {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString() 
    @IsUUID('all') 
    role_id: string;
} 