import { Heading, Text, Button, Stack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../assets/logo.png"; // import your logo image
import { useSession } from "next-auth/react"
import ModalLoginPage from "../components/ModalLogin";
import { useAccount } from "wagmi";

function App() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { data: session, status } = useSession()
    const { isDisconnected } = useAccount()

    return (
        <Stack
            spacing={4}
            h={'100vh'}
            p={4}
            color="white"
            textAlign="center"
            alignItems="center"
        >
            <ModalLoginPage isOpen={isOpen} onClose={onClose} />
            <Image src={logo.src} alt="ThetaStream Supply logo" h={150} />
            <Heading color={'blackAlpha.800'} as="h1" size="3xl">
                ThetaStream Supply
            </Heading>
            <Text fontSize="2xl" maxW="600px">
                Revolutionize the way procurement is done with ThetaStream Supply. Leverage the power of Theta Network's video streaming technology to promote transparency and democracy in the procurement process.
            </Text>
            <Button onClick={onOpen} colorScheme="pink" padding={5} size="lg"
                display={(status === "unauthenticated" || isDisconnected) ? 'flex' : 'none'}>
                Join ThetaStream Supply
            </Button>
        </Stack >
    );
}

export default App;
