import { setCookie } from "cookies-next/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/types/TokenPayload";

interface SectionLoginProps {
  setSectionLogin: (value: boolean) => void;
  sectionLogin: boolean;
}

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

export const SectionLogin: React.FC<SectionLoginProps> = ({
  setSectionLogin,
  sectionLogin,
}) => {
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

      const response = await fetch("http://localhost:3000/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");
  return (
    <div
      className={`flex mx-auto bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full 
      }`}
    >
      <div className="p-7 flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Iniciar Sesión
        </h2>
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
            className="bg-sofka-orange text-white py-2 px-1 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Iniciando sesion" : "Iniciar sesion"}
          </button>
          <span
            className={`w-full bg-red-200 px-3 py-1 rounded-xl text-xs text-red-700 text-center max-w-[70%] mx-auto mt-2 ${
              messageError ? "block" : "hidden"
            }`}
          >
            {messageError}
          </span>
          <p className="text-xs text-gray-600 text-center">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="hover:underline text-sofka-orange hover:text-sofka-orange/80"
              onClick={() => setSectionLogin(!sectionLogin)}
            >
              Registrate aqui
            </button>
          </p>
        </form>
      </div>
      <div className="relative w-[400px]">
        <div className="absolute inset-0 bg-[#ebe8ff] transform rotate-6 scale-150 ml-20"></div>
        <div className="relative z-10 items-center justify-center flex h-full">
          <Image
            src="/login.png"
            alt="Image of a login"
            width={370}
            height={370}
            className="img-background aspect-square object-contain"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};
