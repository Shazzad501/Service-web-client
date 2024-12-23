import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const AddService = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    serviceImage: '',
    serviceTitle: '',
    companyName: '',
    website: '',
    description: '',
    category: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addedDate = new Date().toISOString().split('T')[0];

    const serviceData = {
      ...formData,
      userEmail: user?.email || '',
      addedDate,
    };
    axios
      .post('http://localhost:5000/services', serviceData)
      .then((res) => {
        if (res.insertedId) {
          toast.success('Service added successfully!');
          setFormData({
            serviceImage: '',
            serviceTitle: '',
            companyName: '',
            website: '',
            description: '',
            category: '',
            price: '',
          });
        }
      })
      .catch((err) => {
        toast.error(`An error occurred while submitting the service ${err}`);
      });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white py-12">
      <div className="max-w-6xl mx-auto text-center px-5">
        <h1 className="text-4xl font-bold mb-4">Add Your New Service</h1>
        <p className="text-lg">
          Provide details about your service and make it accessible to a wider audience. It's quick, easy, and impactful!
        </p>
      </div>
    </div>
      <div className="max-w-4xl mx-auto px-5 py-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className='flex flex-col md:flex-row gap-5'>
            {/* Service Image */}
            <div className='md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Image URL</label>
              <input
                type="url"
                name="serviceImage"
                value={formData.serviceImage}
                onChange={handleChange}
                placeholder="Enter service image URL"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Service Title */}
            <div className='md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                name="serviceTitle"
                value={formData.serviceTitle}
                onChange={handleChange}
                placeholder="Enter service title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className='flex flex-col md:flex-row gap-5'>
            {/* Company Name */}
            <div className='md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Website */}
            <div className='md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter website URL"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
                  
          <div className='flex flex-col md:flex-row gap-5'>
             {/* Category */}
              <div className='md:w-1/2'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter service category"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* Price */}
              <div className='md:w-1/2'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter service description"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
          </div>
         
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;