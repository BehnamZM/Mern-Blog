import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AllPosts from "./AllPosts";
import AdminDashboard from "./AdminDashboard";
import AllComments from "./AllComments";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <DashboardLayout>
      {tab === "admin" && <AdminDashboard />}
      {tab === "profile" && <Profile />}
      {tab === "posts" && <AllPosts />}
      {tab === "comments" && <AllComments />}
      {tab === "test" && <div>تستی</div>}
    </DashboardLayout>
  );
}
