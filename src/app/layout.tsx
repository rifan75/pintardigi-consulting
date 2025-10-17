// "use client"
import React from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import Providers from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function RootLayout({ children }: { children: React.ReactElement }) {

  return (
    <html>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
