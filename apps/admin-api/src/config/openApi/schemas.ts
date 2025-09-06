import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
} from "#schemas/user"

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
}

export default schemas
