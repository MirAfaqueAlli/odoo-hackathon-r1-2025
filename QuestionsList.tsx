import React from 'react';
import { Button } from './ui/button';
import { QuestionCard } from './QuestionCard';
import { Plus } from 'lucide-react';

// Mock data for demonstration
const mockQuestions = [
  {
    id: 1,
    title: "How to handle state management in React applications?",
    description: "I'm building a large React application and struggling with state management. Should I use Redux, Context API, or something else? What are the best practices for managing complex application state?",
    tags: ["react", "javascript", "state-management", "redux"],
    author: "johndoe",
    votes: 15,
    answers: 8,
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: "I do not know the code for it as I am a beginner in SQL. I have two columns in my dataset and want to combine them with a space in between.",
    tags: ["sql", "database", "mysql", "beginner"],
    author: "sqlbeginner",
    votes: 4,
    answers: 2,
    createdAt: "4 hours ago"
  },
  {
    id: 3,
    title: "Python list comprehension vs for loop performance",
    description: "Is there a significant performance difference between list comprehensions and traditional for loops in Python? When should I use each approach?",
    tags: ["python", "performance", "list-comprehension"],
    author: "pythonista",
    votes: 12,
    answers: 3,
    createdAt: "6 hours ago"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox - Best practices for layout",
    description: "I'm working on a responsive website and unsure whether to use CSS Grid or Flexbox for different layouts. What are the use cases for each?",
    tags: ["css", "layout", "responsive-design", "flexbox", "grid"],
    author: "webdesigner",
    votes: 8,
    answers: 12,
    createdAt: "8 hours ago"
  },
  {
    id: 5,
    title: "How to optimize API calls in React with custom hooks?",
    description: "I want to create reusable custom hooks for API calls that include loading states, error handling, and caching. What's the best approach?",
    tags: ["react", "hooks", "api", "performance"],
    author: "reactdev",
    votes: 19,
    answers: 6,
    createdAt: "1 day ago"
  },
  {
    id: 6,
    title: "Understanding closures in JavaScript",
    description: "I keep hearing about closures in JavaScript but don't fully understand how they work. Can someone provide clear examples and practical use cases?",
    tags: ["javascript", "closures", "fundamentals"],
    author: "jslearner",
    votes: 31,
    answers: 15,
    createdAt: "1 day ago"
  }
];

interface QuestionsListProps {
  onAskQuestion: () => void;
  onQuestionClick: (id: number) => void;
}

export function QuestionsList({ onAskQuestion, onQuestionClick }: QuestionsListProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-4 py-4 md:py-6">
      {/* Ask New Question Button - Only show on desktop */}
      <div className="mb-4 md:mb-6 hidden md:block">
        <Button 
          onClick={onAskQuestion}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ask New Question
        </Button>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg border">
        {mockQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            description={question.description}
            tags={question.tags}
            author={question.author}
            votes={question.votes}
            answers={question.answers}
            createdAt={question.createdAt}
            onQuestionClick={onQuestionClick}
          />
        ))}
      </div>
    </div>
  );
}