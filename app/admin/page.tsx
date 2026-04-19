import type { Metadata } from "next";
import { getAllOrders } from "@/lib/api";
import AdminDashboard from "@/components/features/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — AfriBridge",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const orders = await getAllOrders();
  return <AdminDashboard orders={orders} />;
}
