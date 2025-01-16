import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="flex justify-around items-center w-100 p-5 shadow-inner mt-5 h-[6rem] border">
        <div className="flex cursor-pointer">FarmerMart</div>
        <div>
          Made with <span className="">❤️</span> by{" "}
          <Link
            href="https://www.linkedin.com/in/dipanshu-mishra-696a0622a/"
            className="italic"
          >
            Dipanshu
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-5">
          <Link href="">LinkedIn</Link>
          <Link href="">GitHub</Link>
          <Link href="">WhatsApp </Link>
          <Link href="">Instagram</Link>
        </div>
      </div>
    </>
  );
}

export default Footer