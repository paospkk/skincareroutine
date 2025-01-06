// src/utils/helpers.js

export const generateSummaryText = (questions, answers) => {
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

export const generateShareText = (questions, answers) => {
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

export const filterProductsByPriceRange = (products, range) => {
  if (range === 'All') return products;
  const [min, max] = range.split('-').map(Number);
  return products.filter(p => p.price >= min && p.price <= (max || Infinity));
};

export const handleCopy = (questions, answers) => {
  const summaryText = generateSummaryText(questions, answers);
  navigator.clipboard
    .writeText(summaryText)
    .then(() => {
      alert('Quiz results copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

export const handleShare = (questions, answers) => {
  if (navigator.share) {
    const shareText = generateShareText(questions, answers);
    navigator
      .share({
        title: 'My Skin Profile',
        text: shareText,
      })
      .catch(console.error);
  } else {
    alert('Sharing is not supported on this device/browser.');
  }
};