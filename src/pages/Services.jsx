import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import ServiceCart from '../components/ServiceCart';
import { Typewriter } from 'react-simple-typewriter';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 

  // Fetch services from the API 
  useEffect(() => {
    axios
      .get('http://localhost:5000/services')
      .then((response) => {
        const data = response.data;
        setServices(data);
        setFilteredServices(data);
      })
      .catch((error) => {
        toast.error(`Error fetching services: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.serviceTitle.toLowerCase().includes(query)
      );
      setFilteredServices(filtered);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <div className="flex flex-col gap-3 items-center justify-center pb-5">
        <h2 className="text-3xl font-bold text-center">
        <Typewriter
                words={[
                  "Find a Service by Title",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
          </h2>
        <form onSubmit={handleSearch} className="flex items-center justify-center">
          <input
            type="search"
            name="search"
            placeholder="Enter Category name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-purple-800 rounded-md rounded-r-none border-r-0 px-2 py-2.5 focus:border-purple-800"
          />
          <button
            type="submit"
            className="btn border-2 hover:border-purple-800 border-purple-800 rounded-l-none hover:bg-purple-800 bg-purple-800 text-white px-4 py-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCart key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-600">No services found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
