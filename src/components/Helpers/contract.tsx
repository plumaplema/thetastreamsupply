

export const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_tenderName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_vidId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_shortDescription",
                "type": "string"
            }
        ],
        "name": "AddedTender",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "Registered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_tenderName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_vidId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_shortDescription",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_days",
                "type": "uint256"
            }
        ],
        "name": "addTender",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tenderIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_awardedTo",
                "type": "address"
            }
        ],
        "name": "awardTender",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "video_id",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "tenderOwner",
                "type": "address"
            }
        ],
        "name": "bidTender",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTenders",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_tenderName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_vidId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_shortDescription",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_expiration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "awardTo",
                        "type": "address"
                    },
                    {
                        "internalType": "address[]",
                        "name": "addr",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ThetaStreamSupply.Tender[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tenderIndex",
                "type": "uint256"
            }
        ],
        "name": "getBids",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "video_id",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "like",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dislike",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "voters",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ThetaStreamSupply.Bid[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tenderIndex",
                "type": "uint256"
            }
        ],
        "name": "getBidsAccount",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "video_id",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "like",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dislike",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "voters",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ThetaStreamSupply.Bid",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getaccountTenders",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_tenderName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_vidId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_shortDescription",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_expiration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "awardTo",
                        "type": "address"
                    },
                    {
                        "internalType": "address[]",
                        "name": "addr",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ThetaStreamSupply.Tender[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "sentiment",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "tenderId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "bidIndex",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "bidderAddress",
                "type": "address"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const contract_address: string = '0x7f1e23f2893932663c09af9f890b10c7b0649711'