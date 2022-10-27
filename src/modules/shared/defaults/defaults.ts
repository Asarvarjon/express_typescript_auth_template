import { IDefaultQuery } from "../interface/query.interface";

export const defaultQueryValues: IDefaultQuery = {
    limit: 30,
    offset: 0,
    page: 0,
    order: "ASC",
    orderBy: "created_at"
}

export const defaultRangeSplitter: string = "and"
export const defaultRequestImagesName: string = "images"
export const defaultRequestCoverImageName: string = "cover"
export const defaultRequestFilesName: string = "files"

