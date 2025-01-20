import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-[50%] h-full">
          <Image src="/home.svg" alt="Home" width={800} height={500} />
        </div>
        <div className="flex items-center justify-center w-[50%] h-full">
          <SignUp signInUrl="http://localhost:3000/sign-in" />;
        </div>
      </div>
    </>
  );
}
