import Head from 'next/head';
import Link from 'next/link';
import { countriesData } from '../data/countries-data';

export default function RegionPage({ region, countries }) {
  const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1);
  
  return (
    <>
      <Head>
        <title>Send USDC to {formattedRegion} - Autospend.ai</title>
        <meta 
          name="description" 
          content={`Convert USDC to local currencies in ${formattedRegion}. Fast processing, low fees, secure transfers to ${countries.length} countries in ${formattedRegion}.`} 
        />
        <meta property="og:title" content={`Send USDC to ${formattedRegion} - Autospend.ai`} />
        <meta 
          property="og:description" 
          content={`Convert USDC to local currencies in ${formattedRegion}. Fast processing, low fees, secure transfers.`} 
        />
        <link rel="canonical" href={`https://autospend.ai/send-usdc-to-${region}`} />
      </Head>

      <div className="region-page">
        <header className="hero-section">
          <h1>Send USDC to {formattedRegion}</h1>
          <p className="subtitle">Convert USDC to local currencies across {countries.length} countries in {formattedRegion}</p>
        </header>

        <section className="countries-grid">
          <h2>Countries in {formattedRegion}</h2>
          <div className="grid">
            {countries.map((country) => (
              <div key={country.slug} className="country-card">
                <div className="flag">{country.flag}</div>
                <h3>{country.name}</h3>
                <p>1 USDC = {country.exchangeRate} {country.currency}</p>
                <p>{country.processingTime} processing</p>
                <Link href={`/send-usdc-to/${country.slug}`}>
                  <a className="country-link">Send USDC to {country.name}</a>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="region-info">
          <h2>About {formattedRegion}</h2>
          <p>
            Autospend.ai offers fast and secure USDC to fiat conversions across {formattedRegion}. 
            Our service allows you to send USDC and have recipients receive local currency directly 
            in their bank accounts with competitive exchange rates and low fees.
          </p>
          <p>
            All transfers to {formattedRegion} are fully compliant with local regulations, 
            ensuring your money arrives safely and securely.
          </p>
        </section>

        <section className="cta-section">
          <h2>Ready to send USDC to {formattedRegion}?</h2>
          <p>Choose a country above to get started or explore our other regions below.</p>
          
          <div className="other-regions">
            <h3>Other Regions</h3>
            <div className="regions-list">
              {['europe', 'asia', 'africa', 'north america', 'south america', 'oceania']
                .filter(r => r !== region.toLowerCase())
                .map(r => {
                  const formattedR = r.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                  return (
                    <Link key={r} href={`/send-usdc-to-${r.replace(/\s+/g, '-')}`}>
                      <a className="region-link">{formattedR}</a>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Extract unique regions and create paths
  const regions = [...new Set(countriesData.map(country => country.region.toLowerCase().replace(/\s+/g, '-')))];
  
  const paths = regions.map((region) => ({
    params: { region },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { region } = params;
  const formattedRegion = region.replace(/-/g, ' ');
  
  // Find all countries in this region
  const countries = countriesData.filter(
    country => country.region.toLowerCase() === formattedRegion
  );
  
  if (countries.length === 0) {
    return { notFound: true };
  }

  return {
    props: { 
      region: formattedRegion,
      countries 
    },
    revalidate: 86400, // Revalidate once per day
  };
}
