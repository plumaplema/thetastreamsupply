import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Footer() {
  return (
    <Box
      position={'fixed'}
      bgColor={"rgba(255, 255, 255, 0)"}
      bottom={0}
      w="100%"
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text color={'whiteAlpha.700'} fontSize={'xs'}>© 2023 Gilbert Loyogoy</Text>
      </Container>
    </Box>
  );
}