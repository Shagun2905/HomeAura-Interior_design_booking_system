import mongoose, { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Service || model("Service", ServiceSchema);