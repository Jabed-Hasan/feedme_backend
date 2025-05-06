import { INewsletter, TNewsletterSubscribe } from './newsletter.interface';
import { Newsletter } from './newsletter.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

// Subscribe to newsletter
const subscribeToNewsletter = async (payload: TNewsletterSubscribe) => {
  // Check if email already exists
  const existingSubscription = await Newsletter.findOne({ email: payload.email });
  
  if (existingSubscription) {
    // If already subscribed, return existing subscription
    if (existingSubscription.isSubscribed) {
      return existingSubscription;
    }
    
    // If unsubscribed before, update to subscribed
    existingSubscription.isSubscribed = true;
    return await existingSubscription.save();
  }
  
  // Create new subscription
  const result = await Newsletter.create(payload);
  return result;
};

// Unsubscribe from newsletter
const unsubscribeFromNewsletter = async (email: string) => {
  const subscription = await Newsletter.findOne({ email });
  
  if (!subscription) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  
  subscription.isSubscribed = false;
  return await subscription.save();
};

// Get all newsletter subscriptions (admin only)
const getAllSubscriptions = async (query: Record<string, unknown> = {}) => {
  // Default filter to show only active subscriptions if not specified
  if (!query.hasOwnProperty('isSubscribed')) {
    query.isSubscribed = true;
  }
  
  const subscriptions = await Newsletter.find(query).sort({ createdAt: -1 });
  return subscriptions;
};

export const NewsletterService = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getAllSubscriptions,
}; 