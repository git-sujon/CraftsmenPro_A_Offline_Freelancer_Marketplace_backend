import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getSingleUser)


router.patch("/:id", UserController.userUpdate)
router.delete("/:id", UserController.deleteUser)

export const UserRoutes = router;