import { IFeedback, FeedbackModel } from './feedback.interface';
import { Feedback } from './feedback.model';

const createFeedback = async (data: IFeedback): Promise<IFeedback> => {
  const result = await Feedback.create(data);
  return result;
};

const getAllFeedback = async (): Promise<IFeedback[]> => {
  const feedback = await Feedback.find();
  return feedback;
};

export const FeedbackServices = {
  createFeedback,
  getAllFeedback,
};
