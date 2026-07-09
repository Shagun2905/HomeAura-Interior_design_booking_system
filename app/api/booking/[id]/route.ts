import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

type RouteParams = { params: Promise<{ id: string }> };

const ALLOWED_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;
type BookingStatus = (typeof ALLOWED_STATUSES)[number];

const apiResponse = (success: boolean, dataOrMessage: string | object, status: number) => {
  const payload = typeof dataOrMessage === "string" 
    ? { success, message: dataOrMessage } 
    : { success, ...dataOrMessage };
  return NextResponse.json(payload, { status });
};

// UPDATE BOOKING STATUS
export async function PATCH(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(false, "Invalid booking identifier format", 400);
    }

    let body: { status?: string };
    try {
      body = await req.json();
    } catch {
      return apiResponse(false, "Malformed or missing JSON request body", 400);
    }

    const { status } = body;
    if (!status || !ALLOWED_STATUSES.includes(status as BookingStatus)) {
      return apiResponse(false, `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`, 400);
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return apiResponse(false, "Booking not found", 404);
    }

    return apiResponse(
      true, 
      { message: "Booking status updated successfully", booking }, 
      200
    );
  } catch (error) {
    console.error("PATCH Booking Error:", error);
    return apiResponse(false, "Failed to update booking status", 500);
  }
}