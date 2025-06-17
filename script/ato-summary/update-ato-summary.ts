import dotenv from "dotenv"
dotenv.config()
import Papa from "papaparse"
import fs from "fs"
import path from "path"
import axios from "axios"

import { getAllUsers, User } from "../../netlify/utils/get-user"
import { updateATOSummary } from "../../netlify/utils/ato"

type ndQuestionnaireType = {
  walletAddress: string
  id: number
  userId: number
  userIsOriginalMinter: string | null
  userIsAUSTaxResOrigMintingPeriod: string | null
  userLocAUSOrigMintingPeriod: string | null
  userRegAUSGSTOrigMintingPeriod: string | null
  userIsAUSTaxResident: string | null
  userInAUS: string | null
  userRegisteredAUSGST: string | null
  walletAddresses: string
  declareTruth: boolean
}

const API_RETRIES = 3
let ogMinters: Set<string>
let paUsers: User[]
let newdawnUsers: ndQuestionnaireType[]
let ogMintersDidNotAnswer: Set<string>
let ogMintersAnswered: Set<string>
let paUsersAustralians: string[] = []
let ndUsersAustralians: string[] = []
let ogMintersAnsweredAus: Set<string>
let ogMintersAnsweredIntl: Set<string>

function getOGMinters(): Set<string> {
  const minterWallets = Papa.parse<{ walletAddress: string }>(
    fs.readFileSync(path.join(__dirname, "og_minters.csv"), "utf8"),
    {
      header: true,
    }
  ).data

  const minters = new Set(
    minterWallets.map((mw) => mw.walletAddress.toLowerCase())
  )
  return minters
}

async function getNDUsers(): Promise<ndQuestionnaireType[]> {
  let res: ndQuestionnaireType[] = []

  async function getNDUsersFromND() {
    const response = await axios.get(
      process.env.NEWDAWN_GET_GST_USER_API_ENDPOINT as string
    )
    return response.data
  }

  await getNDUsersFromND()
    .then((result) => {
      res = result.gstUsers
    })
    .catch((error) => {
      console.error("Error executing query:", error)
      throw error
    })
  return res
}

async function prepSourceData() {
  ogMinters = getOGMinters()
  ogMintersDidNotAnswer = new Set(Array.from(ogMinters))
  ogMintersAnswered = new Set(Array.from(ogMinters))

  let retries = 0
  while (retries < API_RETRIES) {
    if (retries > 0) {
      console.log(`\nRetrying prepSourceData ${retries + 1}/${API_RETRIES}`)
    }
    try {
      console.log(`getAllUsers ${Date.now()} `)
      paUsers = await getAllUsers()
      console.log("No of paUsers: ", paUsers.length)
      console.log(`getNDUsers ${Date.now()} `)
      newdawnUsers = await getNDUsers()
      console.log("No of newdawnUsers: ", newdawnUsers.length)

      break
    } catch (error) {
      console.log(error)
      retries += 1
    }
  }
}

function filterAnswered() {
  ogMintersDidNotAnswer.forEach((ogd) => {
    ogMintersAnswered.delete(ogd)
  })
  ogMintersAnsweredAus = new Set(Array.from(ogMintersAnswered))
  ogMintersAnsweredIntl = new Set(Array.from(ogMintersAnswered))
}

function filterDidNotAnswer() {
  // filter out all wallet addresses that answered gst
  paUsers.forEach((pa) => {
    const curWallet = pa.walletAddress.toLowerCase()
    if (pa.questionnaire) {
      ogMintersDidNotAnswer.delete(curWallet)

      const otherWalletAddresses = pa.questionnaire.walletAddresses.split(",")
      otherWalletAddresses.forEach((ow: string) => {
        ogMintersDidNotAnswer.delete(ow.toLowerCase())
      })
    }
  })

  // we are sure these are all people who answered the questionnaire
  newdawnUsers.forEach((nu) => {
    const curWallet = nu.walletAddress.toLowerCase()
    ogMintersDidNotAnswer.delete(curWallet)

    if (nu.walletAddresses) {
      const otherWalletAddresses = nu.walletAddresses.split(",")
      otherWalletAddresses.forEach((ow: string) => {
        ogMintersDidNotAnswer.delete(ow.toLowerCase())
      })
    }
  })
  console.log(
    "filterDidNotAnswer: ogMintersDidNotAnswer: ",
    ogMintersDidNotAnswer.size
  )
}

