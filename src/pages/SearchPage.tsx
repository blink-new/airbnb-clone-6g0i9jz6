import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Map, Grid3X3 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Slider } from '../components/ui/slider'
import { Checkbox } from '../components/ui/checkbox'
import Header from '../components/layout/Header'
import PropertyCard from '../components/PropertyCard'

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

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const query = searchParams.get('q') || searchParams.get('location') || ''

  useEffect(() => {
    loadSearchResults()
  }, [query])

  const loadSearchResults = async () => {
    try {
      // Mock search results - in a real app, this would filter based on the query
      const mockResults: Property[] = [
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
        }
      ]
      
      setProperties(mockResults)
    } catch (error) {
      console.error('Error loading search results:', error)
    } finally {
      setLoading(false)
    }
  }

  const propertyTypes = [
    'Entire apartment',
    'Entire house',
    'Entire loft',
    'Entire studio',
    'Private room',
    'Shared room'
  ]

  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type)
    return matchesPrice && matchesType
  })

  return (
    <div className="min-h-screen bg-white">
      <Header variant="search" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {query ? `Stays in "${query}"` : 'Search results'}
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProperties.length} stays · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · 2 guests
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Show map</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price range</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Property type</h4>
                    <div className="space-y-3">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type])
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type))
                              }
                            }}
                          />
                          <label htmlFor={type} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 500])
                      setSelectedTypes([])
                    }}
                  >
                    Clear all
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Grid3X3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}