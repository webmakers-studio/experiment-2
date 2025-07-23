import { Montserrat } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} font-sans antialiased mx-auto max-w-4xl p-2`}
      >
        <Header />
        <main className="py-4">{children}</main>
        <Footer />
        {/* Ensure to include any necessary scripts or components here */}
      </body>
    </html>
  );
}
