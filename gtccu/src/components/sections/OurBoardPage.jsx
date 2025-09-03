import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Calendar, Users, Shield } from "lucide-react";

export default function OurBoardPage() {
  const boardMembers = [
    {
      name: "Prof. Nana Addo",
      role: "Board Chairman",
      tenure: "2018-Present",
      credentials: "Former University Vice-Chancellor, PhD in Economics",
      image: "/images/board/chairman.jpg"
    },
    {
      name: "Dr. Akosua Mensah",
      role: "Vice Chairperson",
      tenure: "2020-Present",
      credentials: "Education Consultant, MEd in Educational Leadership",
      image: "/images/board/vice-chair.jpg"
    },
    {
      name: "Mr. Kwesi Ankomah",
      role: "Treasurer",
      tenure: "2019-Present",
      credentials: "Chartered Accountant, CFA Charterholder",
      image: "/images/board/treasurer.jpg"
    },
    {
      name: "Mrs. Abena Sarpong",
      role: "Secretary",
      tenure: "2021-Present",
      credentials: "Senior Lecturer, MBA in Business Administration",
      image: "/images/board/secretary.jpg"
    },
    {
      name: "Dr. Yaw Boateng",
      role: "Member",
      tenure: "2018-Present",
      credentials: "Retired School Principal, PhD in Education",
      image: "/images/board/member1.jpg"
    },
    {
      name: "Ms. Efua Coleman",
      role: "Member",
      tenure: "2022-Present",
      credentials: "Financial Analyst, MSc in Finance",
      image: "/images/board/member2.jpg"
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
      <div className="relative h-96 bg-gradient-to-r from-purple-600 to-purple-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/board-bg.jpg')" }}
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
        
        {/* Back Button */}
        <Link 
          to="/about"
          className="absolute top-6 left-6 z-20 flex items-center text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to About
        </Link>
      </div>

      {/* Board Members Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
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
                <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-3">Tenure: {member.tenure}</p>
                <p className="text-gray-600 text-sm">{member.credentials}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsibilities Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Board Responsibilities</h2>
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
                    <div className="text-purple-600 mr-4 mt-1">{item.icon}</div>
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
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                      <span className="font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Annual call for nominations from membership</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                      <span className="font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Screening of candidates by nominations committee</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                      <span className="font-bold">3</span>
                    </div>
                    <p className="text-gray-700">Elections during Annual General Meeting</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                      <span className="font-bold">4</span>
                    </div>
                    <p className="text-gray-700">Two-year terms with maximum of three terms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Election Section */}
        <div className="bg-purple-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Next Board Election</h3>
          <p className="text-purple-100 mb-6">Annual General Meeting - March 15, 2024</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn About Nominations
          </button>
        </div>
      </div>
    </div>
  );
}