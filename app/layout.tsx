import type { Metadata } from "next";

import { TransitionProvider } from "@/components/transition-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "SigilLab",
  description:
    "Generate an emotional signal reading from your birth date and present intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
