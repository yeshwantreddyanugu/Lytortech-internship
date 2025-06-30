
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Check, Star, Shield, Clock, Users, Award, QrCode, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [copied, setCopied] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI Payment',
      subtitle: 'Pay instantly with any UPI app',
      icon: <Smartphone className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, Rupay accepted',
      icon: <CreditCard className="w-6 h-6" />,
      popular: false
    }
  ];

  const features = [
    "45+ HD Video Lessons",
    "8 Real Projects (Mini + Major)",
    "Industry Certificates",
    "Job Assistance Program",
    "WhatsApp Community Access",
    "Lifetime Access to Content"
  ];

  const copyUpiId = () => {
    navigator.clipboard.writeText('lytortech@paytm');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <h1 className="text-xl sm:text-2xl font-bold">Secure Payment</h1>
              <p className="text-gray-400 text-sm">Complete your enrollment in Android Development Internship</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4 animate-pulse">
              🔥 Limited Time: 70% OFF
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">First 200 Students Only!</h2>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="text-gray-400 line-through text-lg sm:text-xl lg:text-2xl">₹1,999</span>
              <span className="text-green-400 text-2xl sm:text-3xl lg:text-4xl font-bold">₹599</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs sm:text-sm font-semibold">Save ₹1,400</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Payment Methods */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-white">Choose Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                            selectedMethod === method.id ? 'bg-blue-500' : 'bg-gray-700'
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-semibold text-sm sm:text-base">{method.title}</h3>
                              {method.popular && (
                                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Popular</span>
                              )}
                            </div>
                            <p className="text-gray-400 text-xs sm:text-sm">{method.subtitle}</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {selectedMethod === method.id && (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white m-auto" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* UPI Payment Details */}
              {selectedMethod === 'upi' && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                      <QrCode className="mr-2 w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                      UPI Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="bg-white p-3 sm:p-4 rounded-xl inline-block mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1611367819402-8856ba2b3d30?w=200&h=200&fit=crop" 
                          alt="UPI QR Code" 
                          className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-gray-300 text-sm mb-4">Scan QR code with any UPI app</p>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-xl p-3 sm:p-4">
                      <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Manual Payment Details:</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">UPI ID:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400 font-mono text-sm">lytortech@paytm</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={copyUpiId}
                              className="h-6 px-2 text-xs"
                            >
                              {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Amount:</span>
                          <span className="text-green-400 font-bold text-sm">₹599</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Receiver:</span>
                          <span className="text-white text-sm">Lytortech Solutions</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 sm:p-4">
                      <h4 className="text-blue-400 font-semibold mb-2 text-sm">📱 Payment Instructions:</h4>
                      <ol className="text-gray-300 text-xs sm:text-sm space-y-1">
                        <li>1. Open any UPI app (PhonePe, GPay, Paytm, etc.)</li>
                        <li>2. Scan the QR code or use UPI ID: lytortech@paytm</li>
                        <li>3. Enter amount: ₹599</li>
                        <li>4. Complete the payment</li>
                        <li>5. Screenshot the payment confirmation</li>
                        <li>6. Send confirmation to our WhatsApp: +91 9876543210</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Card Payment Form */}
              {selectedMethod === 'card' && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-white">Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">CVV</label>
                        <Input
                          placeholder="123"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Cardholder Name</label>
                      <Input
                        placeholder="Name on card"
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Student Information */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-white">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                      <Input
                        placeholder="+91 9876543210"
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">College Name</label>
                      <Input
                        placeholder="Your college name"
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-gray-800 border-gray-700 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold text-sm sm:text-base">Android Development Internship</h3>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs sm:text-sm text-gray-300">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Original Price:</span>
                        <span className="text-gray-400 line-through">₹1,999</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Discount (70%):</span>
                        <span className="text-green-400">-₹1,400</span>
                      </div>
                      <div className="flex justify-between text-lg sm:text-xl font-bold">
                        <span className="text-white">Total:</span>
                        <span className="text-green-400">₹599</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 sm:py-3 text-sm sm:text-base font-semibold">
                    <Shield className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Complete Secure Payment
                  </Button>

                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Secure
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Instant Access
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
