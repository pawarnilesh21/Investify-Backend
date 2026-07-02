// backend/controllers/recommendationController.js
// Purpose: Provide investment recommendations (stocks, MF, gold, insurance)

// Mock data for now - Replace with real API calls later
const mockStocks = [
  {
    name: 'Tata Consultancy Services',
    symbol: 'TCS',
    currentPrice: 3850,
    marketCap: '14.2L Cr',
    peRatio: 28.5,
    debtToEquity: 0.05,
    recommendation: 'BUY',
    reason: 'Strong fundamentals, consistent growth, low debt'
  },
  {
    name: 'Infosys',
    symbol: 'INFY',
    currentPrice: 1450,
    marketCap: '6.1L Cr',
    peRatio: 24.3,
    debtToEquity: 0.12,
    recommendation: 'BUY',
    reason: 'Stable IT major, good dividend yield'
  },
  {
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    currentPrice: 1620,
    marketCap: '8.9L Cr',
    peRatio: 19.8,
    debtToEquity: 0.35,
    recommendation: 'STRONG BUY',
    reason: 'Leading private bank, strong asset quality'
  },
  {
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    currentPrice: 2450,
    marketCap: '16.5L Cr',
    peRatio: 26.2,
    debtToEquity: 0.42,
    recommendation: 'BUY',
    reason: 'Diversified business, strong cash flow'
  },
  {
    name: 'ICICI Bank',
    symbol: 'ICICIBANK',
    currentPrice: 980,
    marketCap: '6.8L Cr',
    peRatio: 18.5,
    debtToEquity: 0.28,
    recommendation: 'BUY',
    reason: 'Improving asset quality, strong retail franchise'
  }
];

const mockMutualFunds = [
  {
    name: 'HDFC Mid-Cap Opportunities Fund',
    nav: 142.5,
    returns: { '1yr': 15.2, '3yr': 18.5, '5yr': 16.8 },
    riskLevel: 'Moderate',
    category: 'Mid Cap',
    minSIP: 500
  },
  {
    name: 'SBI Bluechip Fund',
    nav: 85.3,
    returns: { '1yr': 12.8, '3yr': 14.2, '5yr': 13.5 },
    riskLevel: 'Low',
    category: 'Large Cap',
    minSIP: 500
  },
  {
    name: 'Axis Small Cap Fund',
    nav: 68.9,
    returns: { '1yr': 18.5, '3yr': 22.3, '5yr': 19.7 },
    riskLevel: 'High',
    category: 'Small Cap',
    minSIP: 1000
  },
  {
    name: 'ICICI Prudential Balanced Advantage Fund',
    nav: 52.8,
    returns: { '1yr': 11.5, '3yr': 13.8, '5yr': 12.4 },
    riskLevel: 'Moderate',
    category: 'Hybrid',
    minSIP: 500
  },
  {
    name: 'Mirae Asset Large Cap Fund',
    nav: 95.2,
    returns: { '1yr': 13.2, '3yr': 15.5, '5yr': 14.8 },
    riskLevel: 'Low',
    category: 'Large Cap',
    minSIP: 500
  }
]

// Get stock recommendations
export async function getStockRecommendations(req, res) {
  try {
    const { budget, riskProfile } = req.query;

    if (!budget) {
      return res.status(400).json({ 
        error: 'Budget is required' 
      })
    }

    const budgetNum = Number(budget);

    // Filter stocks based on budget (±10% range)
    const minPrice = budgetNum * 0.9;
    const maxPrice = budgetNum * 1.1;

    let filteredStocks = mockStocks.filter(
      stock => stock.currentPrice >= minPrice && stock.currentPrice <= maxPrice
    )

    // If no stocks in range, return top 5 affordable stocks
    if (filteredStocks.length === 0) {
      filteredStocks = mockStocks
        .filter(stock => stock.currentPrice <= budgetNum)
        .slice(0, 5)
    }

    // Limit to top 5
    filteredStocks = filteredStocks.slice(0, 5)

    res.status(200).json({
      message: 'Stock recommendations fetched successfully',
      count: filteredStocks.length,
      budget: budgetNum,
      riskProfile: riskProfile || 'Moderate',
      stocks: filteredStocks
    })

  } catch (error) {
    console.error('Get stocks error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching stocks' 
    })
  }
}

