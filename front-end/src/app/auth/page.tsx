"use client";
import { useState } from "react";
import { getCookie } from "cookies-next/client";
import { SectionLogin } from "../components/auth/SectionLogin";
import SectionRegister from "../components/auth/SectionRegister";

export default function Auth() {
  const [sectionLogin, setSectionLogin] = useState(true);
  const token = getCookie("accesToken");

  if (token) {
    window.location.href = "/";
  }
  return (
    <main className="flex-1 flex justify-center items-center">
      <section className="max-w-7xl flex flex-col w-full mx-auto gap-y-4 py-4">
        {sectionLogin ? (
          <SectionLogin
            setSectionLogin={setSectionLogin}
            sectionLogin={sectionLogin}
          />
        ) : (
          <SectionRegister
            setSectionLogin={setSectionLogin}
            sectionLogin={sectionLogin}
          />
        )}
      </section>
    </main>
  );
}
