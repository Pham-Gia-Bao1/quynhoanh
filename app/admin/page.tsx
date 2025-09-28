import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard - Khách sạn Quỳnh Oanh",
  description: "Quản lý đặt phòng và vận hành khách sạn Quỳnh Oanh.",
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  )
}
