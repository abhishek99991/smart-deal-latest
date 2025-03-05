import React from 'react'
import './about-us.css'
import Header from '../../ReusableComp/Header'
import Footer from '../../ReusableComp/footer'

const About = () => {
  return (
    <div>
        <Header/>
        <div className="container about-us-page">
          <h2>About Us</h2>
          <p>Deal Smart is a leading e-commerce platform in Dubai, specializing in high-quality electronics and cutting-edge gadgets. As a trusted name in the industry, we are committed to delivering the latest technology with unbeatable prices and seamless shopping experiences.</p>
          <p>With a wide selection of smartphones, laptops, gaming gear, home appliances, and accessories, Deal Smart ensures that customers have access to the best brands and deals, all in one place. Our platform is designed for convenience, featuring secure transactions, fast delivery, and top-notch customer support—making us the go-to destination for tech enthusiasts in the UAE.</p>

          <h2>Our Vision</h2>
        <p>To be the most trusted and preferred online destination for electronics in Dubai by offering innovative products, exceptional service, and a seamless shopping experience.</p>

        <h2>Our Mission</h2>
        <p>To provide our customers with premium electronics at competitive prices while ensuring convenience, reliability, and outstanding customer service. We strive to continuously expand our product range and enhance our platform to meet the evolving needs of tech-savvy consumers.</p>

        <h2>Our Values</h2>
        <div className='our-values'>
          <ul>
            <li>Integrity – Building trust through transparency and ethical business practices.</li>
            <li>Innovation – Staying ahead with the latest technology and smart shopping solutions.</li>
            <li>Customer Satisfaction – Prioritizing the needs of our customers with reliable service and support.</li>
            <li>Efficiency – Ensuring fast, secure, and hassle-free shopping experiences.</li>
            <li>Commitment – Dedicated to delivering quality and value in every transaction.</li>
          </ul>
        </div>

        <h3>🚀 Deal Smart – Where Technology Meets Convenience!</h3>
        </div>

     
        <Footer/>
    </div>
  )
}

export default About