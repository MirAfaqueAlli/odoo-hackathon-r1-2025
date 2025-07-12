import React from 'react';
import { Badge } from './ui/badge';
import { Calendar, User } from 'lucide-react';

interface QuestionDetailsProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: string;
  views: number;
}

export function QuestionDetails({ 
  id, 
  title, 
  description, 
  tags, 
  author, 
  createdAt, 
  views 
}: QuestionDetailsProps) {
  return (
    <div className="bg-white rounded-lg border p-8 mb-6">
      {/* Question Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        {title}
      </h1>

      {/* Meta Information */}
      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4" />
          <span>Asked by <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium">{author}</span></span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{createdAt}</span>
        </div>
        <span>{views} views</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Question Description */}
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </div>
  );
}