import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import { Typewriter } from 'react-simple-typewriter';
import '../index.css';
import Loading from '../components/Loading';

const ServiceDetails = () => {
  const { user } = React.useContext(AuthContext);
  const [service, setService] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    text: '',
    rating: 0,
  });
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();

  // Fetching service data and reviews
  useEffect(() => {
    document.title = "Service Details";

    setService(data.data);
    setLoading(false);

    // Fetch existing reviews from the server
    axios.get(`http://localhost:5000/reviews/${data.data._id}`)
      .then((res) => setReviews(res.data))
      // .catch(() => toast.error("No reviews!"));
  }, [data]);

  // Handle changes in the review form
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // Handle review submission
  const handleReviewSubmit = () => {
    if (!reviewData.text || reviewData.rating === 0) {
      toast.error("Please provide both a review and a rating.");
      return;
    }

    const review = {
      ...reviewData,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
      serviceId: service._id,
      serviceTitle: service.serviceTitle,
      date: new Date().toISOString().split('T')[0],
    };

    axios.post('http://localhost:5000/reviews', review)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Review added successfully!");
          setReviews([...reviews, review]);
          setShowModal(false);
          setReviewData({ text: '', rating: 0 });
        }
      })
      .catch(() => toast.error("Failed to add review!"));
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
        <Typewriter
          words={[`${service.serviceTitle} Details`]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {/* Service Information */}
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
          <p className="text-gray-600"><strong>Company:</strong> {service.companyName}</p>
          <p className="text-gray-600"><strong>Category:</strong> {service.category}</p>
          <p className="text-gray-600"><strong>Price:</strong> ${service.price}</p>
          <p className="text-gray-600"><strong>Description:</strong> {service.description}</p>
          <p className="text-gray-600"><strong>Added Date:</strong> {service.addedDate}</p>
          <p className="text-gray-600"><strong>Website:</strong> <Link to={service.website} target='_blank' className='text-blue-600'>{service.website}</Link></p>
          <p className="text-gray-600"><strong>Created By:</strong> {service.userEmail}</p>
          <p className="text-gray-600"><strong>Total Review:</strong> {reviews.length}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex items-start gap-4">
                <img
                  src={review.userPhoto}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{review.userName}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className="text-gray-700 mt-2">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-sm">
            <h2 className="text-xl font-bold mb-4">
              <Typewriter
                words={[`Add Review for ${service.serviceTitle}`]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <textarea
              name="text"
              value={reviewData.text}
              onChange={handleReviewChange}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-700 font-medium">Rating:</span>
              <ReactStars
                count={5}
                value={reviewData.rating}
                onChange={(rate) => setReviewData({ ...reviewData, rating: rate })}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
