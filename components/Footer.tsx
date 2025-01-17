import Link from 'next/link';
import React from 'react'
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <div className="flex justify-around items-center w-100 p-5 shadow-inner h-[6rem] border">
        <div className="flex cursor-pointer">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={300}
              height={1}
              className="self-start block right-1 "
            />
          </Link>
        </div>
        <div>
          Made with <span className="">💙</span> by{" "}
          <Link
            href="https://dipanshu-06-portfolio.netlify.app/"
            className="font-bold tracking-wider hover:italic hover:text-blue-700 transition-all duration-200 ease-in-out"
          >
            Dipanshu
          </Link>
        </div>
        <div className="flex justify-around items-center text-4xl mt-3 space-x-3 ">
          <Link
            href="https://www.linkedin.com/in/dipanshu-mishra-696a0622a"
            className="footersocial"
          >
            <FaLinkedin />
          </Link>
          <Link href="https://github.com/Dipanshu0612" className="footersocial">
            <FaGithubSquare />
          </Link>
          <Link
            href="https://api.whatsapp.com/send?phone=918485974624&text=Hello, more information!"
            className="footersocial"
          >
            <FaSquareWhatsapp />
          </Link>
          <Link
            href="https://www.instagram.com/_.dipanshu._06/"
            className="footersocial"
          >
            <FaInstagramSquare />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer