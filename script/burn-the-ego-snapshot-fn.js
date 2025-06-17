const axios = require("axios")

const callFn = async (contractName) => {
  console.log(`Calling ${contractName}`)
  await axios.post(
    "https://deploy-preview-43--psychedelicsanonymous.netlify.app/.netlify/functions/save-burn-the-ego-snapshot",
    {
      contractName,
    }
  )
}

const run = async () => {
  try {
    await callFn("irlPass")
    await callFn("metaPass")
    await callFn("papp")
    await callFn("psilocybin")
    await callFn("c1")
    await callFn("c2")
    await callFn("c3")
  } catch (err) {
    console.log(err?.message)
  }
}

run()
