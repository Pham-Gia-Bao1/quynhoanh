import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Đăng ký - Khách sạn Quỳnh Oanh",
  description: "Tạo tài khoản mới để đặt phòng và trải nghiệm dịch vụ tại Khách sạn Quỳnh Oanh.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">Đăng ký</h1>
            <p className="text-muted-foreground">Tạo tài khoản để trải nghiệm dịch vụ tốt nhất</p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}
