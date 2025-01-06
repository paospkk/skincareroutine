// ProfileItem.jsx: Renders user profile information based on quiz answers.

import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

const ProfileItem = ({ title, value, description, advice, ingredients }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className='profile-item'>
      <div
        className='profile-item-header'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className='profile-item-icon'>
          <Info size={20} />
        </span>
        <div className='profile-item-title-value'>
          <span className='profile-item-title'>{title}</span>
          {value && <span className='profile-item-value'>{value}</span>}
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isExpanded && (
        <div className='profile-item-content'>
          {description && (
            <p className='profile-item-description'>{description}</p>
          )}
          {advice && (
            <div className='profile-item-advice'>
              <h5>คำแนะนำ:</h5>
              <ul>
                {advice.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {ingredients && (
            <div className='profile-item-ingredients'>
              <h5>ส่วนผสมที่ควรใช้:</h5>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileItem;