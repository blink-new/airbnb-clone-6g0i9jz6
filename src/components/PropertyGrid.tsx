import { useState } from 'react'
import { PropertyCard } from './PropertyCard'

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Entire home in Malibu',
    location: 'Malibu, California',
    price: 450,
    rating: 4.9,
    reviewCount: 127,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=500&fit=crop'],
    isSuperhost: true
  },
  {
    id: '2',
    title: 'Private room in Manhattan',
    location: 'New York, New York',
    price: 180,
    rating: 4.8,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=500&fit=crop'],
    isSuperhost: false
  },
  {
    id: '3',
    title: 'Entire villa in Tuscany',
    location: 'Florence, Italy',
    price: 320,
    rating: 4.95,
    reviewCount: 203,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=500&fit=crop'],
    isSuperhost: true
  },
  {
    id: '4',
    title: 'Cozy cabin in the mountains',
    location: 'Aspen, Colorado',
    price: 275,
    rating: 4.7,
    reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop'],
    isSuperhost: false
  },
  {
    id: '5',
    title: 'Beachfront apartment',
    location: 'Miami, Florida',
    price: 220,
    rating: 4.6,
    reviewCount: 94,
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=500&fit=crop'],
    isSuperhost: true
  },
  {
    id: '6',
    title: 'Modern loft downtown',
    location: 'Seattle, Washington',
    price: 195,
    rating: 4.8,
    reviewCount: 112,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=500&fit=crop'],
    isSuperhost: false
  },
  {
    id: '7',
    title: 'Historic townhouse',
    location: 'Boston, Massachusetts',
    price: 165,
    rating: 4.9,
    reviewCount: 78,
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=500&fit=crop'],
    isSuperhost: true
  },
  {
    id: '8',
    title: 'Desert retreat',
    location: 'Scottsdale, Arizona',
    price: 310,
    rating: 4.7,
    reviewCount: 145,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=500&fit=crop'],
    isSuperhost: false
  }
]

export function PropertyGrid() {
  const [wishlistedProperties, setWishlistedProperties] = useState<Set<string>>(new Set())

  const handleWishlistToggle = (propertyId: string) => {
    setWishlistedProperties(prev => {
      const newSet = new Set(prev)
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId)
      } else {
        newSet.add(propertyId)
      }
      return newSet
    })
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Stays nearby
          </h2>
          <p className="text-gray-600">
            Discover great places to stay
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              isWishlisted={wishlistedProperties.has(property.id)}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 transition-colors">
            Show more
          </button>
        </div>
      </div>
    </section>
  )
}