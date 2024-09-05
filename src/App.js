import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ads, setAds] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch("http://localhost:3000/fakeDataSet")
    .then(resp => resp.json())
    .then(data => setAds(standardizeAds(data)))
    .catch(err => console.log("Error fetching data:", err))
  }

  const standardizeAds = (data) => {
    const allAds = [
      ...(data.facebook_ads || []),
      ...(data.google_analytics || []),
      ...(data.snapchat_ads || []),
      ...(data.twitter_ads || [])
    ];
  
    return allAds.map(ad => ({
      campaign: ad.campaign_name || ad.campaign || ad.utm_campaign,
      adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium,
      creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content,
      spend: ad.spend || ad.cost || 0, 
      impressions: ad.impressions || 0, 
      clicks: ad.clicks || ad.post_clicks || 0, 
      results: ad.results || 0, 
    }));
  };

  console.log(ads)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
