"use client";
import { SectionLogin } from "@/components/auth/SectionLogin";

export default function Auth() {
  return (
    <main className="flex-1 flex justify-center items-center bg-white dark:bg-gray-900">
      <section className="max-w-7xl flex flex-col w-full mx-auto gap-y-4 py-4">
        <SectionLogin />
      </section>
    </main>
  );
}
