import asyncHandler from 'express-async-handler';
import Subscription from '../models/subscriptionModel.js';

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private/Admin
const getSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({}).populate('user', 'name email');
  res.json(subscriptions);
});

// @desc    Add a new subscription
// @route   POST /api/subscriptions
// @access  Private/Admin
const addSubscription = asyncHandler(async (req, res) => {
  const { user, plan, startDate, endDate } = req.body;

  const subscription = new Subscription({
    user,
    plan,
    startDate,
    endDate,
  });

  const createdSubscription = await subscription.save();
  res.status(201).json(createdSubscription);
});

// @desc    Update a subscription
// @route   PUT /api/subscriptions/:id
// @access  Private/Admin
const updateSubscription = asyncHandler(async (req, res) => {
  const { user, plan, startDate, endDate } = req.body;

  const subscription = await Subscription.findById(req.params.id);

  if (subscription) {
    subscription.user = user;
    subscription.plan = plan;
    subscription.startDate = startDate;
    subscription.endDate = endDate;

    const updatedSubscription = await subscription.save();
    res.json(updatedSubscription);
  } else {
    res.status(404);
    throw new Error('Subscription not found');
  }
});

// @desc    Delete a subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private/Admin
const deleteSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);

  if (subscription) {
    await subscription.remove();
    res.json({ message: 'Subscription removed' });
  } else {
    res.status(404);
    throw new Error('Subscription not found');
  }
});

export { getSubscriptions, addSubscription, updateSubscription, deleteSubscription };
