"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  Users,
  Bed,
  Star,
  Clock,
  MapPin,
  Eye,
  Building,
  ChevronLeft,
  ChevronRight,
  Share,
  Heart,
  Phone,
  Mail,
} from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import Link from "next/link"

interface Room {
  id: number
  name: string
  price: number
  originalPrice: number
  images: string[]
  description: string
  amenities: string[]
  size: string
  maxGuests: number
  bedType: string
  rating: number
  reviews: number
  available: boolean
  floor: string
  view: string
  checkInTime: string
  checkOutTime: string
}

interface RoomDetailsProps {
  room: Room
}

export function RoomDetails({ room }: RoomDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 1
  }

  const totalPrice = room.price * calculateNights()

  return (
    <div className="p-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-accent">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-accent">
            Phòng
          </Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={room.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${room.name} - Ảnh ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {room.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${room.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-primary mb-2">{room.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{room.rating}</span>
                      <span>({room.reviews} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Tầng {room.floor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{room.view}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {room.originalPrice > room.price && (
                    <div className="text-lg text-muted-foreground line-through">
                      {room.originalPrice.toLocaleString("vi-VN")}₫
                    </div>
                  )}
                  <div className="text-3xl font-bold text-accent">{room.price.toLocaleString("vi-VN")}₫</div>
                  <div className="text-sm text-muted-foreground">/đêm</div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Building className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">{room.size}</div>
                    <div className="text-sm text-muted-foreground">Diện tích</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">{room.maxGuests} khách</div>
                    <div className="text-sm text-muted-foreground">Tối đa</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Bed className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-sm">{room.bedType}</div>
                    <div className="text-sm text-muted-foreground">Loại giường</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-sm">
                      {room.checkInTime} - {room.checkOutTime}
                    </div>
                    <div className="text-sm text-muted-foreground">Check-in/out</div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-pretty leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Tiện nghi phòng</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Chính sách khách sạn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Check-in / Check-out</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">{room.checkInTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">{room.checkOutTime}</span>
                      </div>
                      <div className="text-muted-foreground">Late check-out có thể được sắp xếp với phụ phí</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Chính sách hủy</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Hủy miễn phí trước 24h</div>
                      <div>• Hủy trong vòng 24h: phí 50%</div>
                      <div>• No-show: tính 100% giá phòng</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-accent mb-1">{room.price.toLocaleString("vi-VN")}₫</div>
                  <div className="text-sm text-muted-foreground">/đêm • Đã bao gồm thuế</div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  {/* Check-in Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ngày nhận phòng</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ngày trả phòng</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Số khách</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} khách
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Breakdown */}
                {checkIn && checkOut && (
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          {room.price.toLocaleString("vi-VN")}₫ x {calculateNights()} đêm
                        </span>
                        <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí dịch vụ</span>
                        <span>0₫</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Tổng cộng</span>
                        <span className="text-accent">{totalPrice.toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4"
                  disabled={!room.available}
                >
                  <Link
                    href={`/booking?roomId=${room.id}&checkIn=${checkIn?.toISOString()}&checkOut=${checkOut?.toISOString()}&guests=${guests}`}
                  >
                    {room.available ? "Đặt phòng ngay" : "Hết phòng"}
                  </Link>
                </Button>

                <div className="text-center text-sm text-muted-foreground mb-4">
                  Bạn sẽ không bị tính phí ngay lập tức
                </div>

                {/* Contact Info */}
                <div className="border-t border-border pt-4">
                  <div className="text-sm font-medium mb-2">Cần hỗ trợ?</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" />
                      <span>+84 123 456 789</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <span>booking@quynhoanh.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
