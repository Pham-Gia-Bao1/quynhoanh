"use client"

import React from 'react'

export  function AdminDashboard() {
  return (
    <div>Chao mung admin</div>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   BarChart3,
//   Calendar,
//   Users,
//   Bed,
//   DollarSign,
//   TrendingUp,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Plus,
//   Download,
//   Bell,
//   Settings,
//   LogOut,
//   Home,
//   Star,
//   MessageSquare,
//   CheckCircle,
//   XCircle,
//   Trash2,
//   AlertCircle,
// } from "lucide-react"
// import Link from "next/link"
// import { useAuth } from "@/contexts/auth-context"
// import { BookingService, type Booking } from "@/lib/booking"
// import { ReviewService, type Review } from "@/lib/reviews"

// interface Room {
//   id: string
//   name: string
//   type: string
//   price: number
//   capacity: number
//   total: number
//   available: number
//   occupied: number
//   maintenance: number
//   status: "active" | "inactive"
//   description: string
//   amenities: string[]
//   images: string[]
// }

// const initialRooms: Room[] = [
//   {
//     id: "1",
//     name: "Phòng Superior",
//     type: "Superior",
//     price: 650000,
//     capacity: 2,
//     total: 20,
//     available: 15,
//     occupied: 3,
//     maintenance: 2,
//     status: "active",
//     description: "Phòng Superior với thiết kế hiện đại và đầy đủ tiện nghi",
//     amenities: ["WiFi miễn phí", "Điều hòa", "TV màn hình phẳng", "Minibar"],
//     images: ["/elegant-hotel-room-with-modern-furniture-and-city-.jpg"],
//   },
//   {
//     id: "2",
//     name: "Phòng Deluxe",
//     type: "Deluxe",
//     price: 900000,
//     capacity: 3,
//     total: 15,
//     available: 10,
//     occupied: 4,
//     maintenance: 1,
//     status: "active",
//     description: "Phòng Deluxe rộng rãi với view thành phố tuyệt đẹp",
//     amenities: ["WiFi miễn phí", "Điều hòa", "TV màn hình phẳng", "Minibar", "Ban công"],
//     images: ["/luxury-hotel-deluxe-room-with-balcony-and-premium-.jpg"],
//   },
//   {
//     id: "3",
//     name: "Phòng Suite",
//     type: "Suite",
//     price: 1800000,
//     capacity: 4,
//     total: 8,
//     available: 6,
//     occupied: 2,
//     maintenance: 0,
//     status: "active",
//     description: "Phòng Suite cao cấp với không gian sang trọng",
//     amenities: ["WiFi miễn phí", "Điều hòa", "TV màn hình phẳng", "Minibar", "Ban công", "Phòng khách riêng"],
//     images: ["/luxury-hotel-suite-bedroom-with-elegant-decor.jpg"],
//   },
// ]

// export function AdminDashboard() {
//   const { user, logout } = useAuth()
//   const [activeTab, setActiveTab] = useState("overview")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [bookings, setBookings] = useState<Booking[]>([])
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [rooms, setRooms] = useState<Room[]>(initialRooms)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
//   const [selectedReview, setSelectedReview] = useState<Review | null>(null)
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
//   const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true)
//         const [bookingData, reviewData] = await Promise.all([
//           BookingService.getAllBookings(),
//           ReviewService.getAllReviews(),
//         ])
//         setBookings(bookingData)
//         setReviews(reviewData)
//       } catch (error) {
//         console.error("Failed to load admin data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesSearch =
//       (booking.guestName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (booking.id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (booking.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || booking.status === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const totalRevenue = bookings
//     .filter((b) => b.status === "confirmed" || b.status === "completed")
//     .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0) // Added null check for totalAmount
//   const totalBookings = bookings.length
//   const occupancyRate =
//     Math.round(
//       (rooms.reduce((sum, room) => sum + room.occupied, 0) / rooms.reduce((sum, room) => sum + room.total, 0)) * 100,
//     ) || 0 // Added fallback for NaN case
//   const pendingReviews = reviews.filter((r) => r.status === "pending").length

//   const handleBookingStatusUpdate = async (bookingId: string, newStatus: Booking["status"]) => {
//     try {
//       await BookingService.updateBookingStatus(bookingId, newStatus)
//       setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)))
//     } catch (error) {
//       console.error("Failed to update booking status:", error)
//     }
//   }

//   const handleReviewModeration = async (reviewId: string, status: "approved" | "rejected", adminResponse?: string) => {
//     try {
//       await ReviewService.updateReviewStatus(reviewId, status, adminResponse)
//       setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, status, adminResponse } : r)))
//       setIsReviewDialogOpen(false)
//     } catch (error) {
//       console.error("Failed to moderate review:", error)
//     }
//   }

//   const handleRoomSave = (roomData: Partial<Room>) => {
//     if (selectedRoom) {
//       // Update existing room
//       setRooms((prev) => prev.map((r) => (r.id === selectedRoom.id ? { ...r, ...roomData } : r)))
//     } else {
//       // Create new room
//       const newRoom: Room = {
//         id: Date.now().toString(),
//         name: roomData.name || "",
//         type: roomData.type || "",
//         price: roomData.price || 0,
//         capacity: roomData.capacity || 1,
//         total: roomData.total || 1,
//         available: roomData.total || 1,
//         occupied: 0,
//         maintenance: 0,
//         status: "active",
//         description: roomData.description || "",
//         amenities: roomData.amenities || [],
//         images: roomData.images || [],
//       }
//       setRooms((prev) => [...prev, newRoom])
//     }
//     setIsRoomDialogOpen(false)
//     setSelectedRoom(null)
//   }

//   const handleRoomDelete = (roomId: string) => {
//     setRooms((prev) => prev.filter((r) => r.id !== roomId))
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "confirmed":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đã xác nhận</Badge>
//       case "pending":
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ xác nhận</Badge>
//       case "cancelled":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Đã hủy</Badge>
//       case "completed":
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Hoàn thành</Badge>
//       default:
//         return <Badge variant="secondary">{status}</Badge>
//     }
//   }

//   const getPaymentBadge = (status: string) => {
//     switch (status) {
//       case "paid":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đã thanh toán</Badge>
//       case "pending":
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ thanh toán</Badge>
//       case "failed":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Thất bại</Badge>
//       default:
//         return <Badge variant="secondary">{status}</Badge>
//     }
//   }

//   const getReviewStatusBadge = (status: Review["status"]) => {
//     const config = ReviewService.getStatusBadge(status)
//     return <Badge variant={config.variant}>{config.label}</Badge>
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <div className="w-64 bg-card border-r border-border">
//         <div className="p-6">
//           <nav className="space-y-2">
//             <Button
//               variant={activeTab === "overview" ? "default" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActiveTab("overview")}
//             >
//               <BarChart3 className="mr-2 h-4 w-4" />
//               Tổng quan
//             </Button>
//             <Button
//               variant={activeTab === "bookings" ? "default" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActiveTab("bookings")}
//             >
//               <Calendar className="mr-2 h-4 w-4" />
//               Đặt phòng
//               {bookings.filter((b) => b.status === "pending").length > 0 && (
//                 <Badge className="ml-auto bg-red-500 text-white">
//                   {bookings.filter((b) => b.status === "pending").length}
//                 </Badge>
//               )}
//             </Button>
//             <Button
//               variant={activeTab === "rooms" ? "default" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActiveTab("rooms")}
//             >
//               <Bed className="mr-2 h-4 w-4" />
//               Quản lý phòng
//             </Button>
//             <Button
//               variant={activeTab === "guests" ? "default" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActiveTab("guests")}
//             >
//               <Users className="mr-2 h-4 w-4" />
//               Khách hàng
//             </Button>
//             <Button
//               variant={activeTab === "reviews" ? "default" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActiveTab("reviews")}
//             >
//               <MessageSquare className="mr-2 h-4 w-4" />
//               Đánh giá
//               {pendingReviews > 0 && <Badge className="ml-auto bg-red-500 text-white">{pendingReviews}</Badge>}
//             </Button>
//           </nav>
//         </div>

//         <div className="absolute bottom-0 w-64 p-6 border-t border-border">
//           <div className="space-y-2">
//             <Button variant="ghost" className="w-full justify-start" asChild>
//               <Link href="/">
//                 <Home className="mr-2 h-4 w-4" />
//                 Về trang chủ
//               </Link>
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <Settings className="mr-2 h-4 w-4" />
//               Cài đặt
//             </Button>
//             <Button variant="ghost" className="w-full justify-start" onClick={logout}>
//               <LogOut className="mr-2 h-4 w-4" />
//               Đăng xuất
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <div className="bg-card border-b border-border p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-serif font-bold text-primary">
//                 {activeTab === "overview" && "Tổng quan"}
//                 {activeTab === "bookings" && "Quản lý đặt phòng"}
//                 {activeTab === "rooms" && "Quản lý phòng"}
//                 {activeTab === "guests" && "Quản lý khách hàng"}
//                 {activeTab === "reviews" && "Quản lý đánh giá"}
//               </h1>
//               <p className="text-muted-foreground">
//                 Xin chào, {user?.name}! Quản lý và theo dõi hoạt động của khách sạn
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <Button variant="outline" size="sm">
//                 <Download className="mr-2 h-4 w-4" />
//                 Xuất báo cáo
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Bell className="h-4 w-4" />
//                 {pendingReviews + bookings.filter((b) => b.status === "pending").length > 0 && (
//                   <Badge className="ml-1 bg-red-500 text-white">
//                     {pendingReviews + bookings.filter((b) => b.status === "pending").length}
//                   </Badge>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           {/* Overview Tab */}
//           {activeTab === "overview" && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
//                         <p className="text-2xl font-bold text-accent">{(totalRevenue || 0).toLocaleString("vi-VN")}₫</p>{" "}
//                         {/* Added null check before toLocaleString */}
//                       </div>
//                       <DollarSign className="h-8 w-8 text-accent" />
//                     </div>
//                     <div className="flex items-center mt-2 text-sm">
//                       <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
//                       <span className="text-green-600">+12%</span>
//                       <span className="text-muted-foreground ml-1">so với tháng trước</span>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Tổng đặt phòng</p>
//                         <p className="text-2xl font-bold">{totalBookings}</p>
//                       </div>
//                       <Calendar className="h-8 w-8 text-blue-600" />
//                     </div>
//                     <div className="flex items-center mt-2 text-sm">
//                       <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
//                       <span className="text-green-600">+8%</span>
//                       <span className="text-muted-foreground ml-1">so với tháng trước</span>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Tỷ lệ lấp đầy</p>
//                         <p className="text-2xl font-bold">{occupancyRate}%</p>
//                       </div>
//                       <Bed className="h-8 w-8 text-purple-600" />
//                     </div>
//                     <div className="flex items-center mt-2 text-sm">
//                       <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
//                       <span className="text-green-600">+5%</span>
//                       <span className="text-muted-foreground ml-1">so với tháng trước</span>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Đánh giá chờ duyệt</p>
//                         <p className="text-2xl font-bold">{pendingReviews}</p>
//                       </div>
//                       <Star className="h-8 w-8 text-yellow-600" />
//                     </div>
//                     <div className="flex items-center mt-2 text-sm">
//                       <AlertCircle className="h-4 w-4 text-orange-600 mr-1" />
//                       <span className="text-orange-600">Cần xử lý</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Recent Activity */}
//               <div className="grid lg:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Đặt phòng gần đây</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {bookings.slice(0, 5).map((booking) => (
//                         <div
//                           key={booking.id}
//                           className="flex items-center justify-between p-4 border border-border rounded-lg"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
//                               <Users className="h-5 w-5 text-accent" />
//                             </div>
//                             <div>
//                               <div className="font-medium">{booking.guestName}</div>
//                               <div className="text-sm text-muted-foreground">
//                                 {booking.roomDetails.roomType} • {booking.checkIn} - {booking.dates.checkOut}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-medium">{(booking.totalAmount || 0).toLocaleString("vi-VN")}₫</div>{" "}
//                             {/* Added null check for booking amount */}
//                             <div className="flex gap-2 mt-1">{getStatusBadge(booking.status)}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Đánh giá mới nhất</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {reviews.slice(0, 5).map((review) => (
//                         <div
//                           key={review.id}
//                           className="flex items-center justify-between p-4 border border-border rounded-lg"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
//                               <Star className="h-5 w-5 text-accent" />
//                             </div>
//                             <div>
//                               <div className="font-medium">{review.userName}</div>
//                               <div className="text-sm text-muted-foreground">
//                                 {ReviewService.renderStars(review.rating)} • {review.title}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="text-right">{getReviewStatusBadge(review.status)}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           )}

//           {/* Bookings Tab */}
//           {activeTab === "bookings" && (
//             <div className="space-y-6">
//               {/* Filters */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                     <Input
//                       placeholder="Tìm kiếm theo tên khách, email hoặc mã đặt phòng..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="w-48">
//                     <Filter className="mr-2 h-4 w-4" />
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">Tất cả trạng thái</SelectItem>
//                     <SelectItem value="confirmed">Đã xác nhận</SelectItem>
//                     <SelectItem value="pending">Chờ xác nhận</SelectItem>
//                     <SelectItem value="cancelled">Đã hủy</SelectItem>
//                     <SelectItem value="completed">Hoàn thành</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
//                   <Plus className="mr-2 h-4 w-4" />
//                   Thêm đặt phòng
//                 </Button>
//               </div>

//               {/* Bookings Table */}
//               <Card>
//                 <CardContent className="p-0">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="border-b border-border">
//                         <tr className="text-left">
//                           <th className="p-4 font-medium">Mã đặt phòng</th>
//                           <th className="p-4 font-medium">Khách hàng</th>
//                           <th className="p-4 font-medium">Phòng</th>
//                           <th className="p-4 font-medium">Ngày</th>
//                           <th className="p-4 font-medium">Số tiền</th>
//                           <th className="p-4 font-medium">Trạng thái</th>
//                           <th className="p-4 font-medium">Thanh toán</th>
//                           <th className="p-4 font-medium">Thao tác</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredBookings.map((booking) => (
//                           <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
//                             <td className="p-4 font-mono text-sm">{booking.id}</td>
//                             <td className="p-4">
//                               <div>
//                                 <div className="font-medium">{booking.guestName}</div>
//                                 <div className="text-sm text-muted-foreground">{booking.email}</div>
//                               </div>
//                             </td>
//                             <td className="p-4">
//                               <div>
//                                 <div className="font-medium">{booking.roomType}</div>
//                                 <div className="text-sm text-muted-foreground">{booking.guests} khách</div>
//                               </div>
//                             </td>
//                             <td className="p-4">
//                               <div>
//                                 <div className="font-medium">{booking.checkIn}</div>
//                                 <div className="text-sm text-muted-foreground">đến {booking.checkOut}</div>
//                               </div>
//                             </td>
//                             <td className="p-4 font-medium">{(booking.totalAmount || 0).toLocaleString("vi-VN")}₫</td>{" "}
//                             {/* Added null check for booking amount */}
//                             <td className="p-4">{getStatusBadge(booking.status)}</td>
//                             <td className="p-4">{getPaymentBadge(booking.paymentStatus)}</td>
//                             <td className="p-4">
//                               <div className="flex gap-2">
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => {
//                                     setSelectedBooking(booking)
//                                     setIsEditDialogOpen(true)
//                                   }}
//                                 >
//                                   <Eye className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                   <Edit className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                   <MoreHorizontal className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* Rooms Tab */}
//           {activeTab === "rooms" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold">Quản lý phòng</h2>
//                   <p className="text-muted-foreground">Theo dõi tình trạng và quản lý các loại phòng</p>
//                 </div>
//                 <Button
//                   className="bg-accent hover:bg-accent/90 text-accent-foreground"
//                   onClick={() => {
//                     setSelectedRoom(null)
//                     setIsRoomDialogOpen(true)
//                   }}
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Thêm loại phòng
//                 </Button>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {rooms.map((room) => (
//                   <Card key={room.id}>
//                     <CardHeader>
//                       <div className="flex items-center justify-between">
//                         <CardTitle className="text-lg">{room.name}</CardTitle>
//                         <Badge variant="secondary">{room.status === "active" ? "Hoạt động" : "Tạm dừng"}</Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <div className="text-muted-foreground">Giá phòng</div>
//                           <div className="font-medium">{room.price.toLocaleString("vi-VN")}₫/đêm</div>
//                         </div>
//                         <div>
//                           <div className="text-muted-foreground">Sức chứa</div>
//                           <div className="font-medium">{room.capacity} khách</div>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span>Tổng số phòng</span>
//                           <span className="font-medium">{room.total}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-green-600">Còn trống</span>
//                           <span className="font-medium text-green-600">{room.available}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-blue-600">Đang sử dụng</span>
//                           <span className="font-medium text-blue-600">{room.occupied}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-orange-600">Bảo trì</span>
//                           <span className="font-medium text-orange-600">{room.maintenance}</span>
//                         </div>
//                       </div>

//                       <div className="flex gap-2 pt-4">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1 bg-transparent"
//                           onClick={() => {
//                             setSelectedRoom(room)
//                             setIsRoomDialogOpen(true)
//                           }}
//                         >
//                           <Edit className="mr-2 h-4 w-4" />
//                           Chỉnh sửa
//                         </Button>
//                         <Button variant="outline" size="sm" onClick={() => handleRoomDelete(room.id)}>
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Guests Tab */}
//           {activeTab === "guests" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold">Quản lý khách hàng</h2>
//                   <p className="text-muted-foreground">Danh sách và thông tin khách hàng</p>
//                 </div>
//                 <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
//                   <Plus className="mr-2 h-4 w-4" />
//                   Thêm khách hàng
//                 </Button>
//               </div>

//               <Card>
//                 <CardContent className="p-0">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="border-b border-border">
//                         <tr className="text-left">
//                           <th className="p-4 font-medium">Tên khách hàng</th>
//                           <th className="p-4 font-medium">Email</th>
//                           <th className="p-4 font-medium">Số điện thoại</th>
//                           <th className="p-4 font-medium">Số lần đặt</th>
//                           <th className="p-4 font-medium">Tổng chi tiêu</th>
//                           <th className="p-4 font-medium">Lần cuối</th>
//                           <th className="p-4 font-medium">Thao tác</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {bookings.map((booking) => (
//                           <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
//                             <td className="p-4 font-medium">{booking.guestName}</td>
//                             <td className="p-4">{booking.email}</td>
//                             <td className="p-4">{booking.phone}</td>
//                             <td className="p-4">1</td>
//                             <td className="p-4 font-medium">{(booking.totalAmount || 0).toLocaleString("vi-VN")}₫</td>{" "}
//                             {/* Added null check for booking amount */}
//                             <td className="p-4">{booking.createdAt}</td>
//                             <td className="p-4">
//                               <div className="flex gap-2">
//                                 <Button variant="ghost" size="sm">
//                                   <Eye className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                   <Edit className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                   <MoreHorizontal className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* Reviews Tab - NEW */}
//           {activeTab === "reviews" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold">Quản lý đánh giá</h2>
//                   <p className="text-muted-foreground">Kiểm duyệt và quản lý đánh giá từ khách hàng</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Select value={statusFilter} onValueChange={setStatusFilter}>
//                     <SelectTrigger className="w-48">
//                       <Filter className="mr-2 h-4 w-4" />
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">Tất cả trạng thái</SelectItem>
//                       <SelectItem value="pending">Chờ duyệt</SelectItem>
//                       <SelectItem value="approved">Đã duyệt</SelectItem>
//                       <SelectItem value="rejected">Từ chối</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid gap-6">
//                 {reviews
//                   .filter((review) => statusFilter === "all" || review.status === statusFilter)
//                   .map((review) => (
//                     <Card key={review.id} className="hover:shadow-md transition-shadow">
//                       <CardContent className="p-6">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
//                               <Users className="h-5 w-5 text-accent" />
//                             </div>
//                             <div>
//                               <div className="font-medium">{review.userName}</div>
//                               <div className="text-sm text-muted-foreground">
//                                 {new Date(review.createdAt).toLocaleDateString("vi-VN")} • {review.roomType}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="flex">{ReviewService.renderStars(review.rating)}</div>
//                             {getReviewStatusBadge(review.status)}
//                           </div>
//                         </div>

//                         <div className="mb-4">
//                           <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
//                           <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
//                         </div>

//                         {review.adminResponse && (
//                           <div className="bg-accent/5 border-l-4 border-accent p-4 mb-4">
//                             <div className="flex items-center gap-2 mb-2">
//                               <Badge className="bg-accent text-accent-foreground">Phản hồi từ khách sạn</Badge>
//                             </div>
//                             <p className="text-sm">{review.adminResponse}</p>
//                           </div>
//                         )}

//                         <div className="flex items-center justify-between pt-4 border-t border-border">
//                           <div className="text-sm text-muted-foreground">Đặt phòng: {review.bookingId}</div>
//                           <div className="flex gap-2">
//                             {review.status === "pending" && (
//                               <>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => handleReviewModeration(review.id, "approved")}
//                                   className="text-green-600 hover:text-green-700"
//                                 >
//                                   <CheckCircle className="h-4 w-4 mr-1" />
//                                   Duyệt
//                                 </Button>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => {
//                                     setSelectedReview(review)
//                                     setIsReviewDialogOpen(true)
//                                   }}
//                                   className="text-red-600 hover:text-red-700"
//                                 >
//                                   <XCircle className="h-4 w-4 mr-1" />
//                                   Từ chối
//                                 </Button>
//                               </>
//                             )}
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => {
//                                 setSelectedReview(review)
//                                 setIsReviewDialogOpen(true)
//                               }}
//                             >
//                               <MessageSquare className="h-4 w-4 mr-1" />
//                               Phản hồi
//                             </Button>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Booking Details Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle>Chi tiết đặt phòng</DialogTitle>
//           </DialogHeader>
//           {selectedBooking && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label>Mã đặt phòng</Label>
//                   <p className="font-medium">{selectedBooking.id}</p>
//                 </div>
//                 <div>
//                   <Label>Tên khách hàng</Label>
//                   <p className="font-medium">{selectedBooking.guestName}</p>
//                 </div>
//                 <div>
//                   <Label>Email</Label>
//                   <p className="font-medium">{selectedBooking.email}</p>
//                 </div>
//                 <div>
//                   <Label>Số điện thoại</Label>
//                   <p className="font-medium">{selectedBooking.phone}</p>
//                 </div>
//                 <div>
//                   <Label>Loại phòng</Label>
//                   <p className="font-medium">{selectedBooking.roomType}</p>
//                 </div>
//                 <div>
//                   <Label>Số khách</Label>
//                   <p className="font-medium">{selectedBooking.guests}</p>
//                 </div>
//                 <div>
//                   <Label>Ngày nhận phòng</Label>
//                   <p className="font-medium">{selectedBooking.checkIn}</p>
//                 </div>
//                 <div>
//                   <Label>Ngày trả phòng</Label>
//                   <p className="font-medium">{selectedBooking.checkOut}</p>
//                 </div>
//                 <div>
//                   <Label>Số đêm</Label>
//                   <p className="font-medium">{selectedBooking.nights}</p>
//                 </div>
//                 <div>
//                   <Label>Tổng số tiền</Label>
//                   <p className="font-medium">{(selectedBooking.totalAmount || 0).toLocaleString("vi-VN")}₫</p>{" "}
//                   {/* Added null check for selected booking amount */}
//                 </div>
//                 <div>
//                   <Label>Trạng thái</Label>
//                   <p className="font-medium">{getStatusBadge(selectedBooking.status)}</p>
//                 </div>
//                 <div>
//                   <Label>Thanh toán</Label>
//                   <p className="font-medium">{getPaymentBadge(selectedBooking.paymentStatus)}</p>
//                 </div>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//                   Đóng
//                 </Button>
//                 {selectedBooking.status === "pending" && (
//                   <Button
//                     variant="outline"
//                     onClick={() => handleBookingStatusUpdate(selectedBooking.id, "confirmed")}
//                     className="text-green-600 hover:text-green-700"
//                   >
//                     Xác nhận đặt phòng
//                   </Button>
//                 )}
//                 {selectedBooking.status === "confirmed" && (
//                   <Button
//                     variant="outline"
//                     onClick={() => handleBookingStatusUpdate(selectedBooking.id, "completed")}
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     Hoàn thành đặt phòng
//                   </Button>
//                 )}
//                 {selectedBooking.status !== "cancelled" && (
//                   <Button
//                     variant="outline"
//                     onClick={() => handleBookingStatusUpdate(selectedBooking.id, "cancelled")}
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     Hủy đặt phòng
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Room Management Dialog */}
//       <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{selectedRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}</DialogTitle>
//           </DialogHeader>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault()
//               const formData = new FormData(e.currentTarget)
//               handleRoomSave({
//                 name: formData.get("name") as string,
//                 type: formData.get("type") as string,
//                 price: Number.parseFloat(formData.get("price") as string),
//                 capacity: Number.parseInt(formData.get("capacity") as string),
//                 total: Number.parseInt(formData.get("total") as string),
//                 description: formData.get("description") as string,
//                 amenities: (formData.get("amenities") as string).split(",").map((a) => a.trim()),
//                 images: (formData.get("images") as string).split(",").map((i) => i.trim()),
//               })
//             }}
//           >
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="name">Tên phòng</Label>
//                   <Input id="name" name="name" defaultValue={selectedRoom?.name} required />
//                 </div>
//                 <div>
//                   <Label htmlFor="type">Loại phòng</Label>
//                   <Input id="type" name="type" defaultValue={selectedRoom?.type} required />
//                 </div>
//                 <div>
//                   <Label htmlFor="price">Giá phòng (₫)</Label>
//                   <Input id="price" name="price" type="number" defaultValue={selectedRoom?.price} required />
//                 </div>
//                 <div>
//                   <Label htmlFor="capacity">Sức chứa (khách)</Label>
//                   <Input id="capacity" name="capacity" type="number" defaultValue={selectedRoom?.capacity} required />
//                 </div>
//                 <div>
//                   <Label htmlFor="total">Tổng số phòng</Label>
//                   <Input id="total" name="total" type="number" defaultValue={selectedRoom?.total} required />
//                 </div>
//                 <div>
//                   <Label htmlFor="status">Trạng thái</Label>
//                   <Select name="status" defaultValue={selectedRoom?.status}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Chọn trạng thái" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="active">Hoạt động</SelectItem>
//                       <SelectItem value="inactive">Tạm dừng</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="description">Mô tả</Label>
//                 <Textarea id="description" name="description" defaultValue={selectedRoom?.description} required />
//               </div>
//               <div>
//                 <Label htmlFor="amenities">Tiện nghi (cách nhau bằng dấu phẩy)</Label>
//                 <Input id="amenities" name="amenities" defaultValue={selectedRoom?.amenities.join(", ")} />
//               </div>
//               <div>
//                 <Label htmlFor="images">Hình ảnh (URL, cách nhau bằng dấu phẩy)</Label>
//                 <Input id="images" name="images" defaultValue={selectedRoom?.images.join(", ")} />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button variant="outline" onClick={() => setIsRoomDialogOpen(false)}>
//                   Hủy
//                 </Button>
//                 <Button type="submit" className="bg-accent hover:bg-accent/90">
//                   Lưu
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Review Moderation Dialog */}
//       <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Kiểm duyệt đánh giá</DialogTitle>
//           </DialogHeader>
//           {selectedReview && (
//             <div className="space-y-4">
//               <div className="bg-muted/50 p-4 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="flex">{ReviewService.renderStars(selectedReview.rating)}</div>
//                   <span className="font-medium">{selectedReview.userName}</span>
//                 </div>
//                 <h3 className="font-semibold mb-2">{selectedReview.title}</h3>
//                 <p className="text-sm text-muted-foreground">{selectedReview.comment}</p>
//               </div>

//               <div>
//                 <Label htmlFor="adminResponse">Phản hồi từ khách sạn (tùy chọn)</Label>
//                 <Textarea id="adminResponse" placeholder="Nhập phản hồi của bạn..." className="mt-1" />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
//                   Hủy
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => handleReviewModeration(selectedReview.id, "rejected")}
//                   className="text-red-600 hover:text-red-700"
//                 >
//                   Từ chối
//                 </Button>
//                 <Button
//                   onClick={() => handleReviewModeration(selectedReview.id, "approved")}
//                   className="bg-accent hover:bg-accent/90"
//                 >
//                   Duyệt đánh giá
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
