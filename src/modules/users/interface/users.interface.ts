
export interface IUser {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
    image_src: string;
    phone_number: string;
    password: string;
    gender: string;
    is_active: Boolean;
    birtdate: Date;
    created_at: Date;
    updated_at: Date;
}


export interface ICreateUser { 
    first_name: string;
    last_name: string;
    address: string;
    image_src: string;
    phone_number: string;
    birtdate: Date;
    password: string;
    gender: string;  
}

export interface ICheckUser { 
    first_name: string;
    last_name: string;
    address: string; 
    phone_number: string;
    birtdate: Date;
    password: string;
    gender: string; 
    roles: string[]; 
}
 