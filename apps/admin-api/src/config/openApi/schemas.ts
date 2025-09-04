import {
  loginJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
} from "#schemas/user"

const schemas = {
  LoginSchema: loginJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
}

export default schemas
