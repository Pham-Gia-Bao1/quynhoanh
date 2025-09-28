import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const rooms = [
  {
    id: 1,
    name: "Phòng Superior",
    price: "650.000",
    image: "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    description: "Phòng tiêu chuẩn với đầy đủ tiện nghi hiện đại",
    amenities: ["Wifi miễn phí", "Điều hòa", "TV màn hình phẳng", "Minibar"],
    size: "25m²",
  },
  {
    id: 2,
    name: "Phòng Deluxe",
    price: "900.000",
    image: "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
    description: "Phòng cao cấp với ban công và view đẹp",
    amenities: ["Wifi miễn phí", "Ban công riêng", "Bồn tắm", "Dịch vụ phòng"],
    size: "35m²",
  },
  {
    id: 3,
    name: "Phòng Suite",
    price: "1.800.000",
    image: "/presidential-hotel-suite-with-living-area-and-prem.jpg",
    description: "Suite sang trọng với phòng khách riêng biệt",
    amenities: ["Phòng khách riêng", "Jacuzzi", "Butler service", "View panorama"],
    size: "60m²",
  },
]

export function RoomPreview() {
  return (
    <section className="py-16 lg:px-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Phòng nghỉ sang trọng</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Khám phá các loại phòng được thiết kế tinh tế với đầy đủ tiện nghi hiện đại để mang đến trải nghiệm nghỉ
            dưỡng tuyệt vời nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{room.size}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-semibold text-primary">{room.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{room.price}₫</div>
                    <div className="text-sm text-muted-foreground">/đêm</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-pretty">{room.description}</p>

                <div className="space-y-2 mb-6">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <Link href='/rooms' ><Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                  Xem chi tiết & Đặt phòng
                </Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Xem tất cả phòng
          </Button>
        </div> */}
      </div>
    </section>
  )
}
