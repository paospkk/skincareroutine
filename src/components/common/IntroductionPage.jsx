import React, { useState } from 'react';
import { PlayCircle, CheckSquare } from 'lucide-react';

const IntroductionPage = ({ onStartQuiz }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsentChange = () => {
    setConsentGiven(!consentGiven);
  };

  const handleStartQuiz = () => {
    if (consentGiven) {
      onStartQuiz();
    } else {
      alert("Please consent to data collection before starting the quiz.");
    }
  };

  return (
    <div className="introduction-page">
      <h2>Welcome to ร่างทองหมื่นปี Quiz</h2>
      <p>
        This quiz is designed to help you understand your personal preferences and provide tailored recommendations for Rang Thong products.
      </p>
      <h3>How it works:</h3>
      <ol>
        <li>You'll be presented with a series of questions about your lifestyle and preferences.</li>
        <li>Answer each question honestly - there are no right or wrong answers!</li>
        <li>Based on your responses, we'll generate personalized product recommendations.</li>
        <li>At the end, you'll receive expert advice and a summary of your results.</li>
      </ol>
      <p>
        Your responses are confidential and will be used to provide you with the best possible recommendations.
      </p>
      <h3>Data Collection and Use:</h3>
      <p>
        We collect and process your quiz responses to provide personalized product recommendations. Additionally, with your consent, we may use this information for:
      </p>
      <ul>
        <li>Improving our products and services</li>
        <li>Conducting market research</li>
        <li>Sending you personalized marketing communications</li>
      </ul>
      <p>
        You can find more details about how we handle your data in our <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <div className="consent-checkbox">
        <label>
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={handleConsentChange}
          />
          <CheckSquare size={20} className={`icon-checkbox ${consentGiven ? 'checked' : ''}`} />
          I consent to the collection and use of my quiz responses as described above.
        </label>
      </div>
      <p>
        Are you ready to discover which Rang Thong products are perfect for you?
      </p>
      <button 
        className={`start-quiz-button ${!consentGiven ? 'disabled' : ''}`} 
        onClick={handleStartQuiz}
        disabled={!consentGiven}
      >
        <PlayCircle size={24} className="icon-inline" />
        Start Quiz
      </button>
    </div>
  );
};

export default IntroductionPage;