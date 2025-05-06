export interface INewsletter {
  email: string;
  isSubscribed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TNewsletterSubscribe = {
  email: string;
}; 