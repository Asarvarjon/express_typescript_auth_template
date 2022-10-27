import { ICreateUser } from './../interface/users.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 


export default class UsersDao {

    async create({ first_name, last_name, password, gender, address, image_src, birtdate, phone_number }: ICreateUser) {
        return getFirst(
            await KnexService('users')
            .insert({
                first_name,
                last_name,
                password,
                gender,
                address,
                image_src,
                birtdate,
                phone_number
            })
            .returning('*')
        )
    }


    async update( userId: string, values: ICreateUser) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
            .update({
                ...values
            })
            .returning('*')
        )
    }

    async getAll() {
        return await KnexService('users')
    }

    async getById(userId: string) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
        )
    }

    async getByPhoneNumber(phone_number: string) {
        return getFirst(
            await KnexService('users')
            .where({phone_number: phone_number})
        )
    }

    async deleteById(userId: string) {
        return await KnexService('users')
        .where({
            user_id: userId
        })
        .delete()
    }   
}