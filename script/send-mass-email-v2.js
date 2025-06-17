const sendgrid = require("@sendgrid/mail")
sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)

const massEmails = []
const fromEmail = "accelerate@voltura.com"
const fromEmailName = "PA Web3 Accelerator"
const templateId = "d-4e776ee4dc9942b38184e75b63b5f7dd"

async function sendEmails(emails) {
  const uniqueEmails = Array.from(new Set(emails))
  console.log(`No of unique emails ${uniqueEmails.length}`)
  const message = {
    from: {
      email: fromEmail,
      name: fromEmailName,
    },
    templateId,
    to: uniqueEmails,
    asm: {
      groupId: 32189,
    },
    personalizations: uniqueEmails.map((email) => ({
      to: email,
      dynamicTemplateData: {
        email,
      },
    })),
  }
  await sendgrid.sendMultiple(message)
  console.log(`Successfully sent everything.`)
}

async function run() {
  try {
    await sendEmails(massEmails.map((email) => email.toLowerCase().trim()))
  } catch (error) {
    console.error(error)
    console.error(error?.response?.body?.errors)
  }
}

run()
