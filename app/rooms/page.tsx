import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomListings } from "@/components/room-listings"

export const metadata = {
  title: "Phòng nghỉ - Khách sạn Quỳnh Oanh",
  description:
    "Khám phá các loại phòng sang trọng tại Khách sạn Quỳnh Oanh với đầy đủ tiện nghi hiện đại và dịch vụ đẳng cấp.",
}

export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      <RoomListings />
    </main>
  )
}
