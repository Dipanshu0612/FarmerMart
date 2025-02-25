import "../globals.css";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Providers from "@/components/ProgressBar";
import SellerSidebar from "@/components/SellerSidebar";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Seller Dashboard | FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();
    if (user?.unsafeMetadata.role !== "seller") {
      redirect("/");
    }
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
            <div className="flex justify-center flex-1 text-center">
              <SellerSidebar />
              <div className="w-5/6 !flex-grow flex items-center justify-center flex-col space-y-20 p-10 !h-full">
                {children}
              </div>
            </div>
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
