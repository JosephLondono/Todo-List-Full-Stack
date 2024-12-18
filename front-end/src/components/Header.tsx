"use client";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const token = getCookie("accesToken");
    if (typeof token === "string") {
      setToken(token);
    }
  }, []);
  const handleLogout = () => {
    deleteCookie("accesToken");
    setToken("");
    window.location.reload();
  };
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
              {token ? (
                <button
                  className="bg-black rounded-md px-6 py-2 text-white hover:bg-gray-800 text-base h-10 block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="bg-black rounded-md px-6 py-2 text-white hover:bg-gray-800 text-base h-10 block"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
