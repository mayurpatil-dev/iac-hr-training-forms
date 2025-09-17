"use client";

import { useState, useEffect } from "react";
import { Building2, ArrowLeft, Send, FileText } from "lucide-react";
import { submitToGoogleScript } from "../../utils/api";

export default function HODAssessmentPage() {
  const [userAuth, setUserAuth] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeNo: "",
    trainingImparted: "",
    courseContents: Array(7).fill().map(() => ({
      content: "",
      levelPrior: 0,
      levelAfter: 0,
    })),
    dateDuration: "",
    courseConductedBy: "",
    skillsAcquired: "",
    implementationSuccess: "",
    performanceImprovement: "",
    retrainingRequired: "",
    departmentHead: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      if (parsedAuth.role === "hod" && parsedAuth.isAuthenticated) {
        setUserAuth(parsedAuth);
      } else {
        window.location.href = "/hod-login";
      }
    } else {
      window.location.href = "/hod-login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    window.location.href = "/";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCourseContentChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      courseContents: prev.courseContents.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const flattenedCourses = {};
      formData.courseContents.forEach((c, i) => {
        const idx = i + 1;
        flattenedCourses[`courseContent_${idx}`] = c.content;
        flattenedCourses[`levelPrior_${idx}`] = c.levelPrior;
        flattenedCourses[`levelAfter_${idx}`] = c.levelAfter;
      });

      const submissionData = {
        type: "hodAssessment",
        employeeName: formData.employeeName,
        employeeCode: formData.employeeNo,
        department: userAuth?.department || "",
        trainingImparted: formData.trainingImparted,
        dateDuration: formData.dateDuration,
        courseConductedBy: formData.courseConductedBy,
        observationA: formData.skillsAcquired,
        observationB: formData.implementationSuccess,
        observationC: formData.performanceImprovement,
        observationD: formData.retrainingRequired,
        departmentHead: formData.departmentHead,
        ...flattenedCourses,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitToGoogleScript(submissionData);

      if (!result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      if (result.data?.docLink) {
        setDocumentUrl(result.data.docLink);
      }

      const existingFeedback = JSON.parse(
        localStorage.getItem("trainingEffectiveness") || "[]"
      );
      const newFeedback = {
        ...submissionData,
        id: Date.now(),
        googleResult: result.data,
        documentUrl: result.data.docLink || null,
      };
      existingFeedback.push(newFeedback);
      localStorage.setItem(
        "trainingEffectiveness",
        JSON.stringify(existingFeedback)
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        `Failed to submit form: ${error.message}. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA580C] mx-auto mb-4"></div>
          <p className="text-[#59647A] dark:text-[#A0A0A0]">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4">
            Training Effectiveness Form Submitted Successfully!
          </h2>
          <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-4">
            Thank you for your assessment. Your evaluation helps us improve our
            training programs.
          </p>

          {documentUrl && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-jakarta font-medium text-lg text-[#1B4A87] dark:text-[#4A90E2] mb-2 flex items-center">
                <FileText size={20} className="mr-2" />
                Document Generated
              </h3>
              <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0] mb-3">
                Your assessment document has been created and saved to Google
                Drive.
              </p>
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#1B4A87] text-white font-jakarta font-medium rounded-lg hover:bg-[#1E40AF] transition-colors"
              >
                <FileText size={16} className="mr-2" />
                View Document
              </a>
            </div>
          )}

          <div className="space-y-3">
            <a href="/hod-assessment" className="block">
              <button className="w-full px-6 py-3 bg-[#1B4A87] text-white font-jakarta font-medium rounded-lg hover:bg-[#1E40AF] transition-colors">
                Submit Another Assessment
              </button>
            </a>
            <a href="/" className="block">
              <button className="w-full px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-[#E8EDF8] dark:border-[#3A3A3A] text-[#0F1121] dark:text-white font-jakarta font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                Return to Homepage
              </button>
            </a>
          </div>
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
            <a
              href="/"
              className="flex items-center space-x-2 text-[#1B4A87] dark:text-[#4A90E2] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-inter text-sm">Back to Home</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Building2
              size={32}
              className="text-[#1B4A87] dark:text-[#4A90E2]"
            />
            <div>
              <h1 className="font-jakarta font-bold text-xl text-[#1B4A87] dark:text-white">
                IAC - {userAuth.department}
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                HOD Assessment Portal
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-inter text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-jakarta font-bold text-3xl text-[#0F1121] dark:text-white mb-4">
              TRAINING EFFECTIVENESS FORM
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Employee Info */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E8EDF8] dark:border-[#3A3A3A] shadow-lg">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6 flex items-center">
                Employee Information <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter employee name"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange("employeeName", e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Employee No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter employee number"
                    value={formData.employeeNo}
                    onChange={(e) => handleInputChange("employeeNo", e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Training Imparted <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter training title"
                    value={formData.trainingImparted}
                    onChange={(e) => handleInputChange("trainingImparted", e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Training Observation */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E8EDF8] dark:border-[#3A3A3A] shadow-lg">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6 flex items-center">
                Training Observation <span className="text-red-500 ml-2">*</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Date/Duration of Training <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter date and duration"
                    value={formData.dateDuration}
                    onChange={(e) => handleInputChange("dateDuration", e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Course Conducted By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter trainer name"
                    value={formData.courseConductedBy}
                    onChange={(e) => handleInputChange("courseConductedBy", e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Table */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border">
              <h3 className="font-jakarta font-bold text-xl mb-6">Course Content</h3>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100 dark:bg-[#262626]">
                    <th className="p-3 border">Course Content</th>
                    <th className="p-3 border">Level Prior</th>
                    <th className="p-3 border">Level After</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.courseContents.map((item, i) => (
                    <tr key={i}>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={item.content}
                          onChange={(e) =>
                            handleCourseContentChange(i, "content", e.target.value)
                          }
                          className="w-full border p-2 rounded-lg"
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          value={item.levelPrior}
                          onChange={(e) =>
                            handleCourseContentChange(i, "levelPrior", parseInt(e.target.value))
                          }
                          className="w-full border p-2 rounded-lg"
                        >
                          <option value={0}>Select</option>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2">
                        <select
                          value={item.levelAfter}
                          onChange={(e) =>
                            handleCourseContentChange(i, "levelAfter", parseInt(e.target.value))
                          }
                          className="w-full border p-2 rounded-lg"
                        >
                          <option value={0}>Select</option>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Observations */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border space-y-4">
              <textarea
                placeholder="A) Skills acquired"
                value={formData.skillsAcquired}
                onChange={(e) => handleInputChange("skillsAcquired", e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                placeholder="B) Implementation success"
                value={formData.implementationSuccess}
                onChange={(e) => handleInputChange("implementationSuccess", e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                placeholder="C) Performance improvement"
                value={formData.performanceImprovement}
                onChange={(e) => handleInputChange("performanceImprovement", e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                placeholder="D) Retraining required?"
                value={formData.retrainingRequired}
                onChange={(e) => handleInputChange("retrainingRequired", e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Department Head */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E8EDF8] dark:border-[#3A3A3A] shadow-lg">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6 flex items-center">
                Department Head <span className="text-red-500 ml-2">*</span>
              </h3>
              <div>
                <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                  Department Head Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter department head name"
                  value={formData.departmentHead}
                  onChange={(e) => handleInputChange("departmentHead", e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              {submitError && (
                <p className="text-red-600 mb-3">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-[#1B4A87] text-white rounded-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
