import {Subscription} from '../models/Subscription';

export default function subscriptionModelRepository() {
  const getAll = () => Subscription.find();

  const addSubscription = async (userId, pair) => {
    const subscription = await Subscription.findOne({userId});
    if (subscription) {
      if (!subscription.pairs.includes(pair)) {
        subscription.pairs.push(pair);
        return await subscription.save();
      }
    } else {
      return await Subscription.create({userId, pairs: [pair]});
    }
  };
  const getSubscriptions = async (userId) => {
    const subscription = await Subscription.findOne({userId});
    return subscription ? subscription.pairs : [];
  };

  const removeSubscription = async (userId, pair) => {
    const subscription = await Subscription.findOne({userId});
    if (subscription) {
      subscription.pairs = subscription.pairs.filter(p => p !== pair);
      if (subscription.pairs.length > 0) {
        return await subscription.save();
      } else {
        return await Subscription.deleteOne({userId});
      }
    }
  };

  return {
    getAll,
    addSubscription,
    getSubscriptions,
    removeSubscription,
  };
}
