import "./globals.css";
import { Poppins } from "next/font/google";
// import { ClientToaster } from "@/components/Toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.className} min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        {children}
        {/* <ClientToaster /> */}
      </body>
    </html>
  );
}
