import { IBlog, BlogModel } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (data: IBlog): Promise<IBlog> => {
  const result = await Blog.create(data);
  return result;
};

const getAllBlogs = async (): Promise<IBlog[]> => {
  const blogs = await Blog.find();
  return blogs;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
};
