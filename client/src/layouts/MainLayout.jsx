import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-10 min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
