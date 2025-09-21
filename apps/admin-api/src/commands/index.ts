import Setup from "#commands/Setup"
import Temporary from "#commands/Temporary"
import SendMail from "#commands/SendMail"

const command = process.argv[2]
const args = process.argv.slice(3)

switch (command) {
  case "setup":
    Setup.execute(args)
    break
  case "temporary":
    Temporary.execute(args)
    break
  case "sendMail":
    SendMail.execute(args)
    break
  default:
    console.error(`Invalid Command: ${command}`)
}
