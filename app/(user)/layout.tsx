import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Providers from "@/components/ProgressBar";

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
        <ClerkProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
