"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, X, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ReviewService, type ReviewFormData } from "@/lib/reviews"

interface ReviewFormProps {
  bookingId: string
  roomType: string
  stayDate: string
  onSuccess?: () => void
}

export function ReviewForm({ bookingId, roomType, stayDate, onSuccess }: ReviewFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState<ReviewFormData>({
    bookingId,
    roomType,
    rating: 0,
    title: "",
    comment: "",
    pros: [""],
    cons: [""],
    images: [],
    stayDate,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (formData.rating === 0) {
      setMessage({ type: "error", text: "Vui lòng chọn số sao đánh giá" })
      return
    }

    if (formData.comment.trim().length < 10) {
      setMessage({ type: "error", text: "Nhận xét phải có ít nhất 10 ký tự" })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      await ReviewService.createReview(formData, user)
      setMessage({
        type: "success",
        text: "Cảm ơn bạn đã đánh giá! Đánh giá của bạn sẽ được hiển thị sau khi được duyệt.",
      })
      onSuccess?.()
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Đã xảy ra lỗi",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const setRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const addPro = () => {
    setFormData((prev) => ({ ...prev, pros: [...prev.pros, ""] }))
  }

  const removePro = (index: number) => {
    setFormData((prev) => ({ ...prev, pros: prev.pros.filter((_, i) => i !== index) }))
  }

  const updatePro = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      pros: prev.pros.map((pro, i) => (i === index ? value : pro)),
    }))
  }

  const addCon = () => {
    setFormData((prev) => ({ ...prev, cons: [...prev.cons, ""] }))
  }

  const removeCon = (index: number) => {
    setFormData((prev) => ({ ...prev, cons: prev.cons.filter((_, i) => i !== index) }))
  }

  const updateCon = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      cons: prev.cons.map((con, i) => (i === index ? value : con)),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đánh giá trải nghiệm của bạn</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">{roomType}</Badge>
          <span>•</span>
          <span>Lưu trú: {new Date(stayDate).toLocaleDateString("vi-VN")}</span>
        </div>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
            {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Đánh giá tổng thể *</Label>
            <div className="flex items-center gap-2 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="transition-colors hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      i < formData.rating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating > 0 && `${formData.rating}/5 sao`}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Tiêu đề đánh giá *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Tóm tắt trải nghiệm của bạn..."
              className="mt-1"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">Nhận xét chi tiết *</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Chia sẻ trải nghiệm chi tiết của bạn về phòng, dịch vụ, nhân viên..."
              className="mt-1 min-h-[120px]"
              required
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.comment.length}/500 ký tự</div>
          </div>

          {/* Pros */}
          <div>
            <Label className="text-base font-medium">Điểm tích cực</Label>
            <div className="space-y-2 mt-2">
              {formData.pros.map((pro, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={pro}
                    onChange={(e) => updatePro(index, e.target.value)}
                    placeholder="Điều bạn thích..."
                    className="flex-1"
                  />
                  {formData.pros.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removePro(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addPro} className="bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Thêm điểm tích cực
              </Button>
            </div>
          </div>

          {/* Cons */}
          <div>
            <Label className="text-base font-medium">Điểm cần cải thiện</Label>
            <div className="space-y-2 mt-2">
              {formData.cons.map((con, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={con}
                    onChange={(e) => updateCon(index, e.target.value)}
                    placeholder="Điều cần cải thiện..."
                    className="flex-1"
                  />
                  {formData.cons.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeCon(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addCon} className="bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Thêm điểm cần cải thiện
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Lưu ý:</strong> Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị công khai. Vui lòng viết
              đánh giá trung thực và tôn trọng.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || formData.rating === 0}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
