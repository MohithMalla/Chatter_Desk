import React from 'react'

function Universe() {
  return (
    <div className='container text-center mt-5 mb-5'>
      <h1 className='mt-5'>The Investox Universe</h1>
      <p className='mt-2'>Extend your trading and investment experience even further with our partner platforms</p>
      <div className="row mt-5">
        <div className="col">
          <img src='./sensibullLogo.svg' alt='image' style={{width:"35%"}} />
          <p className='text-muted mt-4'>Options trading platform that lets you
create strategies, analyze positions, and examine
data points like open interest, FII/DII, and more.</p>
        </div>
        <div className="col">
          <img src='./tijori.svg' alt='image' className='small w-25'/>
          <p className='text-muted mt-3'>Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.
</p>
        </div>
        <div className="col">
          <img src='./streakLogo.png' alt='image' className='small w-25'/>
          <p className='text-muted mt-4'>Systematic trading platform
that allows you to create and backtest
strategies without coding.</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <img src='./smallcaseLogo.png' alt='image' className=''/>
          <p className='text-muted'>Thematic investing platform
that helps you invest in diversified
baskets of stocks on ETFs.</p>
        </div>
        {/* <div className="col">
          <img src='' alt='image' className=''/>
          <p className='text-muted'>Personalized advice on life
and health insurance. No spam
and no mis-selling.
Sign up for free</p> 
        </div>*/}
      </div>
    </div>
  )
}

export default Universe