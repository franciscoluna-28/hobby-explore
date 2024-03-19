import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hobby Explore",
  description: "Welcome to Hobby Explore! Find new hobbies and share your existing ones to new people by being yourself.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ErrorBoundary>
          <ReactQueryProvider>
            <Providers>{children}</Providers>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
