import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Linkedin, Users } from "lucide-react";

export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "Dr. Kwame Mensah",
      role: "Chief Executive Officer",
      image: "/images/team/ceo.jpg",
      email: "kwame.mensah@gtccu.com",
      phone: "+233 24 123 4567",
      bio: "15+ years of experience in financial services and credit union management."
    },
    {
      name: "Ama Serwaa",
      role: "Operations Manager",
      image: "/images/team/operations.jpg",
      email: "ama.serwaa@gtccu.com",
      phone: "+233 24 234 5678",
      bio: "Expert in credit union operations and member service excellence."
    },
    {
      name: "Kofi Ananse",
      role: "Finance Director",
      image: "/images/team/finance.jpg",
      email: "kofi.ananse@gtccu.com",
      phone: "+233 24 345 6789",
      bio: "Chartered accountant with extensive experience in financial management."
    },
    {
      name: "Esi Nyarko",
      role: "Member Services Manager",
      image: "/images/team/services.jpg",
      email: "esi.nyarko@gtccu.com",
      phone: "+233 24 456 7890",
      bio: "Dedicated to providing exceptional service and support to our members."
    },
    {
      name: "Yaw Boateng",
      role: "IT & Digital Solutions",
      image: "/images/team/it.jpg",
      email: "yaw.boateng@gtccu.com",
      phone: "+233 24 567 8901",
      bio: "Technology expert driving our digital transformation and innovation."
    },
    {
      name: "Akua Manu",
      role: "Loan Officer",
      image: "/images/team/loans.jpg",
      email: "akua.manu@gtccu.com",
      phone: "+233 24 678 9012",
      bio: "Specialized in helping members find the perfect loan solutions."
    }
  ];

  const departments = [
    {
      name: "Executive Leadership",
      count: "3 Members",
      description: "Strategic direction and overall management"
    },
    {
      name: "Finance & Accounting",
      count: "5 Members",
      description: "Financial management and reporting"
    },
    {
      name: "Member Services",
      count: "12 Members",
      description: "Day-to-day member support and assistance"
    },
    {
      name: "Operations",
      count: "8 Members",
      description: "Credit union operations and administration"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-600 to-green-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/team-bg.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Meet the dedicated professionals committed to serving our members with excellence and expertise.
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

      {/* Team Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Leadership Team
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experienced professionals guiding our credit union towards continued success and member satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
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
                <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Departments Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-green-50 rounded-lg"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{dept.name}</h3>
                <p className="text-green-600 font-bold mb-2">{dept.count}</p>
                <p className="text-gray-600 text-sm">{dept.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Join Our Team
          </motion.h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about serving the educational community.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}