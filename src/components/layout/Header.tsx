import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, User, Globe } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { blink } from '../../blink/client'

interface HeaderProps {
  variant?: 'default' | 'search'
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleSignOut = () => {
    blink.auth.logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">airbnb</div>
          </Link>

          {/* Search Bar - Desktop */}
          {variant === 'search' && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-1 px-6 py-3">
                    <Input
                      type="text"
                      placeholder="Where are you going?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 focus:ring-0 text-sm font-medium placeholder:text-gray-600"
                    />
                  </div>
                  <div className="border-l border-gray-300 px-6 py-3">
                    <Input
                      type="text"
                      placeholder="Check in"
                      className="border-0 focus:ring-0 text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <div className="border-l border-gray-300 px-6 py-3">
                    <Input
                      type="text"
                      placeholder="Guests"
                      className="border-0 focus:ring-0 text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="mr-2 rounded-full bg-primary hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Host Link */}
            <Link
              to="/host"
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Airbnb your home
            </Link>

            {/* Language */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Globe className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow">
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/host">Host your home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/host" className="text-lg font-medium">
                    Airbnb your home
                  </Link>
                  <Link to="/profile" className="text-lg font-medium">
                    Profile
                  </Link>
                  <Button onClick={handleSignOut} variant="outline" className="justify-start">
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}