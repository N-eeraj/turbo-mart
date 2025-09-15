import type mongoose from "mongoose"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

import NotificationSchema from "#docs/schemas/notification" with { type: "json" }
import ProfileSchema from "#docs/schemas/profile" with { type: "json" }
import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
  profilePictureJSONSchema,
  notificationReadStatusJSONSchema,
  notificationReadStatusBulkJSONSchema,
  adminJSONSchema,
} from "#schemas/user"

const SortOrderEnum = {
  type: [
    "string",
    "number"
  ],
  description: "Defines the order in which results are sorted.\n- `\"asc\"` Sort results in ascending order.\n- `\"ascending\"` Same as \"asc\", for readability.\n- `\"desc\"` Sort results in descending order.\n- `\"descending\"` Same as \"desc\", for readability.\n- `1` Sort results in ascending order - numeric form.\n- `-1` Sort results in descending order - numeric form.",
  enum: [
    "asc",
    "ascending",
    "desc",
    "descending",
    1,
    -1,
  ] satisfies Array<mongoose.SortOrder>,
}

const RolesEnum = {
  type: "number",
  description: "Defines user roles and their access levels.\n- `0` - `SUPER_ADMIN`: Highest level admin with full privileges.\n- `1` - `ADMIN`: Standard admin with permission-based access.",
  enum: [
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
  ] satisfies Array<Roles>,
}

const PermissionsEnum = {
  type: "number",
  description: "Defines role-based permissions within the system.\n- `0` - `RETAILER_MANAGER`: Permission to manage retailers.\n- `1` - `CATALOGUE_MANAGER`: Permission to manage product catalogues.\n- `2` - `DELIVERY_PERSON_MANAGER`: Permission to manage delivery personnel.\n- `3` - `FINANCE_MANAGER`: Permission to manage financial operations.\n- `4` - `DATA_ANALYST`: Permission to analyze data and generate reports.",
  enum: [
    Permissions.CATALOGUE_MANAGER,
    Permissions.DATA_ANALYST,
    Permissions.DELIVERY_PERSON_MANAGER,
    Permissions.FINANCE_MANAGER,
    Permissions.RETAILER_MANAGER,
  ] satisfies Array<Permissions>,
}

const ResponseSchemas = {
  ProfileSchema,
  NotificationSchema,
}

const UtilitySchemas = {
  SortOrderEnum,
  RolesEnum,
  PermissionsEnum,
}

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
  ProfilePictureSchema: profilePictureJSONSchema,
  NotificationReadStatusSchema: notificationReadStatusJSONSchema,
  NotificationReadStatusBulkSchema: notificationReadStatusBulkJSONSchema,
  AdminSchema: adminJSONSchema,
  ...ResponseSchemas,
  ...UtilitySchemas,
}

export default schemas
