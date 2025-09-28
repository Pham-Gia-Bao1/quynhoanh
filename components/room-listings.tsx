"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search, Users, Bed, Star } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

// Room data (unchanged)
const rooms = [
  {
    id: 1,
    name: "Phòng Superior",
    price: 650000,
    originalPrice: 750000,
    image: "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    description:
      "Phòng tiêu chuẩn với đầy đủ tiện nghi hiện đại, thiết kế trang nhã và thoải mái.",
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
  },
  {
    id: 2,
    name: "Phòng Deluxe",
    price: 900000,
    originalPrice: 1050000,
    image: "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
    description:
      "Phòng cao cấp với ban công riêng, view đẹp và không gian rộng rãi hơn.",
    amenities: [
      "Wifi miễn phí",
      "Ban công riêng",
      "Bồn tắm",
      "Dịch vụ phòng",
      "Máy pha cà phê",
    ],
    size: "35m²",
    maxGuests: 3,
    bedType: "Giường King",
    rating: 4.7,
    reviews: 89,
    available: true,
  },
  {
    id: 3,
    name: "Phòng Suite",
    price: 1800000,
    originalPrice: 2100000,
    image: "/presidential-hotel-suite-with-living-area-and-prem.jpg",
    description:
      "Suite sang trọng với phòng khách riêng biệt, phòng ngủ rộng và đầy đủ tiện ích cao cấp.",
    amenities: [
      "Phòng khách riêng",
      "Jacuzzi",
      "Butler service",
      "View panorama",
      "Bếp nhỏ",
    ],
    size: "60m²",
    maxGuests: 4,
    bedType: "Giường King + Sofa bed",
    rating: 4.9,
    reviews: 45,
    available: true,
  },
  {
    id: 4,
    name: "Phòng Superior Plus",
    price: 750000,
    originalPrice: 850000,
    image: "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    description:
      "Phòng Superior nâng cấp với không gian lớn hơn và thêm nhiều tiện ích.",
    amenities: [
      "Wifi miễn phí",
      "Điều hòa",
      "TV màn hình phẳng",
      "Minibar",
      "Bàn làm việc",
    ],
    size: "30m²",
    maxGuests: 2,
    bedType: "Giường đôi",
    rating: 4.6,
    reviews: 76,
    available: false,
  },
  {
    id: 5,
    name: "Phòng Family",
    price: 1200000,
    originalPrice: 1400000,
    image: "/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg",
    description:
      "Phòng gia đình rộng rãi, phù hợp cho gia đình có trẻ em với 2 giường riêng biệt.",
    amenities: [
      "2 giường đôi",
      "Khu vực sinh hoạt",
      "Tủ lạnh lớn",
      "Khu vực trẻ em",
      "Ban công",
    ],
    size: "45m²",
    maxGuests: 6,
    bedType: "2 Giường đôi",
    rating: 4.8,
    reviews: 92,
    available: true,
  },
  {
    id: 6,
    name: "Phòng Executive",
    price: 1500000,
    originalPrice: 1750000,
    image: "/presidential-hotel-suite-with-living-area-and-prem.jpg",
    description:
      "Phòng dành cho doanh nhân với không gian làm việc riêng và dịch vụ cao cấp.",
    amenities: [
      "Phòng làm việc",
      "Lounge access",
      "Breakfast miễn phí",
      "Late checkout",
      "Concierge",
    ],
    size: "40m²",
    maxGuests: 2,
    bedType: "Giường King",
    rating: 4.7,
    reviews: 63,
    available: true,
  },
];

