import express from 'express';
import { getSubscriptions, addSubscription, updateSubscription, deleteSubscription } from '../controllers/subscriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getSubscriptions)
  .post(protect, admin, addSubscription);

router.route('/:id')
  .put(protect, admin, updateSubscription)
  .delete(protect, admin, deleteSubscription);

export default router;
