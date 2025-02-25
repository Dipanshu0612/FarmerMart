import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign up to D's FarmerMart",
  description: "Sign up to shop products on FarmerMart.",
};


export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-[50%] h-full">
          <Image src="/home.svg" alt="Home" width={800} height={500} />
        </div>
        <div className="flex items-center justify-center w-[50%] h-full">
          <SignUp signInUrl={`${process.env.VERCEL_APP_URL}/sign-in`}
          />;
        </div>
      </div>
    </>
  );
}
