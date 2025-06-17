import React, { useEffect } from "react"
import type { AppProps } from "next/app"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { sendPageViewEvent } from "../lib/ga"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "react-query"
import dynamic from "next/dynamic"
import stitches from "../stitches"
import OverrideVariantProvider from "../context/OverrideVariantProvider"
import ForestStateProvider from "../context/ForestProvider"
import GrowthBookProvider from "../context/GrowthBookProvider"
import ToastProvider from "../context/ToastProvider"
import GlobalConnectProvider from "../context/GlobalConnectProvider"
import { Web3Modal } from "@web3modal/react"
import { WagmiConfig } from "wagmi"
import {
  createWagmiConfig,
  createEthClient,
  PROJECT_ID,
} from "../lib/wagmi/config"

interface GlobalPageProps {
  hideFooter: boolean
  hideHeader: boolean
  version: number
}

const WalletProvider = dynamic(() => import("../context/WalletProvider"))

const queryClient = new QueryClient()

const Signature = stitches.styled("div", {
  display: "none",
})

function MyApp({ Component, pageProps }: AppProps<GlobalPageProps>) {
  const router = useRouter()
  const { hideFooter = false, hideHeader = false, version } = pageProps

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendPageViewEvent(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  const wagmiConfig = React.useMemo(() => createWagmiConfig(), [])
  const ethereumClient = React.useMemo(
    () => createEthClient(wagmiConfig),
    [wagmiConfig]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <GrowthBookProvider>
          <OverrideVariantProvider>
            <WalletProvider>
              <ForestStateProvider>
                <ToastProvider>
                  <GlobalConnectProvider>
                    {!hideHeader && <Header version={version} />}
                    <Component {...pageProps} />
                    {!hideFooter && <Footer version={version} />}
                  </GlobalConnectProvider>
                </ToastProvider>
              </ForestStateProvider>
            </WalletProvider>
          </OverrideVariantProvider>
        </GrowthBookProvider>
        <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
      </WagmiConfig>

      <Signature>
        Fran Saycon (@fransaycon) - I build, architect, and lead Web2 &amp; Web3
        apps. Founder &amp; Director @ http://reactjs.org.ph/. PA/EZU NFT Dev. I
        leave hidden signatures like these for the sites I started from the
        ground up. Do drop a follow! :D
      </Signature>
    </QueryClientProvider>
  )
}

export default MyApp
