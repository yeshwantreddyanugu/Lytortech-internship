
import React, { useState } from 'react';
import { X, User, Mail, Phone, GraduationCap, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    paymentMethod: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    const { name, email, phone, college, year, branch } = formData;
    
    if (!name || !email || !phone || !college || !year || !branch) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setStep(2);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Welcome to the internship program. Check your email for login credentials.');
      setIsLoading(false);
      onClose();
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        branch: '',
        paymentMethod: ''
      });
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-lg bg-black/90 backdrop-blur-sm border-purple-500/20 text-white my-8">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            {step === 1 ? 'Enroll Now' : 'Complete Payment'}
          </CardTitle>
          <p className="text-center text-gray-400">
            {step === 1 ? 'Join our Android Development Internship' : 'Secure your spot for just ₹599'}
          </p>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-12 h-1 ${step >= 2 ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-400'
              }`}>
                2
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-black/30 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-black/30 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 bg-black/30 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">College/University *</label>
                <Input
                  type="text"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  className="bg-black/30 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Year *</label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="bg-black/30 border-purple-500/20 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-500/20">
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Branch *</label>
                  <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                    <SelectTrigger className="bg-black/30 border-purple-500/20 text-white">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-500/20">
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="eee">Electrical & Electronics</SelectItem>
                      <SelectItem value="mech">Mechanical</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-6"
              >
                Proceed to Payment
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Android Development Internship</span>
                    <span className="text-white">₹1,999</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Limited Time Discount</span>
                    <span>-₹1,400</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-2 flex justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">₹599</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Payment Method</label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <SelectTrigger className="bg-black/30 border-purple-500/20 text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-500/20">
                    <SelectItem value="razorpay">Razorpay (UPI, Cards, Net Banking)</SelectItem>
                    <SelectItem value="stripe">Stripe (International Cards)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-purple-500/20 text-purple-400 hover:bg-purple-600/20"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!formData.paymentMethod || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isLoading ? 'Processing...' : 'Pay ₹599'}
                </Button>
              </div>
              
              <p className="text-xs text-gray-400 text-center">
                Secure payment powered by industry-leading encryption. Your data is safe with us.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentModal;
