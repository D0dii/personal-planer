import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "@/app/globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Personal planer",
  description: "Application for planning your spendings and events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <SessionProvider>
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-[83vh] w-full bg-gray-300 px-5 dark:bg-black">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
