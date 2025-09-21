import sendMail from "@app/mailer"

export default class SendMail {
  static async execute(..._args: Array<unknown>) {
    await sendMail({
      recipients: [{ email: "test@email.com" }],
      category: "Test",
      subject: "Test Email",
      text: "This is a test email",
    })
    process.exit(0)
  }
}
