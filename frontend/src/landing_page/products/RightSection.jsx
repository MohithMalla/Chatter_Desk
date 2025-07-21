import React from 'react'

function RightSection({imageURL,
  productName,
  productDescription,
  section,
  sectionName,
}) {
  return (
    <div className="container">
      <div className="row align-items-center">
        {/* Image Section */}
        

        {/* Text Content */}
        <div className="col-12 col-md-6 text-center text-md-start px-3">
          <h1 className="mb-3">{productName}</h1>
          <p className="mb-4">{productDescription}</p>

          {/* Buttons */}
          <div className="mb-4">
            <a href={section} className="text-decoration-none">
              {sectionName} <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          {/* Store Badges */}
          
        </div>
        <div className="col-12 col-md-6 text-center  mb-md-0">
          <img
            src={imageURL}
            alt="Product"
            className="img-fluid"
            style={{ maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;