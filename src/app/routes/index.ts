import express, { Router } from 'express'


const router = express.Router()

type IModuleRoutes={
  path:string
  route:Router
}

const moduleRoutes:IModuleRoutes[] = [
  // {
  //   path: '/books/',
  //   route: RouteName,
  // },
  
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
