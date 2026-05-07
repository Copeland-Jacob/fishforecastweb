import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function createUserIfNeeded() {
  const user = await currentUser();
  if (!user) return;

  await db.execute({
    sql: `
      INSERT OR IGNORE INTO users (id, email, name)
      VALUES (?, ?, ?)
    `,
    args: [user.id, user.emailAddresses[0].emailAddress, user.fullName || ""],
  });
}
