import RolesDao from '../../modules/auth/roles/dao/roles.dao';
import { UpdateUserDTO } from './dto/users.dto';
import { IUser } from 'modules/users/interface/users.interface';
import { ICheckUser } from './interface/users.interface';
import { isEmpty } from 'class-validator';  
import ErrorResponse from '../shared/utils/errorResponse';
import UsersDao from './dao/users.dao';
import uploadFile from '../../modules/shared/utils/fileUpload';
import ImagesDAO from '../../modules/shared/modules/images/dao/images.dao';
import { generateHash } from '../../modules/shared/utils/bcrypt'; 
import { defaultRequestImagesName as defImgName } from '../../modules/shared/defaults/defaults';  

export default class UsersService {
    private usersDao = new UsersDao();
    private imagesDao = new ImagesDAO();
    private rolesDao = new RolesDao(); 

    async create({ first_name, last_name, gender, birtdate, password, phone_number, address, roles }: ICheckUser, image) {
        const foundUser = await this.usersDao.getByPhoneNumber(phone_number) 
        if(foundUser) {
            throw new ErrorResponse(400, 'This user already exists!')
        };

        let user_photo: string;
        if(!isEmpty(image)) {
            const images = uploadFile(image[defImgName], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            user_photo = uploadedImage.src;
        };

        let hash_password = await generateHash(password)

        const user: IUser = await this.usersDao.create({
            first_name, last_name, address, gender, birtdate, phone_number, password: hash_password, image_src: user_photo
        });

        for await(let role of roles) {
            await this.rolesDao.createUserRole({user_id: user.user_id, role_id: role})
        } 

        return user
    }

    async findOne(id: string) {
        const user: IUser = await this.usersDao.getById(id);

        if(!user) {
            throw new ErrorResponse(404, 'User was not found!')
        }

        return user
    }

    async findByNumber(phone_number: string) {
        const user: IUser = await this.usersDao.getByPhoneNumber(phone_number);

        if(!user) {
            throw new ErrorResponse(404, 'User was not found!')
        }

        return user
    }

    async getAll() {
        const users = await this.usersDao.getAll();

        return users
    }

    async delete(id: string) {
        await this.usersDao.deleteById(id)
    }

    async update(id: string, values: UpdateUserDTO, image) {
        const foundUser = await this.usersDao.getById(id)

        if(isEmpty(foundUser)) {
            throw new ErrorResponse(400, 'User was not found!')
        } 

        let user_photo: string = foundUser.image_src;
        if(!isEmpty(image)) {
            const images = uploadFile(image[defImgName], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            user_photo = uploadedImage.src;
        };

        if(values.roles && values.roles.length > 0) {
            let roles: string[] = values.roles 

            for await(let role of roles) {
                const foundRole = await this.rolesDao.getUserRole({user_id: foundUser.user_id, role_id: role})
                if(!foundRole) {
                    await this.rolesDao.createUserRole({user_id: foundUser.user_id, role_id: role})
                }
            }

            // delete roles 
            delete values.roles
        } 

        const user: IUser = await this.usersDao.update(id, {...values, image_src: user_photo})

        return user
    }   
}