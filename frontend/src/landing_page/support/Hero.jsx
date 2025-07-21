import React from 'react';

function Hero() {
  return (
    <div className="container-fluid bg-primary text-white" style={{ padding: '60px 150px 40px' }}>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 mb-4">
          <h5 className="mb-3">Support Portal</h5>
          <h3 className="mb-4">
            Search for an answer or browse help topics to create a ticket
          </h3>

          <div
            className="bg-white rounded px-4 py-2"
            style={{ display: 'inline-block', maxWidth: '100%' }}
          >
            <p className="text-dark m-0">
              Eg: how do I activate F&O, why is my order getting rejected...
            </p>
          </div>

          <div className="mt-4">
            <a href="#" className="text-white text-decoration-underline me-3">
              Track account opening
            </a>
            <a href="#" className="text-white text-decoration-underline me-3">
              Track segment activation
            </a>
            <a href="#" className="text-white text-decoration-underline d-inline-block">
              Intraday
            </a>
            <br />
            <a href="#" className="text-white text-decoration-underline me-3 mt-2 d-inline-block">
              Margins
            </a>
            <a href="#" className="text-white text-decoration-underline d-inline-block mt-2">
              Kite user manual
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <h3 className="mb-4">Featured</h3>
          <ol>
            <li>
              <a href="#" className="text-white text-decoration-underline">
                Current TakeOvers and Delisting - January 2025
              </a>
            </li>
            <li>
              <a href="#" className="text-white text-decoration-underline">
                Latest Intraday Leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Hero;
