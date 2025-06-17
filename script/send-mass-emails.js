const sendgrid = require("@sendgrid/mail")
sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)

const massEmails = []

async function sendEmails(emails) {
  const uniqueEmails = Array.from(new Set(emails))
  console.log(`No of unique emails ${uniqueEmails.length}`)
  const message = {
    from: {
      email: "accelerate@voltura.com",
      name: "PA Web3 Accelerator",
    },
    templateId: "d-19100d0a172f45b28a8143a3b042eafc",
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
