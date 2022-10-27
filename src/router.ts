import { Router } from 'express'; 
import UsersRoute from './modules/users/users.route'; 
import AuthRoute from './modules/auth/auth.route';
import RolesRoute from './modules/auth/roles/roles.route'    


const router = Router()

const usersRoute = new UsersRoute()  
const authRoute = new AuthRoute()
const rolesRoute = new RolesRoute() 

router.use("/", usersRoute.router)  
router.use("/", rolesRoute.router) 
router.use("/", authRoute.router)   

export default router