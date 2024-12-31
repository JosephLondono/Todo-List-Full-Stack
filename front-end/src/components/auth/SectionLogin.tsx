import { signIn } from "next-auth/react";
import Image from "next/image";

export const SectionLogin = () => {
  return (
    <div className="flex mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden lg:max-w-4xl lg:w-full w-[90%] gap-x-8">
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            Iniciar Sesión
          </h2>
          <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300">
            Por favor, ingrese sesion en google para continuar
          </p>
          <hr className="border-t-2 border-gray-200 dark:border-gray-700 my-3" />
          <div className="flex-1">
            <button
              className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full justify-center font-semibold text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              onClick={() => signIn("google")}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Continúa con google
            </button>
          </div>
        </div>
        <div className="mt-auto">
          <hr className="border-t-2 border-gray-200 dark:border-gray-700 my-3" />
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Por su seguridad, el inicio de sesión se realiza a través de Google.
          </p>
        </div>
      </div>
      <div className="relative w-[400px] md:block hidden">
        <div className="absolute inset-0 bg-[#ebe8ff] dark:bg-gray-700 transform rotate-6 scale-150 ml-20"></div>
        <div className="relative z-10 items-center justify-center flex h-full">
          <Image
            src="/pcVector.svg"
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
