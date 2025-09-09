import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
  profilePictureJSONSchema,
  notificationReadStatusJSONSchema,
} from "#schemas/user"

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
  ProfilePictureSchema: profilePictureJSONSchema,
  NotificationReadStatusSchema: notificationReadStatusJSONSchema,
}

export default schemas
