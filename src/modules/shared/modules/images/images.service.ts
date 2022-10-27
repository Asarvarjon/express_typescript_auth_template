import { NextFunction, Request, Response } from "express";
import { ICreateFile } from "../../interface/files.interface";
import ImagesDAO from "./dao/images.dao";

export default class ImageService {
    private imagesDao = new ImagesDAO()
    async create({src, ext, name, mimetype, size}: ICreateFile){
        const image = await this.imagesDao.create({
            src, ext, name, mimetype, size
        })
        
        return image
    }
    async delete(id: string){
        await this.imagesDao.deleteById(id)
    }
}