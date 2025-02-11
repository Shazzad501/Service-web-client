import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const partners = [
  {
    name: "Alex Carry",
    logo: "https://i.ibb.co.com/JBfgpbB/girl2.jpg", 
    description: "Providing excellent cloud services to enhance scalability."
  },
  {
    name: "Jhon",
    logo: "https://i.ibb.co.com/b1fpymc/boy2.jpg",
    description: "Offering top-notch security solutions for your business."
  },
  {
    name: "Kim Jhon",
    logo: "https://i.ibb.co.com/DwM4YKH/boy1.png",
    description: "Revolutionizing customer engagement with AI-driven insights."
  },
  {
    name: "Aitana Grachiya",
    logo: "https://i.ibb.co.com/WkSdJNg/girl1.jpg",
    description: "Delivering seamless payment integrations worldwide."
  }
];

const MeetOurPartners = () => {

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 1500,
    });
  }, []);
  return (
    <section className="py-10 bg-base-200" id="partners">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-800">Meet Our Partners</h2>
        <p className="text-lg text-gray-600 mb-12">
          We are proud to collaborate with industry leaders and innovators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div data-aos='fade-up'
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
