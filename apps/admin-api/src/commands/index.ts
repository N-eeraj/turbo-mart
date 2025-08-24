import Setup from "#commands/Setup"
import Temporary from "#commands/Temporary"

const command = process.argv[2]
const args = process.argv.slice(3)

switch (command) {
  case "setup":
    Setup.execute(args)
    break
  case "temporary":
    Temporary.execute(args)
    break
  default:
    console.error(`Invalid Command: ${command}`)
}
