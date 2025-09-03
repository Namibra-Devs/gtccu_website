import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Upload, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@components/layout/Toast";

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("openings");
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const jobOpenings = [
    {
      id: 1,
      title: "Loan Officer",
      department: "Lending",
      location: "Tamale, Northern Region",
      type: "Full-time",
      salary: "Competitive",
      experience: "2+ years",
      description: "We're seeking an experienced Loan Officer to help our members with loan applications and financial guidance.",
      requirements: ["Bachelor's degree in Finance", "2+ years lending experience", "Excellent communication skills"],
      posted: "2024-01-10"
    },
    {
      id: 2,
      title: "Customer Service Representative",
      department: "Member Services",
      location: "Tamale, Northern Region",
      type: "Full-time",
      salary: "GHS 1,500 - 2,000",
      experience: "1+ years",
      description: "Join our member services team to provide exceptional support and assistance to our valued members.",
      requirements: ["Diploma in Business or related field", "Customer service experience", "Computer literacy"],
      posted: "2024-01-08"
    },
    {
      id: 3,
      title: "IT Support Specialist",
      department: "Information Technology",
      location: "Tamale, Northern Region",
      type: "Full-time",
      salary: "GHS 2,000 - 2,800",
      experience: "3+ years",
      description: "Maintain and support our IT infrastructure, ensuring smooth operations across all departments.",
      requirements: ["Degree in Computer Science", "Network administration skills", "Hardware troubleshooting"],
      posted: "2024-01-05"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: files ? files[0] : value,
    });
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    
    if (!applicationData.name || !applicationData.email || !applicationData.resume) {
      setToast({
        visible: true,
        message: "Please fill in all required fields and upload your resume",
        type: "error",
        duration: 4000,
      });
      return;
    }

    // Handle application submission
    console.log("Job application submitted:", applicationData);
    
    setToast({
      visible: true,
      message: "Application submitted successfully! We'll contact you soon.",
      type: "success",
      duration: 6000,
    });

    // Reset form
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
      resume: null
    });
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toast toast={toast} onClose={closeToast} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-600 to-orange-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/jobs-bg.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Join our team and help us make a difference in the financial lives of educators.
            </p>
          </motion.div>
        </div>
        
        <Link 
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 -mt-16 relative z-20">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("openings")}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "openings"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Current Openings
            </button>
            <button
              onClick={() => setActiveTab("apply")}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "apply"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Apply Now
            </button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === "openings" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("apply");
                      setApplicationData({...applicationData, position: job.title});
                    }}
                    className="mt-4 md:mt-0 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Salary Range</h4>
                    <p className="text-gray-600 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Experience Required</h4>
                    <p className="text-gray-600">{job.experience}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Job Description</h4>
                  <p className="text-gray-600">{job.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Posted: {new Date(job.posted).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}

            {jobOpenings.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No current openings</h3>
                <p className="text-gray-600">Check back later for new job opportunities.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for Position</h2>
            
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
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
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <select
                    name="position"
                    value={applicationData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="Tell us why you're interested in this position..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {applicationData.resume ? applicationData.resume.name : "Click to upload your resume or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max: 5MB)</p>
                    </div>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleInputChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-all flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-orange-50 rounded-2xl p-8 mt-12 border border-orange-200"
        >
          <h3 className="text-2xl font-bold text-orange-800 mb-6 text-center">Why Work With Us?</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Competitive Compensation</h4>
              <p className="text-gray-600">We offer competitive salaries and benefits packages</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Work-Life Balance</h4>
              <p className="text-gray-600">Flexible working hours and supportive environment</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Career Growth</h4>
              <p className="text-gray-600">Opportunities for professional development and advancement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}