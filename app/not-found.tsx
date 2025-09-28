import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Không tìm thấy trang</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/rooms">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Xem phòng
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