export function RoomListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [guestCount, setGuestCount] = useState("all");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [sortBy, setSortBy] = useState("price-low");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input and generate suggestions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = rooms
        .filter(
          (room) =>
            room.name.toLowerCase().includes(value.toLowerCase()) ||
            room.description.toLowerCase().includes(value.toLowerCase())
        )
        .map((room) => room.name) // Only use room names for suggestions
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setIsSuggestionsOpen(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter and sort rooms (unchanged)
  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-1m" && room.price < 1000000) ||
        (priceRange === "1m-1.5m" &&
          room.price >= 1000000 &&
          room.price < 1500000) ||
        (priceRange === "over-1.5m" && room.price >= 1500000);

      const matchesGuests =
        guestCount === "all" ||
        (guestCount === "1-2" && room.maxGuests <= 2) ||
        (guestCount === "3-4" && room.maxGuests >= 3 && room.maxGuests <= 4) ||
        (guestCount === "5+" && room.maxGuests >= 5);

      return matchesSearch && matchesPrice && matchesGuests;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "size":
          return Number.parseInt(b.size) - Number.parseInt(a.size);
        default:
          return 0;
      }
    });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="relative text-center bg-[url('/hotel-rooms-poster.png')] bg-cover bg-center bg-no-repeat py-20 px-4">
          <div className="absolute inset-0 bg-black/40 rounded"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Phòng nghỉ sang trọng
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto text-pretty">
              Khám phá các loại phòng được thiết kế tinh tế với đầy đủ tiện nghi
              hiện đại để mang đến trải nghiệm nghỉ dưỡng tuyệt vời nhất.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
              {/* Search with Suggestions */}
              <div className="lg:col-span-2 relative" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm phòng..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10"
                    onFocus={() => setIsSuggestionsOpen(suggestions.length > 0)}
                  />
                </div>
                {isSuggestionsOpen && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in Date */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn
                        ? format(checkIn, "dd/MM/yyyy", { locale: vi })
                        : "Ngày nhận"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut
                        ? format(checkOut, "dd/MM/yyyy", { locale: vi })
                        : "Ngày trả"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guest Count Filter */}
              <div>
                <Select value={guestCount} onValueChange={setGuestCount}>
                  <SelectTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Số khách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="1-2">1-2 khách</SelectItem>
                    <SelectItem value="3-4">3-4 khách</SelectItem>
                    <SelectItem value="5+">5+ khách</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Giá phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả giá</SelectItem>
                    <SelectItem value="under-1m">Dưới 1 triệu</SelectItem>
                    <SelectItem value="1m-1.5m">1-1.5 triệu</SelectItem>
                    <SelectItem value="over-1.5m">Trên 1.5 triệu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                className="text-sm text-red-500 hover:text-white border cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  setCheckIn(undefined);
                  setCheckOut(undefined);
                  setGuestCount("all");
                  setPriceRange("all");
                  setSortBy("");
                  setSuggestions([]);
                  setIsSuggestionsOpen(false);
                }}
              >
                Clear All
              </Button>
            </div>

            {/* Sort Options */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Tìm thấy {filteredRooms.length} phòng
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  <SelectItem value="size">Diện tích lớn nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  {room.size}
                </Badge>
                {!room.available && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                    Hết phòng
                  </Badge>
                )}
                {room.originalPrice > room.price && (
                  <Badge className="absolute bottom-4 left-4 bg-green-600 text-white">
                    Giảm{" "}
                    {Math.round((1 - room.price / room.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span>{room.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{room.reviews} đánh giá</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {room.originalPrice > room.price && (
                      <div className="text-sm text-muted-foreground line-through">
                        {room.originalPrice.toLocaleString("vi-VN")}₫
                      </div>
                    )}
                    <div className="text-2xl font-bold text-accent">
                      {room.price.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="text-sm text-muted-foreground">/đêm</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-pretty">
                  {room.description}
                </p>

                {/* Room Details */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span>{room.maxGuests} khách</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-accent" />
                    <span>{room.bedType}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-1 mb-6">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {room.amenities.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{room.amenities.length - 3} tiện ích khác
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    asChild
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={!room.available}
                  >
                    <Link href={`/rooms/${room.id}`}>
                      {room.available ? "Xem chi tiết" : "Hết phòng"}
                    </Link>
                  </Button>
                  {room.available && (
                    <Button
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    >
                      Đặt ngay
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              Không tìm thấy phòng nào phù hợp với tiêu chí tìm kiếm.
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setPriceRange("all");
                setGuestCount("all");
                setSuggestions([]);
                setIsSuggestionsOpen(false);
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}