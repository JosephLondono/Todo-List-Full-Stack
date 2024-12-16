import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-sofka-light flex justify-between items-center p-4 px-14">
      <Link href="/">
        <Image
          src="/LogoSofka.png"
          alt="Sofka Technologies"
          width={120}
          height={57}
          objectFit="contain"
        />
      </Link>
      <nav>
        <ul className="flex space-x-16">
          <li>
            <Link
              href="/"
              className="font-semibold hover:underline-offset-4 hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link href="/auth">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
