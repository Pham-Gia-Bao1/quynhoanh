"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, MessageCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ReviewService, type Review } from "@/lib/reviews"

export function UserReviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadReviews = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const userReviews = await ReviewService.getUserReviews(user.id)
        setReviews(userReviews)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải đánh giá")
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [user])

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
        <CardHeader>
          <CardTitle>Đánh giá của tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Bạn chưa có đánh giá nào</p>
            <p className="text-sm text-muted-foreground mt-2">Đánh giá sẽ xuất hiện sau khi bạn hoàn thành kỳ nghỉ</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Đánh giá của tôi</h2>
          <p className="text-muted-foreground">Tất cả đánh giá bạn đã viết</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => {
          const statusConfig = ReviewService.getStatusBadge(review.status)
          return (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{review.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{review.roomType}</Badge>
                        <span>•</span>
                        <span>{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{ReviewService.renderStars(review.rating)}</div>
                    <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{review.comment}</p>

                {review.adminResponse && (
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-sm mb-2">Phản hồi từ khách sạn:</h4>
                    <p className="text-sm text-muted-foreground">{review.adminResponse}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.adminResponseAt!).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
