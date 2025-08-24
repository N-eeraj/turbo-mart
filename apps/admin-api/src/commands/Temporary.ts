import db from "@app/database/drizzle/db.ts"
import { lt } from "drizzle-orm"
import sellers from "@app/database/drizzle/schemas/sellers.ts"

export default class Temporary {
  static async testDrizzle() {
    const data = await db.select()
      .from(sellers)
      .where(lt(sellers.rating, "3"))
      .limit(1)
      .offset(1)
    console.log(data)
  }

  static execute(..._args: Array<unknown>): void {
    this.testDrizzle()
  }
}
