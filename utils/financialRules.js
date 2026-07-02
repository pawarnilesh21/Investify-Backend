// backend/utils/financialRules.js
// Purpose: Financial rules and suggestions based on salary and age

const getSuggestedInvestmentPercentage = (salary, age) => {
  let suggestedPercentage = 25 // Default

  // Age-based suggestions
  if (age < 25) {
    suggestedPercentage = 30 // Young, can take more risk
  } else if (age >= 25 && age < 35) {
    suggestedPercentage = 25 // Building career
  } else if (age >= 35 && age < 45) {
    suggestedPercentage = 20 // Family responsibilities
  } else if (age >= 45 && age < 55) {
    suggestedPercentage = 20 // Planning retirement
  } else {
    suggestedPercentage = 15 // Near retirement, more conservative
  }

  // Salary-based adjustments
  if (salary >= 100000) {
    suggestedPercentage += 5 // Higher salary, can invest more
  } else if (salary < 30000) {
    suggestedPercentage -= 5 // Lower salary, invest less
  }

  // Ensure percentage is within valid range
  suggestedPercentage = Math.max(10, Math.min(60, suggestedPercentage))

  return suggestedPercentage
};

const getEmergencyFundRecommendation = (monthlyExpenses) => {
  // Recommended: 6 months of expenses
  return monthlyExpenses * 6
};

const getInsuranceCoverageRecommendation = (salary, age) => {
  // Life insurance: 10-15 times annual salary
  const lifeInsurance = salary * 12 * 12
  
  // Health insurance based on age
  let healthInsurance
  if (age < 30) {
    healthInsurance = 500000 // 5 Lakhs
  } else if (age >= 30 && age < 45) {
    healthInsurance = 1000000 // 10 Lakhs
  } else {
    healthInsurance = 1500000 // 15 Lakhs
  }

  return {
    lifeInsurance,
    healthInsurance
  }
}

const getRiskProfileRecommendation = (age, goal) => {
  // Age-based risk profile
  if (age < 30) {
    return 'Aggressive'
  } else if (age >= 30 && age < 45) {
    return 'Moderate'
  } else {
    return 'Conservative'
  }
}

export default {
  getSuggestedInvestmentPercentage,
  getEmergencyFundRecommendation,
  getInsuranceCoverageRecommendation,
  getRiskProfileRecommendation
}