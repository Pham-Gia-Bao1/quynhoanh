"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Eye, Download, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { BookingService, type Booking } from "@/lib/booking"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BookingHistory() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const userBookings = await BookingService.getUserBookings(user.id)
        setBookings(userBookings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải lịch sử đặt phòng")
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [user])

  const getStatusBadge = (status: Booking["status"]) => {
    const config = BookingService.getStatusBadge(status)
    return <Badge className={`${config.className} hover:${config.className}`}>{config.label}</Badge>
  }

  const getPaymentBadge = (status: Booking["payment"]["status"]) => {
    const config = BookingService.getPaymentStatusBadge(status)
    return <Badge className={`${config.className} hover:${config.className}`}>{config.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Lịch sử đặt phòng</h2>
          <p className="text-muted-foreground">Theo dõi tất cả các đặt phòng của bạn</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{booking.roomDetails.roomName}</h3>
                    <p className="text-sm text-muted-foreground">Mã đặt phòng: {booking.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{booking.payment.total.toLocaleString("vi-VN")}₫</div>
                  <div className="flex gap-2 mt-1">
                    {getStatusBadge(booking.status)}
                    {getPaymentBadge(booking.payment.status)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Nhận phòng</div>
                    <div className="text-muted-foreground">{booking.dates.checkIn}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Trả phòng</div>
                    <div className="text-muted-foreground">{booking.dates.checkOut}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Số khách</div>
                    <div className="text-muted-foreground">{booking.guests} người</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Số đêm</div>
                    <div className="text-muted-foreground">{booking.dates.nights} đêm</div>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Yêu cầu đặc biệt:</div>
                  <div className="text-sm text-muted-foreground">{booking.specialRequests}</div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Đặt ngày: {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    Xem chi tiết
                  </Button>
                  {booking.status === "completed" && (
                    <Button variant="outline" size="sm">
                      Đánh giá
                    </Button>
                  )}
                  {booking.status === "confirmed" && (
                    <Button variant="outline" size="sm">
                      Hủy đặt phòng
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có đặt phòng nào</h3>
            <p className="text-muted-foreground mb-4">
              Bạn chưa có lịch sử đặt phòng. Hãy khám phá các phòng của chúng tôi!
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Đặt phòng ngay</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
