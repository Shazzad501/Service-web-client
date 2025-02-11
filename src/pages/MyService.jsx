import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {  FaRegEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const MyService = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const categories = ['Delivery',
    'Ride-Share',
    'Home Services',
    'Health & Wellness',
    'Event Services',
    'Professional Services',
    'Education & Tutoring',
    'Others'];

  useEffect(() => {
    document.title = 'My Service || Service Providerer';
    axios
    .get(`https://service-review-server-navy.vercel.app/services`)
    .then(res=>{
      const services = res.data;
      const filterdService = services.filter(service=> service.userEmail === user.email)
      setServices(filterdService)
      setLoading(false)
    })
    .catch(err =>{
      toast.error(`Network Error ${err}`)
    })
  }, [user]);

  // selected service input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedService({ ...selectedService, [name]: value });
  };

  // search input changer function
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // service update function
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`https://service-review-server-navy.vercel.app/services/${selectedService._id}`, selectedService, {withCredentials: true})
      .then(() => {
        setServices(
          services.map((service) =>
            service._id === selectedService._id ? selectedService : service
          )
        );
        toast.success('Service updated successfully!');
        setSelectedService(null);
      })
      .catch((err) => {
        toast.error(`Failed to update service: ${err}`);
      });
  };
  
  // service delete function 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://service-review-server-navy.vercel.app/services/${id}`, {withCredentials: true})
          .then(() => {
            setServices(services.filter((service) => service._id !== id));
            toast.success('Service deleted successfully!');
          })
          .catch((err) => {
            toast.error(`Failed to delete service ${err}`);
          });
      }
    });
  };

  // filter service by a service title
  const filteredServices = services.filter((service) =>
    service.serviceTitle.toLowerCase().includes(search.toLowerCase())
  );

  // loader functionality
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
      <Typewriter

                words={[
                  "Search Your Service by Title..",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
      </h1>

      {/* Search Input */}
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service._id}>
                <td>
                  <img
                    src={service.serviceImage}
                    alt={service.serviceTitle}
                    className="w-14 h-10 rounded-full md:rounded md:w-16 md:h-16"
                  />
                </td>
                <td>{service.serviceTitle}</td>
                <td>{service.category}</td>
                <td>${service.price}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="btn btn-sm bg-blue-700 hover:bg-blue-600 text-white"
                    >
                      <FaRegEdit/>Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-500 text-white"
                    >
                     <FaDeleteLeft/> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {
          services.length === 0 ? <p className='font-bold text-lg text-center mt-10'>You have no service. Please <Link to='/add-service' className='underline text-blue-600'>Add a Service</Link></p> : <></>
        }
      </div>
      {/* Update Modal */}
      {selectedService && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg">
            <Typewriter
                words={[
                  `Update the ${selectedService.serviceTitle} Service...`,
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
                />
              </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Service Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="serviceImage"
                    value={selectedService.serviceImage}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Service Title</span>
                  </label>
                  <input
                    type="text"
                    name="serviceTitle"
                    value={selectedService.serviceTitle}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={selectedService.companyName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Company Website</span>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={selectedService.website}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    value={selectedService.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={selectedService.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={selectedService.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  rows="4"
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="btn border border-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-purple-600 hover:bg-transparent hover:border hover:border-purple-600 hover:text-black text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyService;
