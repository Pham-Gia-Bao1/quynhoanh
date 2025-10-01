"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)

      // Redirect based on user role (will be handled by auth context)
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link href="/auth/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">hoặc</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="text-accent hover:text-accent/80 font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">Tài khoản demo:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <strong>Admin:</strong> admin@quynhoanh.com / admin123
            </p>
            <p>
              <strong>Khách hàng:</strong> customer@example.com / customer123
            </p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}
