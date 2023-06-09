import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react"
import { Stack } from "@chakra-ui/react"

function Siwe() {
    const { signMessageAsync } = useSignMessage()

    const { chain } = useNetwork()
    const { address, isConnected } = useAccount()

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { data: session, status } = useSession()

    const handleLogin = async () => {
        try {
            const callbackUrl = "/protected"
            console.log(callbackUrl)
            const message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId: chain?.id,
                nonce: await getCsrfToken(),
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })
            console.log(signature, '1')
            const res = await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature,
                callbackUrl,
            })
            console.log(res)
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        console.log(isConnected);
        if (isConnected && !session) {
            handleLogin()
        }
    }, [isConnected])

    return (
        <Stack
            spacing={4}
            p={4}
            color="white"
            textAlign="center"
            alignItems="center"
        >
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if (!isConnected) {
                        connect()
                    } else {
                        handleLogin()
                    }
                }}
            >
                Sign-in
            </button>
        </Stack>
    )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

export default Siwe