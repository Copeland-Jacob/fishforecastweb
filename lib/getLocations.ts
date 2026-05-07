import { db } from "@/lib/db";

export async function getLocations(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT * FROM locations
      WHERE userId = ?
    `,
    args: [userId],
  });

  return result.rows;
}
