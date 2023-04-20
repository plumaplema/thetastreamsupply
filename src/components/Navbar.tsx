import {
    Box,
    Flex,
    Text,
    IconButton,
    Image,
    Stack,
    Collapse,
    Icon,
    Link as ChakraLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import logo from "../assets/logo.png"; // import your logo image
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { data: session, status } = useSession()

    return (
        <Box>
            <Flex
                color='#1B1D1E'
                bgColor={'whiteAlpha.600'}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={2}
                borderStyle={'solid'}
                borderColor={"black"}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    width={'100%'}
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                    alignItems={'center'}
                >
                    <Image
                        display={['none', 'flex']} src={logo.src} alt="ThetaStream Supply logo" h={50} />
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        display={['none', 'flex']}
                        fontFamily={'heading'}
                        fontWeight={'bold'}
                        color='whiteAlpha.800'
                    >
                        ThetaStream Supply
                    </Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                    <Flex position={'absolute'} display={status === 'unauthenticated' ? 'none' : "flex"} right={3} justifySelf="flex-end">

                        <Button bgColor={"red.600"}
                            color={"white"}
                            px={{ base: 4, md: 8 }}
                            py={{ base: 2, md: 4 }}
                            borderRadius="md"
                            fontWeight="bold"
                            onClick={() => signOut()}
                            fontSize={{ base: "sm", md: "md" }}
                            _hover={{
                                scale: 1.5
                            }}
                        >
                            Sign Out
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const { data: session, status } = useSession()
    const { isConnected } = useAccount()

    return (
        <Stack direction={'row'} spacing={4}>
            {(status === 'authenticated' && isConnected) && NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link href={navItem.href}>
                                <Text
                                    p={1}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                    color='#1B1D1E'
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Text>
                            </Link>
                        </PopoverTrigger>
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack bg='#FFF' p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={ChakraLink}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color='#DBC2CF'>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <ChakraLink key={child.label} py={2} href={child.href}>
                                {child.label}
                            </ChakraLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Buy',
        href: '/buy'
    },
    {
        label: 'Supply',
        href: '/contact'
    },
    {
        label: 'Dashboard',
        href: '/dashboard'
    }
];