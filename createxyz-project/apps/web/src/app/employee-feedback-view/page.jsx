'use client';

import { useState, useEffect } from 'react';
import { Building2, ArrowLeft, FileText, Calendar, User, Star, TrendingUp } from 'lucide-react';

export default function EmployeeFeedbackViewPage() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      // Google Sheets API call to fetch data
      const SHEET_ID = '1gyVBXss19X3VmiX8A0Ec0u5QZTzdOSGEgEv5-frr6_E';
      const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Replace with actual API key
      const RANGE = 'Sheet1!A:G'; // Adjust range as needed
      
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      const rows = data.values || [];
      
      // Skip header row and format data
      const formattedData = rows.slice(1).map((row, index) => ({
        id: index + 1,
        submissionDate: row[0] || '',
        employeeName: row[1] || '',
        employeeCode: row[2] || '',
        department: row[3] || '',
        trainingProgramme: row[4] || '',
        faculty: row[5] || '',
        venue: row[6] || ''
      }));
      
      setFeedbackData(formattedData);
    } catch (err) {
      console.error('Error fetching feedback data:', err);
      setError('Failed to load feedback data');
      // Fallback to localStorage data
      const localData = JSON.parse(localStorage.getItem('iacTrainingFeedback') || '[]');
      setFeedbackData(localData);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4A87] mx-auto mb-4"></div>
          <p className="text-[#59647A] dark:text-[#A0A0A0]">Loading feedback data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <header className="w-full bg-white dark:bg-[#121212] border-b border-[#E4E6F0] dark:border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a href="/hr-dashboard" className="flex items-center space-x-2 text-[#1B4A87] dark:text-[#4A90E2] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
              <ArrowLeft size={20} />
              <span className="font-inter text-sm">Back to Dashboard</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Building2 size={32} className="text-[#1B4A87] dark:text-[#4A90E2]" />
            <div>
              <h1 className="font-jakarta font-bold text-xl text-[#1B4A87] dark:text-white">
                Employee Feedback Forms
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                INF-SHR-30.6 Submissions
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {feedbackData.length}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    Total Submissions
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <User size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {new Set(feedbackData.map(f => f.department)).size}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    Departments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Star size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {new Set(feedbackData.map(f => f.trainingProgramme)).size}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    Training Programs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {feedbackData.filter(f => {
                      const date = new Date(f.submissionDate);
                      const now = new Date();
                      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                      return date >= thirtyDaysAgo;
                    }).length}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    This Month
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
            <h2 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-6">
              Recent Feedback Submissions
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="font-inter text-sm text-yellow-700 dark:text-yellow-300">
                  {error}. Showing cached data.
                </p>
              </div>
            )}

            {feedbackData.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="text-[#59647A] dark:text-[#A0A0A0] mx-auto mb-4" />
                <h3 className="font-jakarta font-semibold text-lg text-[#0F1121] dark:text-white mb-2">
                  No Feedback Submissions
                </h3>
                <p className="font-inter text-[#59647A] dark:text-[#A0A0A0]">
                  No employee feedback forms have been submitted yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbackData.map((feedback) => (
                  <div key={feedback.id} className="bg-[#F8FAFC] dark:bg-[#262626] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-jakarta font-semibold text-[#0F1121] dark:text-white">
                            {feedback.employeeName}
                          </h3>
                          <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                            {feedback.employeeCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-[#59647A] dark:text-[#A0A0A0]">
                        <Calendar size={16} className="mr-1" />
                        <span className="font-inter text-xs">
                          {formatDate(feedback.submissionDate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0] mb-1">Department</p>
                        <p className="font-jakarta font-medium text-sm text-[#0F1121] dark:text-white">
                          {feedback.department}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0] mb-1">Training Programme</p>
                        <p className="font-jakarta font-medium text-sm text-[#0F1121] dark:text-white">
                          {feedback.trainingProgramme}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0] mb-1">Faculty</p>
                          <p className="font-jakarta font-medium text-sm text-[#0F1121] dark:text-white">
                            {feedback.faculty}
                          </p>
                        </div>
                        <div>
                          <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0] mb-1">Venue</p>
                          <p className="font-jakarta font-medium text-sm text-[#0F1121] dark:text-white">
                            {feedback.venue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}