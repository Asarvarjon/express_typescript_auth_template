import { RequestWithUser } from "../../interface/routes.interface"; 
import UsersDAO from "../../../users/dao/users.dao";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { server } from "../../../../config/conf";
import ErrorResponse from "../../utils/errorResponse";
import { IDecodedToken } from "modules/auth/interface/auth.interface";
import RolesService from "../../../../modules/auth/roles/roles.service";

const accessToken = server.accessToken

const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    let authToken = ""
    const usersDao = new UsersDAO(); 
    const authorization = req.headers.authorization

    if (authorization && authorization.startsWith("Bearer ")) {
      authToken = authorization.split(" ")[1];
    }
    if (!authToken) throw new ErrorResponse(401, "Please login in to get access")

    const decodedToken = verify(authToken, accessToken.secret) as IDecodedToken;

    if (!decodedToken || decodedToken.token_type !== "access") throw new ErrorResponse(400, "Unauthorized!")

    const user = await usersDao.getById(decodedToken.user_id)

    if (!user) throw new ErrorResponse(401, "User does not exist")

    req.user = user

    next()

  } catch (error) { 
    next(error)
  }
}

export default protect


