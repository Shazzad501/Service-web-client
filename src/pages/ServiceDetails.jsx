import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../components/Loading';

const ServiceDetails = () => {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();

  useEffect(() => {
    document.title = "Service Details";

    setService(data.data);
    setLoading(false);
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Service Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 md:flex md:gap-8">
        {/* Image Section */}
        <div className="md:w-1/3">
          <img
            src={service.serviceImage}
            alt={service.serviceTitle}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{service.serviceTitle}</h2>
          <p className="text-gray-600">
            <span className="font-medium">Company:</span> {service.companyName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Category:</span> {service.category}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Price:</span> ${service.price}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Description:</span> {service.description}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Added Date:</span> {service.addedDate}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Submitted By:</span> {service.userEmail}
          </p>
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline block mt-2"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
