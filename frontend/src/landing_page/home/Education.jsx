import React from 'react'

function Education() {
  return (
    <div>
        <div className='container mt-5'>
          <div className="row">
            <div className="col-6">
              <img
            src="./education.svg"
            style={{ width: "75%" }}
            alt="InvestoX Ecosystem"
            className="img-fluid mb-4 mt-5"
/>              </div>
            <div className="col-6 mt-5">
              <h1 className='p-5 mb-3'>Free and open market education</h1>
              <div className="row">
                <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                <a href="/kite" className='text-decoration-none mb-3'>
    Varsity <i className="fa-solid fa-arrow-right"></i>
  </a>
              </div>
              <div className="row">
                <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                <a href="/kite" className='text-decoration-none mb-3'>
    TradingQ&A <i className="fa-solid fa-arrow-right"></i>
  </a>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default Education