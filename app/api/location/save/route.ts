import { currentUser } from "@clerk/nextjs/server";
import { saveLocation } from "@/lib/saveLocation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { lat, lon, city } = body;

  if (!lat || !lon || !city) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "No user" }, { status: 401 });

  await saveLocation(user.id, city, lat, lon);

  return NextResponse.json({ success: true });
}
