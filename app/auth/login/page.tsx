import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Đăng nhập - Khách sạn Quỳnh Oanh",
  description: "Đăng nhập vào tài khoản của bạn để quản lý đặt phòng và thông tin cá nhân.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">Đăng nhập</h1>
            <p className="text-muted-foreground">Chào mừng bạn trở lại với Khách sạn Quỳnh Oanh</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
