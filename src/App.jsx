import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

import {
  MessageCircleQuestion,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Share2,
  Info,
  CircleChevronLeft,
  CircleChevronRight,
  Sparkles,
  ShoppingCart,
  Tag,
  DollarSign,
  ExternalLink,
} from 'lucide-react';

import { getExpertAdvice } from './services/expertAdvice';
import { generateRecommendations } from './services/recommendations';

import { questions } from './data/quizData';

import PriceRangeButton from './components/common/PriceRangeButton';
import ProductCard from './components/results/ProductCard';
import ProfileItem from './components/results/ProfileItem';
import ProgressBar from './components/quiz/ProgressBar';
import QuizQuestion from './components/quiz/QuizQuestion';
import QuizSummary from './components/quiz/QuizSummary';
import SocialLinksPopup from './components/common/SocialLinksPopup';
import IntroductionPage from './components/common/IntroductionPage';

import useQuiz from './hooks/useQuiz';
import useUIState from './hooks/useUIState';

import {
  generateSummaryText,
  generateShareText,
  filterProductsByPriceRange,
  handleCopy,
  handleShare,
} from './utils/helpers';

import {
  PRICE_RANGES,
  LOADING_DELAY,
} from './utils/constants';

export const App = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);

  const {
    currentQuestion,
    answers,
    quizComplete,
    handleAnswer,
    handlePrevious,
    handleNextQuestion,
    resetQuiz,
    expertAdvice,
    userRecommendations,
  } = useQuiz();

  const {
    showRestartConfirmation,
    showSocialLinks,
    handleRestartClick,
    handleRestartCancel,
    toggleSocialLinks,
    setShowRestartConfirmation,
  } = useUIState();

  useEffect(() => {
    if (quizComplete) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY);
      return () => clearTimeout(timer);
    }
  }, [quizComplete]);

  const handleNext = () => {
    const currentQuestionObj = questions[currentQuestion];
    const currentAnswers = answers[currentQuestionObj.id];

    if (
      currentQuestionObj.multiSelect &&
      (!currentAnswers || currentAnswers.length === 0)
    ) {
      alert('Please select at least one option before proceeding.');
      return;
    }

    handleNextQuestion();
  };

  const handleRestartConfirm = () => {
    setShowRestartConfirmation(false);
    resetQuiz();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), LOADING_DELAY);
  };

  const handleStartQuiz = () => {
    setShowIntroduction(false);
  };

  const renderProgressBar = () => (
    <ProgressBar
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
    />
  );

  const renderQuestion = () => (
    <QuizQuestion
      question={questions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      answers={answers}
      handleAnswer={handleAnswer}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
    />
  );

  const renderSummary = () => (
    <QuizSummary
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleRestartClick={handleRestartClick}
      handleCopy={() => handleCopy(questions, answers)}
      handleShare={() => handleShare(questions, answers)}
      answers={answers}
      questions={questions}
      expertAdvice={expertAdvice}
      selectedPriceRange={selectedPriceRange}
      setSelectedPriceRange={setSelectedPriceRange}
      userRecommendations={userRecommendations}
      filterProductsByPriceRange={filterProductsByPriceRange}
      priceRanges={PRICE_RANGES}
    />
  );

  return (
    <ErrorBoundary>
      <div className='App'>
        <header className='header' aria-label='Site header'>
          <h1>ร่างทองหมื่นปี (เปา)</h1>
          <div className='header-buttons'>
            <button
              onClick={toggleSocialLinks}
              className='floating-button social-links-toggle'
              aria-label='Show social links'
            >
              <MessageCircleQuestion size={24} />
            </button>
          </div>
        </header>
        <main className='main-content'>
          {showIntroduction ? (
            <IntroductionPage onStartQuiz={handleStartQuiz} />
          ) : isLoading ? (
            <div className='loading' aria-label='Loading'></div>
          ) : (
            <>
              {console.log('Quiz Complete:', quizComplete)}
              {quizComplete ? renderSummary() : renderQuestion()}
            </>
          )}
        </main>
        <footer className='footer'>
          © 2024 เพจร่างทองหมื่นปี (
          <a
            href='https://x.com/RangThong10000'
            target='_blank'
            rel='noopener noreferrer'
          >
            @RangThong10000
          </a>
          )<br />
          🤴 เปา (
          <a
            href='https://www.instagram.com/paospkk'
            target='_blank'
            rel='noopener noreferrer'
          >
            @PaoSpkk
          </a>
          )
        </footer>
      </div>
      {showRestartConfirmation && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <h3>Restart Quiz</h3>
            <p>Do you want to restart the quiz?</p>
            <div className='popup-buttons'>
              <button onClick={handleRestartConfirm}>
                <CheckCircle size={20} className='icon-inline' /> Yes
              </button>
              <button onClick={handleRestartCancel}>
                <XCircle size={20} className='icon-inline' /> No
              </button>
            </div>
          </div>
        </div>
      )}
      {showSocialLinks && <SocialLinksPopup onClose={toggleSocialLinks} />}
    </ErrorBoundary>
  );
};