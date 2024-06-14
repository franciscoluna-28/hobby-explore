import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hobby Explore",
  metadataBase: new URL("https://hobby-explore.vercel.app/"),
  description:
    "Welcome to Hobby Explore! Discover new hobbies and connect with others by sharing your existing interests. Be yourself and explore the world of hobbies!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cn(inter.className)} `}>
        <ErrorBoundary>
          <Providers>
          {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
