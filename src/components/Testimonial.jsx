import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar, FaRegStar } from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://service-review-server-navy.vercel.app/all-review")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        toast.error(`Review fetch error: ${err.message}`);
      });
  }, []);

  // Slick Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400 justify-center mt-2">
        {[...Array(5)].map((_, i) =>
          i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-black"><span className="text-purple-800">What</span> Our <span className="text-purple-800">Clients</span> Say</h2>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No testimonials available.</p>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="px-4">
              <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center h-[320px] flex flex-col justify-between">
                <div>
                  <FaQuoteLeft className="text-primary text-4xl opacity-20 mx-auto" />
                  <p className="text-gray-700 mt-2 italic line-clamp-3">{review.text}</p>
                </div>

                {/* Star Rating */}
                {renderStars(review.rating)}

                {/* User Info */}
                <div className="mt-4 flex flex-col items-center">
                  <img
                    src={review.userPhoto}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="mt-2">
                    <h4 className="font-semibold">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Testimonial;
