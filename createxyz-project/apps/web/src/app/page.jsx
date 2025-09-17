// import { Building2, Users, ClipboardCheck } from "lucide-react";
import { Link } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Building2, Users, ClipboardCheck } from 'lucide-react';
import './global.css';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <header className="w-full bg-white dark:bg-[#121212] border-b border-[#E4E6F0] dark:border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Building2
              size={32}
              className="text-[#1B4A87] dark:text-[#4A90E2]"
            />
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B4A87] to-[#2563EB] dark:from-[#1E3A8A] dark:to-[#1D4ED8] py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-extrabold text-4xl sm:text-5xl text-white mb-6 animate-fade-in-up">
            Training Feedback Portal
          </h2>
          <p className="font-inter text-lg text-blue-100 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            Help us improve our training programs through your valuable feedback
            and assessment
          </p>
        </div>
      </section>



      {/* Action Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Employee Feedback Card */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-in-left">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#EBF4FF] dark:bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users
                    size={32}
                    className="text-[#1B4A87] dark:text-[#60A5FA]"
                  />
                </div>

                <h3 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4">
                  Employee Training Feedback
                </h3>

                <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-8 leading-relaxed">
                  Share your experience and help us improve our training
                  programs. Your feedback is valuable to us.
                </p>

                <div className="bg-[#F8FAFC] dark:bg-[#262626] rounded-lg p-4 mb-6">
                  <p className="font-inter text-sm text-[#475569] dark:text-[#A0A0A0]">
                    <strong>Form:</strong> INF-SHR-30.6
                    <br />
                    <strong>Access:</strong> Public - No login required
                  </p>
                </div>

                <Link to="/employee-feedback" className="w-full block">
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-[#1B4A87] to-[#2563EB] dark:from-[#1E3A8A] dark:to-[#1D4ED8] text-white font-jakarta font-semibold rounded-lg hover:from-[#1E40AF] hover:to-[#1D4ED8] dark:hover:from-[#1E40AF] dark:hover:to-[#1E40AF] transition-all duration-200 shadow-md hover:shadow-lg">
                    Start Employee Feedback
                  </button>
                </Link>
              </div>
            </div>

            {/* HOD Assessment Card */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-in-right">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FEF3E3] dark:bg-[#7C2D12] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardCheck
                    size={32}
                    className="text-[#EA580C] dark:text-[#FB923C]"
                  />
                </div>

                <h3 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4">
                  Training Effectiveness Form
                </h3>

                <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-8 leading-relaxed">
                  HOD access for comprehensive training program evaluation and
                  effectiveness measurement.
                </p>

                <div className="bg-[#FEF3E3] dark:bg-[#7C2D12] rounded-lg p-4 mb-6">
                  <p className="font-inter text-sm text-[#9A3412] dark:text-[#FED7AA]">
                    <strong>Form:</strong> INF-SHR-30.7
                    <br />
                    <strong>Access:</strong> Restricted - HOD login required
                  </p>
                </div>

                <Link to="/hod-login" className="w-full block">
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-[#EA580C] to-[#DC2626] dark:from-[#7C2D12] dark:to-[#991B1B] text-white font-jakarta font-semibold rounded-lg hover:from-[#DC2626] hover:to-[#B91C1C] dark:hover:from-[#991B1B] dark:hover:to-[#7F1D1D] transition-all duration-200 shadow-md hover:shadow-lg">
                    HOD Login & Assessment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[#F8FAFC] dark:bg-[#1E1E1E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4 animate-fade-in">
            About Our Training Feedback System
          </h3>
          <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto animate-fade-in animation-delay-300">
            This system collects valuable feedback from employees and
            comprehensive assessments from Heads of Department to continuously
            improve our training programs and ensure maximum effectiveness and
            engagement.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#121212] border-t border-[#E4E6F0] dark:border-[#2A2A2A] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Building2
                size={20}
                className="text-[#1B4A87] dark:text-[#4A90E2]"
              />
              <span className="font-jakarta font-medium text-[#0F1121] dark:text-white">
                IAC Group © 2025
              </span>
            </div>
            <p className="font-inter text-sm text-[#5B5F70] dark:text-[#A0A0A0]">
              Website Developed By Mayur Patil - Innovation & Development IAC
            </p>
          </div>
        </div>
      </footer>

      {/* Font imports and animations */}
      {/* <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
      `}</style> */}
    </div>
  );
}

// Mount React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage />);
