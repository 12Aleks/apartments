import type {Metadata} from "next";
import {ReactNode} from "react";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/components/providers";
import Appbar from "@/app/components/Appbar";
import SignInPanel from "@/app/components/signInPanel";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Apartments",
    description: "Apartments for you",
    generator: "Next.js",
    manifest: "/favicon/manifest.json",
    keywords: ["Apartments", "sale apartments", "rent"],
    authors: [
        {
            name: "leszek koba",
            url: "https://www.linkedin.com/in/leszek-koba-78130b140/",
        },
    ],
    icons: [
        { rel: "apple-touch-icon", url: "/favicon/apple-icon-120x120.png" },
        { rel: "icon", url: "/favicon/apple-icon-120x120.png" },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <Appbar>
                <SignInPanel/>
            </Appbar>
            {children}
            <ToastContainer/>
        </Providers>
        </body>
        </html>
    );
}
