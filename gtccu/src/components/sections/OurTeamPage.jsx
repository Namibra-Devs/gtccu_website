import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Linkedin, Users } from "lucide-react";

export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "George Tindana",
      role: "General Manager",
      image: "/images/team1.jpg",
      email: "georgetindaana@gmail.com",
      phone: "+233 24 123 4567",
      bio: "15+ years of experience in services and credit union management."
    },
    {
      name: "Maar Maxwell",
      role: "Branch Manager",
      image: "/images/team2.jpg",
      email: "maarmaxwell@gmail.com",
      phone: "+233 24 234 5678",
      bio: "Expert in credit union operations and member service excellence."
    },
      {
      name: "Kappiah Adams",
      role: "Board Chairman",
      image: "/images/team5.jpeg",
      email: "kappiahadams@gmail.com",
      phone: "+233 24 567 8901",
      bio: "Provides leadership, oversees strategy, and ensures good governance."
    },
    {
      name: "Hajia Ashia Mahama",
      role: "Vice Chairperson",
      image: "/images/team6.jpg",
      email: "aishamahama@gmail.com",
      phone: "+233 24 678 9012",
      bio: "Supports the Chairman, ensures continuity, and strengthens coordination."
    },
    {
      name: "Krakani Catherine",
      role: "Business Solutions / HR",
      image: "/images/team3.jpeg",
      email: "krakanicatherine@gmail.com",
      phone: "+233 24 345 6789",
      bio: "Dedicated to providing exceptional service and support to our members."
    },
    {
      name: "Isaac Duncan",
      role: "Accounts Officer",
      image: "/images/team4.jpeg",
      email: "issacduncan@gmail.com",
      phone: "+233 24 456 7890",
      bio: "Chartered accountant with extensive experience in financial management."
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Meet the dedicated professionals committed to serving our members with excellence and expertise.
            </p>
          </motion.div>
        </div>
        
       
      </div>

      {/* Team Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
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
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-blue-50 rounded-lg"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{dept.name}</h3>
                <p className="text-blue-600 font-bold mb-2">{dept.count}</p>
                <p className="text-gray-600 text-sm">{dept.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

  
    </div>
  );
}