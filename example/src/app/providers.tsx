"use client";

import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    WagmiProvider,
    cookieStorage,
    cookieToInitialState,
    createStorage,
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [arbitrumSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
    storage: createStorage({
        storage: cookieStorage,
    }),
});

const queryClient = new QueryClient();

export function Providers({
    children,
    cookie,
}: {
    cookie: string;
    children: React.ReactNode;
}) {
    const initialState = cookieToInitialState(config, cookie);

    return (
        <WagmiProvider
            config={config}
            {...(initialState ? { initialState } : {})}
        >
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
