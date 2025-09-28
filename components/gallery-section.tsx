"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/luxury-hotel-lobby-with-elegant-furniture-and-warm.jpg",
    alt: "Sảnh khách sạn sang trọng",
    category: "Sảnh",
  },
  {
    id: 2,
    src: "/elegant-hotel-room-with-modern-furniture-and-city-.jpg",
    alt: "Phòng Superior hiện đại",
    category: "Phòng",
  },
  {
    id: 3,
    src: "/luxury-hotel-restaurant-with-elegant-dining-setup.jpg",
    alt: "Nhà hàng khách sạn",
    category: "Nhà hàng",
  },
  {
    id: 4,
    src: "/hotel-spa-relaxation-area-with-modern-design.jpg",
    alt: "Khu spa thư giãn",
    category: "Spa",
  },
  {
    id: 5,
    src: "/hotel-pool-city-view.png",
    alt: "Hồ bơi với view thành phố",
    category: "Tiện ích",
  },
  {
    id: 6,
    src: "/luxury-hotel-suite-bedroom-with-elegant-decor.jpg",
    alt: "Phòng Suite cao cấp",
    category: "Phòng",
  },
  {
    id: 7,
    src: "/hotel-fitness-center-with-modern-equipment.jpg",
    alt: "Phòng gym hiện đại",
    category: "Tiện ích",
  },
  {
    id: 8,
    src: "/hotel-conference-room-with-professional-setup.jpg",
    alt: "Phòng hội nghị",
    category: "Dịch vụ",
  },
]

const categories = ["Tất cả", "Sảnh", "Phòng", "Nhà hàng", "Spa", "Tiện ích", "Dịch vụ"]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "Tất cả" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = selectedImage ? filteredImages.find((img) => img.id === selectedImage) : null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-foreground mb-4">Thư Viện Ảnh</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá không gian sang trọng và tiện nghi hiện đại tại Khách sạn Quỳnh Oanh
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(image.id)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <p className="text-white/80 text-xs">{image.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && selectedImageData && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImageData.src || "/placeholder.svg"}
                alt={selectedImageData.alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-medium">{selectedImageData.alt}</p>
                <p className="text-white/80 text-sm">{selectedImageData.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
