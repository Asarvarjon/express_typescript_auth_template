import { getFirst } from "../../../utils/utils";
import KnexService from '../../../../../database/connection';
import { ICreateFile } from "../../../interface/files.interface";

export default class FilesDAO {
    async create({src, ext, name, mimetype, size}: ICreateFile){
        return getFirst(
            await KnexService("files")
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
        return await KnexService('files')
            .where({id: id})
            .delete()
    }
}