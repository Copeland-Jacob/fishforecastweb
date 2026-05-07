import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { deleteLocation } from "@/lib/deleteLocation";

export async function DELETE(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await deleteLocation(user.id, id);

  return NextResponse.json({ success: true });
}
