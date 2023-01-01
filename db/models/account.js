import { Schema, model, models } from 'mongoose';

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  passwordHash: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = models.Account || model('Account', AccountSchema)