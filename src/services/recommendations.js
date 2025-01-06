// Import the product data
import { products } from '../data/products';

/**
 * Calculates the score for a product based on the user's profile and product characteristics.
 * @param {Object} product - The product to be scored
 * @param {Object} userProfile - The user's profile containing their skin characteristics and preferences
 * @returns {number} The calculated score for the product
 */
const calculateProductScore = (product, userProfile) => {
  let score = 0;

  // 1. Skin type match
  // Base score is 0
  // If product is suitable for all skin types, add 1 point
  if (product.recommendedFor?.includes('all')) {
    score += 1;
  }
  // If product matches user's specific skin type, add 2 points
  if (product.recommendedFor?.includes(userProfile.skinType)) {
    score += 2;
  }
  // Maximum possible score for skin type match: 3 points

  // 2. Skin concerns match
  // Base score is 0
  // Add 1 point for each matched concern
  const userSkinConcerns = userProfile.skinConcerns || [];
  const matchedConcerns = userSkinConcerns.filter(concern =>
    product.skinConcerns?.includes(concern) || product.ingredientBenefits?.includes(concern)
  );
  score += matchedConcerns.length;

  // For 'Moisturizer', 'Sunscreen', 'Cleanser' categories, we don't exclude the product if it doesn't match concerns
  // For other categories, exclude the product if it doesn't match any concerns
  if (matchedConcerns.length === 0 && !['Moisturizer', 'Sunscreen', 'Cleanser'].includes(product.category)) {
    return -1;
  }

  // 3. Category-specific scoring
  if (product.category === 'Sunscreen') {
    // High SPF for outdoor activities
    if (userProfile.sunExposure === 'outdoor' && product.spf >= 50) {
      score += 3;
    } else if (product.spf >= 30) {
      // Standard SPF
      score += 2;
    }
    // Additional benefits
    if (product.ingredientBenefits?.length > 0) score += 1;
  }

  // 4. Acne level match
  // If user selected acne as a concern, add score to products addressing acne
  if (userSkinConcerns.includes('Acne') && product.skinConcerns?.includes('Acne')) {
    score += 2;
  }

  // 5. Sensitivity level match
  if (userProfile.sensitivityLevel === 'Sensitive') {
    if (product.sensitivityLevel === 'Sensitive') {
      score += 3;
    }
    if (!product.harshIngredients?.length) {
      score += 2;
    }
  } else if (product.sensitivityLevel === userProfile.sensitivityLevel) {
    score += 2;
  }

  // Makeup removal and sun protection consideration
  const needsDoubleCleanse =
    userProfile.makeupUsage !== 'none' || userProfile.sunExposure === 'outdoor';
  if (needsDoubleCleanse && product.category === 'Cleanser') {
    if (
      ['cleansing oil', 'cleansing balm', 'micellar water'].some(type =>
        product.name.toLowerCase().includes(type)
      )
    ) {
      score += 4; // Higher score for first cleanse products
    } else {
      score += 2; // Normal cleansers still get a boost
    }
  }

  // Retinol experience
  if (product.mainIngredients?.includes('Retinol')) {
    if (
      userProfile.retinolExperience === 'Yes' &&
      product.retinolPercentage >= 0.5
    ) {
      score += 3; // Higher percentage for experienced users
    } else if (
      userProfile.retinolExperience !== 'Yes' &&
      product.retinolPercentage < 0.5
    ) {
      score += 2; // Lower percentage for beginners
    }
  }

  // Acid experience
  if (
    product.mainIngredients?.some(ingredient =>
      ['Salicylic Acid', 'Glycolic Acid', 'Lactic Acid'].includes(ingredient)
    )
  ) {
    if (userProfile.acidExperience === 'Yes' && product.acidPercentage >= 5) {
      score += 3; // Higher percentage for experienced users
    } else if (
      userProfile.acidExperience !== 'Yes' &&
      product.acidPercentage < 5
    ) {
      score += 2; // Lower percentage for beginners
    }
  }

  // 6. Pregnancy safety
  // Remove every product that contains 'Retinol', 'Retinal', 'Retinoid'
  if (userProfile.isPregnantOrBreastfeeding === 'yes') {
    if (
      product.mainIngredients?.some(ingredient =>
        ['Retinol', 'Retinal', 'Retinoid'].includes(ingredient)
      )
    ) {
      return -1; // Exclude unsafe products for pregnant or breastfeeding users
    }
  }

  // 7. Budget consideration
  // Base score is 0
  const userBudget = userProfile.budget;
  const [minBudget, maxBudget] = userBudget.split('-').map(Number);

  if (product.price >= minBudget && product.price <= maxBudget) {
    score += 2; // Product is within the selected price range
  } else if (product.price < minBudget) {
    score += 1; // Product is below the selected price range
  }
  // Note: Products above the price range don't get additional points, but they're not excluded

  return score;
};

