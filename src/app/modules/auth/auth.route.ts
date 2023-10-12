import express from 'express';
import { AuthController } from './auth.controller';
import validationRequest from '../../middleware/validationRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validationRequest(AuthValidation.signUpSchema),
  AuthController.signUp,
);
router.post(
  '/login',
  validationRequest(AuthValidation.loginSchema),
  AuthController.login,
);

export const AuthRoutes = router;
