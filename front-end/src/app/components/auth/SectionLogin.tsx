import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SectionLoginProps {
  setSectionLogin: (value: boolean) => void;
  sectionLogin: boolean;
}

export const SectionLogin: React.FC<SectionLoginProps> = ({
  setSectionLogin,
  sectionLogin,
}) => {
  return (
    <div
      className={`flex mx-auto bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full 
      }`}
    >
      <div className="py-11 px-10 flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Iniciar Sesión
        </h2>
        <p className="max-w-xs text-sm text-gray-600">
          Por favor, ingrese sus credenciales para poder usar la aplicación
        </p>
        <hr className="border-t-2 border-gray-200 my-3" />
        <form className="flex flex-col gap-2">
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
            Iniciar Sesión
          </button>
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
