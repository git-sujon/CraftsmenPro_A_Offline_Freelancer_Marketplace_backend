import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', UserController.getAllUser);
router.get(
  '/my-profile',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.SERVICES_PROVIDER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.getMyProfile,
);

router.patch(
  '/my-profile',

  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.SERVICES_PROVIDER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.updateMyProfile,
);


router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser,
);



router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.userUpdate,
);


router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
