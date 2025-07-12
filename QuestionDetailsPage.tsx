import React from 'react';
import { QuestionDetailsNavbar } from './QuestionDetailsNavbar';
import { QuestionDetails } from './QuestionDetails';
import { AnswerCard } from './AnswerCard';
import { SubmitAnswer } from './SubmitAnswer';

interface QuestionDetailsPageProps {
  questionId: number;
  onNavigateHome: () => void;
  onNavigateToQuestions: () => void;
  isLoggedIn?: boolean;
}

// Mock data for the question details
const mockQuestion = {
  id: 1,
  title: "How to join 2 columns in a data set to make a separate column in SQL",
  description: `I do not know the code for it as I am a beginner in SQL. I have two columns in my dataset:

Column A: First Name
Column B: Last Name

I want to create a new column that combines both of these columns with a space in between.

For example:
- First Name: John, Last Name: Smith → Full Name: John Smith
- First Name: Mary, Last Name: Johnson → Full Name: Mary Johnson

What SQL command should I use to achieve this? I'm using MySQL database.

I've tried a few things but nothing seems to work. Any help would be appreciated!`,
  tags: ["sql", "mysql", "database", "string-concatenation", "beginner"],
  author: "sqlbeginner",
  createdAt: "2 hours ago",
  views: 147
};

// Mock data for answers
const mockAnswers = [
  {
    id: 1,
    title: "Answer 1: Using CONCAT Function",
    content: `You can use the CONCAT function in SQL to combine columns. Here's the syntax:

\`\`\`sql
SELECT 
    first_name,
    last_name,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM your_table_name;
\`\`\`

This will create a new column called 'full_name' that combines the first_name and last_name columns with a space in between.

If you want to update your table permanently, you can use:

\`\`\`sql
ALTER TABLE your_table_name 
ADD COLUMN full_name VARCHAR(255);

UPDATE your_table_name 
SET full_name = CONCAT(first_name, ' ', last_name);
\`\`\`

The CONCAT function handles NULL values gracefully - if either column is NULL, the result will be NULL.`,
    author: "sqlexpert",
    createdAt: "1 hour ago",
    votes: 15
  },
  {
    id: 2,
    title: "Answer 2: Alternative Methods",
    content: `Besides CONCAT, you have a few other options:

**Method 1: Using the || operator (works in some SQL dialects)**
\`\`\`sql
SELECT first_name || ' ' || last_name AS full_name
FROM your_table_name;
\`\`\`

**Method 2: Using CONCAT_WS (Concat With Separator)**
\`\`\`sql
SELECT CONCAT_WS(' ', first_name, last_name) AS full_name
FROM your_table_name;
\`\`\`

The advantage of CONCAT_WS is that it automatically handles NULL values and won't include the separator if one of the values is NULL.

**Method 3: Using CASE for NULL handling**
\`\`\`sql
SELECT 
    CASE 
        WHEN first_name IS NULL THEN last_name
        WHEN last_name IS NULL THEN first_name
        ELSE CONCAT(first_name, ' ', last_name)
    END AS full_name
FROM your_table_name;
\`\`\`

I recommend using CONCAT_WS as it's the cleanest approach for your use case.`,
    author: "dbmaster",
    createdAt: "45 minutes ago",
    votes: 8
  }
];

export function QuestionDetailsPage({ 
  questionId, 
  onNavigateHome, 
  onNavigateToQuestions, 
  isLoggedIn = false 
}: QuestionDetailsPageProps) {
  const handleAnswerSubmit = (content: string) => {
    // In a real app, this would submit to an API
    console.log('New answer submitted:', content);
    alert('Answer submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <QuestionDetailsNavbar
        onNavigateHome={onNavigateHome}
        onNavigateToQuestions={onNavigateToQuestions}
        questionTitle={mockQuestion.title}
      />
      
      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Question Details */}
        <QuestionDetails
          id={mockQuestion.id}
          title={mockQuestion.title}
          description={mockQuestion.description}
          tags={mockQuestion.tags}
          author={mockQuestion.author}
          createdAt={mockQuestion.createdAt}
          views={mockQuestion.views}
        />

        {/* Answers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
          </h2>
          
          {mockAnswers.map((answer) => (
            <AnswerCard
              key={answer.id}
              id={answer.id}
              title={answer.title}
              content={answer.content}
              author={answer.author}
              createdAt={answer.createdAt}
              votes={answer.votes}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        {/* Submit Answer Section */}
        <SubmitAnswer 
          onSubmit={handleAnswerSubmit}
          isLoggedIn={isLoggedIn}
        />
      </main>
    </div>
  );
}