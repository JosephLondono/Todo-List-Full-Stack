import Image from "next/image";
import Link from "next/link";

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
            priority={true}
            className="aspect-auto object-contain"
          />
        </Link>
        <nav>
          <ul className="flex space-x-12">
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
                href="/auth"
                className="bg-black rounded-md px-6 py-2 text-white hover:bg-gray-800"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
