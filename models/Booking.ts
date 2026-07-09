import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Completed"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);