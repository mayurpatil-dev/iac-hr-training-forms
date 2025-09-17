import { Send } from "lucide-react";

export default function SubmissionSuccess({ handleLogout }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4">
          Assessment Submitted Successfully!
        </h2>
        <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-8">
          Your training effectiveness assessment has been recorded. Thank you
          for your comprehensive evaluation.
        </p>
        <div className="space-y-3">
          <a href="/hod-assessment" className="block">
            <button className="w-full px-6 py-3 bg-[#EA580C] text-white font-jakarta font-medium rounded-lg hover:bg-[#DC2626] transition-colors">
              Submit Another Assessment
            </button>
          </a>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-[#E8EDF8] dark:border-[#3A3A3A] text-[#0F1121] dark:text-white font-jakarta font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors"
          >
            Logout & Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
