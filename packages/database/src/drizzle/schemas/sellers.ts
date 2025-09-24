import {
  sql,
} from "drizzle-orm"
import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  decimal,
  timestamp,
} from "drizzle-orm/mysql-core"

export enum SellerStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  SUSPENDED = "suspended",
}

const seller = mysqlTable("sellers", {
  id: serial("id")
    .primaryKey(),
  name: varchar("name", { length: 255 })
    .notNull(),
  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),
  phone: varchar("phone", { length: 20 })
    .notNull()
    .unique(),
  status: mysqlEnum("status", SellerStatus)
    .notNull()
    .default(SellerStatus.PENDING),
  rating: decimal("rating", {
    precision: 3,
    scale: 2,
  })
    .default("0.00")
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export default seller
