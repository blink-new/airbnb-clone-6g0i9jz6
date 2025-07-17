import { useState } from 'react'
import { Search, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function HeroSection() {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('')

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Text */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Not sure where to go?
            <br />
            <span className="text-primary">Perfect.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find stays for any style of trip, all in one place
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-4xl mx-auto shadow-xl border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Where */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Where</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search destinations"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-4 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Check in */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check in</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-4 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Check out */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check out</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-4 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Who */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Who</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Add guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-4 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="px-12 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="rounded-full px-6 py-2">
            I'm flexible
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2">
            Europe
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2">
            United States
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2">
            Asia
          </Button>
        </div>
      </div>
    </section>
  )
}