//ProductCard.jsx

import React, { useState } from 'react';
import { Tag, CheckCircle, ShoppingCart, Info, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <>
      <div className='product-card fade-in'>
        <div className='product-card-header'>
          <img src={product.image} alt={product.name} className='product-image' />
          <button
            className='explanation-button'
            onClick={() => setShowExplanation(true)}
            aria-label='Show product recommendation explanation'
          >
            <Info size={20} />
          </button>
        </div>
        <h5>
          {product.brand} - {product.name}
        </h5>
        <p className='product-description'>{product.description}</p>
        <div className='product-tags'>
          {product.skinConcerns.map((concern, index) => (
            <span key={index} className='product-tag'>
              <Tag size={14} className='icon-inline' /> {concern}
            </span>
          ))}
        </div>
        <div className='product-recommendations'>
          {product.recommendedFor.map((recommendation, index) => (
            <span key={index} className='product-recommendation'>
              <CheckCircle size={14} className='icon-inline' /> {recommendation}
            </span>
          ))}
        </div>
        <p className='product-price'>฿ {product.price.toLocaleString()}</p>
        <div className='product-links'>
          <a
            href={product.lazada}
            target='_blank'
            rel='noopener noreferrer'
            className='product-link'
          >
            <ShoppingCart size={16} className='icon-inline' /> Lazada
          </a>
          <a
            href={product.shopee}
            target='_blank'
            rel='noopener noreferrer'
            className='product-link'
          >
            <ShoppingCart size={16} className='icon-inline' /> Shopee
          </a>
        </div>
      </div>
      {showExplanation && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <div dangerouslySetInnerHTML={{ __html: product.explanation }} />
            <button 
              className='close-button' 
              onClick={() => setShowExplanation(false)}
              aria-label='Close explanation'
            >
              <Check size={24} className='icon-inline' /> Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;