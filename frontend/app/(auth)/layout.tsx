"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import { ToasterProvider } from "@/components/providers/toester-provider";
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
      <head>
        <title>Bloody</title>
        <meta name="description" content="Welcome to Bloody | auth pages" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {children}
          <ToasterProvider />
        </Provider>
      </body>
    </html>
  );
}
