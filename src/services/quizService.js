//quizService.js
import { questions } from '../data/quizData';
import { getExpertAdvice } from '../data/expertAdvice';

export const generateSummaryText = (answers) => {
  return questions
    .map(question => {
      if (answers[question.id]) {
        return `${question.question}\n${
          Array.isArray(answers[question.id])
            ? answers[question.id].join(', ')
            : answers[question.id]
        }`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n\n');
};

export const generateShareText = (answers) => {
  return questions
    .map(question => {
      if (answers[question.id]) {
        return `${question.question}: ${
          Array.isArray(answers[question.id])
            ? answers[question.id].join(', ')
            : answers[question.id]
        }`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');
};

export const getExpertAdviceForUser = (answers) => {
  const skinType = answers[1];
  const skinConcerns = Array.from(
    new Set([answers[3], ...(answers[4] || [])])
  ).filter(Boolean);
  return getExpertAdvice(skinType, skinConcerns);
};