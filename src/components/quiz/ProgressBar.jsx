//ProgressBar.jsx: Shows quiz progress, can be reused across different parts of the app.

import React from 'react';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  return (
    <div className='progress-bar'>
      <div className='progress' style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;