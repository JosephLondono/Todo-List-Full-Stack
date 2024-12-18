"use client";
import Header from "../components/index/Header";
import Footer from "../components/index/Footer";
import { FormsAuth } from "../components/auth/FormsAuth";
import { getCookie } from "cookies-next/client";

export default function Auth() {
  const token = getCookie("accesToken");

  if (token) {
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen flex flex-col gap-3 bg-sofka-light">
      <Header />
      <FormsAuth />
      <Footer />
    </div>
  );
}
