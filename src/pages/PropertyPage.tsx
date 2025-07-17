import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Share, MapPin, Wifi, Car, Coffee, Tv, Users, Calendar } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Badge } from '../components/ui/badge'
import Header from '../components/layout/Header'

interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  host: {
    name: string
    avatar: string
    joinedDate: string
    isSuperhost: boolean
  }
  type: string
  guests: number
  bedrooms: number
  bathrooms: number
  description: string
  amenities: string[]
  rules: string[]
}

export default function PropertyPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const loadProperty = useCallback(async () => {
    try {
      // Mock property data - in a real app, this would fetch from the database
      const mockProperty: Property = {
        id: id || '1',
        title: 'Cozy Apartment in Downtown Manhattan',
        location: 'New York, NY, United States',
        price: 120,
        rating: 4.8,
        reviewCount: 127,
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
        ],
        host: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          joinedDate: 'Joined in March 2019',
          isSuperhost: true
        },
        type: 'Entire apartment',
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        description: 'Welcome to our beautiful apartment in the heart of Manhattan! This cozy space is perfect for couples or small families looking to explore the city. The apartment features modern amenities, comfortable furnishings, and is located just minutes away from major attractions, restaurants, and public transportation.',
        amenities: ['Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating', 'TV', 'Coffee maker'],
        rules: ['Check-in: 3:00 PM - 11:00 PM', 'Checkout: 11:00 AM', 'No smoking', 'No pets', 'No parties or events']
      }
      
      setProperty(mockProperty)
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadProperty()
  }, [id, loadProperty])

  const amenityIcons: { [key: string]: any } = {
    'Wifi': Wifi,
    'Kitchen': Coffee,
    'TV': Tv,
    'Coffee maker': Coffee,
    'Washer': Car,
    'Dryer': Car,
    'Air conditioning': Car,
    'Heating': Car
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-gray-900" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-600">({property.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="underline">{property.location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex items-center space-x-2"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
                onClick={() => setCurrentImageIndex(0)}
              />
            </div>
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {property.type} hosted by {property.host.name}
                  </h2>
                  <p className="text-gray-600">
                    {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathroom
                  </p>
                </div>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={property.host.avatar} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              {property.host.isSuperhost && (
                <Badge variant="secondary" className="mb-4">
                  ⭐ Superhost
                </Badge>
              )}
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            <Separator className="my-8" />

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Wifi
                  return (
                    <div key={amenity} className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator className="my-8" />

            {/* House Rules */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                House rules
              </h3>
              <div className="space-y-2">
                {property.rules.map((rule, index) => (
                  <p key={index} className="text-gray-700">
                    {rule}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-semibold">${property.price}</span>
                    <span className="text-gray-600">night</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-gray-600">({property.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
                    <div className="p-3 border-r border-gray-300">
                      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                        Check-in
                      </label>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Add date</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                        Checkout
                      </label>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Add date</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Guests
                    </label>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">1 guest</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium mb-4">
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-600 mb-4">
                  You won't be charged yet
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="underline">${property.price} x 5 nights</span>
                    <span>${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>$83</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total before taxes</span>
                    <span>${property.price * 5 + 50 + 83}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}