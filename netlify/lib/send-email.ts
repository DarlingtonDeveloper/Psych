import sendgrid, { MailDataRequired } from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SEND_GRID_API_KEY as string)
export interface SendGridMessageOptions {
  to: string
  from: string
  subject: string
  templateId: string
  data: Record<string, string>
}

const sendEmail = async ({
  from,
  to,
  subject,
  templateId,
  data,
}: SendGridMessageOptions): Promise<void> => {
  const message: MailDataRequired = {
    from,
    templateId,
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
        dynamicTemplateData: {
          subject: subject,
          ...data,
        },
      },
    ],
    asm: {
      groupId: 32189,
    },
  }
  await sendgrid.send(message)
}

export default sendEmail
