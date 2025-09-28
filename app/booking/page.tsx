import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingFlow } from "@/components/booking-flow"

export const metadata = {
  title: "Đặt phòng - Khách sạn Quỳnh Oanh",
  description: "Đặt phòng trực tuyến tại Khách sạn Quỳnh Oanh với quy trình đơn giản và bảo mật.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <BookingFlow />
    </main>
  )
}
