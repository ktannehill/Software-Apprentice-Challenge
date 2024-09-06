import { useEffect, useState } from 'react';
import Search from './components/Search'
import Sort from './components/Sort'
import Card from './components/Card'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [ads, setAds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('http://localhost:3000/fakeDataSet')
    .then(resp => resp.json())
    .then(data => setAds(processAds(data)))
    .catch(err => console.log('Error fetching data:', err))
  }

  const processAds = (data) => {

    let platformAds = [
      ...(data.facebook_ads || []).map(standardizeAd), 
      ...(data.snapchat_ads || []).map(standardizeAd), 
      ...(data.twitter_ads || []).map(standardizeAd)
    ]
    let googleAnalytics = [...(data.google_analytics || []).map(standardizeAd)]

    mergeResults(platformAds, googleAnalytics)

    return [
      ...platformAds,
      ...googleAnalytics
    ]
  }

  const standardizeAd = (ad) => ({
    campaign: ad.campaign_name || ad.campaign || ad.utm_campaign,
    adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium,
    creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content,
    spend: ad.spend || ad.cost || 0,
    impressions: ad.impressions || 0,
    clicks: ad.clicks || ad.post_clicks || 0,
    results: ad.results || 0,
    id: uuidv4()
  })

  const mergeResults = (platformAds, googleAnalytics) => {
    platformAds.forEach(pAd => {
      let matches = googleAnalytics.filter(gAd => {
        return gAd.campaign === pAd.campaign 
        && (gAd.adset === pAd.adset 
        || gAd.creative === pAd.creative)
      })

      matches.forEach(match => pAd.results += match.results)
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleSort = (val) => {
    setSortBy(val)
  }

  const mappedAds = ads?.filter(ad => ad.campaign.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    if (sortBy === 'spend_asc') {
      return a.spend - b.spend
    } else if (sortBy === 'spend_desc') {
      return b.spend - a.spend
    } else {
      return 0
    }
  })  
  .map(ad => <Card key={ad.id} ad={ad} />)

  return (
    <div>
      <section className='search'>
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        <Sort sortBy={sortBy} onSort={handleSort} />
      </section>
      <main className='card-container'>
        {mappedAds}
      </main>
    </div>
  );
}

export default App;
