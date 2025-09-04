const fs = require('fs');
const path = require('path');
const { countriesData } = require('../data/countries-data');

const generateSitemap = () => {
  const baseUrl = 'https://autospend.ai';
  
  // Generate country-specific URLs
  const countryUrls = countriesData.map(country => {
    // Get payment method in readable format for metadata
    const paymentMethod = country.paymentMethods[0];
    
    return {
      url: `${baseUrl}/send-usdc-to/${country.slug}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    };
  });
  
  // Generate region hub pages
  const regions = [...new Set(countriesData.map(country => country.region))];
  const regionUrls = regions.map(region => ({
    url: `${baseUrl}/send-usdc-to-${region.toLowerCase().replace(/\s+/g, '-')}`,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  }));
  
  // Add other important pages
  const staticUrls = [
    {
      url: baseUrl,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: `${baseUrl}/usdc-exchange-rates`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString().split('T')[0]
    }
  ];
  
  // Combine all URLs
  const allUrls = [...staticUrls, ...regionUrls, ...countryUrls];
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`).join('')}
</urlset>`;
  
  // Write to file
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at /public/sitemap.xml');
};

// Execute the function
generateSitemap();
