import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NewsletterService } from './newsletter.service';

const subscribeToNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  const result = await NewsletterService.subscribeToNewsletter({ email });
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully subscribed to newsletter',
    data: result,
  });
});

const unsubscribeFromNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  
  const result = await NewsletterService.unsubscribeFromNewsletter(email);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully unsubscribed from newsletter',
    data: result,
  });
});

const getAllSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  
  const result = await NewsletterService.getAllSubscriptions(query);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Newsletter subscriptions retrieved successfully',
    data: result,
  });
});

export const NewsletterController = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getAllSubscriptions,
}; 