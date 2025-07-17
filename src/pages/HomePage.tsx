import { useState, useEffect } from 'react'
import { HeroSection } from '../components/HeroSection'
import { PropertyCard } from '../components/PropertyCard'
import { Footer } from '../components/layout/Footer'
import Header from '../components/layout/Header'

interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  isSuperhost: boolean
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistedProperties, setWishlistedProperties] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      // Mock data - in a real app, this would fetch from the database
      const mockProperties: Property[] = [
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
      
      setProperties(mockProperties)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Properties Section */}
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 rounded-xl h-64 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  isWishlisted={wishlistedProperties.has(property.id)}
                  onWishlistToggle={handleWishlistToggle}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 transition-colors">
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by property type</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Entire homes', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop' },
              { name: 'Cabins', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop' },
              { name: 'Unique stays', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop' },
              { name: 'Pet-friendly', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop' }
            ].map((category) => (
              <div key={category.name} className="overflow-hidden rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}