import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, User, Bell, Menu, X, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface MobileNavbarProps {
  onToggleLogin: () => void;
  isLoggedIn: boolean;
  onAskQuestion: () => void;
}

export function MobileNavbar({ onToggleLogin, isLoggedIn, onAskQuestion }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <nav className="md:hidden border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold text-indigo-600">StackIt</h1>

          {/* Right Side - Login and Menu */}
          <div className="flex items-center space-x-2">
            {/* Login Button/Profile */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
                <Avatar className="h-8 w-8 cursor-pointer" onClick={onToggleLogin}>
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onToggleLogin}
                className="text-xs px-3 py-1"
              >
                Login
              </Button>
            )}

            {/* Hamburger Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Ask Question Button */}
                  <Button 
                    onClick={() => {
                      onAskQuestion();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ask New Question
                  </Button>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      Home
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Questions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Tags
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Users
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Mobile Filters and Search */}
      <div className="md:hidden bg-white border-b px-4 py-3 space-y-3">
        {/* Filters Row */}
        <div className="flex space-x-2 overflow-x-auto">
          <Select defaultValue="newest">
            <SelectTrigger className="w-24 flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="votes">Most Votes</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-28 flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="more">
            <SelectTrigger className="w-20 flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="more">More</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 pr-12"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Button 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Ask Question Button for Mobile */}
        <Button 
          onClick={onAskQuestion}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ask New Question
        </Button>
      </div>
    </>
  );
}