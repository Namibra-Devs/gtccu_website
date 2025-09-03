import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, BookOpen, Scale } from "lucide-react";

export default function ByeLawsPage() {
  const sections = [
    {
      title: "Article I: Name & Purpose",
      content: "Establishes the legal name of the credit union and outlines its primary purpose and objectives."
    },
    {
      title: "Article II: Membership",
      content: "Defines eligibility requirements for membership, rights, and responsibilities of members."
    },
    {
      title: "Article III: Shares & Savings",
      content: "Governs share accounts, savings products, and financial transactions."
    },
    {
      title: "Article IV: Meetings of Members",
      content: "Outlines procedures for annual and special meetings, voting rights, and quorum requirements."
    },
    {
      title: "Article V: Board of Directors",
      content: "Details composition, powers, duties, and election procedures for the Board."
    },
    {
      title: "Article VI: Committees",
      content: "Establishes standing committees and defines their roles and responsibilities."
    },
    {
      title: "Article VII: Officers",
      content: "Defines officer positions, duties, and election procedures."
    },
    {
      title: "Article VIII: Financial Operations",
      content: "Governs financial management, lending practices, and investment policies."
    }
  ];

  const amendments = [
    { date: "March 15, 2023", description: "Updated membership eligibility requirements" },
    { date: "August 10, 2022", description: "Revised board election procedures" },
    { date: "November 5, 2021", description: "Modified share capital requirements" },
    { date: "February 20, 2020", description: "Updated digital services provisions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/laws-bg.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Bye-laws</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              The governing document that outlines how our credit union operates and serves our members.
            </p>
          </motion.div>
        </div>
        
        {/* Back Button */}
        <Link 
          to="/about"
          className="absolute top-6 left-6 z-20 flex items-center text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to About
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Governing Document</h2>
              <p className="text-gray-700 mb-6">
                Our bye-laws serve as the fundamental governing document that outlines the structure, 
                operations, and management of Global Teachers Credit Union. They ensure we operate 
                in accordance with cooperative principles and regulatory requirements.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                  Document Sections
                </h3>
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r"
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
                      <p className="text-gray-600 text-sm">{section.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Download Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Full Bye-laws Document</h3>
                <p className="text-gray-600 text-sm mb-4">Download the complete governing document</p>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>

            {/* Amendments Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Scale className="w-5 h-5 mr-2 text-indigo-600" />
                Recent Amendments
              </h3>
              <div className="space-y-3">
                {amendments.map((amendment, index) => (
                  <div key={index} className="flex items-start py-2 border-b border-gray-100 last:border-b-0">
                    <div className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded mr-3">
                      {amendment.date}
                    </div>
                    <p className="text-gray-600 text-sm">{amendment.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Info */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Governance Framework</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Regulated by Bank of Ghana</li>
                <li>• Compliant with Credit Union Act 2020</li>
                <li>• Annual review and audit process</li>
                <li>• Member-approved amendments</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Member Rights Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Member Rights & Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Member Rights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Right to vote in elections and meetings</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Access to financial services and products</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Receive annual reports and financial statements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Participate in surplus distribution</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Member Responsibilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">•</span>
                  </div>
                  <span className="text-gray-700">Maintain share capital requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">•</span>
                  </div>
                  <span className="text-gray-700">Participate in governance through voting</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">•</span>
                  </div>
                  <span className="text-gray-700">Adhere to credit union policies and procedures</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                    <span className="text-xs">•</span>
                  </div>
                  <span className="text-gray-700">Maintain financial obligations promptly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}