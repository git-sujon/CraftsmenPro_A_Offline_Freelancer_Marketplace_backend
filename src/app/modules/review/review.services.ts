import { IReview } from "./review.interface";
import { Review } from "./review.model";


const createReview = async (data: IReview): Promise<IReview> => {
  const result = await Review.create(data);
  return result;
};

const getReviewById = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOne({ _id: id });
  return result;
};

const getReviewsForService = async (serviceId: string): Promise<IReview[]> => {
  const results = await Review.find({ service: serviceId });
  return results;
};

const updateReview = async (id: string, data: Partial<IReview>): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteReview = async (id: string): Promise<void> => {
  await Review.findByIdAndRemove(id);
};

export const ReviewServices = {
  createReview,
  getReviewById,
  getReviewsForService,
  updateReview,
  deleteReview,
};
