import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  ChevronDown,
  Users,
  Calendar,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Map,
  MessageCircle,
  Star,
  Quote
} from "lucide-react";

export default function FAQStatsSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  const faqs = [
    {
      q: "How do I open an account?",
      a: "You can open an account by visiting our branch or applying online in just a few steps. Our digital onboarding process takes less than 10 minutes.",
    },
    {
      q: "Are my savings secure?",
      a: "Yes, all deposits are insured and protected to ensure your funds are safe. We use bank-level security encryption and monitoring systems.",
    },
    {
      q: "Can I access services online?",
      a: "Absolutely. We offer online and mobile banking so you can access services anywhere, anytime. Our app has a 4.8-star rating on both iOS and Android.",
    },
    {
      q: "What makes your investment plans different?",
      a: "Our investment plans are tailored to individual needs with lower fees than traditional brokers. We offer personalized advice and ethical investment options.",
    },
  ];

  const stats = [
    { id: 1, label: "Happy Customers", value: 5730, icon: Users },
    { id: 2, label: "Years of Service", value: 15, icon: Calendar },
    { id: 3, label: "Loans Approved", value: 1500, icon: FileCheck },
    { id: 4, label: "Branches Nationwide", value: 5, icon: MapPin },
  ];

  const socials = [
    { id: 1, name: "Facebook", icon: Facebook, url: "#", color: "bg-blue-900" },
    {
      id: 2,
      name: "WhattsApp",
      icon: MessageCircle,
      url: "#",
      color: "bg-blue-900",
    },
    {
      id: 3,
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "bg-pink-600",
    },
    { id: 4, name: "E-mail", icon: Mail, url: "#", color: "bg-blue-900" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Mensah",
      role: "Teacher",
      content: "Global Teachers CU has been a lifesaver for my financial needs. Their loan process is straightforward, and their customer service is exceptional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Kwame Appiah",
      role: "Education Director",
      content: "I've been a member for over 8 years, and I can confidently say this is the most member-focused financial institution I've ever encountered.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ama Darko",
      role: "School Principal",
      content: "The savings plans have helped me achieve my financial goals faster than I expected. The staff are always willing to offer helpful advice.",
      rating: 4,
    },
    {
      id: 4,
      name: "Kofi Ansah",
      role: "Retired Educator",
      content: "Even in retirement, Global Teachers CU continues to provide excellent service. Their pension management options are fantastic.",
      rating: 5,
    },
    {
      id: 5,
      name: "Esi Nyarko",
      role: "Mathematics Teacher",
      content: "The mobile banking app is incredibly user-friendly. I can manage all my finances right from my phone with complete security.",
      rating: 5,
    },
    {
      id: 6,
      name: "David Osei",
      role: "School Administrator",
      content: "Their financial literacy programs have helped our staff make better financial decisions. A truly valuable service for educators.",
      rating: 4,
    }
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-lg md:text-4xl font-bold text-blue-900 mb-8 flex items-center">
            <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-800 font-medium hover:bg-blue-50 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === idx
                        ? "rotate-180 text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 flex flex-col justify-center text-white relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
          </div>

          <h2 className="text-3xl font-bold mb-10 relative z-10">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {stats.map(({ id, label, value, icon: Icon }) => (
              <motion.div
                key={id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-white/15 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-extrabold mb-1">
                  {isInView ? (
                    <CountUp
                      end={value}
                      duration={2.5}
                      separator=","
                      delay={0.2}
                    />
                  ) : (
                    0
                  )}
                  +
                </div>
                <p className="mt-2 text-blue-100 font-medium text-sm">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated elements */}
          <motion.div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-500 opacity-20"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Reviews Section - Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            What Our Members Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from educators and staff who have experienced our financial services firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-blue-100 mb-4" />
              
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              {/* Review Content */}
              <p className="text-gray-700 mb-6 flex-grow leading-relaxed italic">
                "{review.content}"
              </p>
              
              {/* Reviewer Info */}
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-gray-600 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-20 bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 ">
          {/* Company Details & Socials */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <MessageCircle className="mr-3" />
              Get in Touch
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-100">Phone</h3>
                  <p className="text-lg">037 209 8162 / 024 897 0706</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-100">Email</h3>
                  <p className="text-lg">globalteachers@cuagh.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-100">Headquarters</h3>
                  <p className="text-lg">
                    Tamale, Northern Region, Ghana.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-100">
                    Business Hours
                  </h3>
                  <p className="text-lg">Mon-Fri: 8AM - 5PM</p>
                  <p className="text-lg">Sat: 9AM - 4PM</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-100 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
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
                          {social.name}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </motion.div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Location Map */}
          <div className="p-1 rounded-xl order-1 md:order-2">
            <div className="h-[570px] w-full rounded-xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7871.969956460164!2d-0.8509731253173802!3d9.422719658993678!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjUnMDMuMiJOIDDCsDUxJzI5LjAiVw!5e0!3m2!1sen!2sgh!4v1756747321412!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}