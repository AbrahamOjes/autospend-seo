import Head from 'next/head';

// SEO utility functions
const generatePageTitle = (country) => {
  // Get the payment method in a readable format
  const paymentMethod = getReadablePaymentMethod(country.paymentMethods[0]);
  
  const templates = [
    `Send USDC to ${country.name} - Convert to ${country.currencyName} via ${paymentMethod}`,
    `USDC to ${country.currency} - Send Money to ${country.name} via ${paymentMethod}`,
    `${country.name} USDC Exchange - Get ${country.currencyName} Fast via ${paymentMethod}`
  ];
  return templates[0]; // Or rotate based on A/B testing
};

// Helper function to convert payment method codes to readable text
const getReadablePaymentMethod = (methodCode) => {
  const methodMap = {
    'BankTransfer': 'Bank Transfer',
    'MobileMoney': 'Mobile Money',
    'ACH': 'ACH Transfer',
    'Wire': 'Wire Transfer',
    'Sepa': 'SEPA Transfer',
    'Spei': 'SPEI Transfer',
    'Pix': 'PIX Transfer',
    'SPAV': 'SPAV Transfer'
  };
  
  return methodMap[methodCode] || methodCode;
};

const generateMetaDescription = (country) => {
  const paymentMethod = getReadablePaymentMethod(country.paymentMethods[0]);
  return `Send USDC to ${country.name} and convert to ${country.currencyName} via ${paymentMethod}. ${country.processingTime} processing, ${country.fees} fees. Secure crypto-to-fiat transfers.`;
};

const generateSchema = (country) => {
  const paymentMethod = getReadablePaymentMethod(country.paymentMethods[0]);
  
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `USDC to ${country.currency} Exchange via ${paymentMethod}`,
    "description": country.description,
    "provider": {
      "@type": "Organization",
      "name": "Autospend.ai"
    },
    "feesAndCommissionsSpecification": country.fees,
    "areaServed": {
      "@type": "Country",
      "name": country.name
    },
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Payment Method",
      "value": paymentMethod
    }
  };
};

const generateLocalizedContent = (country) => {
  const paymentMethod = getReadablePaymentMethod(country.paymentMethods[0]);
  
  const sections = {
    regulations: `Our ${country.name} service is fully ${country.regulations}, ensuring your transfers are secure and compliant.`,
    
    popularDestinations: `Popular cities in ${country.name}: ${country.popularCities.join(', ')}. Send USDC directly to ${paymentMethod === 'Mobile Money' ? 'mobile money accounts' : 'bank accounts'} in any of these locations.`,
    
    marketInsights: `The ${country.currencyName} (${country.currency}) market offers ${country.processingTime} settlement times with competitive exchange rates using ${paymentMethod}.`,
    
    testimonials: `"Sent USDC to ${country.name} via ${paymentMethod} in ${country.processingTime}. Great service!" - Verified Customer`
  };
  
  return sections;
};

export default function CountryTemplate({ country }) {
  const {
    name,
    currency,
    currencySymbol,
    currencyName,
    flag,
    description,
    processingTime,
    fees,
    minAmount,
    maxAmount,
    exchangeRate,
    slug,
    paymentMethods
  } = country;
  
  const paymentMethod = getReadablePaymentMethod(paymentMethods[0]);

  const localizedContent = generateLocalizedContent(country);
  const schemaJSON = generateSchema(country);

  return (
    <>
      <Head>
        <title>{generatePageTitle(country)}</title>
        <meta name="description" content={generateMetaDescription(country)} />
        <meta property="og:title" content={`Send USDC to ${name} - Get ${currencyName}`} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={`https://autospend.ai/send-usdc-to-${slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJSON) }}
        />
      </Head>

      <div className="country-page">
        <header className="hero-section">
          <h1>{flag} Send USDC to {name}</h1>
          <p className="subtitle">Convert USDC to {currencyName} ({currency}) via {paymentMethod}</p>
          
          <div className="exchange-rate-card">
            <h3>Current Exchange Rate</h3>
            <p className="rate">1 USDC = {exchangeRate} {currency} {currencySymbol}</p>
          </div>
        </header>

        <section className="features-grid">
          <div className="feature">
            <h3>⚡ Processing Time</h3>
            <p>{processingTime}</p>
          </div>
          <div className="feature">
            <h3>💰 Low Fees</h3>
            <p>{fees}</p>
          </div>
          <div className="feature">
            <h3>📊 Limits</h3>
            <p>{currencySymbol}{minAmount} - {currencySymbol}{maxAmount}</p>
          </div>
          <div className="feature">
            <h3>🔄 Payment Method</h3>
            <p>{paymentMethod}</p>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How to Send USDC to {name}</h2>
          <div className="steps">
            <div className="step">
              <h4>1. Enter Amount</h4>
              <p>Choose how much USDC you want to send to {name}</p>
            </div>
            <div className="step">
              <h4>2. Add Recipient</h4>
              <p>Enter the recipient's {paymentMethod === 'Mobile Money' ? 'mobile money account' : 'local bank details'} in {name}</p>
            </div>
            <div className="step">
              <h4>3. Send USDC</h4>
              <p>Transfer USDC from your wallet to our secure address</p>
            </div>
            <div className="step">
              <h4>4. Receive {currency}</h4>
              <p>Recipient gets {currencyName} in their bank account</p>
            </div>
          </div>
        </section>

        <section className="localized-content">
          <h2>USDC to {currencyName} in {name}</h2>
          <div className="content-grid">
            <div className="content-block">
              <h3>Regulatory Compliance</h3>
              <p>{localizedContent.regulations}</p>
            </div>
            <div className="content-block">
              <h3>Popular Destinations</h3>
              <p>{localizedContent.popularDestinations}</p>
            </div>
            <div className="content-block">
              <h3>Market Insights</h3>
              <p>{localizedContent.marketInsights}</p>
            </div>
            <div className="content-block">
              <h3>Customer Testimonials</h3>
              <p>{localizedContent.testimonials}</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <button className="cta-button">
            Send USDC to {name} Now
          </button>
        </section>
      </div>
    </>
  );
}
