
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Check, Users, Calendar, Award, Star, ArrowRight, Menu, X, MessageCircle, FileText, CreditCard, Lock, Code, Smartphone, ShoppingCart, Video, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LoginModal from '@/components/LoginModal';
import EnrollmentModal from '@/components/EnrollmentModal';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "45+ HD Video Lessons",
      description: "Premium recorded sessions with lifetime access",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Limited to 200 Students",
      description: "Exclusive batch for personalized mentorship",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "2 Month Intensive Program",
      description: "From beginner to job-ready developer",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Industry Certificates",
      description: "Completion + Merit certificates included",
      color: "from-orange-500 to-red-600"
    }
  ];

  const projects = [
    {
      title: "E-commerce Shopping App",
      description: "Complete shopping experience with cart, payment gateway, and user authentication",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      features: ["Product Catalog", "Shopping Cart", "Payment Integration", "User Profiles"]
    },
    {
      title: "Food Delivery App",
      description: "Zomato/Swiggy clone with real-time tracking and restaurant management",
      image: "https://images.unsplash.com/photo-1605655293594-92e21b3409bf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Restaurant Search", "Order Tracking", "Payment Gateway", "Reviews System"]
    },
    {
      title: "Chat & Social App",
      description: "WhatsApp-like messaging with social media features",
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=250&fit=crop",
      features: ["Real-time Chat", "Media Sharing", "Group Chats", "Social Feed"]
    }
  ];

  const learningPath = [
    {
      week: "Week 1-2",
      title: "Java & Android Fundamentals",
      lessons: 12,
      duration: "15 hours",
      topics: ["Java OOP", "Android Studio", "Activities", "Layouts"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      week: "Week 3-4",
      title: "UI/UX & Database Integration",
      lessons: 10,
      duration: "12 hours",
      topics: ["Material Design", "SQLite", "SharedPreferences", "RecyclerView"],
      color: "from-purple-500 to-pink-500"
    },
    {
      week: "Week 5-6",
      title: "APIs & Backend Integration",
      lessons: 8,
      duration: "10 hours",
      topics: ["REST APIs", "JSON Parsing", "Retrofit", "Firebase"],
      color: "from-green-500 to-teal-500"
    },
    {
      week: "Week 7-8",
      title: "7 Mini Projects",
      lessons: 15,
      duration: "20 hours",
      topics: ["Calculator", "Weather App", "To-Do Manager", "Quiz App"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const previewVideos = [
    {
      id: 1,
      title: "Introduction to Android Development",
      duration: "45 min",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      isLocked: true
    },
    {
      id: 2,
      title: "Java Fundamentals for Android",
      duration: "60 min",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
      isLocked: true
    },
    {
      id: 3,
      title: "Building Your First App",
      duration: "90 min",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
      isLocked: true
    },
    {
      id: 4,
      title: "E-commerce App Development",
      duration: "120 min",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
      isLocked: true
    }
  ];

  const scrollToInternship = () => {
    const element = document.getElementById('internship-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="text-white w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-white font-bold text-lg sm:text-xl">Lytortech</span>
                <p className="text-gray-400 text-xs hidden sm:block">Solutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-sm">Home</a>
              <button onClick={scrollToInternship} className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-sm">Internship Details</button>
              <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-sm">Contact</Link>
              <Link to="/payment" className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-sm">Payment</Link>
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm px-4 py-2"
              >
                Student Login
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-gray-800 py-4 px-3 space-y-3 border-t border-gray-700">
              <a href="#home" className="block text-gray-300 hover:text-blue-400 transition-colors py-2">Home</a>
              <button onClick={scrollToInternship} className="block text-gray-300 hover:text-blue-400 transition-colors text-left py-2">Internship Details</button>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors py-2">Contact</Link>
              <Link to="/payment" className="block text-gray-300 hover:text-blue-400 transition-colors py-2">Payment</Link>
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white mt-2"
              >
                Student Login
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                Limited Time Offer
              </span>
            </div>
            <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight px-4 sm:px-6 mb-8">
              <span className="block text-white">
                Master
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Android Development & AI Agents
              </span>
              <span className="block mt-3 text-white">
                Build <span className="text-purple-300">Real Apps</span> and <span className="text-purple-300">AI Agents</span> in <span className="text-blue-300">2 Months</span>
              </span>
            </h1>



            {/* Pricing Banner */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider animate-pulse">
                  🔥 70% OFF - First 200 Students Only
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl lg:text-3xl">₹9,999</span>
                  <span className="text-green-400 text-3xl sm:text-4xl lg:text-5xl font-bold">₹2,999</span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Complete internship + certifications + job assistance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-2">
              <Button
                size="lg"
                onClick={() =>
                  window.open('https://forms.gle/fuYWBGZ8dPD4kaVH7', '_blank')
                }
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-200"
              >
                <CreditCard className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Enroll Now
                {/* <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" /> */}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  window.open('https://chat.whatsapp.com/Jty04X7Ezw2Ci3Z8BTwR7h', '_blank')
                }
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-200"
              >
                <MessageCircle className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Join WhatsApp Community
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">Course Preview</h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 text-base sm:text-lg">Get a sneak peek at our premium content</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {previewVideos.map((video) => (
              <Card key={video.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-lg">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/80 rounded-full flex items-center justify-center mb-2 mx-auto">
                        {video.isLocked ? <Lock className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
                      </div>
                      <span className="text-yellow-400 text-xs sm:text-sm font-semibold">
                        {video.isLocked ? 'LOCKED' : 'PREVIEW'}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{video.duration}</p>
                  {video.isLocked && (
                    <p className="text-xs text-yellow-400 mt-2">🔒 Unlock with enrollment</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button
              onClick={() => setIsLoginOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3"
            >
              Login to Access All Content
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16">Why Choose Our Program?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group">
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-lg sm:text-xl group-hover:text-blue-400 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="internship-details" className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">Real Projects You'll Build</h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 text-base sm:text-lg">Industry-standard applications with full functionality</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
                  <div className="space-y-1 sm:space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-400">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-16">Complete Learning Path</h2>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {learningPath.map((item, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-4 sm:space-x-6 mb-4 lg:mb-0">
                      <div className={`bg-gradient-to-r ${item.color} w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg sm:text-xl">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">{item.title}</h3>
                        <p className="text-blue-400 font-semibold text-sm sm:text-base">{item.week}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6 text-gray-400">
                      <div className="text-center">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{item.lessons}</p>
                        <p className="text-xs sm:text-sm">Lessons</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{item.duration}</p>
                        <p className="text-xs sm:text-sm">Duration</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                    {item.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="bg-gray-700/50 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-center">
                        <span className="text-gray-300 text-xs sm:text-sm font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto text-center">
          <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto border border-gray-700 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">Join the next generation of Android developers</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">45+</div>
                <p className="text-gray-400 text-sm sm:text-base">HD Video Lessons</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">8</div>
                <p className="text-gray-400 text-sm sm:text-base">Real Projects</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">2</div>
                <p className="text-gray-400 text-sm sm:text-base">Industry Certificates</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => window.open('https://forms.gle/fuYWBGZ8dPD4kaVH7', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold"
              >
                <CreditCard className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Secure Your Spot - ₹799
              </Button>
              <Link to="/payment">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
                >
                  <FileText className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  View Payment Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg sm:text-xl">Lytortech</span>
                  <p className="text-gray-400 text-xs sm:text-sm">Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Empowering the next generation of developers through quality education and hands-on training.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
              <div className="space-y-1 sm:space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Home</a>
                <button onClick={scrollToInternship} className="block text-gray-400 hover:text-blue-400 transition-colors text-left text-sm">Internship Details</button>
                <Link to="/contact" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Contact</Link>
                <Link to="/payment" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Payment</Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h3>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
                {/* <p>Email: info@lytortech.com</p> */}
                <p>Phone: +91 6301 111 060</p>
                <p>WhatsApp: +91 6301 111 060</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
              <div className="space-y-1 sm:space-y-2">
                <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms & Conditions</a>
                <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Refund Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">© 2024 Lytortech Solutions Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} />
    </div>
  );
};

export default Index;
