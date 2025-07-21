import React from 'react';

function CreateTicket() {
  return (
    <div className="container my-5 ">
      <h3 className="mb-4 mx-4">
        To create a ticket, select a relevant topic
      </h3>

      <div className="row mt-5 mx-4">
        {/* Account Opening */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-user-circle me-2 text-dark"></i>
            <span className="px-2 py-1 rounded">Account Opening</span>
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Online Account Opening</li>
            <li>Offline Account Opening</li>
            <li>Company, Partnership and HUF Account Opening</li>
            <li>NRI Account Opening</li>
            <li>Charges at InvestoX</li>
            <li>InvestoX IDFC FIRST Bank 3-in-1 Account</li>
            <li>Getting Started</li>
          </ul>
        </div>

        {/* Your InvestoX Account */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-user me-2 text-dark"></i>
            Your InvestoX Account
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Login Credentials</li>
            <li>Account Modification and Segment Addition</li>
            <li>DP ID and bank details</li>
            <li>Your Profile</li>
            <li>Transfer and conversion of shares</li>
          </ul>
        </div>

        {/* Trading & Platforms */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-chart-line me-2 text-dark"></i>
            Trading & Platforms
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Margin/leverage, Product and Order types</li>
            <li>Kite Web and Mobile</li>
            <li>Trading FAQs</li>
            <li>Corporate Actions</li>
            <li>Sentinel</li>
            <li>Kite API</li>
            <li>Pi and other platforms</li>
            <li>Stockreports+</li>
            <li>GTT</li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row mt-1 mx-3">
        {/* Funds */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-money-bill-wave me-2 text-dark"></i> Funds
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Adding Funds</li>
            <li>Corporate Actions</li>
            <li>Sentinel</li>
            <li>Kite API</li>
          </ul>
        </div>

        {/* Console */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-clock me-2 text-dark"></i> Console
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Reports</li>
            <li>Tax Reports</li>
            <li>Download Statements</li>
            <li>Corporate Actions</li>
          </ul>
        </div>

        {/* Coin */}
        <div className="col-md-4 mb-4">
          <h5>
            <i className="fas fa-coins me-2 text-dark"></i> Coin
          </h5>
          <ul className="list-unstyled mt-3 mx-1 text-primary" style={{ lineHeight: '2' }}>
            <li>Understanding Mutual Funds</li>
            <li>Account Modification</li>
            <li>Bank Mandates</li>
            <li>SIP & Redemption</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
