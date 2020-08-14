import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  createdAt: { type: Number },
  updatedAt: { type: Number, nullable: true },
});
