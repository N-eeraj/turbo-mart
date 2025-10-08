import sendMail from "@app/mailer"

export default class SendMail {
  static async execute(..._args: Array<unknown>) {
    await sendMail({
      recipients: [{ email: "test@email.com" }],
      category: "Test",
      subject: "Test Email",
      body: {
        type: "text",
        content: "Hello World"
      }
    })
    process.exit(0)
  }
}
