import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
    },

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
    },

    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'],
      default: 'Website',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>(
  'Lead',
  leadSchema
);