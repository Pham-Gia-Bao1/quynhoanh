"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  amenities: string[];
  size: string;
  maxGuests: number;
  bedType: string;
  rating: number;
  reviews: number;
  available: boolean;
  floor: string;
  view: string;
  checkInTime: string;
  checkOutTime: string;
}

interface RoomDetailsProps {
  room: Room;
}

export function RoomDetails({ room }: RoomDetailsProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + room.images.length) % room.images.length
    );
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const totalPrice = room.price * calculateNights();

  // 👉 Auto next image after 3s
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval); // cleanup khi component unmount
  }, [room.images.length]);

  return (
    <div className="p-8 px-5">
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

        <div className="grid lg:grid-cols-3 gap-8 sm:grid-cols-1">
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
                      isLiked
                        ? "bg-red-500 text-white"
                        : "bg-black/50 text-white hover:bg-black/70"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {room.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto sm:justify-center">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-accent"
                          : "border-transparent"
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
            <div className="mb-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-primary mb-2">{room.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">
                        {room.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({room.reviews} đánh giá)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-foreground">Tầng {room.floor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-accent" />
                      <span className="text-foreground">{room.view}</span>
                    </div>
                  </div>
                </div>

                {/* Giá */}
                <div className="text-right">
                  {room.originalPrice > room.price && (
                    <div className="text-lg text-muted-foreground line-through">
                      {room.originalPrice.toLocaleString("vi-VN")} VND
                    </div>
                  )}
                  <div className="text-3xl md:text-4xl font-extrabold text-accent">
                    {room.price.toLocaleString("vi-VN")} VND
                  </div>
                  <div className="text-sm text-muted-foreground">/Ngày</div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-secondary/40 rounded-xl shadow-sm">
                  <Building className="h-6 w-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {room.size}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Diện tích
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/40 rounded-xl shadow-sm">
                  <Users className="h-6 w-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {room.maxGuests} khách
                    </div>
                    <div className="text-xs text-muted-foreground">Tối đa</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/40 rounded-xl shadow-sm">
                  <Bed className="h-6 w-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {room.bedType}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Loại giường
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/40 rounded-xl shadow-sm">
                  <Clock className="h-6 w-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {room.checkInTime} - {room.checkOutTime}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Check-in/out
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả */}
              <p className="text-base text-muted-foreground leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                Tiện nghi phòng
              </h2>
              <div className="grid sm:grid-cols-1 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 sm:static">
              <CardContent className="p-6">
                {/* Giá phòng */}
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {room.price.toLocaleString("vi-VN")} VND
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /Ngày • Đã bao gồm thuế
                  </div>
                </div>

                {/* Nút gọi đặt phòng */}
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-3"
                >
                  <a href="tel:+84123456789">Gọi ngay để đặt phòng</a>
                </Button>

                {/* Nút nhắn Zalo */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent mb-6"
                >
                  <a
                    href="https://zalo.me/84123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nhắn qua Zalo
                  </a>
                </Button>

                {/* Thông tin liên hệ */}
                <div className="border-t border-border pt-4">
                  <div className="text-sm font-medium mb-2">Cần hỗ trợ?</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" />
                      <a href="tel:+84123456789" className="hover:underline">
                        +84 123 456 789
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <a
                        href="mailto:booking@quynhoanh.com"
                        className="hover:underline"
                      >
                        booking@quynhoanh.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chính sách khách sạn */}
            <div className="mt-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                Chính sách khách sạn
              </h2>
              <div className="grid grid-cols-1">


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

            {/* Banner quảng bá */}
            {/* <div className="mt-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                Ưu đãi hấp dẫn
              </h2>
              <div className="grid gap-4">
                <Card className="overflow-hidden">
                  <img
                    src="/banners/summer-sale.jpg"
                    alt="Summer Sale"
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Giảm giá 20% mùa hè</h3>
                    <p className="text-sm text-muted-foreground">
                      Đặt phòng trong tháng này để nhận ưu đãi hấp dẫn.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <img
                    src="/banners/spa-offer.jpg"
                    alt="Spa Offer"
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Miễn phí dịch vụ Spa</h3>
                    <p className="text-sm text-muted-foreground">
                      Khách ở từ 3 đêm trở lên sẽ được tặng voucher Spa trị giá
                      500k.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div> */}
            {/* Reviews */}
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                Đánh giá phòng
              </h2>

              {/* Danh sách đánh giá (giả lập) */}
              <div className="space-y-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-2">
                      {/* Avatar */}
                      <img
                        src="https://i.pravatar.cc/40?img=5"
                        alt="Ngọc Anh"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Ngọc Anh</span>
                          <span className="text-yellow-500 text-sm">★★★★★</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Phòng rộng rãi, sạch sẽ và rất yên tĩnh. Rất đáng
                          tiền!
                        </p>
                        {/* Hình ảnh kèm theo */}
                        <div className="flex gap-2 mt-3">
                          <Image
                          width={100}
                          height={80}
                            src="https://i.pinimg.com/1200x/3a/e7/a4/3ae7a4f55428966f74c2a87dc589263f.jpg"
                            alt="Ảnh đánh giá 1"
                            className="w-24 h-20 rounded-lg object-cover border"
                            loading="lazy"
                          />
                          <Image
                          width={100}
                          height={80}
                            src="https://i.pinimg.com/736x/94/4d/78/944d78f063151850ae6a10ef8dd37349.jpg"
                            alt="Ảnh đánh giá 2"
                            className="w-24 h-20 rounded-lg object-cover border"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <img
                        src="https://i.pravatar.cc/40?img=8"
                        alt="Minh Trí"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Minh Trí</span>
                          <span className="text-yellow-500 text-sm">★★★★☆</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Nhân viên thân thiện, vị trí thuận tiện. Sẽ quay lại.
                        </p>
                        {/* Hình ảnh kèm theo */}
                        <div className="flex gap-2 mt-3">
                          <img
                            src="https://i.pinimg.com/736x/96/51/f1/9651f188fc6b4ffbcd7d6a9128f2de78.jpg"
                            alt="Ảnh đánh giá"
                            className="w-24 h-20 rounded-lg object-cover border"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form thêm đánh giá */}
              {/* <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold mb-2">Gửi đánh giá của bạn</h3>
                  <div>
                    <label className="text-sm block mb-1">Tên của bạn</label>
                    <input
                      type="text"
                      placeholder="Nhập tên..."
                      className="w-full border rounded-lg p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      Đánh giá (số sao)
                    </label>
                    <select className="w-full border rounded-lg p-2 text-sm">
                      <option>★★★★★ - Tuyệt vời</option>
                      <option>★★★★☆ - Tốt</option>
                      <option>★★★☆☆ - Bình thường</option>
                      <option>★★☆☆☆ - Tạm ổn</option>
                      <option>★☆☆☆☆ - Kém</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Nội dung</label>
                    <textarea
                      rows={3}
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                      className="w-full border rounded-lg p-2 text-sm"
                    />
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-white w-full">
                    Gửi đánh giá
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
