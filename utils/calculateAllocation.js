// backend/utils/calculateAllocation.js
// Purpose: Calculate investment allocation based on risk profile

const calculateAllocation = (investmentAmount, riskProfile) => {
  let allocations = {}

  // Conservative: Low risk, stable returns
  if (riskProfile === 'Conservative') {
    allocations = {
      stocks: {
        amount: Math.round(investmentAmount * 0.15),
        percentage: 15
      },
      mutualFunds: {
        amount: Math.round(investmentAmount * 0.35),
        percentage: 35
      },
      sip: {
        amount: Math.round(investmentAmount * 0.25),
        percentage: 25
      },
      gold: {
        amount: Math.round(investmentAmount * 0.15),
        percentage: 15
      },
      insurance: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      }
    }
  } 
  // Moderate: Balanced risk and returns
  else if (riskProfile === 'Moderate') {
    allocations = {
      stocks: {
        amount: Math.round(investmentAmount * 0.20),
        percentage: 20
      },
      mutualFunds: {
        amount: Math.round(investmentAmount * 0.40),
        percentage: 40
      },
      sip: {
        amount: Math.round(investmentAmount * 0.20),
        percentage: 20
      },
      gold: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      },
      insurance: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      }
    }
  } 
  // Aggressive: High risk, high returns
  else if (riskProfile === 'Aggressive') {
    allocations = {
      stocks: {
        amount: Math.round(investmentAmount * 0.40),
        percentage: 40
      },
      mutualFunds: {
        amount: Math.round(investmentAmount * 0.30),
        percentage: 30
      },
      sip: {
        amount: Math.round(investmentAmount * 0.15),
        percentage: 15
      },
      gold: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      },
      insurance: {
        amount: Math.round(investmentAmount * 0.05),
        percentage: 5
      }
    }
  }
  // Default to Moderate if invalid risk profile
  else {
    allocations = {
      stocks: {
        amount: Math.round(investmentAmount * 0.20),
        percentage: 20
      },
      mutualFunds: {
        amount: Math.round(investmentAmount * 0.40),
        percentage: 40
      },
      sip: {
        amount: Math.round(investmentAmount * 0.20),
        percentage: 20
      },
      gold: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      },
      insurance: {
        amount: Math.round(investmentAmount * 0.10),
        percentage: 10
      }
    }
  }

  return allocations;
}

export default  calculateAllocation 