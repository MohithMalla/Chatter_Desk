import React from 'react';

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-12 col-md-6 text-center mb-md-0">
          <img
            src={imageURL}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>

        {/* Text Content */}
        <div className="col-12 col-md-6 text-center text-md-start px-3">
          <h1 className="mb-3">{productName}</h1>
          <p className="mb-4">{productDescription}</p>

          {/* Buttons */}
          <div className="mb-4">
            <a
              href={tryDemo}
              className="text-decoration-none me-4"
            >
              Try Demo <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href={learnMore} className="text-decoration-none">
              Learn More <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          {/* Store Badges */}
          <div>
            <a href={googlePlay} className="me-3">
              <img
                src="./googlePlayBadge.svg"
                alt="Google Play"
                className="img-fluid"
                style={{ maxWidth: '140px' }}
              />
            </a>
            <a href={appStore}>
              <img
                src="./appstoreBadge.svg"
                alt="App Store"
                className="img-fluid"
                style={{ maxWidth: '140px' }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
