import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, PieChart, Users, TrendingUp, Award } from "lucide-react";

export default function SharesPage() {
  const shareBenefits = [
    {
      title: "Ownership Stake",
      description: "Become a part-owner of the credit union with voting rights",
      icon: <PieChart className="w-8 h-8" />
    },
    {
      title: "Dividend Earnings",
      description: "Receive annual dividends from the credit union's profits",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Member Benefits",
      description: "Exclusive access to premium services and lower rates",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Community Impact",
      description: "Support the financial growth of the education community",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const shareRequirements = [
    { requirement: "Minimum Share Purchase", value: "₵100" },
    { requirement: "Maximum Share Holding", value: "₵10,000" },
    { requirement: "Dividend Payment", value: "Annually" },
    { requirement: "Share Transfer", value: "Allowed to members" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url('/images/loans1.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Ownership</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Become a co-owner of our credit union and share in our success through dividends and exclusive member benefits.
            </p>
          </motion.div>
        </div>
        
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Benefits of Share Ownership
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            As a share owner, you become part of our success story and enjoy exclusive benefits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {shareBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-900 mb-4 mx-auto">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Requirements Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Share Requirements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple and transparent requirements for becoming a share owner
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Share Information</h3>
              <div className="space-y-4">
                {shareRequirements.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">{item.requirement}:</span>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">How to Purchase Shares</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Complete membership application</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <p className="text-gray-600">Make initial share purchase (minimum ₵100)</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Attend orientation session</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                    <span className="font-bold">4</span>
                  </div>
                  <p className="text-gray-600">Start enjoying member benefits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-900 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Purchase Shares Now
            </button>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-900 mb-4"
          >
            Dividend Performance
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Consistent returns for our share owners over the years
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">8.5%</div>
              <div className="text-gray-600">2023 Dividend</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">8.2%</div>
              <div className="text-gray-600">2022 Dividend</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">7.9%</div>
              <div className="text-gray-600">2021 Dividend</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">7.5%</div>
              <div className="text-gray-600">2020 Dividend</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}