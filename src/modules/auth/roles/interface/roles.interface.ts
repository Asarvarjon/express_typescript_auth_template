
export interface IRole {
    id: string
    index: number;
    name: string; 
    description: string
}


export interface ICreateRole {
    name: string; 
    description: string
}

export interface ICreateUserRole {
    role_id: string;
    user_id: string;
}

export interface IUserRole {
    id: string;
    role_id: string;
    user_id: string;
}

export interface IRoleModule {
    id: string;
    role_id: string;
    module_id: string;
}

export interface ICreatRoleModule { 
    role_id: string;
    module_id: string;
}