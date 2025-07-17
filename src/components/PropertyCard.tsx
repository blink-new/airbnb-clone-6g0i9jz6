import { Link } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useState } from 'react'

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount?: number
  images: string[]
  isSuperhost?: boolean
  isWishlisted?: boolean
  onWishlistToggle?: (id: string) => void
}

export function PropertyCard({ 
  id, 
  title, 
  location, 
  price, 
  rating, 
  reviewCount, 
  images, 
  isSuperhost, 
  isWishlisted = false, 
  onWishlistToggle 
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onWishlistToggle?.(id)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <Link to={`/property/${id}`}>
      <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={images[currentImageIndex]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white hover:scale-110 transition-all"
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            />
          </Button>

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </Button>
              
              {/* Image Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <CardContent className="p-0 pt-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
              {location}
            </h3>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Star className="h-4 w-4 fill-current text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                {rating}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-1 truncate">
            {title}
          </p>
          
          {isSuperhost && (
            <p className="text-gray-600 text-sm mb-2">
              ⭐ Superhost
            </p>
          )}
          
          <div className="flex items-baseline space-x-1">
            <span className="font-semibold text-gray-900">
              ${price}
            </span>
            <span className="text-gray-600 text-sm">night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}