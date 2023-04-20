import { Button, Flex, VStack, Image, Heading, Modal, ModalOverlay, ModalContent, useToast, ModalHeader, ModalCloseButton, ModalBody, Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import logo from '../assets/modallogo.png'
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useEffect } from "react";

export default function ModalLoginPage(modalData: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { isOpen, onClose } = modalData
    const { connect, connectors, error, isError } = useConnect();
    const { isConnected, address } = useAccount()
    const { signMessageAsync } = useSignMessage()
    const { chain } = useNetwork()
    const toast = useToast()

    useEffect(() => {
        if (isError) {
            toast({
                title: error.message,
                description: 'Check your metamask wallet for pending',
                status: 'error',
                duration: 3000
            })
        }
    }, [isError])

    const handleLogin = async () => {
        console.log('signature')
        try {
            const callbackUrl = "/dashboard"
            const message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: `Sign in with ${chain.name} to the app.`,
                uri: window.location.origin,
                version: "1",
                chainId: chain.id,
                nonce: await getCsrfToken(),
            })

            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })

            await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature,
                callbackUrl,
            })
        } catch (error) {
            console.log(error, 'error')
        }
    }

    return (
        <Modal size={'xl'} isOpen={isOpen} onClose={() => { onClose() }} isCentered>
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px' />
            <ModalContent border={'2px solid rgba( 255, 255, 255, 0.18 )'} backgroundColor={'gray'} padding={2} >
                <ModalHeader>
                    <VStack spacing={2}>
                        <Flex borderRadius={50} position={'absolute'} top={-14} backgroundColor={'gray'}>
                            <Image src={logo.src} alt="ThetaStream Supply logo" h={100} />
                        </Flex>
                        <Heading mt={15} color={'black'} as="h1" size="lg">
                            ThetaStream Supply
                        </Heading>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack mb={4} spacing={4} align="stretch" w="100%">
                        {
                            connectors.map((connector, index) => {
                                if (connector.ready) {
                                    return (
                                        <Button
                                            colorScheme="blue"
                                            size="lg"
                                            disabled={!connector.ready}
                                            key={connector.id}
                                            onClick={async () => {
                                                if (isConnected) {
                                                    await handleLogin()
                                                    onClose()
                                                } else {
                                                    connect({ connector })
                                                }
                                            }}
                                        >
                                            {isConnected ? 'Sign in ' : `Connect to ${connector.name}`}
                                        </Button>
                                    )
                                }
                                return (<Alert key={index} status='error'>
                                    <AlertIcon />
                                    <AlertTitle fontSize={'md'}>Metamask not found!</AlertTitle>
                                    <AlertDescription fontSize={'sm'}>Error connecting to metamask wallet.</AlertDescription>
                                </Alert>)
                            })
                        }{
                            isConnected && (<Alert status='success'>
                                <AlertIcon />
                                <AlertTitle fontSize={'md'}>Connected!</AlertTitle>
                                <AlertDescription fontSize={'sm'}>Sign the one time message</AlertDescription>
                            </Alert>)
                        }
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
