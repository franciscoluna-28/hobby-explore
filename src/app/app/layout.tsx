import { Header } from "@/components/layout/Header";
import "../globals.css";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { MobileMenu } from "@/components/layout/MobileMenu";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
   
  
      <ErrorBoundary>
        <Toaster richColors />
        <Header />
        <MobileMenu />
        <main className="flex justify-center flex-col p-8 items-center relative mb-8 sm:my-0 max-w-[1200px]  m-auto">
          {children}
        </main>
      </ErrorBoundary>
  </>
  );
}
