import React from 'react'

function Stats() {
  return (
    <div className='container py-5'>
      <div className="row align-items-center">
        {/* Left Column - Text */}
        <div className="col-12 col-md-6 mb-5 p-5">
          <h2>Trust with confidence</h2>

          <div className="stat-section mt-5">
            <h5>Customer-first always</h5>
            <p className='text-secondary'>
              That's why 1.6+ crore customers trust InvestoX with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
            </p>
          </div>

          <div className="stat-section mt-4">
            <h5>No spam or gimmicks</h5>
            <p className='text-secondary'>
              No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
            </p>
          </div>

          <div className="stat-section mt-4">
            <h5>The InvestoX universe</h5>
            <p className='text-secondary'>
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
            </p>
          </div>

          <div className="stat-section mt-4">
            <h5>Do better with money</h5>
            <p className='text-secondary'>
              With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
            </p>
          </div>
        </div>

        {/* Right Column - Image & Links */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="./ecosystem.png"
            style={{ width: "75%" }}
            alt="InvestoX Ecosystem"
            className="img-fluid mb-4"
          />
          <div className="links mx-5 d-flex justify-content-center gap-4">
  <a href="/products" className='text-decoration-none'>
    Explore our products <i className="fa-solid fa-arrow-right"></i>
  </a>
  <a href="/kite" className='text-decoration-none'>
    Try Kite <i className="fa-solid fa-arrow-right"></i>
  </a>
</div>

        </div>
      </div>
    </div>
  )
}

export default Stats
