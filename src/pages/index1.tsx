import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import Web3 from 'web3';

export default function LoginPage() {
  const [web3, setWeb3] = useState<Web3>(null);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        console.log(window.ethereum)
        try {
          await window.ethereum.enable();
          setWeb3(web3);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('No web3 provider found');
      }
    };
    loadWeb3();
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const bal = await web3.eth.getBalance(accounts[0])
      console.log(web3.utils.fromWei(bal, 'ether'))
      console.log(bal)
      setAccount(web3.utils.fromWei(bal, 'ether'));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Failed to connect',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <Box height={"100vh"} maxW="lg" mx="auto" p="4">
      <Heading mb="4">Login</Heading>
      <FormControl id="account" isRequired>
        <FormLabel>Account</FormLabel>
        <Input type="text" value={account ?? ''} isReadOnly />
      </FormControl>
      {!web3 && (
        <Button colorScheme="blue" mt="4" isLoading={isLoading} disabled>
          Connect Wallet
        </Button>
      )}
      {web3 && !account && (
        <Button colorScheme="blue" mt="4" onClick={handleConnect} isLoading={isLoading}>
          Connect Wallet
        </Button>
      )}
      {web3 && account && (
        <Button colorScheme="blue" mt="4" onClick={handleLogin} isLoading={isLoading}>
          Login
        </Button>
      )}
      {web3 && account && (
        <Text color="gray.500" mt="4">
          Please sign in with your connected wallet to continue.
        </Text>
      )}
    </Box>
  );
}
