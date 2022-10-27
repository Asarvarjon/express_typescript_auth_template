import { CreateRoleModuleDTO } from './dto/roles.dto';
import { Router } from 'express';
import { Routes } from '../../shared/interface/routes.interface'; 
import RolesController from './roles.controller'; 
import validate  from '../../shared/middlewares/validate';


export default class RolesRoute implements Routes {
  public path = '/roles/';
  public router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() { 
    this.router.get(`${this.path}`,  this.rolesController.getAll);
    this.router.post(`${this.path}/module`, validate(CreateRoleModuleDTO, 'body', true), this.rolesController.createRoleModule); 
  }
}
