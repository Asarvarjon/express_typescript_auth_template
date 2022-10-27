import { isEmpty, isUndefined } from "lodash";
import ErrorResponse from "../shared/utils/errorResponse";

import { 
  getCurrentDate,
  getDateByValue, 
} from "../shared/utils/utils";
import { compareHash, generateHash } from "../shared/utils/bcrypt";  

import UsersService from "../users/users.service";  
import SessionsDAO from "./dao/sessions.dao"; 
import { ISignin, ITokenPayload } from "./interface/auth.interface"; 
import TokenService from "./providers/token.service";
import { IUserSession } from "./interface/sessions.interface";

export default class AuthService { 
  private usersService = new UsersService();   
  private sessionsDao = new SessionsDAO(); 
  private jwtService = new TokenService()  

  async signIn({ password, phone_number }: ISignin, device: string, ip: string) {
    const user = await this.usersService.findByNumber(phone_number)

    if (!user) {
      throw new ErrorResponse(400, "Password or phone number is wrong")
    } 

    const isValid = await compareHash(password, user.password)

    if (!isValid) {
      throw new ErrorResponse(400, "Password or phone number is wrong")
    }

    const accessTokenPayload: ITokenPayload = { user_id: user.user_id }

    const accessToken = this.jwtService.getAccessToken(accessTokenPayload)
    const refreshToken = this.jwtService.getRefreshToken(accessTokenPayload)

    await this.sessionsDao.create({
      device,
      refresh_token: refreshToken.token,
      refresh_token_expires_at: refreshToken.expiresAt,
      remote_ip: ip,
      user_id: user.user_id
    });

    return {
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }, user: {
        created_at: user.created_at,
        userId: user.user_id,
        fullName: user.first_name + user.last_name,
        phone_number: user.phone_number, 
      }
    }
  }

  async refreshToken(refreshToken: string) {
    const tokenInfo: IUserSession = await this.sessionsDao.getByRefreshToken(refreshToken)

    if (isUndefined(tokenInfo) || getCurrentDate() > getDateByValue(tokenInfo.refresh_token_expires_at).getTime()) {
      throw new ErrorResponse(400, "Refresh token is not valid")
    }
    
    const accessTokenPayload: ITokenPayload = { user_id: tokenInfo.user_id }

    const accessToken = this.jwtService.getAccessToken(accessTokenPayload)

    return accessToken

  }


}