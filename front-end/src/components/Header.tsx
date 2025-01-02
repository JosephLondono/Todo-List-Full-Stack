"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from "./ButtonAuth";
import { ThemeSwitcher } from "./Theme-provider";
import { useTheme } from "next-themes";
import { useState } from "react";

const Header = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 flex justify-center items-center h-14 shadow-md text-black dark:text-white relative z-50">
      <div className="max-w-7xl flex justify-between items-center px-4 md:px-14 w-full">
        <Link href="/">
          <Image
            src={
              theme === "dark" ? "/LogoSofkaDark.png" : "/LogoSofkaLight.png"
            }
            alt="Sofka Technologies"
            width={120}
            height={40}
            className="aspect-auto object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <div className="flex items-center">
          <ThemeSwitcher />
          <button
            className="md:hidden ml-4"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-12 absolute md:static top-14 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-12 items-center pb-4 px-4 md:p-0">
            <li className="my-2 md:my-0">
              <Link
                href="/"
                className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 hover:underline underline-offset-4"
              >
                Home
              </Link>
            </li>
            <li className="my-2 md:my-0">
              <Link
                href="/tasks"
                className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 duration-300 hover:underline underline-offset-4"
              >
                Tareas
              </Link>
            </li>
            <li className="my-2 md:my-0">
              <ButtonAuth />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
