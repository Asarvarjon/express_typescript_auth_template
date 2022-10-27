import { UpdateRoleDTO } from './dto/roles.dto';
import { ICreateRole, IRole, IUserRole, ICreateUserRole, ICreatRoleModule, IRoleModule } from './interface/roles.interface';
import { isEmpty } from 'class-validator'; 
import RolesDao from './dao/roles.dao'; 
import ErrorResponse from '../modules/../../shared/utils/errorResponse';

export default class RolesService {
    private rolesDao = new RolesDao() 
    async findOne(id: string) {
        const foundRole: IRole = await this.rolesDao.getById(id);

        if(!foundRole) {
            throw new ErrorResponse(404, 'Not found!')
        }

        return foundRole
    }

    async getAll() {
        const roles = await this.rolesDao.getAll();

        return roles
    }

    async delete(id: string) {
        await this.rolesDao.deleteById(id)
    } 

    async createUserRole({ user_id, role_id }: ICreateUserRole) {  

        const foundUserRole: IUserRole = await this.rolesDao.getUserRole({user_id, role_id})

        if(isEmpty(foundUserRole)) {
            return 'User already has this role!'
        }
        
        const user_role: IUserRole = await this.rolesDao.createUserRole({user_id, role_id });

        return user_role
    }

    async createRoleModule({ module_id, role_id }: ICreatRoleModule) {  
        
        const role_module: IRoleModule = await this.rolesDao.createRoleModule({module_id, role_id });

        return role_module
    }

    async getUserRoleModules(user_id: string) {
        const data = await this.rolesDao.getUserRolesAndModules(user_id)

        return data
    }
}