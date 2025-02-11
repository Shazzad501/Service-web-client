import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
  
  const [formData, setFormData] = useState({
    serviceImage: '',
    serviceTitle: '',
    companyName: '',
    website: '',
    description: '',
    category: '',
    price: '',
  });

  const categories = [
    'Delivery', 'Ride-Share', 'Home Services', 'Health & Wellness',
    'Event Services', 'Professional Services', 'Education & Tutoring', 'Others'
  ];

  // Handle file upload to ImgBB
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setLoading(true);
    const imageData = new FormData();
    imageData.append('image', image);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imageData);
      if (response.data.success) {
        setFormData((prev) => ({ ...prev, serviceImage: response.data.data.url }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed. Try again.');
      }
    } catch (error) {
      toast.error('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serviceImage) {
      toast.error('Please upload an image first.');
      return;
    }
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      toast.error('Please enter a valid price.');
      return;
    }

    const addedDate = new Date().toISOString().split('T')[0];

    const serviceData = {
      ...formData,
      userEmail: user?.email || '',
      addedDate,
    };

    axios.post('https://service-review-server-navy.vercel.app/services', serviceData, { withCredentials: true })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success('Service added successfully!');
          navigate('/my-service');
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
        toast.error(`An error occurred: ${err}`);
      });
  };

  useEffect(() => {
    document.title = 'Add Service';
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto text-center px-5">
          <h1 className="text-4xl font-bold mb-4">Add Your New Service</h1>
          <p className="text-lg">
            Provide details about your service and make it accessible to a wider audience. It's quick, easy, and impactful!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Service Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {loading && <p className="text-purple-600 mt-2">Uploading image...</p>}
          </div>

          {/* Display uploaded image */}
          {formData.serviceImage && (
            <div className="w-full">
              <img src={formData.serviceImage} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                name="serviceTitle"
                value={formData.serviceTitle}
                onChange={handleChange}
                placeholder="Enter service title"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter website URL"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Field */}
          <div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter service description"
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
