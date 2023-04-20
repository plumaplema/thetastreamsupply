import React, { useState, useCallback, useEffect } from "react";
import { Main } from "../Main";
import Navbar from "../Navbar";
import { useAccount, useNetwork } from "wagmi";
import ErrorNetwork from "../ErrorNetwork";
import { signOut, useSession } from "next-auth/react";
import Register from "./Register";
import SignOut from "../SignOut";


export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Main>
            <Navbar />
            <Register>
                {children}
            </Register>
        </Main>

    )
}