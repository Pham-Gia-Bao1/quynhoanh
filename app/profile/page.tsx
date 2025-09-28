import { ProtectedRoute } from "@/components/protected-route"
import { ProfileDashboard } from "@/components/profile-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Thông tin cá nhân - Khách sạn Quỳnh Oanh",
  description: "Quản lý thông tin cá nhân và lịch sử đặt phòng tại Khách sạn Quỳnh Oanh.",
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="customer">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <ProfileDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}
