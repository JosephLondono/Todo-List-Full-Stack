"use client";
import "@/app/components/auth/Auth.css";
import { useState } from "react";
import { SectionLogin } from "./SectionLogin";
import SectionRegister from "./SectionRegister";

export const FormsAuth = () => {
  const [sectionLogin, setSectionLogin] = useState(true);
  return (
    <main className="flex-1">
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
};

export default FormsAuth;
