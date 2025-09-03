import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Calendar, Users, Shield } from "lucide-react";

export default function OurBoardPage() {
  const boardMembers = [
    {
      name: "Kappiah Adams",
      role: "Board Chairman",
      tenure: "2018-Present",
      credentials: "Former University Vice-Chancellor, PhD in Economics",
      image: "/images/team5.jpeg"
    },
    {
      name: "Hajia Ashia Mahama",
      role: "Vice Chairperson",
      tenure: "2020-Present",
      credentials: "Education Consultant, MEd in Educational Leadership",
      image: "/images/team6.jpg"
    },
    {
      name: "Anaba Josephine",
      role: "Treasurer",
      tenure: "2019-Present",
      credentials: "Chartered Accountant, CFA Charterholder",
      image: "/images/team7.jpeg"
    },
    {
      name: "George Tindana",
      role: "General Manager",
      tenure: "2021-Present",
      credentials: "Senior Lecturer, MBA in Business Administration",
      image: "/images/team8.jpg"
    },
    {
      name: "Rose Saan",
      role: "Board Member",
      tenure: "2018-Present",
      credentials: "Retired School Principal, PhD in Education",
      image: "/images/team9.jpg"
    },
    {
      name: "Andrews Nabdoya",
      role: "Board Member",
      tenure: "2022-Present",
      credentials: "Financial Analyst, MSc in Finance",
      image: "/images/team10.jpg"
    }
  ];

  const responsibilities = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Governance & Oversight",
      description: "Ensure proper governance and compliance with regulations"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Strategic Planning",
      description: "Set long-term goals and strategic direction for the credit union"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Member Representation",
      description: "Represent member interests in decision-making processes"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Policy Development",
      description: "Develop and approve policies that guide operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/who.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Board</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Dedicated volunteer leaders guiding our credit union with wisdom, experience, and commitment to our members.
            </p>
          </motion.div>
        </div>
       
      </div>

      {/* Board Members Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Board of Directors
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elected by members to provide strategic guidance and ensure the credit union operates in members' best interests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {boardMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-3">Tenure: {member.tenure}</p>
                <p className="text-gray-600 text-sm">{member.credentials}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsibilities Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Board Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Key Responsibilities</h3>
              <div className="space-y-6">
                {responsibilities.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="text-blue-600 mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Election Process</h3>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                      <span className="font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Annual call for nominations from membership</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                      <span className="font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Screening of candidates by nominations committee</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                      <span className="font-bold">3</span>
                    </div>
                    <p className="text-gray-700">Elections during Annual General Meeting</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                      <span className="font-bold">4</span>
                    </div>
                    <p className="text-gray-700">Two-year terms with maximum of three terms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}