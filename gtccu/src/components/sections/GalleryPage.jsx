import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      category: "events",
      image: "/images/gallery/agm-2023.jpg",
      title: "Annual General Meeting 2023",
      description: "Members gathering for our yearly AGM"
    },
    {
      id: 2,
      category: "events",
      image: "/images/gallery/financial-literacy.jpg",
      title: "Financial Literacy Workshop",
      description: "Educating members on financial management"
    },
    {
      id: 3,
      category: "facilities",
      image: "/images/gallery/head-office.jpg",
      title: "Head Office",
      description: "Our main office building in Accra"
    },
    {
      id: 4,
      category: "facilities",
      image: "/images/gallery/tamale-branch.jpg",
      title: "Tamale Branch",
      description: "Northern region branch office"
    },
    {
      id: 5,
      category: "team",
      image: "/images/gallery/staff-training.jpg",
      title: "Staff Training Session",
      description: "Continuous learning for our team"
    },
    {
      id: 6,
      category: "team",
      image: "/images/gallery/team-building.jpg",
      title: "Team Building Exercise",
      description: "Building strong relationships within our team"
    },
    {
      id: 7,
      category: "community",
      image: "/images/gallery/school-donation.jpg",
      title: "School Donation Program",
      description: "Supporting local educational institutions"
    },
    {
      id: 8,
      category: "community",
      image: "/images/gallery/teachers-day.jpg",
      title: "Teachers' Day Celebration",
      description: "Honoring educators in our community"
    },
    {
      id: 9,
      category: "awards",
      image: "/images/gallery/award-ceremony.jpg",
      title: "Industry Award Ceremony",
      description: "Recognizing excellence in service"
    }
  ];

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const categories = [
    { id: "all", name: "All Photos" },
    { id: "events", name: "Events" },
    { id: "facilities", name: "Facilities" },
    { id: "team", name: "Team" },
    { id: "community", name: "Community" },
    { id: "awards", name: "Awards" }
  ];

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-red-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/gallery-bg.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Explore moments from our journey, events, facilities, and community engagements.
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

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => openImage(item)}
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-center p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <div className="relative max-w-4xl w-full max-h-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={closeImage}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg overflow-hidden"
              >
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}