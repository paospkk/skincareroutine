import { useState, useCallback, useMemo } from 'react';
import { questions } from '../data/quizData';
import { getExpertAdvice } from '../services/expertAdvice';
import { generateRecommendations } from '../services/recommendations';

const useQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  const handleNextQuestion = useCallback(() => {
    let nextQuestion = currentQuestion + 1;
    while (nextQuestion < questions.length) {
      const question = questions[nextQuestion];
      if (!question.conditional || question.conditional(answers)) {
        if (nextQuestion === 10 && answers[9] !== 'Yes') {
          nextQuestion = 13;
        } else if (nextQuestion === 14 && answers[13] !== 'Yes') {
          nextQuestion = 15;
        } else {
          break;
        }
      }
      nextQuestion++;
    }
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      console.log('Quiz Complete: ', answers);
      setQuizComplete(true);
    }
  }, [currentQuestion, answers]);

  const handleAnswer = useCallback(
    (value) => {
      const question = questions[currentQuestion];
      if (question.multiSelect) {
        setAnswers((prevAnswers) => {
          const currentAnswers = prevAnswers[question.id] || [];
          let newAnswers;

          if (value === 'None of the above' || value === ' None of the above') {
            newAnswers = [value];
          } else if (
            currentAnswers.includes('None of the above') ||
            currentAnswers.includes(' None of the above')
          ) {
            newAnswers = [value];
          } else if (currentAnswers.includes(value)) {
            newAnswers = currentAnswers.filter((answer) => answer !== value);
          } else {
            if (question.id === 4) {
              const question3Answer = prevAnswers[3];
              newAnswers = [...currentAnswers, value];
              if (!newAnswers.includes(question3Answer)) {
                newAnswers = [question3Answer, ...newAnswers];
              }
              newAnswers = newAnswers.slice(0, 3);
            } else {
              if (
                !question.maxSelect ||
                currentAnswers.length < question.maxSelect
              ) {
                newAnswers = [...currentAnswers, value];
              } else {
                alert(
                  `You can only select up to ${question.maxSelect} options.`
                );
                return prevAnswers;
              }
            }
          }

          return { ...prevAnswers, [question.id]: newAnswers };
        });
      } else {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [question.id]: value }));
        if (question.id === 3) {
          setAnswers((prev) => ({
            ...prev,
            [question.id]: value,
            4: [value],
          }));
        }
      }
    },
    [currentQuestion]
  );

  const handlePrevious = useCallback(() => {
    let prevQuestion = currentQuestion - 1;

    if (currentQuestion === 13 && answers[9] !== 'Yes') {
      prevQuestion = 12;
    } else if (currentQuestion === 15 && answers[13] !== 'Yes') {
      prevQuestion = 14;
    } else {
      while (prevQuestion >= 0) {
        const question = questions[prevQuestion];
        if (!question.conditional || question.conditional(answers)) {
          break;
        }
        prevQuestion--;
      }
    }

    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  }, [currentQuestion, answers]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
  }, []);

  const expertAdvice = useMemo(() => {
    if (!quizComplete) return null;
    const skinType = answers[1];
    const skinConcerns = Array.from(
      new Set([answers[3], ...(answers[4] || [])])
    ).filter(Boolean);
    return getExpertAdvice(skinType, skinConcerns);
  }, [quizComplete, answers]);

  const userRecommendations = useMemo(() => {
    if (!quizComplete) return null;
    try {
      return generateRecommendations(answers);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return {};
    }
  }, [quizComplete, answers]);

  return {
    currentQuestion,
    answers,
    quizComplete,
    handleAnswer,
    handlePrevious,
    handleNextQuestion,
    resetQuiz,
    expertAdvice,
    userRecommendations
  };
};

export default useQuiz;