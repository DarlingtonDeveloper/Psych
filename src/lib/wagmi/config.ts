import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { configureChains, createConfig } from "wagmi"
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains"

export const PROJECT_ID = "a90b6f9b131a7098fab70d3f6c034b6f"
const chains = [arbitrum, mainnet, polygon, goerli]
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
])

export const createWagmiConfig = () => {
  const wagmiConfig = createConfig({
    autoConnect: false,
    connectors: w3mConnectors({
      projectId: "a90b6f9b131a7098fab70d3f6c034b6f",
      chains,
    }),
    publicClient,
  })

  return wagmiConfig
}

export const createEthClient = (wagmiConfig: any) => {
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  return ethereumClient
}
