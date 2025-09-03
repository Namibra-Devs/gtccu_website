import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Shield, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@components/layout/Toast";

export default function PoliciesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const policies = [
    {
      id: 1,
      title: "Privacy Policy",
      category: "privacy",
      description: "How we collect, use, and protect your personal information",
      version: "2.1",
      lastUpdated: "2024-01-15",
      file: "/policies/privacy-policy.pdf",
      size: "1.2 MB"
    },
    {
      id: 2,
      title: "Terms of Service",
      category: "terms",
      description: "Rules and guidelines for using our services",
      version: "1.4",
      lastUpdated: "2024-01-10",
      file: "/policies/terms-of-service.pdf",
      size: "0.9 MB"
    },
    {
      id: 3,
      title: "Cookie Policy",
      category: "privacy",
      description: "Information about how we use cookies and tracking technologies",
      version: "1.2",
      lastUpdated: "2024-01-08",
      file: "/policies/cookie-policy.pdf",
      size: "0.8 MB"
    },
    {
      id: 4,
      title: "Anti-Money Laundering Policy",
      category: "compliance",
      description: "Measures to prevent money laundering activities",
      version: "3.0",
      lastUpdated: "2023-12-20",
      file: "/policies/aml-policy.pdf",
      size: "2.1 MB"
    },
    {
      id: 5,
      title: "Code of Conduct",
      category: "governance",
      description: "Expected behavior and ethical standards for staff and members",
      version: "2.2",
      lastUpdated: "2023-12-15",
      file: "/policies/code-of-conduct.pdf",
      size: "1.5 MB"
    },
    {
      id: 6,
      title: "Data Protection Policy",
      category: "privacy",
      description: "Framework for protecting sensitive information",
      version: "2.0",
      lastUpdated: "2023-12-10",
      file: "/policies/data-protection.pdf",
      size: "1.8 MB"
    },
    {
      id: 7,
      title: "Loan Policy",
      category: "operations",
      description: "Guidelines for loan approval and management",
      version: "4.1",
      lastUpdated: "2023-12-05",
      file: "/policies/loan-policy.pdf",
      size: "2.3 MB"
    },
    {
      id: 8,
      title: "Investment Policy",
      category: "operations",
      description: "Framework for investment decisions and risk management",
      version: "3.2",
      lastUpdated: "2023-11-28",
      file: "/policies/investment-policy.pdf",
      size: "2.0 MB"
    }
  ];

  const categories = [
    { id: "all", name: "All Policies", icon: <FileText className="w-4 h-4" /> },
    { id: "privacy", name: "Privacy", icon: <Lock className="w-4 h-4" /> },
    { id: "terms", name: "Terms", icon: <FileText className="w-4 h-4" /> },
    { id: "compliance", name: "Compliance", icon: <Shield className="w-4 h-4" /> },
    { id: "governance", name: "Governance", icon: <Eye className="w-4 h-4" /> },
    { id: "operations", name: "Operations", icon: <FileText className="w-4 h-4" /> }
  ];

  const filteredPolicies = activeCategory === "all" 
    ? policies 
    : policies.filter(policy => policy.category === activeCategory);

  const handleDownload = (policy) => {
    // Simulate download
    setToast({
      visible: true,
      message: `Downloading ${policy.title}...`,
      type: "success",
      duration: 3000,
    });
  };

  const handleView = (policy) => {
    // Simulate view action
    setToast({
      visible: true,
      message: `Opening ${policy.title}...`,
      type: "info",
      duration: 3000,
    });
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toast toast={toast} onClose={closeToast} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/team10.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Policies & Documents</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Access our comprehensive policies, terms, and regulatory documents that govern our operations.
            </p>
          </motion.div>
        </div>
        
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 -mt-16 relative z-20">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Policies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredPolicies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-800">{policy.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                      {policy.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{policy.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Version: {policy.version}</span>
                <span>Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>{policy.size}</span>
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  PDF Document
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleView(policy)}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  onClick={() => handleDownload(policy)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPolicies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No policies found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </motion.div>
        )}

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Policy Updates</h3>
            <p className="text-blue-700 mb-4">
              We regularly review and update our policies to ensure compliance with regulations and best practices.
            </p>
            <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
              <li>Quarterly policy reviews</li>
              <li>Regulatory compliance updates</li>
              <li>Member feedback incorporation</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Assistance?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about any of our policies or need help understanding them, our team is here to help.
            </p>
          
            <Link 
              to={{
                pathname: "/contact",
                state: {
                  subject: "Request for Historical Reports",
                  message: "I would like to request access to historical reports not listed on your website. Please provide me with more information about how to obtain these documents."
                }
              }}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
             Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}