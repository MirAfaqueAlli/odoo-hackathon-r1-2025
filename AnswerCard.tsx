import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronUp, ChevronDown, User, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';

interface AnswerCardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  votes: number;
  isLoggedIn?: boolean;
}

export function AnswerCard({ 
  id, 
  title, 
  content, 
  author, 
  createdAt, 
  votes: initialVotes, 
  isLoggedIn = false 
}: AnswerCardProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    if (userVote === type) {
      // Remove vote
      setVotes(votes + (type === 'up' ? -1 : 1));
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote) {
        // Changing from opposite vote
        setVotes(votes + (type === 'up' ? 2 : -2));
      } else {
        // Adding new vote
        setVotes(votes + (type === 'up' ? 1 : -1));
      }
      setUserVote(type);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 mb-4">
      {/* Login Alert */}
      {showLoginAlert && (
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertDescription className="text-yellow-800">
            You must be logged in to vote. Please log in or sign up to vote on answers.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('up')}
            className={`p-2 hover:bg-gray-100 rounded ${userVote === 'up' ? 'text-green-600 bg-green-50' : 'text-gray-600'}`}
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <span className={`font-semibold text-lg ${votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {votes}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('down')}
            className={`p-2 hover:bg-gray-100 rounded ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Answer Content */}
        <div className="flex-1">
          {/* Answer Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {title}
          </h3>

          {/* Answer Content */}
          <div className="prose max-w-none mb-4">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>

          {/* Author Information */}
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face" alt={author} />
              <AvatarFallback>
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <span>
              <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium">{author}</span>
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}