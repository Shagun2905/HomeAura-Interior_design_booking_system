import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

// UPDATE BOOKING STATUS
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

    booking.status = body.status;

    await booking.save();

    return NextResponse.json(
      {
        success: true,
        message: "Booking status updated successfully",
        booking,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update booking status",
      },
      {
        status: 500,
      }
    );
  }
}