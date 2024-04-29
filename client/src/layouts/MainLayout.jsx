import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-10">{children}</div>
    </>
  );
}
