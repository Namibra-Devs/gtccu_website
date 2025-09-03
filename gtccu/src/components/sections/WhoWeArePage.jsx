import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, Award, Heart } from "lucide-react";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";


export default function WhoWeArePage() {
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Member-First Approach",
      description:
        "We prioritize our members' needs above all else, ensuring financial solutions that work for educators.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Financial Empowerment",
      description:
        "We empower educators with financial knowledge and tools to build secure futures.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence in Service",
      description:
        "We maintain the highest standards of service quality and operational excellence.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Impact",
      description:
        "We're committed to strengthening the educational community through financial support.",
    },
  ];

  const milestones = [
    {
      year: "on 29th March,1993",
      event: "GTCCU Founded",
      description: "Established to serve educators in Ghana",
    },
    {
      year: "2012",
      event: "1,000 Members",
      description: "Reached our first membership milestone",
    },
    {
      year: "2016",
      event: "Digital Banking",
      description: "Launched online banking services",
    },
    {
      year: "2020",
      event: "₵10M+ Loans",
      description: "Surpassed ₵10 million + in total loans",
    },
    {
      year: "2023",
      event: "5,000+ Members",
      description:
        "professional Teachers, Doctors, Nurses, Petty Traders, Contractors and business executives",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.9"], // start growing near top, finish near bottom
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              A member-owned financial cooperative dedicated to serving the
              educational community with integrity and excellence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-lg md:text-2xl font-bold text-blue-800 mb-6">
              GLOBAL TEACHERS CO-OPERATIVE CREDIT UNION (GTCCU)
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                <p className="text-gray-700">
                  We are the preferred Credit Union for our Members, stake
                  holders, staff and the Community in which we operate. We are
                  located within the business precinct of Tamale, Northern
                  Region. Our founder D.Y SOULOUKUN started the Union with a
                  handful of Catholic unit Teachers. His motivation was to
                  encourage savings and on lending amongst Teachers operating
                  within the Tamale Metropolis.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                <p className="text-gray-700">
                  Our Union which started with the name TAMALE TEACHERS
                  COOPERATIVE CREDIT UNION operated with a strictly only members
                  from the teaching profession within the Region. Later due to
                  popular demand we opened our doors to Teachers outside the
                  Region due to this our name metamorphosed to Global Teachers
                  Cooperative Credit Union. We attained full membership with
                  Credit Union Association (CUA) on 29th March,1993.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Quick Facts
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Founded</span>
                <span className="font-semibold text-gray-800">March,1993</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Total Members</span>
                <span className="font-semibold text-gray-800">4,730+</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Branches</span>
                <span className="font-semibold text-gray-800">
                  5 Nationwide
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Loans Disbursed</span>
                <span className="font-semibold text-gray-800">₵8.5M+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Global Teachers
              Credit Union
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4 mx-auto">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
          Our Journey
        </h2>
        <div className="relative" ref={containerRef}>
 {/* Timeline line with glowing grow animation */}
        <motion.div
          style={{ scaleY, transformOrigin: "top center" }}
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.7)]"
        ></motion.div>

          {/* Timeline line - positioned left on mobile, center on desktop */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-blue-200"></div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start mb-12"
            >
             {/* Timeline dot - responsive positioning */}
<div className="relative z-10 flex-shrink-0 left-0 md:left-1/2 md:-translate-x-1/2">
  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
</div>

              {/* Content - always on right */}
              <div className="ml-6 flex-1 md:ml-0">
                {/* Desktop layout (alternating sides) */}
                <div className="hidden md:block">
                  <div
                    className={`flex ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="w-1/2"></div>
                    <div
                      className={`w-1/2 p-6 ${
                        index % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="text-blue-600 font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile layout (always on right) */}
                <div className="md:hidden">
                  <div className="bg-white rounded-xl shadow-lg p-6 ml-4">
                    <div className="text-blue-600 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