// Get mutual fund recommendations
export async function getMutualFundRecommendations(req, res) {
  try {
    const { budget, riskProfile } = req.query;

    if (!budget) {
      return res.status(400).json({ 
        error: 'Budget is required' 
      })
    }

    const budgetNum = Number(budget)

    // Filter based on risk profile
    let filteredFunds = mockMutualFunds

    if (riskProfile === 'Conservative') {
      filteredFunds = mockMutualFunds.filter(
        fund => fund.riskLevel === 'Low'
      )
    } else if (riskProfile === 'Aggressive') {
      filteredFunds = mockMutualFunds.filter(
        fund => fund.riskLevel === 'High' || fund.riskLevel === 'Moderate'
      )
    }

    // Limit to top 5
    filteredFunds = filteredFunds.slice(0, 5)

    res.status(200).json({
      message: 'Mutual fund recommendations fetched successfully',
      count: filteredFunds.length,
      budget: budgetNum,
      riskProfile: riskProfile || 'Moderate',
      funds: filteredFunds
    })

  } catch (error) {
    console.error('Get mutual funds error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching mutual funds' 
    })
  }
}

// Get SIP recommendations
export async function getSIPRecommendations(req, res) {
  try {
    const { budget, riskProfile } = req.query;

    if (!budget) {
      return res.status(400).json({ 
        error: 'Budget is required' 
      })
    }

    const budgetNum = Number(budget);

    // SIP recommendations (similar to mutual funds)
    const sipPlans = mockMutualFunds.slice(0, 3)

    res.status(200).json({
      message: 'SIP recommendations fetched successfully',
      count: sipPlans.length,
      monthlySIP: budgetNum,
      riskProfile: riskProfile || 'Moderate',
      plans: sipPlans
    })

  } catch (error) {
    console.error('Get SIP error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching SIP plans' 
    })
  }
}

// Get gold recommendations
export async function getGoldRecommendations(req, res) {
  try {
    const { budget } = req.query;

    if (!budget) {
      return res.status(400).json({ 
        error: 'Budget is required' 
      })
    }

    const budgetNum = Number(budget);
    const goldPricePerGram = 6250; // Mock price
    const grams = (budgetNum / goldPricePerGram).toFixed(2)

    res.status(200).json({
      message: 'Gold recommendations fetched successfully',
      currentPrice: goldPricePerGram,
      recommendedAmount: budgetNum,
      grams: parseFloat(grams),
      options: [
        'Digital Gold',
        'Gold ETF',
        'Sovereign Gold Bond',
        'Physical Gold'
      ]
    })

  } catch (error) {
    console.error('Get gold error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching gold recommendations' 
    })
  }
}

// Get insurance recommendations
export async function getInsuranceRecommendations(req, res) {
  try {
    const { age, salary } = req.body;

    if (!age || !salary) {
      return res.status(400).json({ 
        error: 'Age and salary are required' 
      })
    }

    const ageNum = Number(age);
    const salaryNum = Number(salary);

    // Life insurance: 10-12 times annual salary
    const lifeInsuranceCoverage = salaryNum * 12 * 12;
    const lifeInsurancePremium = Math.round(lifeInsuranceCoverage * 0.01) // ~1% of coverage

    // Health insurance based on age
    let healthInsuranceCoverage
    let healthInsurancePremium

    if (ageNum < 30) {
      healthInsuranceCoverage = 500000 // 5 Lakhs
      healthInsurancePremium = 8000
    } else if (ageNum >= 30 && ageNum < 45) {
      healthInsuranceCoverage = 1000000 // 10 Lakhs
      healthInsurancePremium = 12000
    } else {
      healthInsuranceCoverage = 1500000 // 15 Lakhs
      healthInsurancePremium = 18000
    }

    res.status(200).json({
      message: 'Insurance recommendations fetched successfully',
      health: {
        coverage: healthInsuranceCoverage,
        premium: healthInsurancePremium,
        providers: ['Star Health', 'Care Health', 'HDFC Ergo']
      },
      term: {
        coverage: lifeInsuranceCoverage,
        premium: lifeInsurancePremium,
        tenure: 30,
        providers: ['LIC', 'HDFC Life', 'Max Life']
      }
    });

  } catch (error) {
    console.error('Get insurance error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching insurance recommendations' 
    })
  }
}

