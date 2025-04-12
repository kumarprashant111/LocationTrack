import { NextResponse } from "next/server";
import { mockLocations } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(mockLocations);
}
