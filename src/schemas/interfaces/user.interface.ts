import { Document } from 'mongoose';

export interface UserInterface extends Document {
  user_id?: number;
  fullName: string;
  email: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
}
