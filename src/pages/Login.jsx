import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "react-lottie-player";
import loginLotti from "../assets/login.json";
import { AuthContext } from "../provider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const { setUser, loginUser, createUserWithGoogle, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();
  const [error, setError] = useState("");

  // Redirect path
  const redirectPath = location?.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login || Service Provider";
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    loginUser(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login Successful!");
        navigate(redirectPath);
        e.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        setError(`${err.message}`);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((res) => {
        setUser(res.user);
        toast.success("Login Successful!");
        navigate(redirectPath);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message));
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    setError("");

    if (!email) {
      setError("Please enter your email!");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Reset email sent! Check your inbox.");
          window.open("https://mail.google.com/", "_blank");
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col-reverse md:flex-row">
        {/* Left Side - Lottie Animation */}
        <div className="md:w-1/2 flex items-center justify-center md:p-6">
          <Lottie loop animationData={loginLotti} play className="w-80 h-80" />
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          <Typewriter
              words={[
                "Welcome Back",
                "Login and Continue"
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
          />

          </h2>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                ref={emailRef}
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
              <div className="text-right mt-2">
                <button onClick={handleForgotPassword} className="text-blue-600 hover:underline text-sm">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
