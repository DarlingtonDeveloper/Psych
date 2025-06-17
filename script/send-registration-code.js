const sendgrid = require("@sendgrid/mail")
const csvtojson = require("csvtojson")
const path = require("path")

const emailTemplateJson = require("../netlify/lib/emailTemplates.json")

sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)

async function sendEventDetails({ to, code }) {
  const message = {
    from: {
      email: "rsvp@psychedelicsanonymous.com",
      name: "Psychedelics Anonymous",
    },
    templateId: emailTemplateJson.PA_REGISTRATION_EVENT_DETAILS,
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
        dynamicTemplateData: {
          code,
        },
      },
    ],
    asm: {
      groupId: 32189,
    },
  }
  await sendgrid.send(message)
  console.log(`Successfully sent to ${to}.`)
}

async function run() {
  try {
    const registrants = await csvtojson().fromFile(
      path.join(process.cwd(), "script_out/fake.csv")
    )

    for (let i = 0; i < registrants.length; i++) {
      await sendEventDetails({
        to: registrants[i].emailAddress,
        code: registrants[i].code,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

run()
