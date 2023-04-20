import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import logo from '../assets/logo1.png'
import { useAccount, useBalance } from 'wagmi';
import ListTenderModal from '../components/ListTenderModal';


export default function SocialProfileWithImage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { address } = useAccount()
    const { data } = useBalance({ addressOrName: address, formatUnits: 'ether' })
    return (
        <Center py={6}>
            <HStack spacing={3} width={'90%'} >
                <ListTenderModal isOpen={isOpen} onClose={onClose} />
                <Box
                    minW={'20%'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Image
                        h={'120px'}
                        w={'full'}
                        src={
                            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                        }
                        objectFit={'cover'}
                    />
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'xl'}
                            src={
                                logo.src
                            }
                            css={{
                                border: '2px solid white',
                                bg: 'white'
                            }}
                        />
                    </Flex>

                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                John Doe
                            </Heading>
                            <Text color={'gray.500'}>{address ? address : 'None'}</Text>
                        </Stack>

                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>23k</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Tender Listed
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{data ? data.formatted : 'loading..'}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Balance
                                </Text>
                            </Stack>
                        </Stack>

                        <Button
                            w={'full'}
                            mt={8}
                            bg={useColorModeValue('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            onClick={onOpen}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            List a Tender
                        </Button>
                    </Box>
                </Box>
            </HStack>

        </Center>
    );
}