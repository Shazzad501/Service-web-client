import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter';



const Hero = () => {

  const sliderData = [
    {
      img: "https://i.ibb.co.com/K9LM7H8/Ride-shear.png",
      title: "Ride Shear",
      description: "Experience the convenience of seamless transportation with our ride-share service. Whether you’re commuting to work, heading to an event, or exploring the city, we’re here to make your journey effortless and enjoyable. With real-time tracking, easy booking, and multiple ride options, we cater to your unique travel needs. .",
    },
    {
      img: "https://i.ibb.co.com/Myd0Xjc/delivery-service.jpg", 
      title: "Delivery Service",
      description: "At our delivery service, we are committed to providing fast, reliable, and secure solutions to meet your everyday needs. Whether you’re sending important documents, cherished gifts, or essential products, our team ensures your packages reach their destination on time, every time. With cutting-edge tracking technology and exceptional customer support, we make it easy to stay informed at every step of the journey.",
    },
    {
      img: "https://i.ibb.co.com/VjmLVcv/healt-w.png",
      title: "Health & Wellness",
      description: "Prioritize your well-being with our comprehensive health and wellness services designed to nurture your mind, body, and spirit. From personalized fitness training and nutrition counseling to mental health support, we are here to guide you toward a healthier lifestyle. Our telemedicine platform connects you with trusted healthcare professionals for expert advice from the comfort of your home.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <div className='overflow-hidden max-w-7xl mx-auto'>
       <div className="slider-container my-5">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center gap-5 bg-white rounded-lg shadow-md p-6">
              <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className='font-extrabold text-4xl text-purple-800'>Explore Our All Service</h2>
                <h3 className="text-3xl font-extrabold mb-2 text-black">
                <Typewriter
                words={[
                  `${item.title}`,
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
              </h3>
                <p className=" font-bold text-base text-gray-600">{item.description}</p>
                <button className=' btn rounded-xl bg-purple-800 text-white hover:bg-purple-800 mt-6 rounded-br-none font-bold text-lg'>See More</button>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full md:h-[450px] rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Hero;