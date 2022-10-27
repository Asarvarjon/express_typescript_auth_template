import { CreateRoleModuleDTO } from './dto/roles.dto';
import { ICreatRoleModule } from './interface/roles.interface';
import { ICreateModule } from './../modules/interface/modules.interface';
import RolesService from './roles.service';
import { NextFunction, Request, Response } from 'express';


class RolesController {
    private rolesService = new RolesService(); 
  
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

    public createRoleModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
                const { module_id, role_id }: CreateRoleModuleDTO = req.body;
    
                const data = await this.rolesService.createRoleModule({module_id, role_id})
    
                res.status(200).json({ 
                    data
                })
        } catch (error) {
                next(error)
        }
}}
 
export default RolesController;
