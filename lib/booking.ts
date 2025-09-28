import type { User } from "./auth"

export interface Booking {
  id: string
  userId?: string // Optional for guest bookings
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    address?: string
    city?: string
    zipCode?: string
  }
  roomDetails: {
    roomId: number
    roomName: string
    roomType: string
    roomPrice: number
  }
  dates: {
    checkIn: string
    checkOut: string
    nights: number
  }
  guests: number
  specialRequests?: string
  payment: {
    method: "credit-card" | "vnpay" | "cash"
    amount: number
    serviceFee: number
    tax: number
    total: number
    status: "pending" | "paid" | "failed" | "refunded"
    transactionId?: string
  }
  status: "draft" | "pending" | "confirmed" | "checked_in" | "checked_out" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
  notes?: string
  cancellationReason?: string
  totalAmount?: number
  guestName ?: string
  email?: string
}

export interface BookingFormData {
  // Room details
  roomId: number
  roomName: string
  roomPrice: number
  checkIn: Date | undefined
  checkOut: Date | undefined
  guests: number

  // Guest information
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  address: string
  city: string
  zipCode: string
  specialRequests: string

  // Payment
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Preferences
  newsletter: boolean
  terms: boolean
}

// Mock booking database
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "QO-123456",
    userId: "customer-1",
    guestInfo: {
      firstName: "Nguyễn",
      lastName: "Văn An",
      email: "an.nguyen@email.com",
      phone: "+84 123 456 789",
      country: "Vietnam",
      address: "123 Đường ABC",
      city: "Hồ Chí Minh",
      zipCode: "70000",
    },
    roomDetails: {
      roomId: 1,
      roomName: "Phòng Superior",
      roomType: "Superior",
      roomPrice: 650000,
    },
    dates: {
      checkIn: "2025-01-15",
      checkOut: "2025-01-18",
      nights: 3,
    },
    guests: 2,
    specialRequests: "Phòng tầng cao, view đẹp",
    payment: {
      method: "credit-card",
      amount: 1950000,
      serviceFee: 97500,
      tax: 195000,
      total: 2242500,
      status: "paid",
      transactionId: "TXN-123456",
    },
    status: "confirmed",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:30:00Z",
  },
  {
    id: "QO-123457",
    guestInfo: {
      firstName: "Trần",
      lastName: "Thị Bình",
      email: "binh.tran@email.com",
      phone: "+84 987 654 321",
      country: "Vietnam",
    },
    roomDetails: {
      roomId: 2,
      roomName: "Phòng Deluxe",
      roomType: "Deluxe",
      roomPrice: 900000,
    },
    dates: {
      checkIn: "2025-01-20",
      checkOut: "2025-01-22",
      nights: 2,
    },
    guests: 2,
    payment: {
      method: "vnpay",
      amount: 1800000,
      serviceFee: 90000,
      tax: 180000,
      total: 2070000,
      status: "pending",
    },
    status: "pending",
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-12T14:00:00Z",
  },
]

export class BookingService {
  private static readonly STORAGE_KEY = "quynh-oanh-bookings"

  static async createBooking(bookingData: BookingFormData, user?: User): Promise<Booking> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const nights = this.calculateNights(bookingData.checkIn!, bookingData.checkOut!)
    const amount = bookingData.roomPrice * nights
    const serviceFee = Math.round(amount * 0.05)
    const tax = Math.round(amount * 0.1)
    const total = amount + serviceFee + tax

