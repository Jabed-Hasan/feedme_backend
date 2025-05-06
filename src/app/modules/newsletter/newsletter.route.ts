import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { NewsletterController } from './newsletter.controller';
import { NewsletterValidation } from './newsletter.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';

const router = express.Router();

// Subscribe to newsletter - no auth required
router.post(
  '/subscribe',
  validateRequest(NewsletterValidation.subscribeToNewsletterZodSchema),
  NewsletterController.subscribeToNewsletter
);

// Unsubscribe from newsletter - no auth required
router.get(
  '/unsubscribe/:email',
  NewsletterController.unsubscribeFromNewsletter
);

// Get all subscriptions - admin only
router.get(
  '/all',
  auth(USER_ROLE.admin),
  NewsletterController.getAllSubscriptions
);

export const newsletterRoutes = router; 