import { ConnectButton } from "@rainbow-me/rainbowkit";
import { headers } from "next/headers";
import { Providers } from "./providers";
import Main from "./components/Main";

export default function Home() {
    return (
        <Providers cookie={headers().get("cookie") ?? ""}>
            <ConnectButton />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Main />
            </main>
        </Providers>
    );
}
