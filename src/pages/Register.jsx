import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "react-lottie-player";
import registerLotti from "../assets/registerLotti.json";

const Register = () => {
  const { newUserSet, setUser, upDateProfile, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const redirectPath = location?.state?.from?.pathname || "/";

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
      return;
    }

    setError("");
    newUserSet(email, password)
      .then((res) => {
        setUser(res.user);
        navigate(redirectPath);
        e.target.reset();
        setLoading(false);
        toast.success(`Registration successful!`);

        // Update user profile
        upDateProfile({ displayName: name, photoURL: photo })
          .then(() => setLoading(false))
          .catch((err) => setError(`${err.message}`));
      })
      .catch((err) => setError(`${err.message}`));
  };

  useEffect(() => {
    document.title = "Register || Service Provider";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col-reverse md:flex-row">
        {/* Left Side - Lottie Animation */}
        <div className="md:w-1/2 flex items-center justify-center md:p-6">
          <Lottie loop animationData={registerLotti} play className="w-80 h-80" />
        </div>

        {/* Right Side - Register Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            <Typewriter
              words={["Register Your Account", "Join Us Today"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>

          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Photo URL</label>
              <input
                name="photo"
                type="url"
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-10 text-gray-500"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
