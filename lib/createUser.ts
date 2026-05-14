import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function createUserIfNeeded() {
  const user = await currentUser();
  if (!user) return;
  console.log(user);
  await db.execute({
    sql: `
      INSERT OR IGNORE INTO users (id, email, name, is_premium)
      VALUES (?, ?, ?, 0)
    `,
    args: [user.id, user.emailAddresses[0].emailAddress, user.fullName || ""],
  });
}
