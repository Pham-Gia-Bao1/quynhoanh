"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Check, CreditCard, User, MapPin, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useAuth } from "@/contexts/auth-context"
import { BookingService, type BookingFormData } from "@/lib/booking"

const steps = [
  { id: 1, title: "Thông tin phòng", description: "Xác nhận chi tiết đặt phòng" },
  { id: 2, title: "Thông tin khách", description: "Điền thông tin cá nhân" },
  { id: 3, title: "Thanh toán", description: "Chọn phương thức thanh toán" },
  { id: 4, title: "Xác nhận", description: "Hoàn tất đặt phòng" },
]

export function BookingFlow() {
  const { user, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [bookingId, setBookingId] = useState("")

  const [bookingData, setBookingData] = useState<BookingFormData>({
    roomId: 1,
    roomName: "Phòng Superior",
    roomPrice: 650000,
    checkIn: undefined,
    checkOut: undefined,
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Vietnam",
    address: "",
    city: "",
    zipCode: "",
    specialRequests: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    newsletter: false,
    terms: false,
  })

  useEffect(() => {
    if (isAuthenticated && user) {
      const userInfo = BookingService.prefillFromUser(user)
      setBookingData((prev) => ({ ...prev, ...userInfo }))
    }
  }, [isAuthenticated, user])

  const updateBookingData = (updates: Partial<BookingFormData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }))
  }

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      return BookingService.calculateNights(bookingData.checkIn, bookingData.checkOut)
    }
    return 1
  }

  const totalPrice = bookingData.roomPrice * calculateNights()
  const serviceFee = Math.round(totalPrice * 0.05) // 5% service fee
  const tax = Math.round(totalPrice * 0.1) // 10% tax
  const finalTotal = totalPrice + serviceFee + tax

  const nextStep = async () => {
    if (currentStep === 3 && canProceed()) {
      setIsSubmitting(true)
      setError("")

      try {
        const booking = await BookingService.createBooking(bookingData, user)
        setBookingId(booking.id)
        setCurrentStep(4)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đặt phòng")
      } finally {
        setIsSubmitting(false)
      }
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.checkIn && bookingData.checkOut && bookingData.guests > 0
      case 2:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone
      case 3:
        return bookingData.paymentMethod && bookingData.terms
      default:
        return true
    }
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-accent border-accent text-accent-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-px mx-4 ${currentStep > step.id ? "bg-accent" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Room Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    Thông tin đặt phòng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isAuthenticated && user && (
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-sm font-medium text-accent">Chào mừng trở lại, {user.name}!</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Thông tin cá nhân của bạn sẽ được tự động điền ở bước tiếp theo.
                      </p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkin">Ngày nhận phòng</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-1 bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingData.checkIn
                              ? format(bookingData.checkIn, "dd/MM/yyyy", { locale: vi })
                              : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookingData.checkIn}
                            onSelect={(date) => updateBookingData({ checkIn: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="checkout">Ngày trả phòng</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-1 bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingData.checkOut
                              ? format(bookingData.checkOut, "dd/MM/yyyy", { locale: vi })
                              : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookingData.checkOut}
                            onSelect={(date) => updateBookingData({ checkOut: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">Số khách</Label>
                    <Select
                      value={bookingData.guests.toString()}
                      onValueChange={(value) => updateBookingData({ guests: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} khách
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="special-requests">Yêu cầu đặc biệt (tùy chọn)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Ví dụ: Phòng tầng cao, giường đôi, không hút thuốc..."
                      value={bookingData.specialRequests}
                      onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Guest Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    Thông tin khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Họ *</Label>
                      <Input
                        id="firstName"
                        value={bookingData.firstName}
                        onChange={(e) => updateBookingData({ firstName: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Tên *</Label>
                      <Input
                        id="lastName"
                        value={bookingData.lastName}
                        onChange={(e) => updateBookingData({ lastName: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => updateBookingData({ email: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => updateBookingData({ phone: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Quốc gia</Label>
                    <Select
                      value={bookingData.country}
                      onValueChange={(value) => updateBookingData({ country: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vietnam">Việt Nam</SelectItem>
                        <SelectItem value="USA">Hoa Kỳ</SelectItem>
                        <SelectItem value="Japan">Nhật Bản</SelectItem>
                        <SelectItem value="Korea">Hàn Quốc</SelectItem>
                        <SelectItem value="China">Trung Quốc</SelectItem>
                        <SelectItem value="Other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                      id="address"
                      value={bookingData.address}
                      onChange={(e) => updateBookingData({ address: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Thành phố</Label>
                      <Input
                        id="city"
                        value={bookingData.city}
                        onChange={(e) => updateBookingData({ city: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Mã bưu điện</Label>
                      <Input
                        id="zipCode"
                        value={bookingData.zipCode}
                        onChange={(e) => updateBookingData({ zipCode: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    Thông tin thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Phương thức thanh toán</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card
                        className={`cursor-pointer border-2 transition-colors ${
                          bookingData.paymentMethod === "credit-card" ? "border-accent" : "border-border"
                        }`}
                        onClick={() => updateBookingData({ paymentMethod: "credit-card" })}
                      >
                        <CardContent className="p-4 text-center">
                          <CreditCard className="h-8 w-8 mx-auto mb-2 text-accent" />
                          <div className="font-medium">Thẻ tín dụng</div>
                          <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                        </CardContent>
                      </Card>
                      <Card
                        className={`cursor-pointer border-2 transition-colors ${
                          bookingData.paymentMethod === "vnpay" ? "border-accent" : "border-border"
                        }`}
                        onClick={() => updateBookingData({ paymentMethod: "vnpay" })}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="h-8 w-8 mx-auto mb-2 bg-accent rounded flex items-center justify-center">
                            <span className="text-accent-foreground font-bold text-sm">VN</span>
                          </div>
                          <div className="font-medium">VNPay</div>
                          <div className="text-sm text-muted-foreground">Ví điện tử</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {bookingData.paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Tên trên thẻ</Label>
                        <Input
                          id="cardName"
                          value={bookingData.cardName}
                          onChange={(e) => updateBookingData({ cardName: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Số thẻ</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={bookingData.cardNumber}
                          onChange={(e) => updateBookingData({ cardNumber: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={bookingData.expiryDate}
                            onChange={(e) => updateBookingData({ expiryDate: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={bookingData.cvv}
                            onChange={(e) => updateBookingData({ cvv: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={bookingData.newsletter}
                        onCheckedChange={(checked) => updateBookingData({ newsletter: checked as boolean })}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Đăng ký nhận thông tin khuyến mãi qua email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={bookingData.terms}
                        onCheckedChange={(checked) => updateBookingData({ terms: checked as boolean })}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        Tôi đồng ý với{" "}
                        <a href="#" className="text-accent hover:underline">
                          điều khoản dịch vụ
                        </a>{" "}
                        và{" "}
                        <a href="#" className="text-accent hover:underline">
                          chính sách bảo mật
                        </a>{" "}
                        *
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Đặt phòng thành công!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Cảm ơn bạn đã đặt phòng!</h3>
                    <p className="text-muted-foreground mb-4">
                      Chúng tôi đã gửi email xác nhận đến {bookingData.email}
                    </p>
                    <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                      <div className="text-sm font-medium mb-1">Mã đặt phòng</div>
                      <div className="text-2xl font-bold text-accent">{bookingId}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Chi tiết đặt phòng:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Khách hàng</div>
                        <div>
                          {bookingData.firstName} {bookingData.lastName}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Phòng</div>
                        <div>{bookingData.roomName}</div>
                      </div>
                      <div>
                        <div className="font-medium">Ngày nhận phòng</div>
                        <div>
                          {bookingData.checkIn ? format(bookingData.checkIn, "dd/MM/yyyy", { locale: vi }) : ""}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Ngày trả phòng</div>
                        <div>
                          {bookingData.checkOut ? format(bookingData.checkOut, "dd/MM/yyyy", { locale: vi }) : ""}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Số khách</div>
                        <div>{bookingData.guests} khách</div>
                      </div>
                      <div>
                        <div className="font-medium">Tổng tiền</div>
                        <div className="text-accent font-bold">{finalTotal.toLocaleString("vi-VN")}₫</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">In hóa đơn</Button>
                    {isAuthenticated && (
                      <p className="text-sm text-muted-foreground">
                        Bạn có thể xem chi tiết đặt phòng trong{" "}
                        <a href="/profile" className="text-accent hover:underline">
                          trang cá nhân
                        </a>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed() || isSubmitting}
                  className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? "Đang xử lý..." : "Tiếp tục"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Về trang chủ
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Tóm tắt đặt phòng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/elegant-hotel-room-with-modern-furniture-and-city-.jpg"
                    alt={bookingData.roomName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{bookingData.roomName}</div>
                    <div className="text-sm text-muted-foreground">25m² • 2 khách</div>
                  </div>
                </div>

                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ngày nhận:</span>
                      <span>{format(bookingData.checkIn, "dd/MM/yyyy", { locale: vi })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày trả:</span>
                      <span>{format(bookingData.checkOut, "dd/MM/yyyy", { locale: vi })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Số đêm:</span>
                      <span>{calculateNights()} đêm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Số khách:</span>
                      <span>{bookingData.guests} khách</span>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {bookingData.roomPrice.toLocaleString("vi-VN")}₫ x {calculateNights()} đêm
                    </span>
                    <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí dịch vụ</span>
                    <span>{serviceFee.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thuế</span>
                    <span>{tax.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-accent">{finalTotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">* Giá đã bao gồm thuế và phí dịch vụ</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
