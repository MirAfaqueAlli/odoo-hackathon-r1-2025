import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image,
  Code
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const toggleFormat = (format: string) => {
    const newFormats = new Set(activeFormats);
    if (newFormats.has(format)) {
      newFormats.delete(format);
    } else {
      newFormats.add(format);
    }
    setActiveFormats(newFormats);
  };

  const insertText = (text: string) => {
    onChange(value + text);
  };

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2">
        <div className="flex items-center space-x-1 flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex items-center space-x-1 border-r pr-2 mr-2">
            <Button
              type="button"
              variant={activeFormats.has('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => toggleFormat('bold')}
              className="h-8 w-8 p-0"
            >
              <Bold className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              type="button"
              variant={activeFormats.has('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => toggleFormat('italic')}
              className="h-8 w-8 p-0"
            >
              <Italic className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              type="button"
              variant={activeFormats.has('underline') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => toggleFormat('underline')}
              className="h-8 w-8 p-0"
            >
              <Underline className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>

          {/* Lists */}
          <div className="flex items-center space-x-1 border-r pr-2 mr-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('\n• ')}
              className="h-8 w-8 p-0"
            >
              <List className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('\n1. ')}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>

          {/* Alignment - Hidden on mobile to save space */}
          <div className="hidden md:flex items-center space-x-1 border-r pr-2 mr-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('')}
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('')}
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('')}
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Links and Media */}
          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('[link text](url)')}
              className="h-8 w-8 p-0"
            >
              <Link className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('![image alt](image-url)')}
              className="h-8 w-8 p-0"
            >
              <Image className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertText('`code`')}
              className="h-8 w-8 p-0"
            >
              <Code className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[150px] md:min-h-[200px] border-0 focus-visible:ring-0 resize-none text-sm md:text-base"
      />
    </div>
  );
}