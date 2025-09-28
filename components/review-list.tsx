"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThumbsUp, Flag, MessageCircle, User, AlertCircle } from "lucide-react"
import { ReviewService, type Review } from "@/lib/reviews"

interface ReviewListProps {
  limit?: number
  showModeration?: boolean
}

export function ReviewList({ limit, showModeration = false }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true)
        const reviewData = showModeration
          ? await ReviewService.getAllReviews()
          : await ReviewService.getApprovedReviews(limit)
        setReviews(reviewData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải đánh giá")
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [limit, showModeration])

  const handleVoteHelpful = async (reviewId: string) => {
    try {
      await ReviewService.voteHelpful(reviewId)
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? { ...review, helpfulVotes: review.helpfulVotes + 1 } : review)),
      )
    } catch (err) {
      console.error("Failed to vote helpful:", err)
    }
  }

  const handleReport = async (reviewId: string) => {
    try {
      await ReviewService.reportReview(reviewId)
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? { ...review, reportCount: review.reportCount + 1 } : review)),
      )
    } catch (err) {
      console.error("Failed to report review:", err)
    }
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

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chưa có đánh giá nào</h3>
          <p className="text-muted-foreground">Hãy là người đầu tiên đánh giá trải nghiệm của bạn!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{review.roomType}</Badge>
                {showModeration && (
                  <Badge className={ReviewService.getStatusBadge(review.status).className}>
                    {ReviewService.getStatusBadge(review.status).label}
                  </Badge>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{ReviewService.renderStars(review.rating)}</div>
                <span className="text-sm text-muted-foreground">({review.rating}/5)</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
            </div>

            {(review.pros?.length > 0 || review.cons?.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {review.pros && review.pros.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Điểm tích cực:</h4>
                    <ul className="space-y-1">
                      {review.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons && review.cons.length > 0 && (
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Cần cải thiện:</h4>
                    <ul className="space-y-1">
                      {review.cons.map((con, index) => (
                        <li key={index} className="text-sm text-orange-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-orange-600 rounded-full"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {review.adminReply && (
              <div className="bg-accent/5 border-l-4 border-accent p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-accent text-accent-foreground">Phản hồi từ khách sạn</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.adminReply.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <p className="text-sm">{review.adminReply.message}</p>
                <p className="text-xs text-muted-foreground mt-2">- {review.adminReply.adminName}</p>
              </div>
            )}

            {showModeration && review.moderatorNotes && (
              <div className="bg-muted/50 p-3 rounded-lg mb-4">
                <div className="text-sm font-medium mb-1">Ghi chú kiểm duyệt:</div>
                <div className="text-sm text-muted-foreground">{review.moderatorNotes}</div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVoteHelpful(review.id)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Hữu ích ({review.helpfulVotes})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReport(review.id)}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Flag className="h-4 w-4" />
                  Báo cáo
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Lưu trú: {new Date(review.stayDate).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
