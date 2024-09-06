import { useEffect, useState } from 'react';
import Search from './components/Search'
import Card from './components/Card'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [ads, setAds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3000/fakeDataSet')
    .then(resp => resp.json())
    .then(data => setAds(standardizeAds(data)))
    .catch(err => console.log('Error fetching data:', err))
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
      id: uuidv4()
    }))
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const mappedAds = ads?.filter(ad => ad.campaign.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(ad => <Card key={ad.id} ad={ad} />)

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <div className='card-container'>
        {mappedAds}
      </div>
    </div>
  );
}

export default App;