    const booking: Booking = {
      id: `QO-${Date.now().toString().slice(-6)}`,
      userId: user?.id,
      guestInfo: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        country: bookingData.country,
        address: bookingData.address,
        city: bookingData.city,
        zipCode: bookingData.zipCode,
      },
      roomDetails: {
        roomId: bookingData.roomId,
        roomName: bookingData.roomName,
        roomType: bookingData.roomName.split(" ")[1], // Extract room type
        roomPrice: bookingData.roomPrice,
      },
      dates: {
        checkIn: bookingData.checkIn!.toISOString().split("T")[0],
        checkOut: bookingData.checkOut!.toISOString().split("T")[0],
        nights,
      },
      guests: bookingData.guests,
      specialRequests: bookingData.specialRequests,
      payment: {
        method: bookingData.paymentMethod as "credit-card" | "vnpay",
        amount,
        serviceFee,
        tax,
        total,
        status: "pending",
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save to mock database
    MOCK_BOOKINGS.push(booking)
    this.saveToStorage()

    // Simulate payment processing
    setTimeout(() => {
      this.updatePaymentStatus(booking.id, "paid")
      this.updateBookingStatus(booking.id, "confirmed")
    }, 2000)

    return booking
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return MOCK_BOOKINGS.filter((booking) => booking.userId === userId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  static async getAllBookings(): Promise<Booking[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return MOCK_BOOKINGS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static async getBookingById(id: string): Promise<Booking | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return MOCK_BOOKINGS.find((booking) => booking.id === id) || null
  }

  static async updateBookingStatus(bookingId: string, status: Booking["status"], notes?: string): Promise<Booking> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (!booking) {
      throw new Error("Booking not found")
    }

    booking.status = status
    booking.updatedAt = new Date().toISOString()
    if (notes) {
      booking.notes = notes
    }

    this.saveToStorage()
    return booking
  }

  static async updatePaymentStatus(
    bookingId: string,
    paymentStatus: Booking["payment"]["status"],
    transactionId?: string,
  ): Promise<Booking> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (!booking) {
      throw new Error("Booking not found")
    }

    booking.payment.status = paymentStatus
    booking.updatedAt = new Date().toISOString()
    if (transactionId) {
      booking.payment.transactionId = transactionId
    }

    this.saveToStorage()
    return booking
  }

  static async cancelBooking(bookingId: string, reason: string, refundAmount?: number): Promise<Booking> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (!booking) {
      throw new Error("Booking not found")
    }

    booking.status = "cancelled"
    booking.cancellationReason = reason
    booking.updatedAt = new Date().toISOString()

    if (refundAmount && booking.payment.status === "paid") {
      booking.payment.status = "refunded"
    }

    this.saveToStorage()
    return booking
  }

  static prefillFromUser(user: User): Partial<BookingFormData> {
    const [firstName, ...lastNameParts] = user.name.split(" ")
    return {
      firstName: firstName || "",
      lastName: lastNameParts.join(" ") || "",
      email: user.email,
      phone: user.phone || "",
      country: "Vietnam",
    }
  }

  static calculateNights(checkIn: Date, checkOut: Date): number {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  static getStatusBadge(status: Booking["status"]) {
    const statusConfig = {
      draft: { label: "Nháp", className: "bg-gray-100 text-gray-800" },
      pending: { label: "Chờ xác nhận", className: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Đã xác nhận", className: "bg-green-100 text-green-800" },
      checked_in: { label: "Đã nhận phòng", className: "bg-blue-100 text-blue-800" },
      checked_out: { label: "Đã trả phòng", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Hoàn thành", className: "bg-blue-100 text-blue-800" },
      cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-800" },
    }
    return statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
  }

  static getPaymentStatusBadge(status: Booking["payment"]["status"]) {
    const statusConfig = {
      pending: { label: "Chờ thanh toán", className: "bg-yellow-100 text-yellow-800" },
      paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-800" },
      failed: { label: "Thất bại", className: "bg-red-100 text-red-800" },
      refunded: { label: "Đã hoàn tiền", className: "bg-purple-100 text-purple-800" },
    }
    return statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
  }

  private static saveToStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(MOCK_BOOKINGS))
    }
  }

  private static loadFromStorage(): void {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        try {
          const bookings = JSON.parse(stored)
          MOCK_BOOKINGS.splice(0, MOCK_BOOKINGS.length, ...bookings)
        } catch (error) {
          console.error("Failed to load bookings from storage:", error)
        }
      }
    }
  }
}

// Initialize storage on load
if (typeof window !== "undefined") {
  BookingService["loadFromStorage"]()
}
