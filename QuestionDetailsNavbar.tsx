import React from 'react';
import { Button } from './ui/button';
import { Bell, User, Home, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

interface QuestionDetailsNavbarProps {
  onNavigateHome: () => void;
  onNavigateToQuestions: () => void;
  questionTitle: string;
}

export function QuestionDetailsNavbar({ onNavigateHome, onNavigateToQuestions, questionTitle }: QuestionDetailsNavbarProps) {
  const truncatedTitle = questionTitle.length > 30 ? questionTitle.substring(0, 30) + '...' : questionTitle;

  return (
    <nav className="border-b bg-white px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-indigo-600">StackIt</h1>
              
              {/* Home Navigation Link */}
              <Button 
                variant="ghost" 
                onClick={onNavigateHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </div>

            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={onNavigateToQuestions}
                    className="cursor-pointer hover:text-indigo-600"
                  >
                    Questions
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-600">
                    {truncatedTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Notification and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Profile */}
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}