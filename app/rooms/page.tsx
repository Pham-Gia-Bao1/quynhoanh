
import { RoomListings } from "@/components/room-listings"
import { generateBaseMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = generateBaseMetadata("Phòng nghỉ - Khách sạn Quỳnh Oanh", "Khám phá các loại phòng sang trọng tại Khách sạn Quỳnh Oanh với đầy đủ tiện nghi hiện đại và dịch vụ đẳng cấp.")

export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      <RoomListings />
    </main>
  )
}