function getAustralianPAUsers() {
  // get a list of walletAddresses from pa_users where q1 || q2 || q3
  paUsers.forEach((pa) => {
    const curWallet = pa.walletAddress.toLowerCase()
    if (pa.questionnaire) {
      if (
        pa.questionnaire.userIsAUSTaxResOrigMintingPeriod === "yes" ||
        pa.questionnaire.userLocAUSOrigMintingPeriod === "yes" ||
        pa.questionnaire.userRegAUSGSTOrigMintingPeriod === "yes"
      ) {
        paUsersAustralians.push(curWallet)
        const otherWalletAddresses = pa.questionnaire.walletAddresses.split(",")
        otherWalletAddresses.forEach((ow: string) => {
          paUsersAustralians.push(ow.toLowerCase())
        })
      }
    }
  })
}

function getAustralianNDUsers() {
  // get a list of walletAddresses from nd where q1 || q2 || q3
  newdawnUsers.forEach((nu) => {
    const curWallet = nu.walletAddress.toLowerCase()
    if (
      nu.userIsAUSTaxResOrigMintingPeriod === "yes" ||
      nu.userLocAUSOrigMintingPeriod === "yes" ||
      nu.userRegAUSGSTOrigMintingPeriod === "yes"
    ) {
      ndUsersAustralians.push(curWallet)

      const otherWalletAddresses = nu.walletAddresses.split(",")
      otherWalletAddresses.forEach((ow: string) => {
        ndUsersAustralians.push(ow.toLowerCase())
      })
    }
  })
}

function filterAnsweredByAusOrIntl() {
  // remove paAUS from international
  paUsersAustralians.forEach((paAUS) => {
    ogMintersAnsweredIntl.delete(paAUS)
  })

  // remove ndAUS from international
  ndUsersAustralians.forEach((ndAUS) => {
    ogMintersAnsweredIntl.delete(ndAUS)
  })

  // remove internationals from ogMintersAnsweredAUS
  ogMintersAnsweredIntl.forEach((intl) => {
    ogMintersAnsweredAus.delete(intl)
  })
}

async function run() {
  try {
    await prepSourceData()
    filterDidNotAnswer()
    filterAnswered()
    getAustralianPAUsers()
    getAustralianNDUsers()
    console.log("No of pa aus :", paUsersAustralians.length)
    console.log("No of nd aus :", ndUsersAustralians.length)
    filterAnsweredByAusOrIntl()
    console.log("No of minters :", ogMinters.size)
    console.log("No of minters who didn't answer:", ogMintersDidNotAnswer.size)
    console.log("No of minters who answered:", ogMintersAnswered.size)
    console.log("No of minters who answered AUS:", ogMintersAnsweredAus.size)
    console.log("No of minters who answered INTL:", ogMintersAnsweredIntl.size)

    console.log("No of minters who didn't answer:", ogMintersDidNotAnswer)
    console.log("No of minters who answered:", ogMintersAnswered)
    console.log("No of minters who answered AUS:", ogMintersAnsweredAus)
    console.log("No of minters who answered INTL:", ogMintersAnsweredIntl)

    await updateATOSummary(
      ogMinters.size,
      ogMintersAnsweredAus.size,
      ogMintersAnsweredIntl.size,
      ogMintersDidNotAnswer.size
    )
  } catch (error) {
    console.log(error)
  }
}

run()
