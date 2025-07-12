import React, { useState } from 'react';
import { Button } from './ui/button';
import { RichTextEditor } from './RichTextEditor';

interface SubmitAnswerProps {
  onSubmit: (content: string) => void;
  isLoggedIn?: boolean;
}

export function SubmitAnswer({ onSubmit, isLoggedIn = false }: SubmitAnswerProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-xl font-semibold mb-4">Submit Your Answer</h3>
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">You must be logged in to submit an answer.</p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Log In to Answer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-8">
      <h3 className="text-xl font-semibold mb-6">Submit Your Answer</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your answer here. Be sure to provide a clear, detailed explanation that helps solve the question..."
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
            disabled={!content.trim()}
          >
            Submit Answer
          </Button>
        </div>
      </form>
    </div>
  );
}