import React, { useEffect } from "react";
import { useAccount, useContractRead } from 'wagmi'
import { contract_address, abi } from '../Helpers/contract'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
    children: React.ReactNode;
};

export default function Register({ children }: Props) {
    const router = useRouter()
    // Smart Contract Integration
    const { data, isLoading, fetchStatus, isFetched } = useContractRead({
        addressOrName: contract_address,
        contractInterface: abi,
        functionName: "getAllTenders"
    });

    const { isConnected } = useAccount()
    const { status } = useSession()

    useEffect(() => {
        if (data && status == 'authenticated') {
            console.log(data, isConnected)
            router.push('/registration')
        }
    }, [data])

    // Render Registration Form
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
