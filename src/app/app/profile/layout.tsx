import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { UploadProvider } from "@/context/UploadContext";
import { ProfileDescriptionProvider } from "@/context/ProfileDescriptionContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile",
  description: "Customize your profile and set up different settings here.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-4 sm:m-6 md:m-8">
      <Toaster richColors />
      <UploadProvider>
        <ProfileDescriptionProvider>{children}</ProfileDescriptionProvider>
      </UploadProvider>
    </main>
  );
}
