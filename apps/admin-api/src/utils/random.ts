const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const NUMBERS = "0123456789"
const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

interface RandomStringOptions {
  uppercase?: boolean
  lowercase?: boolean
  numbers?: boolean
  specialChars?: boolean
}

type AllChars = `${typeof UPPERCASE | ''}${typeof LOWERCASE | ''}${typeof NUMBERS | ''}${typeof SPECIAL_CHARS | ''}`

export function generateRandomString(
  length: number,
  {
    uppercase = true,
    lowercase = true,
    numbers = true,
    specialChars = true,
  }: RandomStringOptions = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialChars: true,
  }
): string {
  let chars: AllChars = ""
  if (uppercase) {
    chars += UPPERCASE
  }
  if (lowercase) {
    chars += LOWERCASE
  }
  if (numbers) {
    chars += NUMBERS
  }
  if (specialChars) {
    chars += SPECIAL_CHARS
  }

  const charsLength = chars.length
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)

  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % charsLength]
  }
  return result
}
