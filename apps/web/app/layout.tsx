import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "AutoMate",
};

const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background`}>
        <main>{children}</main>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
