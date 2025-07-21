import React from 'react';

function Team() {
  return (
    <div className="container my-5">
      <h3 className="text-center mb-4 text-muted">People</h3>
      <div className="row align-items-center mx-5">
        <div className="col-md-4 text-center mb-3 mb-md-0">
          <img
            src="./mohithsai.jpg"
            alt="CEO Image"
            className="img-fluid rounded-circle "
            style={{ height: '70%', width:'70%' ,transform: 'rotate(5deg)' }}
          />
          <h5 className='text-muted mt-2'>MohithSai Malla</h5>
          <p className='text-muted mt-1'>Founder CEO</p>
        </div>
        <div className="col-md-8 mb-5">
          <p>
            <b>InvestoX</b> is a zero-brokerage investment platform built to make stock trading simple and accessible. The name combines "Invest" with "X" — representing infinite possibilities. Our goal is to break barriers and empower every Indian to invest with confidence.
          </p>
          <p>
            We offer intuitive tools, clean design, and educational support to help users grow their wealth.
          </p>
          <p>
            Built by <b className="text-primary">MohithSai Malla</b>, a freelance full-stack developer passionate about tech, finance, and impact.
          </p>
          <p>Connect with Mohith:</p>
          <p><a href='https://mallamohith-portfolio.netlify.app/' className='text-decoration-none'>Portfolio</a> / <a className='text-decoration-none' href='https://github.com/MohithMalla'>GitHub</a> / <a className='text-decoration-none' href='https://www.linkedin.com/in/mohithmalla/'>LinkedIn</a></p>
        </div>
      </div>
    </div>
  );
}

export default Team;
