import React from 'react';

function Hero() {
  return (
    <div className='container p-5 mb-5'>
      <div className="row text-center">
        <img src='/homeHero.png' alt='Hero' className='mb-5'/>
        <h1 className='mt-5'>Invest in everything</h1>
<p className="responsive-text fs-5">
  Online platform to invest in stocks, derivatives, mutual funds, and more.
</p>
<button 
  className="btn btn-primary fs-5 mb-5 px-4 py-2 d-block mx-auto" 
  style={{ maxWidth: '250px', width: '100%' }}
>
  Signup for Now
</button>
      </div>
    </div>
  );
}

export default Hero;
