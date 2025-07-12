import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MobileNavbar } from './components/MobileNavbar';
import { AskQuestionNavbar } from './components/AskQuestionNavbar';
import { QuestionDetailsPage } from './components/QuestionDetailsPage';
import { QuestionsList } from './components/QuestionsList';
import { Pagination } from './components/Pagination';
import { AskQuestionForm } from './components/AskQuestionForm';

type Page = 'home' | 'ask-question' | 'question-details';

interface Question {
  title: string;
  description: string;
  tags: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const totalPages = 7; // Mock total pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, this would trigger a data fetch
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAskQuestion = () => {
    setActivePage('ask-question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuestionDetails = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setActivePage('question-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuestions = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuestionSubmit = (question: Question) => {
    // In a real app, this would submit to an API
    console.log('New question submitted:', question);
    
    // Navigate back to home page after submission
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // You could also show a success message here
    alert('Question submitted successfully!');
  };

  const handleToggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {activePage === 'home' ? (
        <>
          {/* Desktop Navigation */}
          <Navbar onToggleLogin={handleToggleLogin} isLoggedIn={isLoggedIn} />
          {/* Mobile Navigation */}
          <MobileNavbar 
            onToggleLogin={handleToggleLogin} 
            isLoggedIn={isLoggedIn}
            onAskQuestion={handleNavigateToAskQuestion}
          />
        </>
      ) : activePage === 'ask-question' ? (
        <AskQuestionNavbar onNavigateHome={handleNavigateToHome} />
      ) : null}
      
      {/* Main Content */}
      <main className="pb-4 md:pb-0">
        {activePage === 'home' ? (
          <>
            <QuestionsList 
              onAskQuestion={handleNavigateToAskQuestion}
              onQuestionClick={handleNavigateToQuestionDetails}
            />
            
            {/* Pagination */}
            <div className="mx-auto max-w-7xl px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : activePage === 'ask-question' ? (
          <AskQuestionForm onSubmit={handleQuestionSubmit} />
        ) : activePage === 'question-details' ? (
          <QuestionDetailsPage
            questionId={selectedQuestionId || 1}
            onNavigateHome={handleNavigateToHome}
            onNavigateToQuestions={handleNavigateToQuestions}
            isLoggedIn={isLoggedIn}
          />
        ) : null}
      </main>
    </div>
  );
}