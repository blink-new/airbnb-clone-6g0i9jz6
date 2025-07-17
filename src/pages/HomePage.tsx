import { useState, useEffect } from 'react'
import { Search, Calendar, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import Header from '../components/layout/Header'
import PropertyCard from '../components/PropertyCard'
import { blink } from '../blink/client'

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

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState('')
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      // For now, we'll use mock data. Later we'll fetch from the database
      const mockProperties: Property[] = [
        {
          id: '1',
          title: 'Cozy Apartment in Downtown',
          location: 'New York, NY',
          price: 120,
          rating: 4.8,
          images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop'],
          host: 'Sarah',
          type: 'Entire apartment'
        },
        {
          id: '2',
          title: 'Modern Loft with City Views',
          location: 'San Francisco, CA',
          price: 200,
          rating: 4.9,
          images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop'],
          host: 'Michael',
          type: 'Entire loft'
        },
        {
          id: '3',
          title: 'Charming Studio Near Beach',
          location: 'Miami, FL',
          price: 85,
          rating: 4.7,
          images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop'],
          host: 'Emma',
          type: 'Entire studio'
        },
        {
          id: '4',
          title: 'Luxury Villa with Pool',
          location: 'Los Angeles, CA',
          price: 350,
          rating: 5.0,
          images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop'],
          host: 'David',
          type: 'Entire villa'
        },
        {
          id: '5',
          title: 'Historic Brownstone',
          location: 'Boston, MA',
          price: 180,
          rating: 4.6,
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop'],
          host: 'Jennifer',
          type: 'Entire house'
        },
        {
          id: '6',
          title: 'Mountain Cabin Retreat',
          location: 'Denver, CO',
          price: 140,
          rating: 4.8,
          images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop'],
          host: 'Robert',
          type: 'Entire cabin'
        }
      ]
      
      setProperties(mockProperties)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchLocation.trim()) {
      window.location.href = `/search?location=${encodeURIComponent(searchLocation)}`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find your next adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing places to stay around the world
          </p>
          
          {/* Search Widget */}
          <Card className="max-w-4xl mx-auto bg-white text-black">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Where</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search destinations"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Add dates" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Add dates" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Who</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Add guests" className="pl-10" />
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
              >
                Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore nearby stays
            </h2>
            <p className="text-lg text-gray-600">
              Discover unique places to stay with local hosts in 191 countries
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
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by property type</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Entire homes', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop' },
              { name: 'Cabins', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop' },
              { name: 'Unique stays', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop' },
              { name: 'Pet-friendly', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop' }
            ].map((category) => (
              <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}