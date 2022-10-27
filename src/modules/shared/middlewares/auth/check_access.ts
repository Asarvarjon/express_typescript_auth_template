import { RequestWithUser } from "../../interface/routes.interface";  
import { NextFunction, Request, Response } from "express"; 
import ErrorResponse from "../../utils/errorResponse"; 
import RolesService from "../../../../modules/auth/roles/roles.service";


const check_access = (module_name: string) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const {
                user
            } = req  

            const rolesservice = new RolesService()
            let all_modules = await rolesservice.getUserRoleModules(user.user_id)

            const existance = all_modules.find(e => e["name"] == module_name);  
            if (!existance) throw new ErrorResponse(400, "Access denied!")

            next()

        } catch (error) {  
            next(error)
        }
    }
}

export default check_access;