import { ICreateUserRole, ICreatRoleModule } from './../interface/roles.interface';
import { ICreateRole } from '../interface/roles.interface';
import KnexService from '../../../../database/connection'; 
import { getFirst } from '../../../shared/utils/utils';

export default class RolesDao { 

    async getAll() {
        return await KnexService('roles')
    }

    async getById(roleId: string) {
        return getFirst(
            await KnexService('roles')
            .where({id: roleId})
        )
    }

    async deleteById(roleId: string) {
        return await KnexService('roles')
        .where({
            id: roleId
        })
        .delete()
    } 


    async getUserRole({role_id, user_id}: ICreateUserRole) {
        return getFirst(
            await KnexService('user_roles')
            .where({
                role_id,
                user_id
            })
        )
    } 

    async createRoleModule({ module_id, role_id }: ICreatRoleModule) {
        return getFirst(
            await KnexService('role_modules')
            .insert({
                module_id,
                role_id
            })
            .returning('*')
        )
    }

    async createUserRole({ user_id, role_id }: ICreateUserRole) {
        return getFirst(
            await KnexService('user_roles')
            .insert({
                user_id,
                role_id
            })
            .returning('*')
        )
    }

    async getUserRolesAndModules(user_id) {
        return getFirst( await KnexService("user_roles")
        .select([
            'user_roles.role_id',
            'user_roles.id',
            KnexService.raw('jsonb_agg(distinct "roles") as roles') , 
        ])
        .innerJoin(function(){
            this.select([
                'roles.id',
                'roles.name'
            ])
            .from('roles')
            .as('roles')
            .groupBy('roles.id')
            .innerJoin(function() {
                this.select([
                    'role_modules.id',
                    'role_modules.module_id',
                    'role_modules.role_id'
                ])
                .from('role_modules')
                .as('role_modules')
                .groupBy('role_modules.id')
                this.innerJoin(function(){
                    this.select([
                        'modules.id',
                        'modules.name', 
                    ])
                    .from('modules')
                    .as('modules')
                    .groupBy('modules')
                }, {'module.id': 'role_modules.module_id'})
            }, {'roles.id': 'role_modules.role_id'})
        }, {'roles.id': 'user_roles.role_id'}) 
        .where({"user_roles.id": user_id}) 
        .groupBy('user_roles.id')
        .groupBy('roles.id')
        )  

        // return await KnexService("user_roles")
        // .select('roles.name' as 'role_name', 'modules.name', 'user_roles.role_id', 'user_roles.user_id')
        // .innerJoin('roles', 'roles.id' ,'user_roles.role_id')
        // .innerJoin('modules', 'roles.id' ,'modules.role_id')
        // .where({"user_roles.user_id": user_id}) 
    } 

}

