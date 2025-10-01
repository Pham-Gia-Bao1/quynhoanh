"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@quynhoanh.com</span>
            </div>
          </div>
          <div className="text-accent font-medium">Chào mừng đến với Khách sạn Quỳnh Oanh</div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary">Quỳnh Oanh</h1>
            <span className="ml-2 text-sm text-muted-foreground font-light">HOTEL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Trang chủ
            </Link>
            <Link href="/rooms" className="text-foreground hover:text-accent transition-colors">
              Phòng
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
              Liên hệ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Thông tin cá nhân
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Quản trị
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/booking">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Đặt phòng ngay</Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/auth/login">
                  <Button variant="ghost">Đăng nhập</Button>
                </Link>
               {/* add register  */}
                <Link href="/auth/register">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Đăng ký</Button>
                </Link>
                
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-accent transition-colors">
                Trang chủ
              </Link>
              <Link href="/rooms" className="text-foreground hover:text-accent transition-colors">
                Phòng
              </Link>
              <Link href="/amenities" className="text-foreground hover:text-accent transition-colors">
                Tiện ích
              </Link>
              <Link href="/about" className="text-foreground hover:text-accent transition-colors">
                Về chúng tôi
              </Link>
              <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
                Liên hệ
              </Link>

              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="text-foreground hover:text-accent transition-colors">
                    Thông tin cá nhân
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="text-foreground hover:text-accent transition-colors">
                      Quản trị
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-foreground hover:text-accent transition-colors">
                  Đăng nhập
                </Link>
              )}

              <Link href="/booking">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Đặt phòng ngay</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
