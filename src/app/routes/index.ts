import express, { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ServiceProviderRoutes } from '../modules/servicesProvider/servicesProvider.route'
import { ServiceRoutes } from '../modules/services/services.route'


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
  {
    path: '/services-provider/',
    route: ServiceProviderRoutes,
  },
  {
    path: '/services/',
    route: ServiceRoutes,
  },
  
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
