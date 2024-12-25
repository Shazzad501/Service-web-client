import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { FaRegEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import Loading from '../components/Loading';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch user reviews
  useEffect(() => {
    document.title = "My review"
    if (user?.email) {
      axios
        .get(`https://service-review-server-navy.vercel.app/reviews?email=${user.email}`)
        .then((res) => {
          setLoading(false)
          setReviews(res.data)})
        .catch(() => toast.error("Failed to load reviews!"));
    }
  }, [user]);

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      duration: 1500,
    });
  }, []);

  // Handle review update
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://service-review-server-navy.vercel.app/reviews/${selectedReview._id}`, selectedReview, {withCredentials: true})
      .then(() => {
        toast.success("Review updated successfully!");
        setReviews((prev) =>
          prev.map((review) =>
            review._id === selectedReview._id ? selectedReview : review
          )
        );
        setShowUpdateModal(false);
        setSelectedReview(null);
      })
      .catch(() => toast.error("Failed to update review!"));
  };

  // Handle review deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://service-review-server-navy.vercel.app/reviews/${id}`, {withCredentials: true})
          .then(() => {
            toast.success("Review deleted successfully!");
            setReviews((prev) => prev.filter((review) => review._id !== id));
          })
          .catch(() => toast.error("Failed to delete review!"));
      }
    });
  };

  // Handle review field change for update
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedReview({ ...selectedReview, [name]: value });
  };

  if(loading){
    return <Loading/>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className='font-bold text-2xl text-center text-purple-800'>
      <Typewriter
                words={[
                  "This is your all reviews. You give the review in services..",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
      </h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
            data-aos='zoom-in'
              key={review._id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col md:flex-row justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{review.serviceTitle}</h2>
                <p className="text-gray-600 mt-1">{review.text}</p>
                <ReactStars
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
                <p className="text-sm text-gray-500 mt-1">Date: {review.date}</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <button
                  onClick={() => {
                    setSelectedReview(review);
                    setShowUpdateModal(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FaRegEdit/>
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                 <FaDeleteLeft/>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews found.</p>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div data-aos='zoom-in' className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
            <Typewriter
                words={[
                  `Change the ${selectedReview.serviceTitle} Review...`,
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <textarea
                name="text"
                value={selectedReview.text}
                onChange={handleFieldChange}
                placeholder="Write your review..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Rating:</span>
                <ReactStars
                  count={5}
                  value={selectedReview.rating}
                  onChange={(rating) =>
                    setSelectedReview({ ...selectedReview, rating })
                  }
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
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

export default MyReview;
