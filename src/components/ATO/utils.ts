import stitches from "../../stitches"

export const getATOWalletUIFromData = (val: { id: string; value: number }) => {
  switch (val.id) {
    case "australian":
      return {
        cardColor: "green" as const,
        label: "Australian Mint Wallets",
        value: val.value,
        title: "Australian",
        chartColor: stitches.theme.colors.paGreenV2.value,
      }

    case "international":
      return {
        cardColor: "sage" as const,
        label: "International Mint Wallets",
        value: val.value,
        title: "International",
        chartColor: stitches.theme.colors.paSage.value,
      }

    case "awaiting":
      return {
        cardColor: "black" as const,
        label: "Awaiting Response",
        value: val.value,
        title: "Awaiting",
        chartColor: stitches.theme.colors.paLupine.value,
      }
  }
}
