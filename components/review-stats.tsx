"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import { ReviewService, type ReviewStats } from "@/lib/reviews"

export function ReviewStatsCard() {
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true)
        const reviewStats = await ReviewService.getReviewStats()
        setStats(reviewStats)
      } catch (err) {
        console.error("Failed to load review stats:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Đánh giá từ khách hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-accent mb-2">{stats.averageRating}</div>
          <div className="flex justify-center mb-2">
            {ReviewService.renderStars(Math.round(stats.averageRating), "lg")}
          </div>
          <div className="text-sm text-muted-foreground">Dựa trên {stats.totalReviews} đánh giá</div>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </div>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            )
          })}
        </div>

        {stats.recentReviews.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Đánh giá gần đây</h4>
            <div className="space-y-3">
              {stats.recentReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-l-2 border-accent/20 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">{ReviewService.renderStars(review.rating, "sm")}</div>
                    <span className="text-sm font-medium">{review.userName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{review.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
