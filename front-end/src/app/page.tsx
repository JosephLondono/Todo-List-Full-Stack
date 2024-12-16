import Header from "@/app/components/index/Header";
import { Main } from "@/app/components/index/Main";
import Footer from "@/app/components/index/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-3 bg-sofka-light">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
