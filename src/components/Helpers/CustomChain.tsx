import { Chain } from "wagmi";

export const avalanche: Chain = {
    id: 365,
    name: 'Theta',
    network: 'theta',
    nativeCurrency: {
        decimals: 18,
        name: 'TFUEL',
        symbol: 'TFUEL',
    },
    rpcUrls: {
        public: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
        default: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
    },
    blockExplorers: {
        etherscan: { name: 'ThetaTesnet', url: ' https://testnet-explorer.thetatoken.org/' },
        default: { name: 'ThetaTesnet', url: ' https://testnet-explorer.thetatoken.org/' },
    },
}