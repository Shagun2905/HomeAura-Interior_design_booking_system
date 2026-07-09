import { NextRequest, NextResponse } from "next/server";

const TIME_SLOTS = [
  { time: "10:00 AM", booked: false },
  { time: "11:00 AM", booked: false },
  { time: "12:00 PM", booked: true },
  { time: "01:00 PM", booked: false },
  { time: "02:00 PM", booked: true },
  { time: "03:00 PM", booked: false },
  { time: "04:00 PM", booked: false },
] as const;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const dateStr = req.nextUrl.searchParams.get("date");

  if (!dateStr || Number.isNaN(Date.parse(dateStr))) {
    return NextResponse.json(
      { message: !dateStr ? "Date is required" : "Invalid date format" },
      { status: 400 }
    );
  }

  return NextResponse.json(TIME_SLOTS, { status: 200 });
}