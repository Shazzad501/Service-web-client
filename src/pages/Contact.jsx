import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import emailjs from "emailjs-com";
import contactLotti from "../assets/contact-lotti.json";
import toast from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';

// email sender info
const SERVICE = import.meta.env.VITE_SERVICE_ID;
const TEMPLATED = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleContact = (e) => {
    e.preventDefault();
    setIsSending(true);
  
    const emailParams = {
      to_name: "Hello service provider",
      from_name: formData.name,  
      email_id: formData.email,
      message: formData.message, 
    };
  
    emailjs
      .send(SERVICE, TEMPLATED, emailParams, PUBLIC)
      .then(
        () => {
          setIsSending(false);
          toast.success("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setIsSending(false);
          toast.error("Failed to send your message. Please try again.");
        }
      );
  };
  
  useEffect(() => {
    document.title= "Contact Us || Service Provider"
    // Initialize AOS animation
    AOS.init({
      duration: 1500,
    });
  }, []);
  return (
    <div>

      <div className="py-14 px-5 max-w-7xl mx-auto">
        <h2 className="font-bold text-4xl text-center mb-10">Contact With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Form Section */}
          <div data-aos='fade-up' className="px-10 shadow-md py-10 rounded-lg">
            <form onSubmit={handleContact} className="flex flex-col gap-4 text-black">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl">Name</label>
                <input
                  className="border-2 px-3 py-2 text-lg font-bold rounded-md text-black"
                  type="text"
                  name="name"
                  placeholder="Your Name:"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl">Email</label>
                <input
                  className="border-2 px-3 py-2 text-lg font-bold rounded-md text-black"
                  type="email"
                  name="email"
                  placeholder="demo@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl">Write Your Message</label>
                <textarea
                  name="message"
                  placeholder="Write your message:"
                  rows={6}
                  className="border-2 rounded-md px-3 py-2 text-black font-bold text-lg"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="btn mt-3 bg-transparent border-2 rounded-br-none border-purple-800 rounded-md text-black font-bold text-xl hover:bg-white"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Lottie Animation Section */}
          <div data-aos='zoom-in'>
            <Lottie
              loop
              animationData={contactLotti}
              play
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
