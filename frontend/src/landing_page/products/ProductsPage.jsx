import React from 'react';
import Hero from '../products/Hero';
import LeftSection from '../products/LeftSection';
import RightSection from '../products/RightSection';
import Universe from '../products/Universe';

function ProductsPage() {
  return (
    <div>
      <Hero/>
      <LeftSection imageURL='kite.png' productName='Kite' productDescription='Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.' tryDemo='https://kite-demo.investox.com/dashboard' learnMore='https://investox.com/products/kite' googlePlay='https://play.google.com/store/apps/details?id=com.investox.kite3&pli=1' appStore='https://apps.apple.com/in/app/investox-kite-trade-invest/id1449453802' />
      <RightSection imageURL='console.png' productName='Console' productDescription='The central dashboard for your InvestoX account. Gain insights into your trades and investments with in-depth reports and visualisations.' section='https://investox.com/products/console' sectionName='Learn More' />
      <LeftSection imageURL='coin.png' productName='Coin' productDescription='Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.' />
      <RightSection imageURL='kite.png' productName='Kite' productDescription='Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.' section='https://investox.com/products/api/' sectionName='kite Connect' />

      <Universe/>
    </div>
  );
}

export default ProductsPage;
