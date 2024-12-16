import Header from "../components/index/Header";
import Footer from "../components/index/Footer";
import { FormsAuth } from "../components/auth/FormsAuth";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col gap-3 bg-sofka-light">
      <Header />
      <FormsAuth />
      <Footer />
    </div>
  );
}