/**
 * Generates product recommendations based on user answers
 * @param {Object} userAnswers - The user's answers to the skincare questionnaire
 * @returns {Object} An object containing recommended products for each category
 */
export const generateRecommendations = userAnswers => {
  const userProfile = {
    skinType: userAnswers[1],
    skinConcerns: [userAnswers[3], ...(userAnswers[4] || [])].filter(Boolean),
    acneLevel: userAnswers[5],
    sensitivityLevel: userAnswers[2],
    makeupUsage: userAnswers[6],
    prescriptionTopicals: userAnswers[15] || [],
    retinolExperience: userAnswers[9],
    acidExperience: userAnswers[13],
    isPregnantOrBreastfeeding: userAnswers[16],
    sunExposure: userAnswers[17],
    budget: userAnswers[18],
  };

  const recommendedProducts = {};

  ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen'].forEach(
    category => {
      const categoryProducts = products.filter(p => p.category === category);
      const scoredProducts = categoryProducts
        .map(product => {
          const score = calculateProductScore(product, userProfile);
          if (score > 0) {
            return {
              ...product,
              score,
              explanation: generateRecommendationExplanation(
                product,
                userProfile,
                score,
                categoryProducts.length
              ),
            };
          }
          return null;
        })
        .filter(Boolean);

      // Sort products by score and take top 3
      recommendedProducts[category] = scoredProducts
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      // If less than 3 products, include products outside of budget range
      if (recommendedProducts[category].length < 3) {
        const remainingProducts = categoryProducts
          .filter(p => !recommendedProducts[category].some(rp => rp.id === p.id))
          .map(product => ({
            ...product,
            score: calculateProductScore(product, userProfile),
            explanation: generateRecommendationExplanation(
              product,
              userProfile,
              calculateProductScore(product, userProfile),
              categoryProducts.length
            ),
          }))
          .filter(p => p.score > 0)
          .sort((a, b) => b.score - a.score);

        recommendedProducts[category] = [
          ...recommendedProducts[category],
          ...remainingProducts.slice(0, 3 - recommendedProducts[category].length)
        ];
      }
    }
  );

  // Ensure double cleansing for makeup users and high sun exposure
  const needsDoubleCleanse =
    userProfile.makeupUsage !== 'none' || userProfile.sunExposure === 'outdoor';
  if (needsDoubleCleanse && recommendedProducts['Cleanser']) {
    const firstCleanse = recommendedProducts['Cleanser'].find(p =>
      ['cleansing oil', 'cleansing balm', 'micellar water'].some(type =>
        p.name.toLowerCase().includes(type)
      )
    );
    const secondCleanse = recommendedProducts['Cleanser'].find(
      p =>
        !['cleansing oil', 'cleansing balm', 'micellar water'].some(type =>
          p.name.toLowerCase().includes(type)
        )
    );

    if (firstCleanse && secondCleanse) {
      recommendedProducts['Cleanser'] = [firstCleanse, secondCleanse];
    } else {
      // If we don't have both types, we fill in the missing type from the general product list
      const missingType = firstCleanse ? 'second' : 'first';
      const additionalCleanse = products.find(
        p =>
          p.category === 'Cleanser' &&
          (missingType === 'first'
            ? ['cleansing oil', 'cleansing balm', 'micellar water'].some(type =>
                p.name.toLowerCase().includes(type)
              )
            : !['cleansing oil', 'cleansing balm', 'micellar water'].some(
                type => p.name.toLowerCase().includes(type)
              ))
      );
      if (additionalCleanse) {
        recommendedProducts['Cleanser'] = [
          firstCleanse || additionalCleanse,
          secondCleanse || additionalCleanse,
        ];
      }
    }
  }

  return recommendedProducts;
};

