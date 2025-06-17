const sendgrid = require("@sendgrid/mail")
const csvtojson = require("csvtojson")
const path = require("path")

const emailTemplateJson = require("../netlify/lib/emailTemplates.json")

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendChallenge(emails) {
  const message = {
    from: {
      email: "rsvp@psychedelicsanonymous.com",
      name: "Psychedelics Anonymous - IRL Claim",
    },
    templateId: emailTemplateJson.PA_WEB3_ACCELERATOR_CONFIRMATION,
    to: emails,
    asm: {
      groupId: 32189,
    },
    personalizations: emails.map((email) => ({
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
    const registrants = await csvtojson().fromFile(
      path.join(process.cwd(), "script_out/fake.csv")
    )

    await sendChallenge(registrants.map((r) => r.emailAddress))
  } catch (error) {
    console.error(error)
  }
}

run()
