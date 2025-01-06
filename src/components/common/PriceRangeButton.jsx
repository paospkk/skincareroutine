// PriceRangeButton.jsx: Reusable button component for selecting price ranges.

import React from 'react';

const PriceRangeButton = ({ range, active, onClick }) => (
  <button
    className={`price-range-btn ${active ? 'active' : ''}`}
    onClick={() => onClick(range)}
  >
    {range}
  </button>
);

export default PriceRangeButton;