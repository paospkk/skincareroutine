import React from 'react';
import { Info } from 'lucide-react';
import ProgressBar from './ProgressBar';

const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  answers,
  handleAnswer,
  handlePrevious,
  handleNext,
}) => {
  const currentAnswers =
    answers[question.id] || (question.multiSelect ? [] : '');

  const isAnswerComplete = () => {
    if (!question.multiSelect) {
      return currentAnswers !== '';
    }
    if (question.id === 4) {
      return currentAnswers.length >= 1 && currentAnswers.length <= 3;
    }
    if (question.maxSelect) {
      return currentAnswers.length === question.maxSelect;
    }
    return currentAnswers.length > 0;
  };

  return (
    <div className='question-card fade-in'>
      <h2 className='question-number'>
        Skin quiz {currentQuestion + 1}/{totalQuestions}
      </h2>
      <ProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
      <h3 className='question-text'>{question.question}</h3>
      {question.explanation && (
        <p className='question-explanation'>
          <Info size={16} className='icon-inline' /> {question.explanation}
        </p>
      )}
      <p className='select-instruction'>
        {question.id === 4
          ? `เลือกได้อีก ${Math.max(
              0,
              2 - (currentAnswers.length - 1)
            )} ข้อ (รวม 3 ข้อ)`
          : question.multiSelect
          ? question.maxSelect
            ? `เลือกได้สูงสุด ${question.maxSelect} ข้อ`
            : 'เลือกทุกข้อที่เกี่ยวข้อง'
          : 'เลือก 1 ข้อ'}
      </p>
      <div className='options'>
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`option ${
              question.multiSelect
                ? currentAnswers.includes(option.value)
                  ? 'selected'
                  : ''
                : currentAnswers === option.value
                ? 'selected'
                : ''
            } ${
              question.id === 4 && option.value === answers[3]
                ? 'selected disabled'
                : ''
            }`}
            onClick={() => {
              if (question.id === 4 && option.value === answers[3]) {
                return;
              }
              handleAnswer(option.value);
            }}
          >
            <span className='option-label'>{option.label}</span>
            {option.description && (
              <p className='option-description'>{option.description}</p>
            )}
          </div>
        ))}
      </div>
      <div className='navigation'>
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className='btn btn-secondary'
        >
          Previous
        </button>
        {isAnswerComplete() && (
          <button onClick={handleNext} className='btn btn-primary'>
            {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
