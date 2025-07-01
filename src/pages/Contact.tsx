
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Clock, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      details: '+91 6301111060',
      description: 'Call for immediate assistance',
      action: 'tel:6301111060',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp Support',
      details: '+91 6301111060',
      description: 'Quick support via WhatsApp',
      action: 'https://wa.me/916301111060',
      color: 'from-green-500 to-green-600'
    }
    ,
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      details: 'lytortech@gmail.com',
      description: 'Detailed queries via email',
      action: 'mailto:lytortech@gmail.com',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office Address',
      details: 'Hanmakonda, Warangal',
      description: 'Visit our office',
      action: '#',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const supportHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 6:00 PM' },
    { day: 'Sunday', time: '12:00 PM - 5:00 PM' }
  ];

  const handleContactClick = (action: string) => {
    if (action.startsWith('https://wa.me/')) {
      window.open(action, '_blank');
    } else if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.location.href = action;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 sm:py-4 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Contact & Support</h1>
              <p className="text-gray-400 text-sm sm:text-base hidden sm:block">Get help with your Android Development journey</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Get in Touch</h2>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Choose your preferred way to reach us. We're here to help!</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-4 sm:p-6" onClick={() => handleContactClick(method.action)}>
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`bg-gradient-to-r ${method.color} w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base sm:text-lg mb-1 group-hover:text-blue-400 transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-blue-400 font-medium mb-1 text-sm sm:text-base break-all">{method.details}</p>
                          <p className="text-gray-400 text-xs sm:text-sm">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Contact Form */}
            {/* <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-white">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Name</label>
                    <Input
                      placeholder="Your full name"
                      className="bg-gray-700 border-gray-600 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@college.edu"
                      className="bg-gray-700 border-gray-600 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Subject</label>
                  <Input
                    placeholder="What can we help you with?"
                    className="bg-gray-700 border-gray-600 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your query..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 sm:py-3">
                  <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Send Message
                </Button>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Support Hours */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                  <Clock className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-300 text-sm">{schedule.day}</span>
                    <span className="text-blue-400 font-semibold text-sm">{schedule.time}</span>
                  </div>
                ))}
                <div className="mt-3 sm:mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-semibold">🟢 Currently Online</p>
                  <p className="text-gray-300 text-xs">Average response time: 2-3 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-white">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-2">
                  {[
                    'How to access course content?',
                    'Payment and refund policy',
                    'Certificate information',
                    'Technical requirements',
                    'Job assistance program'
                  ].map((faq, index) => (
                    <button key={index} className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors text-sm py-2 px-3 rounded-lg hover:bg-gray-700">
                      {faq}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-500/10 border-red-500/30">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  Emergency Support
                </h3>
                <p className="text-gray-300 text-sm mb-3">For urgent technical issues during course</p>
                <Button
                  onClick={() =>
                    window.open(
                      'https://wa.me/6301111060?text=URGENT: I need immediate help with my course access',
                      '_blank'
                    )
                  }
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  WhatsApp Now
                </Button>

              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="p-4 sm:p-6 text-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Join Our Community</h3>
                <p className="text-gray-300 text-sm mb-4">Connect with 200+ students in our WhatsApp group</p>
                <Button
                  onClick={() =>
                    window.open(
                      'https://chat.whatsapp.com/Jty04X7Ezw2Ci3Z8BTwR7h',
                      '_blank'
                    )
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Join WhatsApp Group
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
