import RolesService from './roles.service';
import { NextFunction, Request, Response } from 'express'; 

class RolesController {
  public rolesService = new RolesService(); 
  
  public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const data = await this.rolesService.getAll();

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}


}

export default RolesController;
