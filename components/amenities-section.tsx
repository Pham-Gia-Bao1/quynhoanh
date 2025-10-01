import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Car, Coffee, Utensils, Dumbbell, Waves, Space as Spa, Shield } from "lucide-react"

const amenities = [
  {
    icon: Wifi,
    title: "Wifi miễn phí",
    description: "Internet tốc độ cao trong toàn bộ khách sạn",
  },
  {
    icon: Car,
    title: "Bãi đỗ xe",
    description: "Bãi đỗ xe rộng rãi và an toàn 24/7",
  },
  {
    icon: Utensils,
    title: "Nhà hàng",
    description: "Ẩm thực Việt Nam và quốc tế đa dạng",
  },
  {
    icon: Shield,
    title: "An ninh 24/7",
    description: "Hệ thống bảo vệ chuyên nghiệp",
  },
]

export function AmenitiesSection() {
  return (
    <section className="p-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Tiện ích đẳng cấp</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tận hưởng đầy đủ các tiện ích hiện đại và dịch vụ chăm sóc chu đáo trong suốt thời gian lưu trú tại khách
            sạn.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{amenity.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
