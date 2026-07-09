import { NextResponse } from "next/server";

export interface Service {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  imageUrl: string;
}

const SERVICES: readonly Service[] = [
  {
    id: 1,
    name: "1 BHK Interior Design",
    description: "Complete Interior Design",
    durationMinutes: 120,
    price: 24999,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 2,
    name: "2/3 BHK Complete Interior",
    description: "Luxury Home Interiors",
    durationMinutes: 180,
    price: 79999,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
  },
  {
    id: 3,
    name: "Modular Kitchen",
    description: "Modern Indian Kitchen",
    durationMinutes: 90,
    price: 39999,
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
  },
] as const;

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(SERVICES, { status: 200 });
  } catch (error) {
    console.error("GET Services Route Error:", error);
    return NextResponse.json(
      { message: "An unexpected server error occurred while retrieving services." },
      { status: 500 }
    );
  }
}