import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ServiceCart = ({ service }) => {
  const { _id, price, category, description, serviceTitle, serviceImage } = service || {};

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 1500,
    });
  }, []);
  return (
    <div data-aos="zoom-in"
    className="card w-full max-w-md bg-white shadow-lg border border-gray-300 rounded-lg hover:shadow-xl transition-shadow duration-300">
      <figure className="relative">
        <img
          src={serviceImage}
          alt={serviceTitle}
          className="w-full h-52 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {category}
        </div>
      </figure>
      <div className="card-body p-5">
        <h2 className="text-2xl font-semibold text-gray-800">{serviceTitle}</h2>
        <p className="text-gray-600 text-lg mt-2 line-clamp-3">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold black">${price}</p>
          <Link to={`/service/${_id}`} className="btn text-black btn-sm rounded-br-none border border-purple-800 hover:bg-purple-800 hover:text-white bg-transparent">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCart;
