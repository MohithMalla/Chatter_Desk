import React from 'react'

function Hero() {
  return (
    <div className='container'>
      <div className="row  text-center mb-5 mt-5">
        <h1>Pricing</h1>
        <h3 className='fs-5 mb-5 mt-3 text-muted'>Free equity investments and flat 20/- traday  and F&O trades</h3>
        <hr></hr>
      </div>

      <div className="row mt-5 mx-5 ">
        <div className="col text-center ">
          <img src='./pricing0.svg' style={{width:'60%'}}/>
          <h2>Free equity delivery</h2>
          <p className='text-muted mt-3' style={{fontSize:"17px", lineHeight:'28px'}}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className="col text-center ">
          <img src='./pricing20.svg' style={{width:'60%'}}/>
          <h3>Intraday and F&O trades</h3>
          <p className='text-muted  mt-3' style={{fontSize:"17px", lineHeight:'28px'}}>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
        <div className="col text-center ">
          <img src='./pricing0.svg' style={{width:'60%'}}/>
          <h3>Free direct MF</h3>
          <p className='text-muted  mt-3' style={{fontSize:"17px" , lineHeight:'28px'}}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
      </div>
    </div>
  )
}

export default Hero;