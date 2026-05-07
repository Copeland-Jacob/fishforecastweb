import { db } from "@/lib/db";

export async function deleteLocation(userId: string, id: string) {
  const result = await db.execute({
    sql: `
      DELETE FROM locations
      WHERE userId = ? AND id = ?
    `,
    args: [userId, id],
  });

  return result.rows;
}
