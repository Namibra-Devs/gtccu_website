import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, DollarSign, Shield } from "lucide-react";

export default function LoansPage() {
  const loanTypes = [
    {
      title: "Personal Loans",
      rate: "12.5%",
      amount: "Up to ₵50,000",
      term: "1-5 years",
      features: ["Flexible repayment", "No collateral required", "Quick approval"],
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      title: "Education Loans",
      rate: "9.5%",
      amount: "Up to ₵30,000",
      term: "1-7 years",
      features: ["Low interest rates", "Grace period after studies", "No hidden fees"],
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "Home Improvement Loans",
      rate: "11%",
      amount: "Up to ₵100,000",
      term: "1-10 years",
      features: ["Home renovation", "Property purchase", "Construction projects"],
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: "Emergency Loans",
      rate: "10%",
      amount: "Up to ₵20,000",
      term: "6-24 months",
      features: ["Same-day approval", "Minimal documentation", "Flexible terms"],
      icon: <Clock className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/loans1.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Services</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Flexible loan options designed to help you achieve your financial goals with competitive rates and personalized terms.
            </p>
          </motion.div>
        </div>
       
      </div>

      {/* Loan Types Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Our Loan Products
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of loan products designed to meet your specific needs with competitive interest rates and flexible repayment terms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loanTypes.map((loan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{loan.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{loan.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-blue-600">{loan.rate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maximum Amount:</span>
                  <span className="font-semibold">{loan.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Term:</span>
                  <span className="font-semibold">{loan.term}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {loan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Our Loans?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer competitive advantages that make us the preferred choice for educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick Approval</h3>
              <p className="text-gray-600">Get approved within 24 hours with minimal documentation</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Low Rates</h3>
              <p className="text-gray-600">Competitive interest rates starting from 9.5% per annum</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Flexible Terms</h3>
              <p className="text-gray-600">Customizable repayment plans tailored to your needs</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}