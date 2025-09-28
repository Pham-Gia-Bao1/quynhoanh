"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star } from "lucide-react"
import { motion } from "framer-motion"

const slides = [
  {
    image: "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    title: "Chào mừng đến với Khách sạn Quỳnh Oanh",
    desc: "Trải nghiệm sự sang trọng và thoải mái tại khách sạn hàng đầu Việt Nam. Dịch vụ đẳng cấp, tiện nghi hiện đại trong không gian ấm cúng.",
  },
  {
    image: "/luxury-hotel-room-with-modern-interior.png",
    title: "Phòng nghỉ cao cấp",
    desc: "Thiết kế hiện đại, trang thiết bị đầy đủ. Mỗi căn phòng đều mang lại cảm giác thư giãn tuyệt đối.",
  },
  {
    image: "/resort-pool-evening.png",
    title: "Không gian thư giãn tuyệt vời",
    desc: "Hồ bơi, spa, và nhiều tiện ích giải trí giúp bạn tận hưởng kỳ nghỉ trọn vẹn.",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Track container */}
      <motion.div
        className="absolute inset-0 flex"
        animate={{ x: `-${current * 100}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
          {slides[current].title.split("Khách sạn Quỳnh Oanh")[0]}
          <br />
          <span className="text-accent">Khách sạn Quỳnh Oanh</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          {slides[current].desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Đặt phòng ngay
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 bg-transparent"
          >
            Khám phá phòng
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Trung tâm thành phố</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Khách sạn 5 sao</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Phục vụ 24/7</span>
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center mt-8 gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                current === i ? "bg-accent scale-125" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
