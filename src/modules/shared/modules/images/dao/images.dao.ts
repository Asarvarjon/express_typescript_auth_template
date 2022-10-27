import { getFirst } from "../../../utils/utils";
import KnexService from '../../../../../database/connection';
import { ICreateFile } from "../../../interface/files.interface";

export default class ImagesDAO {
    async create({src, ext, name, mimetype, size}: ICreateFile){
        return getFirst(
            await KnexService("images")
                .insert({
                    src, 
                    ext, 
                    name, 
                    mimetype, 
                    size
                })
                .returning("*")
        )
    }

    async deleteById(id: string) {
        return await KnexService('images')
            .where({id: id})
            .delete()
    }
}