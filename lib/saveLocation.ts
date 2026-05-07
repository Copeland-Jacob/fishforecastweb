import { db } from "@/lib/db";

export async function saveLocation(
  userId: string,
  city: string,
  lat: string,
  lon: string,
) {
  await db.execute({
    sql: `
      INSERT INTO locations (userId, city, lat, lon)
      VALUES (?, ?, ?, ?)
    `,
    args: [userId, city, lat, lon],
  });
}
