import React from 'react'

const Card = ({ ad }) => {
    const { campaign, adset, creative, spend, impressions, clicks, results } = ad

  return (
    <div className='card'>
        <h2>{campaign}</h2>
        <h3>Adset: {adset}</h3>
        <p>Creative: {creative}</p>
        <p>Spend: {spend}</p>
        <p>Impressions: {impressions}</p>
        <p>Clicks: {clicks}</p>
        <p>Results: {results}</p>
    </div>
  )
}

export default Card