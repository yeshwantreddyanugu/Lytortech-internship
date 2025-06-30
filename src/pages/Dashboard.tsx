import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Lock, Search, Filter, User, LogOut, ArrowLeft, Clock, CheckCircle, Star, Download, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import VideoPlayer from '@/components/VideoPlayer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    // Navigate back to home page
    navigate('/');
  };

  const videoLessons = [
    {
      id: 1,
      title: "Introduction to Android Development",
      duration: "45 min",
      category: "fundamentals",
      week: "Week 1",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      isCompleted: true,
      description: "Getting started with Android Studio and development environment"
    },
    {
      id: 2,
      title: "Java Fundamentals for Android",
      duration: "60 min",
      category: "fundamentals", 
      week: "Week 1",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      isCompleted: true,
      description: "Object-oriented programming concepts essential for Android development"
    },
    {
      id: 3,
      title: "Building Your First App",
      duration: "90 min",
      category: "projects",
      week: "Week 2", 
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Create a simple Hello World app and understand Android project structure"
    },
    {
      id: 4,
      title: "Layouts and UI Components",
      duration: "75 min",
      category: "ui-design",
      week: "Week 2",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Learn about different layouts and UI components in Android"
    },
    {
      id: 5,
      title: "Working with Activities",
      duration: "50 min", 
      category: "fundamentals",
      week: "Week 3",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Understanding Activity lifecycle and navigation"
    },
    {
      id: 6,
      title: "Database Integration with SQLite",
      duration: "80 min",
      category: "backend", 
      week: "Week 4",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Store and retrieve data using SQLite database"
    },
    {
      id: 7,
      title: "REST API Integration", 
      duration: "70 min",
      category: "backend",
      week: "Week 5",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Connect your app to web services and APIs"
    },
    {
      id: 8,
      title: "Food Delivery App Development",
      duration: "120 min",
      category: "projects",
      week: "Week 6-7",
      thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
      isCompleted: false,
      description: "Build a complete food delivery application like Zomato/Swiggy with real-time features"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Lessons' },
    { id: 'fundamentals', name: 'Fundamentals' },
    { id: 'ui-design', name: 'UI Design' },
    { id: 'backend', name: 'Backend' },
    { id: 'projects', name: 'Projects' }
  ];

  const filteredVideos = videoLessons.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedLessons = videoLessons.filter(video => video.isCompleted).length;
  const progressPercentage = Math.round((completedLessons / videoLessons.length) * 100);

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setIsVideoMinimized(false);
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
    setIsVideoMinimized(false);
  };

  const handleToggleMinimize = () => {
    setIsVideoMinimized(!isVideoMinimized);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 sm:py-4 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Student Dashboard</h1>
                <p className="text-gray-400 text-sm">Android Development Internship</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-300">
                <User className="w-4 h-4" />
                <span>Welcome, Student</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Progress</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{progressPercentage}%</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Completed</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{completedLessons}/{videoLessons.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Total Hours</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">12.5h</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Certificates</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">2</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap text-xs sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                  onClick={() => handleVideoClick(video)}>
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                  </div>
                </div>
                {video.isCompleted && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/80 rounded px-2 py-1">
                  <span className="text-white text-xs font-medium">{video.duration}</span>
                </div>
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 text-xs font-semibold">{video.week}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    video.isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {video.isCompleted ? 'Completed' : 'Not Started'}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors text-sm sm:text-base line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No lessons found</h3>
            <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {currentVideo && (
        <VideoPlayer
          video={currentVideo}
          onClose={handleCloseVideo}
          isMinimized={isVideoMinimized}
          onToggleMinimize={handleToggleMinimize}
        />
      )}
    </div>
  );
};

export default Dashboard;
