import db, {
  connection,
} from "@app/database/drizzle/db.ts"
import sellers from "@app/database/drizzle/schemas/sellers.ts"

export default class Temporary {
  static async getSellers() {
    const data = await db.select()
      .from(sellers)
    console.log(data)
  }

  static async createSeller() {
    await db.insert(sellers)
      .values({
        email: "seller@turbo.com",
        name: "Seller",
        phone: "9874124819",
      })
  }

  static async execute(..._args: Array<unknown>) {
    await this.getSellers()
    await this.createSeller()
    await this.getSellers()
    connection.end()
  }
}
