import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

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
      <body className={`flex flex-col antialiased md:flex-row`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="w-full bg-gray-300 px-5 dark:bg-black md:m-8 md:ml-0 md:px-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
