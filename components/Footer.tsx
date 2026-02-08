import Link from "next/link";
import React from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="mt-auto flex flex-col md:flex-row justify-between md:justify-around items-center w-full p-4 md:p-5 shadow-inner min-h-[6rem] border-t gap-4 header">
        <div className="flex cursor-pointer">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={300}
              height={1}
              className="self-start block right-1 w-[170px] sm:w-[220px] md:w-[260px] h-auto"
            />
          </Link>
        </div>
        <div className="text-center md:text-left text-sm md:text-base">
          Made with <span className="">💙</span> by{" "}
          <Link
            href="https://dipanshu-06-portfolio.netlify.app/"
            className="font-bold tracking-wider hover:italic hover:text-blue-700 transition-all duration-200 ease-in-out"
          >
            Dipanshu
          </Link>
        </div>
        <div className="flex justify-around items-center text-3xl md:text-4xl mt-0 md:mt-3 space-x-3">
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
      </footer>
    </>
  );
};

export default Footer;
