
import { Header } from "@/components/layout/Header";
import "../globals.css"

export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Header/>
        <main className="p-8">
        {children}
        </main>
        </>
    )
}