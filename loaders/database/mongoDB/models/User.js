import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TradingPair' }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);