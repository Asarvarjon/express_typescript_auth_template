import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service'; 
import { SigninDTO } from './dto/auth.dto';
import requestIp from 'request-ip';
import { IRefreshToken, ISignin } from './interface/auth.interface';

class AuthController {
  public authService = new AuthService(); 
  
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SigninDTO = req.body;

      const remoteIp = requestIp.getClientIp(req);
      const device = req.headers['user-agent'];

      const data = await this.authService
        .signIn({ phone_number: userData.phone_number, password: userData.password }, device, remoteIp);

      res.status(201).json({ success: true, data: data, message: 'Logged in succesfully!' });
    } catch (error) {
      next(error);
    }
  };
  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: IRefreshToken = req.body;

      const accessToken = await this.authService
        .refreshToken(data.token);

      res.status(201).json({ success: true, data: { accessToken }, message: 'Access token was generated' });
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
