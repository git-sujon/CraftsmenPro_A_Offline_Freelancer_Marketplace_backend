import { IFaq, FaqModel } from './faq.interface';
import { Faq } from './faq.model';

const createFaq = async (data: IFaq): Promise<IFaq> => {
  const result = await Faq.create(data);
  return result;
};

const getAllFaqs = async (): Promise<IFaq[]> => {
  const faqs = await Faq.find();
  return faqs;
};

export const FaqServices = {
  createFaq,
  getAllFaqs,
};
