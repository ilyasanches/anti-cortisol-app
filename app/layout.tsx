import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Анти-Кортизол • 21-дневный протокол",
  description: "Научный протокол снижения кортизола для женщин 35+",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  );
}