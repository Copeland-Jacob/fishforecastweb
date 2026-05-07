import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getLocations } from "@/lib/getLocations";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json([], { status: 401 });
  }

  const result = await getLocations(user.id);

  return NextResponse.json(result);
}
