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

export const statuses = mysqlEnum("status", [
  "pending",
  "approved",
  "declined",
  "suspended",
])

const sellersTable = mysqlTable("sellers", {
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

  status: statuses
    .notNull()
    .default("pending"),

  rating: decimal("rating", {
    precision: 3,
    scale: 2,
  })
    .default("0.00"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export default sellersTable
