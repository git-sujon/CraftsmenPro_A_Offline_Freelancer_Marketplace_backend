import { IAdmin, AdminModel } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (data: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(data);
  return result;
};

const getAdminByUsername = async (username: string): Promise<IAdmin | null> => {
  const admin = await Admin.findOne({ username });
  return admin;
};

export const AdminServices = {
  createAdmin,
  getAdminByUsername,
};