/**
 * Generates an explanation for why a product was recommended
 * @param {Object} product - The recommended product
 * @param {Object} userProfile - The user's profile
 * @param {number} score - The calculated score for the product
 * @param {number} categoryTotalProducts - The total number of products in the category
 * @returns {string} HTML string explaining the recommendation
 */
export const generateRecommendationExplanation = (product, userProfile, score, categoryTotalProducts) => {
  let reasons = [];
  let scoreBreakdown = [];

  const criteria = [
    { name: "Skin Type Match", maxPoints: 3 },
    { name: "Skin Concerns Match", maxPoints: 3 },
    { name: "Acne Fighting", maxPoints: 2 },
    { name: "Sensitivity Match", maxPoints: 3 },
    { name: "No Harsh Ingredients", maxPoints: 2 },
    { name: "Double Cleansing", maxPoints: 4 },
    { name: "Sun Protection", maxPoints: 3 },
    { name: "pH Balance", maxPoints: 1 },
    { name: "Retinol Suitability", maxPoints: 3 },
    { name: "Acid Suitability", maxPoints: 3 },
    { name: "Budget Fit", maxPoints: 2 }
  ];

  const addReason = (reason, points, criterionIndex) => {
    if (points > 0) {
      reasons.push(reason);
    }
    scoreBreakdown[criterionIndex].points = points;
  };

  // Initialize scoreBreakdown with all criteria
  scoreBreakdown = criteria.map(criterion => ({ 
    criterion: criterion.name, 
    points: 0, 
    maxPoints: criterion.maxPoints 
  }));

  // Skin type match
  if (product.recommendedFor?.includes('all')) {
    addReason(`Suitable for all skin types, including ${userProfile.skinType}`, 1, 0);
  }
  if (product.recommendedFor?.includes(userProfile.skinType)) {
    addReason(`Specifically suitable for ${userProfile.skinType} skin`, 2, 0);
  }

  // Skin concerns match
  const matchedConcerns = userProfile.skinConcerns.filter(
    concern =>
      product.skinConcerns?.includes(concern) ||
      product.ingredientBenefits?.includes(concern)
  );
  if (matchedConcerns.length > 0) {
    addReason(`Addresses ${matchedConcerns.join(' and ')}`, matchedConcerns.length, 1);
  }

  // Acne fighting
  if (userProfile.skinConcerns.includes('Acne') && product.skinConcerns?.includes('Acne')) {
    addReason('Effective for fighting acne', 2, 2);
  }

  // Sensitivity match
  if (userProfile.sensitivityLevel === 'Sensitive' && product.sensitivityLevel === 'Sensitive') {
    addReason('Gentle for sensitive skin', 3, 3);
  }
  if (!product.harshIngredients?.length) {
    addReason('Does not contain harsh ingredients', 2, 4);
  }

  // Double cleansing
  const needsDoubleCleanse = userProfile.makeupUsage !== 'none' || userProfile.sunExposure === 'outdoor';
  if (needsDoubleCleanse && product.category === 'Cleanser') {
    if (
      ['cleansing oil', 'cleansing balm', 'micellar water'].some(type =>
        product.name.toLowerCase().includes(type)
      )
    ) {
      addReason('Effective for first step of double cleansing', 4, 5);
    } else {
      addReason('Suitable for second step of double cleansing', 2, 5);
    }
  }

  // Sun protection
  if (product.category === 'Sunscreen' && product.spf) {
    addReason(`Provides ${product.spf >= 50 ? 'high' : 'standard'} sun protection (SPF ${product.spf})`, product.spf >= 50 ? 3 : 2, 6);
  } else if (product.category === 'Moisturizer' && product.sunProtection) {
    addReason('Includes sun protection', 1, 6);
  }

  // pH Balance
  if (product.category === 'Cleanser' && product.pHBalanced) {
    addReason('pH-balanced formula', 1, 7);
  }

  // Retinol suitability
  if (product.mainIngredients?.includes('Retinol')) {
    if (userProfile.retinolExperience === 'Yes' && product.retinolPercentage >= 
0.5) {
      addReason('Contains higher percentage of retinol suitable for experienced users', 3, 8);
    } else if (userProfile.retinolExperience !== 'Yes' && product.retinolPercentage < 0.5) {
      addReason('Contains gentle retinol percentage suitable for beginners', 2, 8);
    }
  }

  // Acid suitability
  if (product.mainIngredients?.some(ingredient =>
    ['Salicylic Acid', 'Glycolic Acid', 'Lactic Acid'].includes(ingredient)
  )) {
    if (userProfile.acidExperience === 'Yes' && product.acidPercentage >= 5) {
      addReason('Contains higher percentage of acids suitable for experienced users', 3, 9);
    } else if (userProfile.acidExperience !== 'Yes' && product.acidPercentage < 5) {
      addReason('Contains gentle acid percentage suitable for beginners', 2, 9);
    }
  }

  // Budget fit
  const [minBudget, maxBudget] = userProfile.budget.split('-').map(Number);
  if (product.price >= minBudget && product.price <= maxBudget) {
    addReason('Fits within your selected budget range', 2, 10);
  } else if (product.price < minBudget) {
    addReason('Cheaper than your selected budget range', 1, 10);
  }

const getCategoryRelevantCriteria = (category) => {
    const allCriteria = criteria.map(c => c.name);
    
    const categorySpecificCriteria = {
      'Cleanser': ["Double Cleansing", "pH Balance"],
      'Moisturizer': ["Sun Protection"],
      'Sunscreen': ["Sun Protection"],
      'Serum': ["Retinol Suitability", "Acid Suitability"],
      'Toner': ["pH Balance", "Acid Suitability"]
    };

    let relevantCriteria = [
      ...allCriteria.filter(criterion => !Object.values(categorySpecificCriteria).flat().includes(criterion)),
      ...(categorySpecificCriteria[category] || [])
    ];

    // Remove "Acne Fighting" from relevant criteria if user didn't select acne as a concern
    if (!userProfile.skinConcerns.includes('Acne')) {
      relevantCriteria = relevantCriteria.filter(criterion => criterion !== "Acne Fighting");
    }

    return relevantCriteria;
  };

  const relevantCriteria = getCategoryRelevantCriteria(product.category);

  const categoryMaxScore = scoreBreakdown
    .filter(item => relevantCriteria.includes(item.criterion))
    .reduce((sum, item) => sum + item.maxPoints, 0);

  const categoryScore = scoreBreakdown
    .filter(item => relevantCriteria.includes(item.criterion))
    .reduce((sum, item) => sum + item.points, 0);

  // Generate the explanation
  let explanation = `<h2>Why We Recommended This Product</h2>`;
  explanation += `<p>This ${product.category.toLowerCase()} is one of the top 3 recommended products out of ${categoryTotalProducts} in its category, based on your skin profile and needs.</p>`;
  explanation += `<p>It is recommended because it:</p>`;
  explanation += `<ul>${reasons.map(reason => `<li>${reason}</li>`).join('')}</ul>`;
  
  explanation += `<h4>How We Calculated the Score</h4>`;
  explanation += `<p>We use a point system to evaluate how well each product matches your skin profile and needs. Highlighted rows indicate criteria especially relevant for ${product.category.toLowerCase()} products. Crossed-out rows are not applicable for this product category and do not contribute to the score.</p>`;
  explanation += `<p>The maximum possible score for ${product.category.toLowerCase()} products is ${categoryMaxScore} points. This product scored ${categoryScore} points.</p>`;
  explanation += `<table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Criterion</th><th>Points Earned</th><th>Max Points</th></tr>
    ${scoreBreakdown.map(item => `
      <tr ${relevantCriteria.includes(item.criterion) ? 'style="background-color: #ffffcc;"' : 'style="color: #999; text-decoration: line-through;"'}>
        <td>${item.criterion}</td>
        <td>${relevantCriteria.includes(item.criterion) ? item.points : '-'}</td>
        <td>${relevantCriteria.includes(item.criterion) ? item.maxPoints : '-'}</td>
      </tr>`).join('')}
    <tr><th>Total Score</th><th>${categoryScore}</th><th>${categoryMaxScore}</th></tr>
  </table>`;

  explanation += `
    <p><strong>Note:</strong> Remember, these recommendations are based on general guidelines and your provided information. It's always best to patch test new products and consult with a dermatologist for personalized advice, especially if you have specific skin concerns or conditions.</p>
  `;

  return explanation;
};

export default {
  calculateProductScore,
  generateRecommendations,
  generateRecommendationExplanation
};