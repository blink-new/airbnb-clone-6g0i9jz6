import { Globe, Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">AirCover</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Anti-discrimination</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Disability support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cancellation options</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Report neighborhood concern</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Airbnb your home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">AirCover for Hosts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Hosting resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community forum</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Hosting responsibly</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Join a free Hosting class</a></li>
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Newsroom</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">New features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Investors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Gift cards</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Airbnb.org emergency stays</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Stay updated</h3>
            <p className="text-gray-600 mb-4">Get the latest news and updates from Airbnb</p>
            <div className="flex space-x-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
            <span>© 2024 Airbnb, Inc.</span>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Sitemap</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Company details</a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>English (US)</span>
            </Button>
            <Button variant="ghost" size="sm">
              $ USD
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}