import '../styles/globals.css';
import Head from 'next/head';
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X`}
        />
      </Head>
      
      {/* Navigation */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <a href="/" className="logo">Autospend.ai</a>
            <div className="nav-links">
              <a href="/usdc-exchange-rates">Exchange Rates</a>
              <a href="/send-usdc-to-europe">Europe</a>
              <a href="/send-usdc-to-asia">Asia</a>
              <a href="/send-usdc-to-africa">Africa</a>
              <a href="/send-usdc-to-north-america">North America</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="container">
        <Component {...pageProps} />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Autospend.ai</h3>
              <p>Fast, secure USDC to fiat transfers worldwide.</p>
            </div>
            <div className="footer-section">
              <h3>Popular Destinations</h3>
              <ul>
                <li><a href="/send-usdc-to/spain">Spain</a></li>
                <li><a href="/send-usdc-to/nigeria">Nigeria</a></li>
                <li><a href="/send-usdc-to/usa">USA</a></li>
                <li><a href="/send-usdc-to/united-kingdom">United Kingdom</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Resources</h3>
              <ul>
                <li><a href="/usdc-exchange-rates">Exchange Rates</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Autospend.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Analytics */}
      <Analytics />
    </>
  );
}

export default MyApp;
