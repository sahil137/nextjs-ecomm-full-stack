import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce App created using Nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <ReactQueryProvider>
          <body className={`${inter.className}`}>
            <Navbar />
            {children}
            <Toaster position="top-right" theme="dark" />
          </body>
        </ReactQueryProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
