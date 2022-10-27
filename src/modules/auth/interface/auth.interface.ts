export interface ISignin {
  phone_number: string;
  password: string;
} 

export interface ITokenPayload {
  user_id: string;
}

export interface IDecodedToken {
  user_id: string;
  token_type: string;
} 

export interface IRefreshToken {
  token: string;
} 