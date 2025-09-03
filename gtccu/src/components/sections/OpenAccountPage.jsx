import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, IdCard, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../layout/Toast";

export default function OpenAccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    idNumber: "",
    
    // Address Information
    address: "",
    city: "",
    region: "",
    postalCode: "",
    
    // Account Preferences
    accountType: "",
    initialDeposit: "",
    referral: ""
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
      [e.target.name]: e.target.value
    });
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.dob || !formData.idNumber)) {
      setToast({
        visible: true,
        message: "Please fill in all required personal information",
        type: "error",
        duration: 4000,
      });
      return;
    }
    
    if (currentStep === 2 && (!formData.address || !formData.city || !formData.region)) {
      setToast({
        visible: true,
        message: "Please fill in all required address information",
        type: "error",
        duration: 4000,
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 3 && (!formData.accountType || !formData.initialDeposit)) {
      setToast({
        visible: true,
        message: "Please select an account type and initial deposit amount",
        type: "error",
        duration: 4000,
      });
      return;
    }
    
    // Handle form submission here
    console.log("Account application submitted:", formData);
    
    // Show success toast
    setToast({
      visible: true,
      message: "Application submitted successfully! We'll contact you within 24 hours.",
      type: "success",
      duration: 6000,
    });
    
    setCurrentStep(4); // Success step
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Open an Account</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of educators who trust us with their financial journey. Start building your future today.
            </p>
          </motion.div>
        </div>
        
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8 -mt-16 relative z-20">
        <div className="flex justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step ? "bg-blue-900 text-white" : "bg-white text-gray-400 border-2 border-gray-300"
              }`}>
                {currentStep > step ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step}</span>
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium whitespace-nowrap">
                {step === 1 && "Personal Info"}
                {step === 2 && "Address"}
                {step === 3 && "Account Type"}
                {step === 4 && "Complete"}
              </div>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <User className="w-8 h-8 text-blue-900" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your ID number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Address Information</h2>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Region</option>
                    <option value="ashanti">Ashanti Region</option>
                    <option value="greater-accra">Greater Accra Region</option>
                    <option value="eastern">Eastern Region</option>
                    <option value="western">Western Region</option>
                    <option value="northern">Northern Region</option>
                    <option value="upper-east">Upper East Region</option>
                    <option value="upper-west">Upper West Region</option>
                    <option value="volta">Volta Region</option>
                    <option value="central">Central Region</option>
                    <option value="bono-east">Bono East Region</option>
                    <option value="ahafo">Ahafo Region</option>
                    <option value="savannah">Savannah Region</option>
                    <option value="north-east">North East Region</option>
                    <option value="oti">Oti Region</option>
                    <option value="western-north">Western North Region</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your postal code"
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <IdCard className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Account Preferences</h2>
              </div>

              <div className="mb-6">
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select Account Type</option>
                  <option value="regular-savings">Regular Savings Account</option>
                  <option value="fixed-deposit">Fixed Deposit Account</option>
                  <option value="current">Current Account</option>
                  <option value="student">Student Account</option>
                  <option value="joint">Joint Account</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Deposit Amount (GHS)
                </label>
                <input
                  type="number"
                  id="initialDeposit"
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={handleChange}
                  required
                  min="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter initial deposit amount"
                />
              </div>

              <div>
                <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-green-blue transition"
                >
                  <option value="">Select an option</option>
                  <option value="friend">Friend or Family</option>
                  <option value="social-media">Social Media</option>
                  <option value="search-engine">Search Engine</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="school">School/Workplace</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Submit Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-10">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for applying to open an account with Global Teachers Credit Union. 
                We'll review your application and contact you within 24 hours.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 max-w-md mx-auto">
                <h3 className="font-semibold text-green-800 mb-2">Next Steps</h3>
                <ul className="text-left text-green-700 space-y-1">
                  <li>• We'll verify your information</li>
                  <li>• You'll receive a welcome email</li>
                  <li>• Our team will guide you through the final steps</li>
                </ul>
              </div>
              <Link
                to="/"
                className="inline-block mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Done
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}