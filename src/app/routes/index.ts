import express, { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'


const router = express.Router()

type IModuleRoutes={
  path:string
  route:Router
}

const moduleRoutes:IModuleRoutes[] = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/users/',
    route: UserRoutes,
  },
  
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
