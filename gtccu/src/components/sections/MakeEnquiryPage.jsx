import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  User,
  Mail,
  Phone,
  Send,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../layout/Toast";

export default function MakeEnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setToast({
        visible: true,
        message: "Please fill in all required fields",
        type: "error",
        duration: 4000,
      });
      return;
    }

    // Handle form submission here
    console.log("Form submitted:", formData);
    
    // Show success toast
    setToast({
      visible: true,
      message: "Thank you for your enquiry! We'll get back to you soon.",
      type: "success",
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toast toast={toast} onClose={closeToast} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/about3.jpeg')" }}
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Make an Enquiry
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions about our services? Our team is ready to provide
              you with all the information you need.
            </p>
          </motion.div>
        </div>
        
        {/* Back Button */}
      
      </div>

      {/* Enquiry Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="flex items-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">
              Send us a message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select a subject</option>
                  <option value="savings">Savings Accounts</option>
                  <option value="loans">Loan Products</option>
                  <option value="investments">Investment Plans</option>
                  <option value="other">Other Enquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Please provide details about your enquiry..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Enquiry
            </motion.button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">
              Need immediate assistance?
            </h3>
            <p className="text-blue-700">
              Call{" "}
              <span className="font-semibold">037 209 8162</span> or{" "}
              <span className="font-semibold">024 897 0706</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}