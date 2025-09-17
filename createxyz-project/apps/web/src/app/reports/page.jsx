'use client';

import { useState, useEffect } from 'react';
import { Building2, ArrowLeft, BarChart3, TrendingUp, Users, Calendar, Download, Filter } from 'lucide-react';

export default function ReportsPage() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAndAnalyzeData();
  }, []);

  const fetchAndAnalyzeData = async () => {
    try {
      setLoading(true);
      // Google Sheets API call
      const SHEET_ID = '1gyVBXss19X3VmiX8A0Ec0u5QZTzdOSGEgEv5-frr6_E';
      const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';
      const RANGE = 'Sheet1!A:G';
      
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      
      let data = [];
      if (response.ok) {
        const sheetData = await response.json();
        const rows = sheetData.values || [];
        data = rows.slice(1).map((row, index) => ({
          id: index + 1,
          submissionDate: row[0] || '',
          employeeName: row[1] || '',
          employeeCode: row[2] || '',
          department: row[3] || '',
          trainingProgramme: row[4] || '',
          faculty: row[5] || '',
          venue: row[6] || ''
        }));
      } else {
        // Fallback to localStorage
        data = JSON.parse(localStorage.getItem('iacTrainingFeedback') || '[]');
      }
      
      setFeedbackData(data);
      generateAnalytics(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      const localData = JSON.parse(localStorage.getItem('iacTrainingFeedback') || '[]');
      setFeedbackData(localData);
      generateAnalytics(localData);
    } finally {
      setLoading(false);
    }
  };

  const generateAnalytics = (data) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Department analysis
    const departmentCounts = data.reduce((acc, item) => {
      acc[item.department] = (acc[item.department] || 0) + 1;
      return acc;
    }, {});

    // Training program analysis
    const programCounts = data.reduce((acc, item) => {
      acc[item.trainingProgramme] = (acc[item.trainingProgramme] || 0) + 1;
      return acc;
    }, {});

    // Monthly trends
    const monthlyData = data.reduce((acc, item) => {
      const date = new Date(item.submissionDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthKey] = (acc[monthKey] || 0) + 1;
      return acc;
    }, {});

    setAnalytics({
      totalSubmissions: data.length,
      thisMonth: data.filter(item => new Date(item.submissionDate) >= thirtyDaysAgo).length,
      thisWeek: data.filter(item => new Date(item.submissionDate) >= sevenDaysAgo).length,
      departmentBreakdown: Object.entries(departmentCounts).sort((a, b) => b[1] - a[1]),
      topPrograms: Object.entries(programCounts).sort((a, b) => b[1] - a[1]).slice(0, 5),
      monthlyTrends: Object.entries(monthlyData).sort((a, b) => a[0].localeCompare(b[0]))
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#059669] mx-auto mb-4"></div>
          <p className="text-[#59647A] dark:text-[#A0A0A0]">Generating reports...</p>
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
                Training Analytics
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                Reports & Insights
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {analytics.totalSubmissions || 0}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    Total Feedbacks
                  </p>
                </div>
                <BarChart3 size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {analytics.thisMonth || 0}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    This Month
                  </p>
                </div>
                <Calendar size={32} className="text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {analytics.thisWeek || 0}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    This Week
                  </p>
                </div>
                <TrendingUp size={32} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-jakarta font-bold text-[#0F1121] dark:text-white">
                    {analytics.departmentBreakdown?.length || 0}
                  </p>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    Active Departments
                  </p>
                </div>
                <Users size={32} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Department Breakdown */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Feedback by Department
              </h3>
              <div className="space-y-4">
                {analytics.departmentBreakdown?.map(([dept, count], index) => (
                  <div key={dept} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-${['blue', 'green', 'orange', 'purple', 'red', 'yellow'][index % 6]}-500`}></div>
                      <span className="font-inter text-sm text-[#0F1121] dark:text-white">{dept}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-${['blue', 'green', 'orange', 'purple', 'red', 'yellow'][index % 6]}-500 h-2 rounded-full`}
                          style={{ width: `${(count / analytics.totalSubmissions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-jakarta font-semibold text-sm text-[#0F1121] dark:text-white w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Training Programs */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Top Training Programs
              </h3>
              <div className="space-y-4">
                {analytics.topPrograms?.map(([program, count], index) => (
                  <div key={program} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="font-inter text-sm text-[#0F1121] dark:text-white truncate max-w-48">
                        {program}
                      </span>
                    </div>
                    <span className="font-jakarta font-semibold text-sm text-[#0F1121] dark:text-white">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white">
                Monthly Submission Trends
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#059669] text-white font-inter text-sm rounded-lg hover:bg-[#047857] transition-colors">
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex items-end space-x-4 min-w-full h-64 pb-4">
                {analytics.monthlyTrends?.map(([month, count]) => (
                  <div key={month} className="flex flex-col items-center space-y-2 min-w-16">
                    <div className="text-xs font-inter text-[#59647A] dark:text-[#A0A0A0]">
                      {count}
                    </div>
                    <div 
                      className="w-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                      style={{ height: `${Math.max((count / Math.max(...analytics.monthlyTrends.map(([, c]) => c))) * 200, 8)}px` }}
                    ></div>
                    <div className="text-xs font-inter text-[#59647A] dark:text-[#A0A0A0] transform -rotate-45 origin-center">
                      {month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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