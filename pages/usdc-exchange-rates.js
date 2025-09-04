import Head from 'next/head';
import Link from 'next/link';
import { countriesData } from '../data/countries-data';

export default function ExchangeRatesPage() {
  // Group countries by region for better organization
  const countryByRegion = countriesData.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>USDC Exchange Rates - Live Currency Conversion | Autospend.ai</title>
        <meta 
          name="description" 
          content="Live USDC exchange rates for 50+ currencies worldwide. Convert USDC to local currency with competitive rates, low fees, and fast processing times." 
        />
        <meta property="og:title" content="USDC Exchange Rates - Live Currency Conversion | Autospend.ai" />
        <meta 
          property="og:description" 
          content="Live USDC exchange rates for 50+ currencies worldwide. Convert USDC to local currency with competitive rates." 
        />
        <link rel="canonical" href="https://autospend.ai/usdc-exchange-rates" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Table",
              "about": "USDC Exchange Rates",
              "description": "Current exchange rates for converting USDC to various local currencies"
            })
          }}
        />
      </Head>

      <div className="exchange-rates-page">
        <header className="hero-section">
          <h1>USDC Exchange Rates</h1>
          <p className="subtitle">Live conversion rates for sending USDC worldwide</p>
          <p className="update-time">Last updated: {new Date().toLocaleString()}</p>
        </header>

        <section className="rates-overview">
          <h2>Current USDC Exchange Rates</h2>
          <p>
            Autospend.ai offers competitive exchange rates for converting USDC to local currencies worldwide.
            Our rates are updated regularly to ensure you get the best value for your transfers.
          </p>
          
          <div className="exchange-table-container">
            <table className="exchange-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Currency</th>
                  <th>Exchange Rate</th>
                  <th>Processing Time</th>
                  <th>Fees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {countriesData.map(country => (
                  <tr key={country.slug}>
                    <td>
                      <span className="flag">{country.flag}</span> {country.name}
                    </td>
                    <td>{country.currencyName} ({country.currency})</td>
                    <td>1 USDC = {country.exchangeRate} {country.currency}</td>
                    <td>{country.processingTime}</td>
                    <td>{country.fees}</td>
                    <td>
                      <Link href={`/send-usdc-to/${country.slug}`}>
                        <a className="send-button">Send Now</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="regions-section">
          <h2>Browse by Region</h2>
          <div className="regions-grid">
            {Object.keys(countryByRegion).map(region => (
              <div key={region} className="region-card">
                <h3>{region}</h3>
                <ul className="region-countries">
                  {countryByRegion[region].map(country => (
                    <li key={country.slug}>
                      <Link href={`/send-usdc-to/${country.slug}`}>
                        <a>{country.flag} {country.name} ({country.currency})</a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/send-usdc-to-${region.toLowerCase().replace(/\s+/g, '-')}`}>
                  <a className="view-all">View all {region} countries</a>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How often are exchange rates updated?</h3>
              <p>Our USDC exchange rates are updated hourly to reflect current market conditions.</p>
            </div>
            <div className="faq-item">
              <h3>Are there any hidden fees?</h3>
              <p>No hidden fees. The fee percentage shown includes all processing and conversion costs.</p>
            </div>
            <div className="faq-item">
              <h3>How long do transfers take?</h3>
              <p>Transfer times vary by country, ranging from instant to a few hours as indicated in the table.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a minimum transfer amount?</h3>
              <p>Yes, minimum amounts vary by country. Check each country page for specific limits.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to send USDC?</h2>
          <p>Choose a country from the table above or browse by region to get started.</p>
        </section>
      </div>
    </>
  );
}
