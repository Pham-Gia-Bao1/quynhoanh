"use client";

import { User } from "./auth";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  roomId?: string;
  roomType: string;
  bookingId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";

  // Thêm mới
  pros: string[];
  cons: string[];
  images: string[];
  stayDate: string;

  adminResponse?: string;
  adminResponseAt?: string;
  moderatorNotes?: string;

  helpfulVotes?: string[];
  reports?: string[];

  adminReply?: {
    createdAt: string;
    message: string;
    adminName: string;
  };
}

export interface ReviewFormData {
  bookingId: string;
  roomId?: string;
  roomType: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;

  pros: string[];
  cons: string[];
  images: string[];
  stayDate: string;
}

export class ReviewService {
  private static STORAGE_KEY = "hotel_reviews";

  static getAllReviews(): Review[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static saveReviews(reviews: Review[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }

  static async createReview(
    reviewData: ReviewFormData,
    user: User
  ): Promise<Review> {
    const reviews = this.getAllReviews();

    // Check if user already reviewed this booking
    const existingReview = reviews.find(
      (r) => r.bookingId === reviewData.bookingId && r.userId === user.id
    );
    if (existingReview) {
      throw new Error("Bạn đã đánh giá cho đặt phòng này rồi");
    }

    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "pending",
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      helpfulVotes: [], // mặc định
      reports: [], // mặc định
    };

    reviews.unshift(newReview);
    this.saveReviews(reviews);
    return newReview;
  }

  static getUserReviews(userId: string): Review[] {
    const reviews = this.getAllReviews();
    return reviews.filter((review) => review.userId === userId);
  }

  static getApprovedReviews(): Review[] {
    const reviews = this.getAllReviews();
    return reviews.filter((review) => review.status === "approved");
  }

  static updateReviewStatus(
    reviewId: string,
    status: "approved" | "rejected",
    adminResponse?: string
  ): void {
    const reviews = this.getAllReviews();
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      throw new Error("Không tìm thấy đánh giá");
    }

    reviews[reviewIndex].status = status;
    if (adminResponse) {
      reviews[reviewIndex].adminResponse = adminResponse;
      reviews[reviewIndex].adminResponseAt = new Date().toISOString();
    }

    this.saveReviews(reviews);
  }

  static renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  }

  static voteHelpful(reviewId: string, userId: string): void {
    const reviews = this.getAllReviews();
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) throw new Error("Không tìm thấy đánh giá");

    if (!review.helpfulVotes) review.helpfulVotes = [];
    if (!review.helpfulVotes.includes(userId)) {
      review.helpfulVotes.push(userId);
    }

    this.saveReviews(reviews);
  }

  static getStatusBadge(status: Review["status"]) {
    const statusConfig = {
      pending: {
        label: "Chờ duyệt",
        variant: "secondary" as const,
        className: "bg-gray-200 text-gray-800",
      },
      approved: {
        label: "Đã duyệt",
        variant: "default" as const,
        className: "bg-green-500 text-white",
      },
      rejected: {
        label: "Từ chối",
        variant: "destructive" as const,
        className: "bg-red-500 text-white",
      },
    };
    return statusConfig[status];
  }

  static reportReview(reviewId: string, userId: string): void {
    const reviews = this.getAllReviews();
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) throw new Error("Không tìm thấy đánh giá");

    if (!review.reports) review.reports = [];
    if (!review.reports.includes(userId)) {
      review.reports.push(userId);
    }

    this.saveReviews(reviews);
  }

  static getAverageRating(): number {
    const approvedReviews = this.getApprovedReviews();
    if (approvedReviews.length === 0) return 0;
    const total = approvedReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Math.round((total / approvedReviews.length) * 10) / 10;
  }

  static getRatingDistribution(): Record<number, number> {
    const approvedReviews = this.getApprovedReviews();
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    approvedReviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });

    return distribution;
  }
}
