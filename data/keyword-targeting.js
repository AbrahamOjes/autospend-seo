// keyword-targeting.js
// This file contains keyword targeting strategies for Autospend.ai SEO

export const keywordVariations = {
  // Primary keyword patterns
  primary: [
    "send usdc to {country}",
    "usdc to {currency} exchange",
    "convert usdc to {currency}",
    "{country} usdc offramp",
    "usdc to {country} transfer"
  ],
  
  // Secondary keyword patterns
  secondary: [
    "how to send usdc to {country}",
    "best usdc to {currency} rate",
    "usdc {country} exchange rate",
    "transfer usdc to {currency}",
    "usdc to {currency} converter",
    "cash out usdc to {currency}",
    "withdraw usdc to {country} bank",
    "{country} crypto offramp",
    "usdc to {currency} calculator"
  ],
  
  // Long-tail keyword patterns
  longTail: [
    "fastest way to send usdc to {country}",
    "lowest fees for usdc to {currency} exchange",
    "how to convert usdc to {currency} in {country}",
    "send usdc to {country} bank account",
    "usdc to {currency} exchange rate today",
    "best usdc offramp for {country}",
    "is it safe to send usdc to {country}",
    "usdc to {currency} exchange time",
    "usdc to {country} transfer limits",
    "how long does usdc to {currency} transfer take"
  ]
};

// Content variation templates for different sections
export const contentVariations = {
  // Hero section variations
  heroHeadings: [
    "{flag} Send USDC to {name}",
    "{flag} Convert USDC to {currencyName} in {name}",
    "{flag} USDC to {currency} Exchange | {name}"
  ],
  
  heroSubtitles: [
    "Convert USDC to {currencyName} ({currency}) instantly",
    "Fast & secure USDC to {currency} transfers in {name}",
    "Get the best USDC to {currencyName} rates today"
  ],
  
  // Feature section variations
  featureHeadings: {
    speed: [
      "⚡ Processing Time",
      "⚡ Fast Transfers",
      "⚡ Quick Settlement"
    ],
    fees: [
      "💰 Low Fees",
      "💰 Competitive Rates",
      "💰 Affordable Transfers"
    ],
    limits: [
      "📊 Limits",
      "📊 Transfer Range",
      "📊 Min/Max Amount"
    ]
  },
  
  // CTA variations
  ctaButtons: [
    "Send USDC to {name} Now",
    "Convert USDC to {currency} Today",
    "Start Your USDC to {currencyName} Transfer",
    "Get the Best {currency} Rate Now"
  ],
  
  // FAQ questions by country/region
  faqQuestions: {
    global: [
      "How long does it take to send USDC to {name}?",
      "What are the fees for converting USDC to {currency}?",
      "Is there a minimum amount to send USDC to {name}?",
      "How secure is sending USDC to {name}?",
      "Do I need KYC to send USDC to {name}?"
    ],
    europe: [
      "Are USDC to {currency} transfers SEPA compatible?",
      "How does MiCA regulation affect USDC transfers to {name}?",
      "Can I send USDC to {name} from outside the EU?"
    ],
    africa: [
      "Can I send USDC to mobile money in {name}?",
      "What ID is required for USDC transfers to {name}?",
      "Are there daily limits for USDC transfers to {name}?"
    ],
    asia: [
      "Can I send USDC to {name} using local payment methods?",
      "How do currency controls affect USDC transfers to {name}?",
      "What banks accept USDC transfers in {name}?"
    ]
  }
};

// Generate keyword variations for a specific country
export function generateKeywords(country) {
  const allKeywords = [];
  
  // Process primary keywords
  keywordVariations.primary.forEach(pattern => {
    allKeywords.push(
      pattern
        .replace('{country}', country.name.toLowerCase())
        .replace('{currency}', country.currency.toLowerCase())
    );
  });
  
  // Process secondary keywords
  keywordVariations.secondary.forEach(pattern => {
    allKeywords.push(
      pattern
        .replace('{country}', country.name.toLowerCase())
        .replace('{currency}', country.currency.toLowerCase())
    );
  });
  
  // Process long-tail keywords (limit to 5 to avoid keyword stuffing)
  const selectedLongTail = keywordVariations.longTail.slice(0, 5);
  selectedLongTail.forEach(pattern => {
    allKeywords.push(
      pattern
        .replace('{country}', country.name.toLowerCase())
        .replace('{currency}', country.currency.toLowerCase())
    );
  });
  
  return allKeywords;
}

// Generate content variations for a specific country
export function generateContentVariations(country) {
  // Select random variations for each section to create content diversity
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
  
  const heroHeading = getRandomItem(contentVariations.heroHeadings)
    .replace('{flag}', country.flag)
    .replace('{name}', country.name)
    .replace('{currency}', country.currency)
    .replace('{currencyName}', country.currencyName);
    
  const heroSubtitle = getRandomItem(contentVariations.heroSubtitles)
    .replace('{name}', country.name)
    .replace('{currency}', country.currency)
    .replace('{currencyName}', country.currencyName);
    
  const speedHeading = getRandomItem(contentVariations.featureHeadings.speed);
  const feesHeading = getRandomItem(contentVariations.featureHeadings.fees);
  const limitsHeading = getRandomItem(contentVariations.featureHeadings.limits);
  
  const ctaButton = getRandomItem(contentVariations.ctaButtons)
    .replace('{name}', country.name)
    .replace('{currency}', country.currency)
    .replace('{currencyName}', country.currencyName);
    
  // Get region-specific and global FAQ questions
  const globalFaqs = contentVariations.faqQuestions.global.map(q => 
    q.replace('{name}', country.name)
     .replace('{currency}', country.currency)
  );
  
  const regionFaqs = contentVariations.faqQuestions[country.region.toLowerCase()] 
    ? contentVariations.faqQuestions[country.region.toLowerCase()].map(q => 
        q.replace('{name}', country.name)
         .replace('{currency}', country.currency)
      )
    : [];
    
  const faqs = [...globalFaqs, ...regionFaqs];
  
  return {
    heroHeading,
    heroSubtitle,
    featureHeadings: {
      speed: speedHeading,
      fees: feesHeading,
      limits: limitsHeading
    },
    ctaButton,
    faqs
  };
}
