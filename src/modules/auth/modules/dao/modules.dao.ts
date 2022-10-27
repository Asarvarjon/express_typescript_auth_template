import { ICreateModule } from './../interface/modules.interface';
 
import KnexService from '../../../../database/connection'; 
import { getFirst } from '../../../shared/utils/utils';

export default class ModulesDAO {

    async create({ name, role_id }: ICreateModule) {
        return getFirst(
            await KnexService('modules')
            .insert({
                name, 
                role_id
            })
            .returning('*')
        )
    } 

    async getAll() {
        return await KnexService('modules')
    }  
}