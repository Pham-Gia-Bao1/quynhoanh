import Image from "next/image"
import { Award, Users, Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next";
import { generateBaseMetadata } from "@/lib/metadata";
export const metadata: Metadata = generateBaseMetadata(
  "Về chúng tôi - Khách sạn Quỳnh Oanh",
  "Trải nghiệm sự sang trọng và thoải mái tại Khách sạn Quỳnh Oanh. Dịch vụ đẳng cấp, tiện nghi hiện đại, tọa lạc tại trung tâm Việt Nam."
);


const achievements = [
  {
    icon: Award,
    title: "Giải thưởng xuất sắc",
    description: "Top 10 khách sạn tốt nhất Việt Nam 2024",
  },
  {
    icon: Users,
    title: "Hơn 50,000 khách hàng",
    description: "Đã phục vụ và nhận được sự tin tưởng",
  },
  {
    icon: Heart,
    title: "Dịch vụ tận tâm",
    description: "Cam kết mang đến trải nghiệm tuyệt vời nhất",
  },
  {
    icon: Star,
    title: "Đánh giá 4.9/5",
    description: "Từ hơn 1,000 đánh giá của khách hàng",
  },
]

const team = [
  {
    name: "Nguyễn Quỳnh Oanh",
    position: "Tổng Giám Đốc",
    image: "/professional-vietnamese-woman-hotel-manager.jpg",
    description:
      "Với hơn 15 năm kinh nghiệm trong ngành khách sạn, bà Oanh đã dẫn dắt khách sạn đạt được nhiều thành tựu đáng tự hào.",
  },
  {
    name: "Trần Minh Đức",
    position: "Giám Đốc Vận Hành",
    image: "/professional-vietnamese-man-hotel-operations-manag.jpg",
    description:
      "Chuyên gia về vận hành khách sạn với kinh nghiệm quản lý các dự án lớn và tối ưu hóa quy trình dịch vụ.",
  },
  {
    name: "Lê Thị Hương",
    position: "Trưởng Phòng Dịch Vụ Khách Hàng",
    image: "/professional-vietnamese-woman-customer-service-man.jpg",
    description: "Đảm bảo mọi khách hàng đều nhận được sự chăm sóc tận tình và trải nghiệm dịch vụ hoàn hảo nhất.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="relative py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-serif text-foreground mb-6">Về Chúng Tôi</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Khách sạn Quỳnh Oanh - Nơi hội tụ của sự sang trọng, tiện nghi hiện đại và dịch vụ tận tâm, mang đến cho
              bạn những trải nghiệm khó quên.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-foreground mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Được thành lập vào năm 2010, Khách sạn Quỳnh Oanh bắt đầu từ một ước mơ đơn giản: tạo ra một không
                  gian lưu trú không chỉ thoải mái mà còn mang đến cảm giác như ở nhà cho mọi du khách.
                </p>
                <p>
                  Qua hơn một thập kỷ phát triển, chúng tôi đã không ngừng nâng cao chất lượng dịch vụ, đầu tư vào cơ sở
                  vật chất hiện đại và đào tạo đội ngũ nhân viên chuyên nghiệp. Mỗi chi tiết trong khách sạn đều được
                  chăm chút kỹ lưỡng để mang đến trải nghiệm tuyệt vời nhất.
                </p>
                <p>
                  Ngày nay, Khách sạn Quỳnh Oanh tự hào là một trong những khách sạn hàng đầu tại Việt Nam, được khách
                  hàng trong và ngoài nước tin tưởng và lựa chọn.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/elegant-hotel-building-exterior-with-modern-archit.jpg"
                alt="Khách sạn Quỳnh Oanh"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-foreground mb-4">Sứ Mệnh</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mang đến cho khách hàng những trải nghiệm lưu trú đẳng cấp quốc tế với dịch vụ tận tâm, cơ sở vật chất
                  hiện đại và không gian ấm cúng như ở nhà. Chúng tôi cam kết tạo ra những kỷ niệm đẹp và giá trị bền
                  vững cho mọi chuyến đi.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-foreground mb-4">Tầm Nhìn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành chuỗi khách sạn hàng đầu Đông Nam Á, được công nhận về chất lượng dịch vụ xuất sắc, sự đổi
                  mới sáng tạo và trách nhiệm với cộng đồng. Chúng tôi hướng tới việc mở rộng quy mô và nâng cao vị thế
                  trên thị trường quốc tế.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-foreground mb-4">Thành Tựu Của Chúng Tôi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những con số và giải thưởng khẳng định chất lượng dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-foreground mb-4">Đội Ngũ Lãnh Đạo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những con người tài năng và tận tâm đứng sau thành công của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.position}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
