//QuizSummary.jsx: Displays the final quiz results and recommendations.

import React from 'react';
import { Sparkles, RefreshCw, Copy, Share2 } from 'lucide-react';
import ProfileItem from '../results/ProfileItem';
import PriceRangeButton from '../common/PriceRangeButton';
import ProductCard from '../results/ProductCard';

const QuizSummary = ({
  activeTab,
  setActiveTab,
  handleRestartClick,
  handleCopy,
  handleShare,
  answers,
  questions,
  expertAdvice,
  selectedPriceRange,
  setSelectedPriceRange,
  userRecommendations,
  filterProductsByPriceRange,
}) => {
  const renderSkinProfile = () => {
    return (
      <div className='skin-profile'>
        <h3>Here is your Profile!</h3>

        <h4>Basic Information</h4>
        <ProfileItem
          title='Skin Type'
          value={answers[1]}
          description={
            questions[1].options.find(o => o.value === answers[1])?.description
          }
          advice={expertAdvice.skinType}
        />
        <ProfileItem
          title='Skin Sensitivity'
          value={answers[2]}
          description={
            questions[2].options.find(o => o.value === answers[2])?.description
          }
        />
        <ProfileItem
          title='Acne Level'
          value={answers[5]}
          description={
            questions[5].options.find(o => o.value === answers[5])?.description
          }
        />
        <ProfileItem
          title='Make Up'
          value={answers[6]}
          description={
            questions[6].options.find(o => o.value === answers[6])?.description
          }
        />
        <h4>Major Skin Concerns</h4>
        {answers[4] &&
          answers[4].map((concern, index) => (
            <ProfileItem
              key={index}
              title={concern}
              value={null}
              description={
                questions[3].options.find(o => o.value === concern)?.description
              }
              advice={expertAdvice.concerns[index]?.advice}
              ingredients={
                questions[3].options.find(o => o.value === concern)?.Ingredient
              }
            />
          ))}
        <h4>Other Information</h4>
        {questions.slice(7).map(question => (
          <div key={question.id} className='other-info-item'>
            <span className='other-info-question'>{question.question}</span>
            <span className='other-info-answer'>{answers[question.id]}</span>
            <span className='other-info-icon'>ℹ️</span>
          </div>
        ))}
      </div>
    );
  };

  const renderRecommendedRoutine = () => {
    const priceRanges = [
      'All',
      '<499',
      '500-999',
      '1000-1999',
      '2000-2999',
      '>2999',
    ];

    return (
      <div className='recommended-routine'>
        <h3>Recommend Skincare For You</h3>
        <div className='profile-tags'>
          <span className='tag'>{answers[1]}</span>
          <span className='tag'>{answers[2]}</span>
          <span className='tag'>{answers[5]}</span>
          <span className='tag'>{answers[6]}</span>
          {answers[4] &&
            answers[4].map((concern, index) => (
              <span key={index} className='tag'>
                {concern}
              </span>
            ))}
        </div>
        <div className='price-range-buttons'>
          {priceRanges.map(range => (
            <PriceRangeButton
              key={range}
              range={range}
              active={selectedPriceRange === range}
              onClick={setSelectedPriceRange}
            />
          ))}
        </div>
        {Object.entries(userRecommendations).map(([category, products]) => (
          <div key={category} className='product-category'>
            <h4>{category}</h4>
            <div className='product-list'>
              {filterProductsByPriceRange(products, selectedPriceRange).map(
                product => (
                  <ProductCard key={product.id} product={product} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='summary-card fade-in'>
      <div className='summary-header'>
        <div>
          <h2 className='summary-title'>
            <Sparkles size={24} className='icon-inline' /> Your Skin Profile
          </h2>
          <p className='summary-subtitle'>Build Your Routine</p>
        </div>
        <div className='header-actions'>
          <button
            onClick={handleRestartClick}
            className='icon-button'
            aria-label='Start Over'
          >
            <RefreshCw size={24} />
          </button>
          <button
            onClick={handleCopy}
            className='icon-button'
            aria-label='Copy Results'
          >
            <Copy size={24} />
          </button>
          <button
            onClick={handleShare}
            className='icon-button'
            aria-label='Share Results'
          >
            <Share2 size={24} />
          </button>
        </div>
      </div>
      <div className='summary-tabs'>
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Skin Profile
        </button>
        <button
          className={`tab ${activeTab === 'routine' ? 'active' : ''}`}
          onClick={() => setActiveTab('routine')}
        >
          Routine
        </button>
      </div>
      <div className='summary-content'>
        {activeTab === 'profile'
          ? renderSkinProfile()
          : renderRecommendedRoutine()}
      </div>
    </div>
  );
};

export default QuizSummary;
