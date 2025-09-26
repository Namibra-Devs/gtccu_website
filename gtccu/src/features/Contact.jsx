import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Upload,
  Facebook,
  MessageCircle,
  Instagram
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@components/layout/Toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    file: null
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/gtccu",
      color: "bg-blue-600",
      tooltip: "Follow us on Facebook"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/233372098162",
      color: "bg-green-500",
      tooltip: "Message us on WhatsApp"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/gtccu",
      color: "bg-pink-600",
      tooltip: "Follow us on Instagram"
    },
    {
      id: "email",
      name: "Email",
      icon: Mail,
      url: "mailto:globalteachers@cuagh.com",
      color: "bg-gray-600",
      tooltip: "Send us an email"
    }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setToast({
        visible: true,
        message: "Please fill in all required fields",
        type: "error",
        duration: 4000,
      });
      return;
    }

    // Handle form submission
    console.log("Contact form submitted:", formData);
    
    setToast({
      visible: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
      type: "success",
      duration: 6000,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      file: null
    });
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
      <Toast toast={toast} onClose={closeToast} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/team2.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get in touch with us. We're here to help with all your financial needs and questions.
            </p>
          </motion.div>
        </div>
        
      
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16  relative z-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">037 209 8162</p>
                  <p className="text-gray-600">024 897 0706</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">globalteachers@cuagh.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">Tamale, Northern Region, Ghana</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Business Hours</h3>
              <p className="text-blue-700">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-blue-700">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-blue-700">Sunday: Closed</p>
            </div>

            {/* Social Media Links Section */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative p-3 rounded-full ${social.color} text-white hover:shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.1 }}
                      onMouseEnter={() => setHoveredSocial(social.id)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <Icon className="w-5 h-5" />
                      
                      {/* Tooltip */}
                      {hoveredSocial === social.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap"
                        >
                          {social.tooltip}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </motion.div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                      </p>
                    </div>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}