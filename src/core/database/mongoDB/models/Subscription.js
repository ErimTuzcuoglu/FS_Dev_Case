import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  pairs: {type: [String], required: true},
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);