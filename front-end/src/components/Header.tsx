"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from "./ButtonAuth";
import { ThemeSwitcher } from "./Theme-provider";

const Header = () => {
  return (
    <header className="w-full bg-white flex justify-center items-center h-14">
      <div className="max-w-7xl flex justify-between items-center px-14 w-full">
        <Link href="/">
          <Image
            src="/LogoSofka.png"
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
              <ButtonAuth />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
