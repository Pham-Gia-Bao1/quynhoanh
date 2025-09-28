"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    location: "Hà Nội",
    rating: 5,
    comment:
      "Khách sạn tuyệt vời với dịch vụ chuyên nghiệp. Phòng sạch sẽ, thoáng mát và view rất đẹp. Nhân viên thân thiện, nhiệt tình. Chắc chắn sẽ quay lại!",
    date: "Tháng 12, 2024",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Australia",
    rating: 5,
    comment:
      "Outstanding hotel with exceptional service! The rooms are beautifully designed and the staff went above and beyond to make our stay memorable. Highly recommended!",
    date: "December 2024",
  },
  {
    id: 3,
    name: "Trần Văn Hùng",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    comment:
      "Vị trí thuận tiện, gần trung tâm thành phố. Bữa sáng ngon, đa dạng. Phòng tắm hiện đại, sạch sẽ. Giá cả hợp lý cho chất lượng dịch vụ.",
    date: "Tháng 11, 2024",
  },
  {
    id: 4,
    name: "Maria Garcia",
    location: "Spain",
    rating: 4,
    comment:
      "Beautiful hotel with great amenities. The spa was relaxing and the restaurant served delicious local cuisine. Perfect for both business and leisure travelers.",
    date: "November 2024",
  },
  {
    id: 5,
    name: "Lê Thị Mai",
    location: "Đà Nẵng",
    rating: 5,
    comment:
      "Lần đầu tiên ở khách sạn này và rất ấn tượng. Từ lúc check-in đến check-out đều được phục vụ tận tình. Phòng Suite rộng rãi, sang trọng.",
    date: "Tháng 10, 2024",
  },
  {
    id: 6,
    name: "David Chen",
    location: "Singapore",
    rating: 5,
    comment:
      "Excellent location and top-notch facilities. The concierge team was incredibly helpful with local recommendations. Will definitely stay here again on my next visit.",
    date: "October 2024",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-foreground mb-4">Đánh Giá Từ Khách Hàng</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những trải nghiệm tuyệt vời mà khách hàng đã có tại Khách sạn Quỳnh Oanh
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground ml-2">4.9/5</span>
            <span className="text-muted-foreground">(248 đánh giá)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p>{review.location}</p>
                  </div>
                  <p>{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
