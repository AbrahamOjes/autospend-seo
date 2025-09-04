import { useState, useEffect } from 'react';
import Head from 'next/head';
import { countriesData } from '../../data/countries-data';

// Mock data for demonstration purposes
// In a real implementation, this would come from an API connected to Google Analytics, Search Console, etc.
const mockPerformanceData = {
  overall: {
    impressions: 12450,
    clicks: 1876,
    ctr: 15.07,
    avgPosition: 8.3,
    conversions: 245
  },
  byCountry: countriesData.map(country => ({
    country: country.name,
    slug: country.slug,
    impressions: Math.floor(Math.random() * 2000) + 100,
    clicks: Math.floor(Math.random() * 300) + 10,
    ctr: Math.floor(Math.random() * 20) + 5,
    avgPosition: Math.floor(Math.random() * 10) + 1,
    conversions: Math.floor(Math.random() * 50)
  })),
  byKeyword: [
    { keyword: "send usdc to spain", impressions: 1240, clicks: 187, ctr: 15.1, avgPosition: 3.2 },
    { keyword: "usdc to eur exchange", impressions: 980, clicks: 145, ctr: 14.8, avgPosition: 4.1 },
    { keyword: "convert usdc to ngn", impressions: 870, clicks: 132, ctr: 15.2, avgPosition: 2.8 },
    { keyword: "nigeria usdc offramp", impressions: 760, clicks: 98, ctr: 12.9, avgPosition: 5.3 },
    { keyword: "usdc to usd transfer", impressions: 650, clicks: 87, ctr: 13.4, avgPosition: 4.7 }
  ],
  trends: {
    lastWeek: [
      { date: "2025-08-28", impressions: 1650, clicks: 245 },
      { date: "2025-08-29", impressions: 1720, clicks: 258 },
      { date: "2025-08-30", impressions: 1580, clicks: 237 },
      { date: "2025-08-31", impressions: 1490, clicks: 223 },
      { date: "2025-09-01", impressions: 1830, clicks: 274 },
      { date: "2025-09-02", impressions: 1950, clicks: 292 },
      { date: "2025-09-03", impressions: 2230, clicks: 347 }
    ]
  }
};

export default function SEODashboard() {
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [selectedMetric, setSelectedMetric] = useState('impressions');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [sortBy, setSortBy] = useState('impressions');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sort country data
  const sortedCountryData = [...performanceData.byCountry].sort((a, b) => {
    return sortOrder === 'desc' 
      ? b[sortBy] - a[sortBy] 
      : a[sortBy] - b[sortBy];
  });

  // Handle sort change
  const handleSort = (metric) => {
    if (sortBy === metric) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(metric);
      setSortOrder('desc');
    }
  };

  return (
    <>
      <Head>
        <title>SEO Performance Dashboard | Autospend.ai Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="dashboard-container">
        <h1>SEO Performance Dashboard</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleString()}</p>

        <div className="dashboard-controls">
          <div className="control-group">
            <label>Metric:</label>
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="impressions">Impressions</option>
              <option value="clicks">Clicks</option>
              <option value="ctr">CTR</option>
              <option value="avgPosition">Avg. Position</option>
              <option value="conversions">Conversions</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Timeframe:</label>
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
            </select>
          </div>
        </div>

        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>Impressions</h3>
            <p className="metric-value">{performanceData.overall.impressions.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>Clicks</h3>
            <p className="metric-value">{performanceData.overall.clicks.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>CTR</h3>
            <p className="metric-value">{performanceData.overall.ctr.toFixed(2)}%</p>
          </div>
          <div className="summary-card">
            <h3>Avg. Position</h3>
            <p className="metric-value">{performanceData.overall.avgPosition.toFixed(1)}</p>
          </div>
          <div className="summary-card">
            <h3>Conversions</h3>
            <p className="metric-value">{performanceData.overall.conversions.toLocaleString()}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Performance by Country</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Country</th>
                <th onClick={() => handleSort('impressions')} className={sortBy === 'impressions' ? `sorted-${sortOrder}` : ''}>
                  Impressions {sortBy === 'impressions' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th onClick={() => handleSort('clicks')} className={sortBy === 'clicks' ? `sorted-${sortOrder}` : ''}>
                  Clicks {sortBy === 'clicks' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th onClick={() => handleSort('ctr')} className={sortBy === 'ctr' ? `sorted-${sortOrder}` : ''}>
                  CTR {sortBy === 'ctr' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th onClick={() => handleSort('avgPosition')} className={sortBy === 'avgPosition' ? `sorted-${sortOrder}` : ''}>
                  Avg. Position {sortBy === 'avgPosition' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th onClick={() => handleSort('conversions')} className={sortBy === 'conversions' ? `sorted-${sortOrder}` : ''}>
                  Conversions {sortBy === 'conversions' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCountryData.map((item, index) => (
                <tr key={index}>
                  <td><a href={`/send-usdc-to/${item.slug}`} target="_blank">{item.country}</a></td>
                  <td>{item.impressions.toLocaleString()}</td>
                  <td>{item.clicks.toLocaleString()}</td>
                  <td>{item.ctr.toFixed(2)}%</td>
                  <td>{item.avgPosition.toFixed(1)}</td>
                  <td>{item.conversions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h2>Top Performing Keywords</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>CTR</th>
                <th>Avg. Position</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.byKeyword.map((item, index) => (
                <tr key={index}>
                  <td>{item.keyword}</td>
                  <td>{item.impressions.toLocaleString()}</td>
                  <td>{item.clicks.toLocaleString()}</td>
                  <td>{item.ctr.toFixed(2)}%</td>
                  <td>{item.avgPosition.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h2>Trend Analysis</h2>
          <div className="trend-chart">
            <p>Chart visualization would be implemented here using a library like Chart.js or Recharts</p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.trends.lastWeek.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.impressions.toLocaleString()}</td>
                    <td>{item.clicks.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>SEO Recommendations</h2>
          <div className="recommendations">
            <div className="recommendation-card">
              <h3>Content Optimization</h3>
              <p>Based on keyword performance, consider enhancing content for "usdc to ngn exchange" which has high CTR but lower impressions.</p>
            </div>
            <div className="recommendation-card">
              <h3>Internal Linking</h3>
              <p>Increase internal links to the United Kingdom page which has good conversion rates but lower visibility.</p>
            </div>
            <div className="recommendation-card">
              <h3>Meta Description Updates</h3>
              <p>Update meta descriptions for Spain and Nigeria pages to improve CTR from current 14.8% to target 18%.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 2rem 0;
        }
        
        .last-updated {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        
        .dashboard-controls {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .control-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .dashboard-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .summary-card {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .metric-value {
          font-size: 2rem;
          font-weight: bold;
          color: #3b82f6;
        }
        
        .dashboard-section {
          margin: 3rem 0;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        
        .data-table th,
        .data-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .data-table th {
          background-color: #f9fafb;
          cursor: pointer;
        }
        
        .data-table th:hover {
          background-color: #f3f4f6;
        }
        
        .sorted-desc, .sorted-asc {
          background-color: #e5e7eb !important;
        }
        
        .recommendations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .recommendation-card {
          background-color: #f9fafb;
          border-left: 4px solid #3b82f6;
          padding: 1.5rem;
          border-radius: 0 8px 8px 0;
        }
      `}</style>
    </>
  );
}
