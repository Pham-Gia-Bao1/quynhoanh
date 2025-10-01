import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RoomDetails } from "@/components/room-details";
import { notFound } from "next/navigation";
// Sample room data - Phong Nha Hotel (simple, nature-based, no bar/spa/bathtub)
const rooms = [
  {
    id: 1,
    name: "Phòng Standard",
    price: 500000,
    originalPrice: 600000,
    images: [
      "/cozy-standard-room-with-modern-design.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    ],
    description:
      "Phòng Standard nhỏ gọn, tiện nghi cơ bản, view núi thoáng mát. Phù hợp cho khách đi công tác hoặc du lịch ngắn ngày tại Phong Nha.",
    amenities: [
      "Wifi miễn phí",
      "Điều hòa nhiệt độ",
      "TV màn hình phẳng",
      "Két sắt mini",
      "Dịch vụ phòng 24/7",
    ],
    size: "20m²",
    maxGuests: 2,
    bedType: "Giường đôi",
    rating: 4.3,
    reviews: 56,
    available: true,
    floor: "2-5",
    view: "View núi",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 2,
    name: "Phòng Superior",
    price: 650000,
    originalPrice: 750000,
    images: [
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    ],
    description:
      "Phòng Superior với thiết kế trang nhã, đầy đủ tiện nghi. View hướng sông Son thơ mộng, lý tưởng cho du khách nghỉ ngơi sau hành trình khám phá động Thiên Đường.",
    amenities: [
      "Wifi miễn phí",
      "Điều hòa",
      "TV màn hình phẳng",
      "Minibar",
      "Két an toàn",
    ],
    size: "25m²",
    maxGuests: 2,
    bedType: "Giường đôi",
    rating: 4.5,
    reviews: 128,
    available: true,
    floor: "3-8",
    view: "View sông Son",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 3,
    name: "Phòng Deluxe",
    price: 900000,
    originalPrice: 1050000,
    images: [
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    ],
    description:
      "Phòng Deluxe rộng rãi, có ban công riêng nhìn ra núi non hùng vĩ. Không gian thoáng đãng, mang lại trải nghiệm thư giãn tuyệt vời tại Phong Nha.",
    amenities: [
      "Wifi miễn phí",
      "Ban công riêng view núi",
      "Máy pha cà phê",
      "Điều hòa",
      "TV màn hình phẳng",
    ],
    size: "35m²",
    maxGuests: 3,
    bedType: "Giường King",
    rating: 4.7,
    reviews: 89,
    available: true,
    floor: "5-10",
    view: "View núi",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 4,
    name: "Phòng Family",
    price: 1200000,
    originalPrice: 1400000,
    images: [
      "/family-hotel-room-with-double-beds-and-modern-deco.jpg",
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    ],
    description:
      "Phòng Family rộng rãi, có ban công hướng sông Son, thích hợp cho gia đình hoặc nhóm bạn cùng trải nghiệm thiên nhiên Phong Nha.",
    amenities: [
      "2 giường đôi",
      "Wifi miễn phí",
      "Tủ lạnh lớn",
      "TV màn hình lớn",
      "Điều hòa",
    ],
    size: "45m²",
    maxGuests: 6,
    bedType: "2 giường đôi",
    rating: 4.8,
    reviews: 92,
    available: true,
    floor: "3-8",
    view: "View sông Son",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 5,
    name: "Phòng Suite",
    price: 1800000,
    originalPrice: 2100000,
    images: [
      "/presidential-hotel-suite-with-living-area-and-prem.jpg",
      "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    ],
    description:
      "Suite cao cấp với phòng khách riêng, không gian rộng rãi. View toàn cảnh núi đá vôi và sông Son, mang lại sự riêng tư và sang trọng.",
    amenities: [
      "Phòng khách riêng",
      "View panorama núi & sông",
      "Bếp nhỏ",
      "Wifi miễn phí",
      "Điều hòa",
    ],
    size: "60m²",
    maxGuests: 4,
    bedType: "Giường King + Sofa bed",
    rating: 4.9,
    reviews: 45,
    available: true,
    floor: "8-12",
    view: "View toàn cảnh núi và sông",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
  {
    id: 6,
    name: "Phòng Executive",
    price: 1500000,
    originalPrice: 1750000,
    images: [
      "/executive-room-with-city-view-and-modern-furniture.jpg",
      "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
      "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    ],
    description:
      "Phòng Executive dành cho khách công tác hoặc nghỉ dưỡng cao cấp, có không gian làm việc riêng và tầm nhìn ra núi non Phong Nha.",
    amenities: [
      "Phòng làm việc riêng",
      "Wifi miễn phí",
      "Bữa sáng miễn phí",
      "Điều hòa",
      "Concierge",
    ],
    size: "40m²",
    maxGuests: 2,
    bedType: "Giường King",
    rating: 4.7,
    reviews: 63,
    available: true,
    floor: "6-10",
    view: "View núi",
    checkInTime: "14:00",
    checkOutTime: "12:00",
  },
];


export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id));

  if (!room) {
    return {
      title: "Phòng không tồn tại - Khách sạn Quỳnh Oanh",
    };
  }

  return {
    title: `${room.name} - Khách sạn Quỳnh Oanh`,
    description: room.description,
  };
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = rooms.find((r) => r.id === Number.parseInt(params.id));

  if (!room) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RoomDetails room={room} />
    </main>
  );
}
