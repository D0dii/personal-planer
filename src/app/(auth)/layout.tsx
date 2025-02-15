import "@/app/globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen items-center justify-center bg-black text-white">
        <main className="w-full max-w-md">{children}</main>
      </body>
    </html>
  );
}
