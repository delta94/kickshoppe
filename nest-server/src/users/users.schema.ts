import * as mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import { UsersModel } from './users.model';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function() {
      const { googleAccount, facebookAccount } = this;
      const isPasswordRequired =
        !!googleAccount.accessToken || !!facebookAccount.accessToken;
      return !isPasswordRequired;
    },
  },
  imgUrl: String,
  googleAccount: {
    accessToken: { type: String },
  },
  facebookAccount: {
    accessToken: { type: String },
  },
});

UserSchema.pre<UsersModel>('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, Number(process.env.SALT));
  }
});
