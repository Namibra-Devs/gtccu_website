import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Shield, Target, BarChart } from "lucide-react";

export default function InvestmentsPage() {
  const investmentOptions = [
    {
      title: "Fixed Deposits",
      return: "8-12%",
      term: "6-60 months",
      minAmount: "₵1,000",
      features: ["Guanteed returns", "Flexible terms", "Monthly interest payout"],
      risk: "Low"
    },
    {
      title: "Mutual Funds",
      return: "12-18%",
      term: "3+ years",
      minAmount: "₵500",
      features: ["Professional management", "Diversified portfolio", "Regular income"],
      risk: "Medium"
    },
    {
      title: "Retirement Plans",
      return: "10-15%",
      term: "10+ years",
      minAmount: "₵200/month",
      features: ["Tax benefits", "Long-term growth", "Retirement income"],
      risk: "Low-Medium"
    },
    {
      title: "Education Funds",
      return: "11-16%",
      term: "5-15 years",
      minAmount: "₵300/month",
      features: ["Child education planning", "Systematic investment", "Goal-based"],
      risk: "Medium"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Plans</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Grow your wealth with our secure investment opportunities designed for long-term financial growth and stability.
            </p>
          </motion.div>
        </div>
        
        
      </div>

      {/* Investment Options Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Investment Opportunities
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of investment options tailored to help you build wealth and achieve your financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentOptions.map((investment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{investment.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  investment.risk === "Low" ? "bg-green-100 text-green-800" :
                  investment.risk === "Medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {investment.risk} Risk
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold text-green-600">{investment.return}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum Term:</span>
                  <span className="font-semibold">{investment.term}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum Amount:</span>
                  <span className="font-semibold">{investment.minAmount}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {investment.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer">
                Invest Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Investment Advantages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Why thousands of educators trust us with their investments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure & Regulated</h3>
              <p className="text-gray-600">All investments are protected and regulated by financial authorities</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Management</h3>
              <p className="text-gray-600">Professionally managed portfolios for optimal returns</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">Customized plans to help you achieve specific financial goals</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}