import React, { useEffect, useRef } from 'react'
import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Lottie from './Lottie'
import data from '../assets/noconnection.json'
import { useSwitchNetwork } from 'wagmi'
import lottie from 'lottie-web';
import { CloseIcon } from '@chakra-ui/icons'

type Props = {}

function ErrorNetwork({ }: Props) {

    const { switchNetwork } = useSwitchNetwork()

    return (
        <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} h={'100vh'}>
            <Error />
            <Button onClick={() => {
                console.log(switchNetwork(365))
                switchNetwork(365)
            }} mt={5} colorScheme="pink" padding={5} size="lg">Switch Network</Button>
        </Flex>
    )
}

export default ErrorNetwork

function Error() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center">
                    <CloseIcon boxSize={'20px'} color={'white'} />
                </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Wrong Network
            </Heading>
            <Text color={'white'}>
                You are using a wrong network, switch to Theta Testnet
            </Text>
        </Box>
    );
}