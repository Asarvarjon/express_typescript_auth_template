import { RequestWithUser } from './../shared/interface/routes.interface';
import { isEmpty } from 'class-validator';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto'; 
import { Request, Response, NextFunction } from 'express'; 
import UsersService from './users.service'; 
import ErrorResponse from '../../modules/shared/utils/errorResponse';

export default class UsersController {

    private usersService = new UsersService()

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDTO = req.body; 
            const data = await this.usersService.create(userData, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'User created succesfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const data = await this.usersService.findOne(id)

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    }

    public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const data = await this.usersService.getAll();

            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction)=> {
        try {

            const { id } = req.params;
            const user = await this.usersService.findOne(id)

            if(isEmpty(user)) {
                throw new ErrorResponse(400, 'User was not found!')
            }
            await this.usersService.delete(id)
            
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const userData: UpdateUserDTO = req.body;
            const { id } = req.params; 
            const data = await this.usersService.update(id, userData, req['files'] )
            
            res.status(200).json({
                success: true,
                data,
                message: "User updated successfully"
            })
        } catch (error) {
            next(error)
        }
    } 

    public getMe = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try { 

            const { user } = req;
            const data = await this.usersService.findOne(user.user_id)

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    } 
}