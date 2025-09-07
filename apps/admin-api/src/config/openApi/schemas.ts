import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
  profilePictureJSONSchema,
} from "#schemas/user"

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
  ProfilePictureSchema: profilePictureJSONSchema,
}

export default schemas
