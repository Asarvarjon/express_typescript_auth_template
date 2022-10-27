import { ICreateModule, IModule } from './interface/modules.interface';
import ModulesDAO from './dao/modules.dao';

export default class ModulesService {
    private modulesDao = new ModulesDAO()

    async create({ name, role_id }: ICreateModule) {  

        const module: IModule = await this.modulesDao.create({
            name, role_id
        })

        return module
    } 

    async getAll() {
        const modules = await this.modulesDao.getAll();
        return modules
    } 
}