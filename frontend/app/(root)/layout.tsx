import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import favicon from "../facicon.svg";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloody",
  description: "Welcome to Bloody",
  icons: {
    icon: "/favicon.svg", // path is relative to /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
              <ModeToggle />
            </nav>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
