import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "D's FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
        <div
          className={`${poppins.className} min-h-screen flex flex-col items-center justify-center`}
        >
          {children}
        </div>
  );
}
