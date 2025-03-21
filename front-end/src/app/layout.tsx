import type { Metadata } from "next";
import { Geist, Geist_Mono, Inconsolata } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between items-center bg-blue-200 h-screen`}
      >
        <header className="h-12 z-20 bg-blue-500 w-full"></header>
        <main className="bg-blue-200 w-full h-screen py-12 flex justify-center items-center fixed z-10">{children}</main>
        <footer className="h-12 z-20 bg-blue-500 w-full"></footer>
      </body>
    </html>
  );
}
