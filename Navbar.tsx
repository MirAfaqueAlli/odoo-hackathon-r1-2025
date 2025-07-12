import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, User, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface NavbarProps {
  onToggleLogin: () => void;
  isLoggedIn: boolean;
}

export function Navbar({ onToggleLogin, isLoggedIn }: NavbarProps) {
  return (
    <nav className="hidden md:block border-b bg-white px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-indigo-600">StackIt</h1>
            
            {/* Filter Dropdowns */}
            <div className="flex items-center space-x-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">More</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Bar and Login */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search questions..."
                className="w-80 pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* User Profile */}
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
                className="flex items-center space-x-2"
                onClick={onToggleLogin}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}