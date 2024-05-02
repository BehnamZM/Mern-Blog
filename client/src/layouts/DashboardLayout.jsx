import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-3 md:mx-10 flex flex-col md:flex-row gap-6 md:gap-2 min-h-screen">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}
