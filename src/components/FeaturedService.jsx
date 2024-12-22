import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCart from './ServiceCart';
import Loading from './Loading';

const FeaturedService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/limitService')
      .then((data) => {
        setServices(data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Show loading component while fetching data
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="text-center">
        <h2 className="font-extrabold text-4xl text-black">
          Our <span className="text-purple-800">Featured</span> Service
        </h2>
        <p className="font-bold text-base mt-4 text-gray-600">
          Choose services designed with sustainability in mind, helping you make a positive impact.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
        {services.map((service) => (
          <ServiceCart key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedService;
