import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

const REQUIRED_FIELDS = [
  "clientName",
  "clientEmail",
  "phone",
  "room",
  "service",
  "appointmentDate",
] as const;

const apiResponse = (success: boolean, dataOrMessage: string | object, status: number) => {
  const payload = typeof dataOrMessage === "string" 
    ? { success, message: dataOrMessage } 
    : { success, ...dataOrMessage };
  return NextResponse.json(payload, { status });
};

// GET ALL BOOKINGS
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return apiResponse(true, { bookings }, 200);
  } catch (error) {
    console.error("GET Bookings Error:", error);
    return apiResponse(false, "Failed to fetch bookings", 500);
  }
}

// CREATE BOOKING
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return apiResponse(false, "Malformed JSON body", 400);
    }

    // Validate existence of all required text properties
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return apiResponse(false, `Missing or empty required field: ${field}`, 400);
      }
    }

    const emailStr = (body.clientEmail as string).trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      return apiResponse(false, "Invalid email format string", 400);
    }

    const booking = await Booking.create({
      clientName: (body.clientName as string).trim(),
      clientEmail: emailStr,
      phone: (body.phone as string).trim(),
      room: (body.room as string).trim(),
      service: (body.service as string).trim(),
      appointmentDate: (body.appointmentDate as string).trim(),
    });

    return apiResponse(true, { booking }, 201);
  } catch (error) {
    console.error("Create Booking Error:", error);
    return apiResponse(false, "Booking Failed", 500);
  }
}