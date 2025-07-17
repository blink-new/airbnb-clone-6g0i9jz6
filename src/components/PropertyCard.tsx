import { Link } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useState } from 'react'

interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  images: string[]
  host: string
  type: string
}

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white hover:scale-110 transition-all"
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            />
          </Button>

          {/* Image Navigation */}
          {property.images.length > 1 && (
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
                {property.images.map((_, index) => (
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
              {property.location}
            </h3>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Star className="h-4 w-4 fill-current text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                {property.rating}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-1 truncate">
            {property.type} · Hosted by {property.host}
          </p>
          
          <p className="text-gray-600 text-sm mb-2 truncate">
            {property.title}
          </p>
          
          <div className="flex items-baseline space-x-1">
            <span className="font-semibold text-gray-900">
              ${property.price}
            </span>
            <span className="text-gray-600 text-sm">night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}