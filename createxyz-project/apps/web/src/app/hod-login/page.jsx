import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Lock, Eye, EyeOff, Shield } from 'lucide-react';

export default function HODLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogging(true);
    setError('');

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Authentication credentials for HODs and HR
    const validCredentials = [
      { username: 'hod.maintenance', password: 'IAC2025!', department: 'Maintenance', role: 'hod' },
      { username: 'hod.quality', password: 'IAC2025!', department: 'Quality Assurance', role: 'hod' },
      { username: 'hod.toolroom', password: 'IAC2025!', department: 'Tool Room', role: 'hod' },
      { username: 'hod.production', password: 'IAC2025!', department: 'Production', role: 'hod' },
      { username: 'hod.manufacturing', password: 'IAC2025!', department: 'Manufacturing Engineering', role: 'hod' },
      { username: 'hod.logistics', password: 'IAC2025!', department: 'Material Planning & Logistics', role: 'hod' },
      { username: 'hr.admin', password: 'HR2025!', department: 'Human Resources', role: 'hr' }
    ];

    const user = validCredentials.find(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (user) {
      // Store authentication in localStorage
      localStorage.setItem('userAuth', JSON.stringify({
        username: user.username,
        department: user.department,
        role: user.role,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      }));
      
      // Redirect based on role
      if (user.role === 'hr') {
        navigate('/hr-dashboard');
      } else {
        navigate('/hod-assessment');
      }
    } else {
      setError('Invalid username or password. Please check your credentials and try again.');
    }

    setIsLogging(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <header className="w-full bg-white dark:bg-[#121212] border-b border-[#E4E6F0] dark:border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-[#1B4A87] dark:text-[#4A90E2] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
              <ArrowLeft size={20} />
              <span className="font-inter text-sm">Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Building2 size={32} className="text-[#1B4A87] dark:text-[#4A90E2]" />
            <div>
              <h1 className="font-jakarta font-bold text-xl text-[#1B4A87] dark:text-white">
                IAC Group
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                Training Feedback System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 sm:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Login Card */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] shadow-xl p-6">
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#EA580C] to-[#DC2626] dark:from-[#7C2D12] dark:to-[#991B1B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-white" />
              </div>
              
              <h2 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-2">
                IAC Secure Login 
              </h2>
              
              <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] text-sm">
                Access the Training Effectiveness Assessment Form
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Lock size={16} className="text-red-600 dark:text-red-400 mr-2" />
                  <p className="font-inter text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#59647A] dark:text-[#A0A0A0] hover:text-[#0F1121] dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLogging}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#EA580C] to-[#DC2626] dark:from-[#7C2D12] dark:to-[#991B1B] text-white font-jakarta font-semibold rounded-lg hover:from-[#DC2626] hover:to-[#B91C1C] dark:hover:from-[#991B1B] dark:hover:to-[#7F1D1D] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLogging ? 'Authenticating...' : 'Login to Dashboard'}
              </button>
            </form>

            

            {/* Security Notice */}
            <div className="mt-4 bg-[#EBF4FF] dark:bg-[#1E3A8A] rounded-lg p-3">
              <div className="flex items-start">
                <Lock size={14} className="text-[#1B4A87] dark:text-[#60A5FA] mr-2 mt-0.5 flex-shrink-0" />
                <p className="font-inter text-xs text-[#475569] dark:text-[#A0A0A0]">
                  Restricted access for authorized personnel only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}