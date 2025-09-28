"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MapSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-foreground mb-4">Vị Trí & Liên Hệ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tọa lạc tại vị trí thuận tiện, dễ dàng di chuyển đến các điểm tham quan nổi tiếng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326!2d106.6297!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ5JzIzLjIiTiAxMDbCsDM3JzQ2LjkiRQ!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Khách sạn Quỳnh Oanh"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Địa Chỉ</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Đường Nguyễn Huệ, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Điện Thoại</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+84123456789" className="hover:text-primary transition-colors">
                        +84 123 456 789
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="tel:+84987654321" className="hover:text-primary transition-colors">
                        +84 987 654 321
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@quynhoanh.com" className="hover:text-primary transition-colors">
                        info@quynhoanh.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:booking@quynhoanh.com" className="hover:text-primary transition-colors">
                        booking@quynhoanh.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Giờ Làm Việc</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Lễ tân: 24/7</p>
                      <p>Nhà hàng: 6:00 - 22:00</p>
                      <p>Spa: 9:00 - 21:00</p>
                      <p>Gym: 5:00 - 23:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
