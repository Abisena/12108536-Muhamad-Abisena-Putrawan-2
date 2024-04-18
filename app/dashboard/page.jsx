import SidebarAdmin from "../../ui/sidebarAdmin/Sidebar";
import SidebarEmployee from "../../ui/sidebarEmployee/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../middleware/authMiddleware";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    auth("Admin")(null, null, () => {
      router.push("/dashboard/admin");
    });
    auth("Employee")(null, null, () => {
      router.push("/dashboard/employee");
    });
  }, []);

  return (
    <div>
      {router.pathname === "/dashboard/admin" ? (
        <SidebarAdmin />
      ) : router.pathname === "/dashboard/employee" ? (
        <SidebarEmployee />
      ) : null}
    </div>
  );
};

export default Dashboard;
