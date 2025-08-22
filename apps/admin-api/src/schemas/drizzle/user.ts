import {
  int,
  varchar,
  mysqlTable,
} from "drizzle-orm/mysql-core"

const users = mysqlTable("users", {
  id: int(),
  firstName: varchar("first_name"),
})

export default users
