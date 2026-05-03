import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  const userId = session.userId;

  if (userId) {
    redirect("/dashboard");
  }

  redirect("/sign-in");
}
