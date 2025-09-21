import {
  MailtrapClient,
} from "mailtrap"

import env from "@app/load-env"

interface EmailOptions {
  recipients: Array<{ email: string }>
  category: string
  subject: string
  body: {
    type: "html" | "text"
    content: string
  }
}

const client = new MailtrapClient({
  token: env.MAIL_TRAP_TOKEN,
})

const sender = {
  email: env.EMAIL_SENDER_EMAIL,
  name: env.EMAIL_SENDER_NAME,
}

async function sendMail({ recipients, subject, body, category }: EmailOptions) {
  await client
    .send({
      from: sender,
      to: recipients,
      subject,
      [body.type]: body.content,
      category,
    })
  console.log("Email send")
}

export default sendMail
