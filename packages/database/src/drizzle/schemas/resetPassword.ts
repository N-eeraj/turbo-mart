import {
  sql,
} from "drizzle-orm"
import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core"

export enum UserType {
  ADMIN = "admin",
  SELLER = "seller",
  DELIVERY_PERSON = "delivery_person",
  CUSTOMER = "customer",
}

const resetPassword = mysqlTable("reset_password", {
  id: serial("id")
    .primaryKey(),
  token: varchar("token", { length: 255 })
    .notNull()
    .unique(),
  userId: varchar("user_id", { length: 255 })
    .notNull(),
  userType: mysqlEnum("user_type", UserType)
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expiresAt: timestamp("expires_at"),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
}, (table) => {
  return [
    unique().on(table.userId, table.userType),
  ]
})

export default resetPassword
