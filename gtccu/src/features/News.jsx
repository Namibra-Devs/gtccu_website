import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2, Bookmark, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@components/layout/Toast";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const newsArticles = [
    {
      id: 1,
      title: "GTCCU Announces Record Growth in 2023",
      excerpt: "Global Teachers Credit Union reports unprecedented membership growth and financial performance in the past fiscal year.",
      category: "announcements",
      date: "2024-01-15",
      author: "Admin Team",
      image: "/images/hero1.jpg",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Digital Banking Platform Launch",
      excerpt: "We're excited to announce the launch of our new mobile banking app with enhanced features and security.",
      category: "technology",
      date: "2024-01-10",
      author: "IT Department",
      image: "/images/who.jpg",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Financial Literacy Workshop Schedule",
      excerpt: "Join our free financial literacy workshops designed specifically for educators. Multiple dates available.",
      category: "events",
      date: "2024-01-08",
      author: "Education Team",
      image: "/images/about3.jpeg",
      readTime: "2 min read"
    },
    {
      id: 4,
      title: "2024 Loan Interest Rates Update",
      excerpt: "New competitive loan interest rates announced for the upcoming year. Better terms for our members.",
      category: "products",
      date: "2024-01-05",
      author: "Finance Team",
      image: "/images/loans.jpg",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Community Outreach Program Success",
      excerpt: "Our recent community outreach program helped over 500 educators with financial planning assistance.",
      category: "community",
      date: "2023-12-20",
      author: "Outreach Team",
      image: "/images/gallery4.jpg",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Holiday Season Operating Hours",
      excerpt: "Special operating hours announcement for the upcoming holiday season. Plan your visits accordingly.",
      category: "announcements",
      date: "2023-12-15",
      author: "Admin Team",
      image: "/images/hero2.jpg",
      readTime: "2 min read"
    }
  ];

  const categories = [
    { id: "all", name: "All News" },
    { id: "announcements", name: "Announcements" },
    { id: "technology", name: "Technology" },
    { id: "events", name: "Events" },
    { id: "products", name: "Products" },
    { id: "community", name: "Community" }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = (article) => {
    // Simulate share functionality
    setToast({
      visible: true,
      message: `Sharing "${article.title}"...`,
      type: "success",
      duration: 3000,
    });
  };

  const handleBookmark = (article) => {
    setToast({
      visible: true,
      message: `Bookmarked "${article.title}"`,
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
          style={{ backgroundImage: "url('/images/gallery5.jpg')" }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Stay informed with the latest news, announcements, and updates from Global Teachers Credit Union.
            </p>
          </motion.div>
        </div>
        
       
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-20">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-blue-800 capitalize">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                   
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookmark(article)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare(article)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-8 mt-12 border border-blue-200"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Stay Updated</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}