"use client"

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  roomId: string
  roomType: string
  bookingId: string
  rating: number
  title: string
  comment: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
  adminResponse?: string
  adminResponseAt?: string
}

export class ReviewService {
  private static STORAGE_KEY = "hotel_reviews"

  static getAllReviews(): Review[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static saveReviews(reviews: Review[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews))
  }

  static async createReview(reviewData: Omit<Review, "id" | "createdAt" | "status">): Promise<Review> {
    const reviews = this.getAllReviews()

    // Check if user already reviewed this booking
    const existingReview = reviews.find((r) => r.bookingId === reviewData.bookingId && r.userId === reviewData.userId)
    if (existingReview) {
      throw new Error("Bạn đã đánh giá cho đặt phòng này rồi")
    }

    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    reviews.unshift(newReview)
    this.saveReviews(reviews)
    return newReview
  }

  static async getUserReviews(userId: string): Promise<Review[]> {
    const reviews = this.getAllReviews()
    return reviews.filter((review) => review.userId === userId)
  }

  static async getApprovedReviews(): Promise<Review[]> {
    const reviews = this.getAllReviews()
    return reviews.filter((review) => review.status === "approved")
  }

  static async updateReviewStatus(
    reviewId: string,
    status: "approved" | "rejected",
    adminResponse?: string,
  ): Promise<void> {
    const reviews = this.getAllReviews()
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId)

    if (reviewIndex === -1) {
      throw new Error("Không tìm thấy đánh giá")
    }

    reviews[reviewIndex].status = status
    if (adminResponse) {
      reviews[reviewIndex].adminResponse = adminResponse
      reviews[reviewIndex].adminResponseAt = new Date().toISOString()
    }

    this.saveReviews(reviews)
  }

  static renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  static getStatusBadge(status: Review["status"]) {
    const statusConfig = {
      pending: { label: "Chờ duyệt", variant: "secondary" as const },
      approved: { label: "Đã duyệt", variant: "default" as const },
      rejected: { label: "Từ chối", variant: "destructive" as const },
    }
    return statusConfig[status]
  }

  static getAverageRating(): number {
    const approvedReviews = this.getApprovedReviews()
    if (approvedReviews.length === 0) return 0
    const total = approvedReviews.reduce((sum, review) => sum + review.rating, 0)
    return Math.round((total / approvedReviews.length) * 10) / 10
  }

  static getRatingDistribution(): Record<number, number> {
    const approvedReviews = this.getApprovedReviews()
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

    approvedReviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })

    return distribution
  }
}
