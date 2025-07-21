import React from 'react'

function Hero() {
  return (
    <div className='container  mt-5 p-5 '>
        <div className="mb-5 text-muted text-center">
        <h2>We pioneered the discount broking model in India.</h2>
            <h2>Now, we are breaking ground with our technology.</h2>
            </div>
            <hr></hr>

            <div className="row mt-5 mx-5">
                <div className="col mx-5">
                    <p>We launched InvestoX on 6th June, 2025, with a bold mission — to eliminate the traditional barriers faced by Indian traders and investors, including high costs, lack of transparency, limited access, and outdated technology.</p>
                    <p>The name <b className='text-primary'>InvestoX</b> is a fusion of "<b>Invest</b>" and "<b>X</b>", symbolizing <b>investing in stocks with infinite possibilities </b>. The ‘X’ represents the limitless opportunities the stock market offers — and our commitment to helping every Indian tap into that potential.</p>
                    <p>With our <b>zero-brokerage model</b>, intuitive technology, and client-first philosophy, InvestoX is rapidly emerging as one of India’s most trusted investment platforms and we’re just getting started. As we continue to innovate, we aim to empower millions more to invest with confidence and unlock infinite possibilities.</p>
                </div>
                <div className="col ">
                    <p>We believe that financial empowerment starts with education. That’s why we run a series of open, free educational initiatives, including:
                        <ul>
                            <li><b>InvestoX Academy</b> – Interactive modules for every level of investor</li>

                            <li><b>Weekly Webinars</b> – Led by market experts and analysts</li>

                            <li><b>Community Forums</b> – Where investors exchange ideas and insights</li>
                        </ul>
                    </p>
                    <p>
                        Through <b>InvestoX Labs</b>, our startup incubation and fintech investment arm, we support visionary founders working to solve key challenges in financial access and wealth-building. Our goal is to expand the Indian capital markets by backing scalable, tech-first solutions.
                    </p>
                </div>
            </div>


    </div>
  )
}

export default Hero;