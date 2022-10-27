import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto';
import validate  from '../shared/middlewares/validate';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface'; 
import UsersController from './users.controller'; 
import protect from '../../modules/shared/middlewares/auth/protect';
import check_access from '../../modules/shared/middlewares/auth/check_access';


export default class UsersRoute implements Routes{
    public path = '/users';
    public router = Router()
    public usersController = new UsersController()

    constructor() {
        this.initializeRoutes()
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.usersController.getAll);

        this.router.get(`${this.path}/me`, protect, this.usersController.getMe);

        this.router.post(`${this.path}/`, validate(CreateUserDTO, 'body', true), this.usersController.create);

        this.router.delete(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.usersController.delete);

        this.router.put(`${this.path}/:id`, validate(UpdateUserDTO, 'body', true), validate(ValidateUuidDTO, 'params'), this.usersController.update);
        
        this.router.get(`${this.path}/:id`, protect, check_access('get_one_user'), validate(ValidateUuidDTO, 'params'), this.usersController.getById); 

    }
}