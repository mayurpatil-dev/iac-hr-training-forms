import { Building2, ArrowLeft, LogOut } from "lucide-react";

export default function HODAssessmentHeader({ userInfo, handleLogout }) {
  return (
    <header className="w-full bg-white dark:bg-[#121212] border-b border-[#E4E6F0] dark:border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="flex items-center space-x-2 text-[#1B4A87] dark:text-[#4A90E2] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-inter text-sm">Back to Home</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
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
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-inter text-sm text-[#0F1121] dark:text-white font-medium">
                {userInfo?.username}
              </p>
              <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0]">
                Head of Department
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-inter text-sm rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
