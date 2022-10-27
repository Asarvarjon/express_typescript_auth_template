import { Router } from 'express';
import { Routes } from '../../shared/interface/routes.interface'; 
import RolesController from './roles.controller'; 

export default class RolesRoute implements Routes {
  public path = '/roles/';
  public router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() { 
    this.router.get(`${this.path}`,  this.rolesController.getAll);  
  }
}
