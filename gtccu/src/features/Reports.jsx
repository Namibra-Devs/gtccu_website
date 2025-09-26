import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Calendar, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@components/layout/Toast";

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedType, setSelectedType] = useState("all");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const reports = [
    {
      id: 1,
      title: "Annual Report 2023",
      type: "annual",
      year: "2023",
      date: "March 15, 2023",
      size: "2.4 MB",
      url: "/reports/annual-2023.pdf"
    },
    {
      id: 2,
      title: "Quarterly Financial Statement Q4 2023",
      type: "quarterly",
      year: "2023",
      date: "January 30, 2023",
      size: "1.2 MB",
      url: "/reports/q4-2023.pdf"
    },
    {
      id: 3,
      title: "Audited Financial Statements 2022",
      type: "audit",
      year: "2022",
      date: "April 10, 2022",
      size: "3.1 MB",
      url: "/reports/audit-2022.pdf"
    },
    {
      id: 4,
      title: "Annual Report 2022",
      type: "annual",
      year: "2022",
      date: "March 20, 2022",
      size: "2.2 MB",
      url: "/reports/annual-2022.pdf"
    },
    {
      id: 5,
      title: "AGM Minutes 2023",
      type: "minutes",
      year: "2023",
      date: "April 5, 2023",
      size: "0.8 MB",
      url: "/reports/agm-2023.pdf"
    }
  ];

  const filteredReports = reports.filter(report => {
    const yearMatch = selectedYear === "all" || report.year === selectedYear;
    const typeMatch = selectedType === "all" || report.type === selectedType;
    return yearMatch && typeMatch;
  });

  const handleDownload = (report) => {
    // Simulate download
    setToast({
      visible: true,
      message: `Downloading ${report.title}...`,
      type: "success",
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
          style={{ backgroundImage: "url('/images/team8.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Reports</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Access our comprehensive financial reports, statements, and regulatory documents.
            </p>
          </motion.div>
        </div>
        
        
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-20">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Reports</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Types</option>
                <option value="annual">Annual Reports</option>
                <option value="quarterly">Quarterly Statements</option>
                <option value="audit">Audited Statements</option>
                <option value="minutes">Meeting Minutes</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50">
              <div className="md:col-span-6 font-semibold text-gray-800">Report</div>
              <div className="md:col-span-2 font-semibold text-gray-800">Type</div>
              <div className="md:col-span-2 font-semibold text-gray-800">Date</div>
              <div className="md:col-span-1 font-semibold text-gray-800">Size</div>
              <div className="md:col-span-1 font-semibold text-gray-800">Action</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="md:col-span-6">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-800">{report.title}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {report.type}
                    </span>
                  </div>
                  <div className="md:col-span-2 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {report.date}
                    </div>
                  </div>
                  <div className="md:col-span-1 text-gray-600 text-sm">
                    {report.size}
                  </div>
                  <div className="md:col-span-1">
                    <button
                      onClick={() => handleDownload(report)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reports found matching your filters.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-6 mt-8 border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Need Earlier Reports?</h3>
          <p className="text-blue-700 mb-4">
            Contact us if you need access to reports from previous years not listed here.
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
  Request Historical Reports
</Link>
        </motion.div>
      </div>
    </div>
  );
}