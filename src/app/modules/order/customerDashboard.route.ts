import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';

const customerDashboardRouter = express.Router();

customerDashboardRouter.get('/dashboard-stats', auth(USER_ROLE.customer), orderController.getCustomerDashboardStats);

export { customerDashboardRouter }; 