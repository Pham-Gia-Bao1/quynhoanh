import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomDetails } from "@/components/room-details"
import { notFound } from "next/navigation"

// Sample room data - in a real app this would come from a database
const rooms = [
  {
    id: 1,
    name: "Phòng Superior",
    price: 650000,
    originalPrice: 750000,
    images: [
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
    ],
    description:
      "Phòng Superior được thiết kế trang nhã với đầy đủ tiện nghi hiện đại, mang đến không gian nghỉ ngơi thoải mái và ấm cúng. Phòng có view đẹp ra thành phố và được trang bị các thiết bị cao cấp.",
    amenities: [
      "Wifi miễn phí tốc độ cao",
      "Điều hòa nhiệt độ thông minh",
      "TV màn hình phẳng 43 inch",
      "Minibar đầy đủ đồ uống",
      "Két an toàn điện tử",
      "Máy sấy tóc cao cấp",
      "Đồ dùng phòng tắm cao cấp",
      "Dịch vụ phòng 24/7",
    ],
    size: "25m²",
    maxGuests: 2,
    bedType: "Giường đôi King Size",
    rating: 4.5,
    reviews: 128,
    available: true,
    floor: "3-8",
    view: "View thành phố",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 2,
    name: "Phòng Deluxe",
    price: 900000,
    originalPrice: 1050000,
    images: [
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    ],
    description:
      "Phòng Deluxe cao cấp với không gian rộng rãi hơn, ban công riêng và view tuyệt đẹp. Được thiết kế sang trọng với nội thất cao cấp và đầy đủ tiện nghi hiện đại nhất.",
    amenities: [
      "Wifi miễn phí tốc độ cao",
      "Ban công riêng với view đẹp",
      "Bồn tắm và vòi sen riêng biệt",
      "Dịch vụ phòng cao cấp",
      "Máy pha cà phê Nespresso",
      "Tủ lạnh mini đầy đủ",
      "Két an toàn lớn",
      "Áo choàng tắm cao cấp",
      "Dép đi trong phòng",
      "Máy là và bàn là",
    ],
    size: "35m²",
    maxGuests: 3,
    bedType: "Giường King Size + Sofa bed",
    rating: 4.7,
    reviews: 89,
    available: true,
    floor: "5-12",
    view: "View thành phố và sông",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 3,
    name: "Phòng Suite",
    price: 1800000,
    originalPrice: 2100000,
    images: [
      "/presidential-hotel-suite-with-living-area-and-prem.jpg",
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    ],
    description:
      "Suite sang trọng với phòng khách riêng biệt, phòng ngủ rộng rãi và đầy đủ tiện ích cao cấp nhất. Phù hợp cho khách VIP và những dịp đặc biệt.",
    amenities: [
      "Phòng khách riêng biệt",
      "Jacuzzi cao cấp",
      "Butler service 24/7",
      "View panorama tuyệt đẹp",
      "Bếp nhỏ đầy đủ tiện nghi",
      "Phòng làm việc riêng",
      "Hệ thống âm thanh cao cấp",
      "Máy giặt và máy sấy",
      "Minibar premium",
      "Dịch vụ limousine",
      "Late checkout miễn phí",
      "Breakfast in room",
    ],
    size: "60m²",
    maxGuests: 4,
    bedType: "Giường King Size + Phòng khách",
    rating: 4.9,
    reviews: 45,
    available: true,
    floor: "10-15",
    view: "View panorama 360°",
    checkInTime: "14:00",
    checkOutTime: "15:00",
  },
]

export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id))

  if (!room) {
    return {
      title: "Phòng không tồn tại - Khách sạn Quỳnh Oanh",
    }
  }

  return {
    title: `${room.name} - Khách sạn Quỳnh Oanh`,
    description: room.description,
  }
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id))

  if (!room) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <RoomDetails room={room} />
    </main>
  )
}
