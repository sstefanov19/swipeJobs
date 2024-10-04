import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/toaster";
import QueryProvider from "~/components/QueryProvider";
export const metadata: Metadata = {
  title: "SwipeHire",
  description: "SwipeHire is a job board for developers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
    <Toaster />
      <body className="bg-slate-200 overflow-x-hidden">
        <QueryProvider>
        <ClerkProvider>
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
