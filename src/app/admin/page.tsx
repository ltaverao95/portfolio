import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard for the portfolio.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
