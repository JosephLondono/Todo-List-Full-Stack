import { useSession, signOut } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session } = useSession();
  const classButton =
    "bg-black rounded-md px-6 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 text-base h-10 block font-medium";
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className={`${classButton}`}>
          Cerrar Sesión
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => (window.location.href = "/auth")}
        className={`${classButton}`}
      >
        Logearse
      </button>
    </>
  );
}
