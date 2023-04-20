import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';

interface Props {
    name: string
    description: string,
    techstack: Array<string>
    link: string
    image: StaticImageData
}

export default function ProjectCards({ description, link, name, techstack, image }: Props) {
    return (
        <Center py={2}>
            <Stack
                borderWidth="1px"
                bg="rgba( 55, 46, 46, 0.85 )"
                boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                borderColor={'whiteAlpha.800'}
                opacity={0.95}
                borderRadius="lg"
                w={{ sm: '100%', md: '540px' }}
                height={{ sm: '476px', md: '20rem' }}
                direction={['column', 'column', 'column', 'row']}
                padding={4}>
                <Flex borderWidth={1} borderColor={'white'} flex={1} bg="blue.200">
                    <Image
                        src={image}
                        alt="None"
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Heading textAlign={'center'} fontSize={'2xl'} fontFamily={'body'} color={'whiteAlpha.900'}>
                        {name}
                    </Heading>
                    <Text
                        textAlign={'center'}
                        as={'em'}
                        fontSize={12}
                        color={'whiteAlpha.700'}
                        px={3}>
                        {description}
                    </Text>
                    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                        {techstack.map((value, key) => (<Badge
                            key={key}
                            px={2}
                            colorScheme={'red'}
                            py={1}
                            bg={'white'}

                            fontSize={'8px'}
                            fontWeight={'bold'}>
                            {value}
                        </Badge>))}
                    </Stack>
                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}