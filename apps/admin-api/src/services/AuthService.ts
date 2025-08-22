import User from "#models/User"
import Token from "#models/Token"
import {
  type LoginData,
} from "#schemas/auth"

export default class AuthService {
  /**
   * Authenticates a user with provided credentials and returns user data along with an auth token.
   * 
   * @param credentials - Login credentials (email and password).
   * @returns - The authenticated user data along with the generated auth token.
   * @throws 401 error if user is not found or credentials are invalid.
   * @throws If token generation fails.
   */
  static async login(credentials: LoginData) {
    const user = await User.authenticate(credentials)

    // throw validation error if user is not found
    if (!user) {
      throw {
        status: 401,
        message: "Invalid email or password",
      }
    }

    // Token
    const authToken = await Token.addToken(user.toObject()._id)
    if (!authToken) throw {}

    return {
      ...user.toObject(),
      ...authToken.toObject(),
    }
  }
}
