import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Session } from "next-auth"
import { Layout } from '../components/Layout/Layout'
import { SessionProvider } from "next-auth/react"
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import React from 'react'
import { avalanche } from '../components/Helpers/CustomChain'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const { chains, provider } = configureChains(
  [avalanche],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
})

export default function App({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <ChakraProvider>
      <React.StrictMode>
        <WagmiConfig client={client}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </WagmiConfig>
      </React.StrictMode>
    </ChakraProvider>)
}