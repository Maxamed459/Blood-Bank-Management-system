"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "react-redux";
import store from "@/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <title>Bloody - Manage Blood Inventory with Confidence</title>
        <link rel="icon" href="/favicon.svg" />
      </header>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <header className="flex items-center justify-between px-6 py-4 border-b">
            <div className="">
              <Image
                src="/logo-white.png"
                alt="Logo"
                width={140}
                height={28}
                className="block dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="Logo Dark"
                width={140}
                height={28}
                className="hidden dark:block"
              />
            </div>
            <nav className="flex items-center gap-3">
              <Link
                className="text-sm text-muted-foreground hover:underline hidden md:inline-block"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm text-muted-foreground hover:underline hidden md:inline-block"
                href="/terms"
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-sm text-muted-foreground hover:underline"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="text-sm rounded-md px-3 py-1.5 bg-primary text-primary-foreground"
                href="/auth/signUp"
              >
                Sign Up
              </Link>
            </nav>
          </header>

          {children}
        </Provider>
      </body>
    </html>
  );
}
