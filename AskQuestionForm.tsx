import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RichTextEditor } from './RichTextEditor';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface AskQuestionFormProps {
  onSubmit: (question: { title: string; description: string; tags: string[] }) => void;
}

export function AskQuestionForm({ onSubmit }: AskQuestionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        tags
      });
      // Reset form
      setTitle('');
      setDescription('');
      setTags([]);
      setTagInput('');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="bg-white rounded-lg border p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-900">Ask a New Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a concise, descriptive title for your question"
              className="w-full"
              required
            />
            <p className="text-xs md:text-sm text-gray-500">
              Be specific and imagine you're asking a question to another person
            </p>
          </div>

          {/* Description Field with Rich Text Editor */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Provide detailed information about your question. Include what you've tried, expected results, and any error messages..."
            />
            <p className="text-xs md:text-sm text-gray-500">
              Include all the information someone would need to answer your question
            </p>
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add relevant tags (press Enter or comma to add)"
              className="w-full"
            />
            <p className="text-xs md:text-sm text-gray-500">
              Add up to 5 tags to describe what your question is about
            </p>
            
            {/* Display Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-blue-100 text-blue-800 flex items-center gap-1 text-xs md:text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2"
              disabled={!title.trim() || !description.trim()}
            >
              Submit Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}