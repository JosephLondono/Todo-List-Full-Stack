"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from "./ButtonAuth";
import { ThemeSwitcher } from "./Theme-provider";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-gray-800 flex justify-center items-center h-14 shadow-md text-black dark:text-white">
      <div className="max-w-7xl flex justify-between items-center px-14 w-full">
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
        <ThemeSwitcher />
        <nav>
          <ul className="flex space-x-12 items-center">
            <li>
              <Link
                href="/"
                className="font-semibold hover:underline-offset-4 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/tasks"
                className="font-semibold hover:underline-offset-4 hover:underline"
              >
                Tareas
              </Link>
            </li>
            <li>
              <ButtonAuth />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
