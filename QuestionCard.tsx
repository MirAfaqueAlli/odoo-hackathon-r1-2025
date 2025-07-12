import React from 'react';
import { Badge } from './ui/badge';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  votes: number;
  answers: number;
  createdAt: string;
  onQuestionClick?: (id: number) => void;
}

export function QuestionCard({ 
  id, 
  title, 
  description, 
  tags, 
  author, 
  votes, 
  answers, 
  createdAt,
  onQuestionClick 
}: QuestionCardProps) {
  return (
    <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3 md:gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-1 min-w-[50px] md:min-w-[60px]">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </button>
          <span className="font-semibold text-base md:text-lg">{votes}</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 
            className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer mb-2 leading-tight"
            onClick={() => onQuestionClick?.(id)}
          >
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Description Preview - Hidden on very small screens */}
          <p className="text-gray-700 mb-2 md:mb-3 line-clamp-2 text-sm md:text-base hidden sm:block">
            {description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
            <span className="truncate">
              <span className="hidden sm:inline">asked by </span>
              <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">{author}</span>
              <span className="hidden md:inline"> {createdAt}</span>
            </span>
            
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
              <span>{answers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}