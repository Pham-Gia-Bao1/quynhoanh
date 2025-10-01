"use client"

import type React from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Metadata } from "next"
import { generateBaseMetadata } from "@/lib/metadata"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="relative py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-serif text-foreground mb-6">Liên Hệ Với Chúng Tôi</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. Hãy liên hệ với chúng tôi qua các hình
              thức dưới đây.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif text-foreground mb-8">Gửi Tin Nhắn Cho Chúng Tôi</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Chủ đề</Label>
                  <Select onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn chủ đề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Đặt phòng</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="complaint">Khiếu nại</SelectItem>
                      <SelectItem value="suggestion">Góp ý</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Tin nhắn *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-1"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Gửi Tin Nhắn
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-foreground mb-8">Thông Tin Liên Hệ</h2>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Địa Chỉ</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Đường Nguyễn Huệ, Quận 1<br />
                        Thành phố Hồ Chí Minh, Việt Nam
                        <br />
                        Mã bưu điện: 700000
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
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <strong>Tổng đài:</strong>{" "}
                          <a href="tel:+84123456789" className="hover:text-primary transition-colors">
                            +84 123 456 789
                          </a>
                        </p>
                        <p>
                          <strong>Đặt phòng:</strong>{" "}
                          <a href="tel:+84987654321" className="hover:text-primary transition-colors">
                            +84 987 654 321
                          </a>
                        </p>
                        <p>
                          <strong>Dịch vụ khách hàng:</strong>{" "}
                          <a href="tel:+84555666777" className="hover:text-primary transition-colors">
                            +84 555 666 777
                          </a>
                        </p>
                      </div>
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
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <strong>Thông tin chung:</strong>{" "}
                          <a href="mailto:info@quynhoanh.com" className="hover:text-primary transition-colors">
                            info@quynhoanh.com
                          </a>
                        </p>
                        <p>
                          <strong>Đặt phòng:</strong>{" "}
                          <a href="mailto:booking@quynhoanh.com" className="hover:text-primary transition-colors">
                            booking@quynhoanh.com
                          </a>
                        </p>
                        <p>
                          <strong>Sự kiện:</strong>{" "}
                          <a href="mailto:events@quynhoanh.com" className="hover:text-primary transition-colors">
                            events@quynhoanh.com
                          </a>
                        </p>
                      </div>
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
                        <p>
                          <strong>Lễ tân:</strong> 24/7
                        </p>
                        <p>
                          <strong>Tổng đài:</strong> 6:00 - 22:00
                        </p>
                        <p>
                          <strong>Nhà hàng:</strong> 6:00 - 22:00
                        </p>
                        <p>
                          <strong>Spa & Gym:</strong> 6:00 - 22:00
                        </p>
                        <p>
                          <strong>Hồ bơi:</strong> 6:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-foreground mb-4">Vị Trí Trên Bản Đồ</h2>
            <p className="text-lg text-muted-foreground">
              Tọa lạc tại trung tâm thành phố, thuận tiện di chuyển đến mọi nơi
            </p>
          </div>

          <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
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
      </section>

    </main>
  )
}
