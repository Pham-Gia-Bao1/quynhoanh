import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RoomPreview } from "@/components/room-preview"
import { AmenitiesSection } from "@/components/amenities-section"
import { GallerySection } from "@/components/gallery-section"
import { ReviewsSection } from "@/components/reviews-section"
import { MapSection } from "@/components/map-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RoomPreview />
      <AmenitiesSection />
      <GallerySection />
      <ReviewsSection />
      <MapSection />
    </main>
  )
}
