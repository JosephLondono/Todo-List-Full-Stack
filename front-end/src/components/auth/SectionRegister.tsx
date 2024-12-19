import { TokenPayload } from "@/types/TokenPayload";
import { setCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useState } from "react";

interface SectionRegisterProps {
  setSectionLogin: (value: boolean) => void;
  sectionLogin: boolean;
}

const SectionRegister: React.FC<SectionRegisterProps> = ({
  setSectionLogin,
  sectionLogin,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    const credentials = {
      email,
      password,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const messageResponse = await response.json();

      if (!response.ok) {
        throw new Error(messageResponse.message);
      }
      if (typeof messageResponse.accesToken === "string") {
        const expirationDate = getExpirationDate(messageResponse.accesToken);

        if (expirationDate) {
          const maxAge = getMaxAge(expirationDate);
          setCookie("accesToken", messageResponse.accesToken, { maxAge });
        } else {
          setCookie("accesToken", messageResponse.accesToken);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = "/";
      } else {
        throw new Error("Invalid token format");
      }
    } catch (error) {
      const mError = error as Error;
      setMessageError(mError.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-4xl w-[90%]">
      <div className="relative w-[400px] overflow-visible hidden md:flex">
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
      <div className="p-7 flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Registrarse</h2>
        <p className="max-w-xs text-sm text-gray-600">
          Por favor, ingrese su correo electrónico y contraseña para registrarse
        </p>
        <hr className="border-t-2 border-gray-200 my-3" />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-700">Correo</span>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
              className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofka-orange/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
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
              className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofka-orange/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </label>
          <button
            type="submit"
            className="bg-sofka-orange text-white py-2 px-1 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
          <span
            className={`w-full bg-red-200 px-3 py-1 rounded-xl text-xs text-red-700 text-center max-w-[70%] mx-auto mt-2 ${
              messageError ? "block" : "hidden"
            }`}
          >
            {messageError}
          </span>
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
const getExpirationDate = (token: string): Date | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.exp) {
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate;
    }
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const getMaxAge = (expirationDate: Date): number => {
  const now = new Date();
  const maxAge = Math.floor((expirationDate.getTime() - now.getTime()) / 1000);
  return maxAge;
};
