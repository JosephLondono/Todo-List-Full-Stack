import { setCookie, getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";

interface SectionRegisterProps {
  setSectionLogin: (value: boolean) => void;
  sectionLogin: boolean;
}

const SectionRegister: React.FC<SectionRegisterProps> = ({
  setSectionLogin,
  sectionLogin,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG9uZG9ub2oiLCJlbWFpbCI6ImxvbmRvbm9qODg4QGdtYWlsLmNvbSJ9";
    setCookie("session", token);
    setCookie("session", token, { expires: new Date(Date.now() + 60 * 1000) });

    const tokenGet = getCookie("session");
    if (tokenGet) {
      const decoded = jwtDecode(tokenGet);
      console.log("Token decodificado:", decoded);
    }
  };
  return (
    <div
      className={`flex mx-auto bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full ${
        sectionLogin ? "hidden" : "block"
      }`}
    >
      <div className="relative w-[400px] overflow-visible">
        <div className="absolute inset-0 bg-[#ebe8ff] transform -rotate-6 origin-center mr-20 scale-150"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Image
            src="/register.svg"
            alt="Image of a login"
            width={400}
            height={400}
            className="img-background aspect-square object-contain scale-95"
            priority={true}
          />
        </div>
      </div>
      <div className="py-11 px-10 flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Registrarse</h2>
        <p className="max-w-xs text-sm text-gray-600">
          Por favor, ingrese sus credenciales para poder usar la aplicación
        </p>
        <hr className="border-t-2 border-gray-200 my-3" />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-700">Correo</span>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
              className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofka-orange/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-700">
              Contraseña
            </span>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              required
              className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofka-orange/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </label>
          <div className="flex justify-end items-center">
            <Link
              href="/auth/recover-password"
              className="text-sm text-sofka-orange hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-sofka-orange text-white p-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Registrarse
          </button>
          <p className="text-xs text-gray-600 text-center">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              className="hover:underline text-sofka-orange hover:text-sofka-orange/80"
              onClick={() => setSectionLogin(!sectionLogin)}
            >
              Iniciar Sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SectionRegister;
