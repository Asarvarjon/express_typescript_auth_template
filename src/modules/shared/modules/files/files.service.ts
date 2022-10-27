import { NextFunction, Request, Response } from "express";
import { ICreateFile } from "../../interface/files.interface";
import FilesDAO from "./dao/files.dao";

export default class FileService {
    private filesDao = new FilesDAO()
    async create({src, ext, name, mimetype, size}: ICreateFile){
        const file = await this.filesDao.create({
            src, ext, name, mimetype, size
        })
        return file
    }
    async delete(id: string){
        await this.filesDao.deleteById(id)
    }
}