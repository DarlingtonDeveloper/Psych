const csvtojson = require("csvtojson")
const path = require("path")
const sendgrid = require("@sendgrid/mail")

sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)

async function sendEventDetails({ to, firstName, numOfSets }) {
  const message = {
    from: {
      email: "no-reply@psychedelicsanonymous.com",
      name: "Psychedelics Anonymous",
    },
    templateId: "d-a477a3797ab246aca4b8ffbb0005bc7e",
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
        dynamicTemplateData: {
          subject: "IRL Merch Claim Confirmation",
          firstName,
          numOfSets,
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
    const results = {}
    const registrants = await csvtojson().fromFile(
      path.join(process.cwd(), "script_out/irl-claims.csv")
    )

    for (let i = 0; i < registrants.length; i++) {
      const emailAddress = registrants[i].emailAddress.toLowerCase()
      if (results[emailAddress]) {
        results[emailAddress].numOfSets += 1
      } else {
        results[emailAddress] = {
          firstName: registrants[i].firstName.toUpperCase(),
          numOfSets: 1,
        }
      }
    }

    const emails = Object.keys(results)
    for (let i = 0; i < emails.length; i++) {
      await sendEventDetails({
        to: emails[i],
        firstName: results[emails[i]].firstName,
        numOfSets: results[emails[i]].numOfSets,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

run()
