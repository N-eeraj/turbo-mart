import type mongoose from "mongoose"

import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
  profilePictureJSONSchema,
  notificationReadStatusJSONSchema,
  notificationReadStatusBulkJSONSchema,
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

const UtilitySchemas = {
  SortOrderEnum,
}

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
  ProfilePictureSchema: profilePictureJSONSchema,
  NotificationReadStatusSchema: notificationReadStatusJSONSchema,
  NotificationReadStatusBulkSchema: notificationReadStatusBulkJSONSchema,
  ...UtilitySchemas
}

export default schemas
