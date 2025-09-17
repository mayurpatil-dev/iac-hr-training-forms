"use client";

import { useState } from "react";
import { Building2, ArrowLeft, Send, FileText } from "lucide-react";
import { submitToGoogleScript } from "../../utils/api";

export default function EmployeeFeedbackPage() {
  const [formData, setFormData] = useState({
    // Employee Information
    employeeName: "",
    employeeCode: "",
    department: "",

    // Training Details
    trainingProgramme: "",
    faculty: "",
    trainingFromDate: "",
    trainingToDate: "",
    venue: "",

    // Course/Content Rating (1-4 scale)
    courseStructure: 0,
    qualityOfExercise: 0,
    durationOfTraining: 0,
    trainingEnvironment: 0,
    courseContent: 0,
    handoutTrainingAids: 0,
    trainingCoordination: 0,

    // Trainer Feedback (1-4 scale)
    subjectKnowledge: 0,
    learningEnvironment: 0,
    trainingSkills: 0,
    presentationMethodology: 0,
    guidanceSupport: 0,

    // Open-ended feedback
    likedBest: "",
    couldBeBetter: "",

    // Page 2 - Additional Feedback
    learningExperienceComparison: "",
    jobResponsibilitiesHelp: "",
    recommendToColleagues: "",
    participantSignature: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const RatingComponent = ({ value, onChange, label }) => {
    return (
      <div className="space-y-2">
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name={label.replace(/\s+/g, '')}
                value={rating}
                checked={value === rating}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="mr-1 text-[#1B4A87] focus:ring-[#1B4A87]"
              />
              <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                {rating}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare data for Google Apps Script
      const submissionData = {
        type: "employeeFeedback",   // ✅ match Apps Script expected key
        ...formData,
        submittedAt: new Date().toISOString(),
      };


      // Send to Google Apps Script directly
      const result = await submitToGoogleScript(submissionData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Check if document URL is available in the response
      if (result.data && result.data.docLink) {
        setDocumentUrl(result.data.docLink);
      }

      // Backup to localStorage
      const existingFeedback = JSON.parse(
        localStorage.getItem("iacTrainingFeedback") || "[]",
      );
      const newFeedback = {
        ...submissionData,
        id: Date.now(),
        googleResult: result.data,
        documentUrl: (result.data && result.data.docLink) || null,
      };
      existingFeedback.push(newFeedback);
      localStorage.setItem(
        "iacTrainingFeedback",
        JSON.stringify(existingFeedback),
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        `Failed to submit form: ${error.message}. Please try again.`,
      );

      // Fallback to localStorage only
      const existingFeedback = JSON.parse(
        localStorage.getItem("iacTrainingFeedback") || "[]",
      );
      const newFeedback = {
        formType: "iac-training-feedback",
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        fallbackMode: true,
      };
      existingFeedback.push(newFeedback);
      localStorage.setItem(
        "iacTrainingFeedback",
        JSON.stringify(existingFeedback),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-jakarta font-bold text-2xl text-[#0F1121] dark:text-white mb-4">
            Training Feedback Submitted Successfully!
          </h2>
          <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-8">
            Thank you for your valuable feedback. Your input helps us improve
            our training programs.
          </p>
          {documentUrl && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-jakarta font-semibold text-lg text-[#0F1121] dark:text-white mb-2">
                Your Feedback Document
              </h3>
              <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] mb-4">
                A document has been created with your feedback. Click below to view it.
              </p>
              <a 
                href={documentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#1B4A87] text-white font-jakarta font-medium rounded-lg hover:bg-[#1E40AF] transition-colors"
              >
                View Document
              </a>
            </div>
          )}
          <div className="space-y-3">
            <a href="/employee-feedback" className="block">
              <button className="w-full px-6 py-3 bg-[#1B4A87] text-white font-jakarta font-medium rounded-lg hover:bg-[#1E40AF] transition-colors">
                Submit Another Feedback
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
                IAC
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                Human Resources
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="font-jakarta font-bold text-3xl text-[#0F1121] dark:text-white mb-4">
              TRAINING FEEDBACK FORM
            </h2>
            <div className="bg-[#EBF4FF] dark:bg-[#1E3A8A] rounded-lg p-4 inline-block">
              <p className="font-inter text-sm text-[#1B4A87] dark:text-[#60A5FA]">
                <strong>Format No.:</strong> INF-SHR-30.6 | <strong>Rev. No. and Date:</strong> 1/10-Dec-2018
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Participant and Training Details Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Participant and Training Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Employee Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employeeName}
                    onChange={(e) =>
                      handleInputChange("employeeName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter employee name"
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Employee Code: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employeeCode}
                    onChange={(e) =>
                      handleInputChange("employeeCode", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter employee code"
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Department: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Name of the training programme attended: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.trainingProgramme}
                    onChange={(e) =>
                      handleInputChange("trainingProgramme", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter training programme name"
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Faculty: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.faculty}
                    onChange={(e) =>
                      handleInputChange("faculty", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter faculty name"
                  />
                </div>
                
                {/* Dates of Training */}
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-4">
                    Dates on which the training was conducted: <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                        From:
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.trainingFromDate}
                        onChange={(e) =>
                          handleInputChange("trainingFromDate", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                        To:
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.trainingToDate}
                        onChange={(e) =>
                          handleInputChange("trainingToDate", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Venue:
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) =>
                      handleInputChange("venue", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Enter training venue"
                  />
                </div>
              </div>
            </div>

            {/* Course/Content Rating Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-4">
                Course/Content Rating
              </h3>
              <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0] mb-6">
                How would you rate the following (on a scale of 1-4 - 1 being the lowest & 4 being the highest rating)?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RatingComponent
                  value={formData.courseStructure}
                  onChange={(value) =>
                    handleInputChange("courseStructure", value)
                  }
                  label="Course structure"
                />
                <RatingComponent
                  value={formData.courseContent}
                  onChange={(value) =>
                    handleInputChange("courseContent", value)
                  }
                  label="Course content"
                />
                <RatingComponent
                  value={formData.qualityOfExercise}
                  onChange={(value) =>
                    handleInputChange("qualityOfExercise", value)
                  }
                  label="Quality of exercise"
                />
                <RatingComponent
                  value={formData.handoutTrainingAids}
                  onChange={(value) =>
                    handleInputChange("handoutTrainingAids", value)
                  }
                  label="Handout & Training aids"
                />
                <RatingComponent
                  value={formData.durationOfTraining}
                  onChange={(value) =>
                    handleInputChange("durationOfTraining", value)
                  }
                  label="Duration of the Training programme"
                />
                <RatingComponent
                  value={formData.trainingCoordination}
                  onChange={(value) =>
                    handleInputChange("trainingCoordination", value)
                  }
                  label="Training co-ordination and organization"
                />
                <RatingComponent
                  value={formData.trainingEnvironment}
                    onChange={(value) =>
                    handleInputChange("trainingEnvironment", value)
                    }
                  label="Training environment"
                  />
                </div>
            </div>

            {/* Trainer Feedback Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Trainer Feedback:
              </h3>
              <div className="space-y-6">
                <RatingComponent
                  value={formData.subjectKnowledge}
                  onChange={(value) =>
                    handleInputChange("subjectKnowledge", value)
                  }
                  label="Subject Knowledge / Conceptual Clarity"
                />
                <RatingComponent
                  value={formData.learningEnvironment}
                  onChange={(value) =>
                    handleInputChange("learningEnvironment", value)
                  }
                  label="Trainer created and maintained an environment for learning"
                />
                <RatingComponent
                  value={formData.trainingSkills}
                  onChange={(value) =>
                    handleInputChange("trainingSkills", value)
                  }
                  label="Rate the trainers training skills and competence"
                />
                <RatingComponent
                  value={formData.presentationMethodology}
                  onChange={(value) =>
                    handleInputChange("presentationMethodology", value)
                  }
                  label="Presentation methodology"
                />
                <RatingComponent
                  value={formData.guidanceSupport}
                  onChange={(value) =>
                    handleInputChange("guidanceSupport", value)
                  }
                  label="Guidance and support"
                />
              </div>
            </div>

            {/* Open-Ended Feedback Sections */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Additional Feedback
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    What did you like best about the course/content?
                  </label>
                  <textarea
                    value={formData.likedBest}
                    onChange={(e) =>
                      handleInputChange("likedBest", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Describe what you liked best about the course/content..."
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    What could have been done better?
                  </label>
                  <textarea
                    value={formData.couldBeBetter}
                    onChange={(e) =>
                      handleInputChange("couldBeBetter", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                    placeholder="Describe what could have been done better..."
                  />
                </div>
              </div>
            </div>

            {/* Page 2 - Learning Experience Comparison Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Learning Experience Evaluation
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-4">
                    Based on the training course description, how did your learning experience compare to what you expected when you began the training
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="learningExperienceComparison"
                          value="learned-much-more"
                          checked={formData.learningExperienceComparison === "learned-much-more"}
                          onChange={(e) =>
                            handleInputChange("learningExperienceComparison", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Learned much more than I expected
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="learningExperienceComparison"
                          value="learned-somewhat-more"
                          checked={formData.learningExperienceComparison === "learned-somewhat-more"}
                          onChange={(e) =>
                            handleInputChange("learningExperienceComparison", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Learned somewhat more than I expected
                        </span>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="learningExperienceComparison"
                          value="learned-somewhat-less"
                          checked={formData.learningExperienceComparison === "learned-somewhat-less"}
                          onChange={(e) =>
                            handleInputChange("learningExperienceComparison", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Learned somewhat less than I expected
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="learningExperienceComparison"
                          value="learned-much-less"
                          checked={formData.learningExperienceComparison === "learned-much-less"}
                          onChange={(e) =>
                            handleInputChange("learningExperienceComparison", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Learned much less than I expected
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Responsibilities Helpfulness Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Job Impact Assessment
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-4">
                    Do you think this Seminar/ training would help you in your current job responsibilities?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="jobResponsibilitiesHelp"
                          value="definitely-large-extent"
                          checked={formData.jobResponsibilitiesHelp === "definitely-large-extent"}
                          onChange={(e) =>
                            handleInputChange("jobResponsibilitiesHelp", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Definitely to a large extent
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="jobResponsibilitiesHelp"
                          value="probably-some-extent"
                          checked={formData.jobResponsibilitiesHelp === "probably-some-extent"}
                          onChange={(e) =>
                            handleInputChange("jobResponsibilitiesHelp", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Probably to some extent
                        </span>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="jobResponsibilitiesHelp"
                          value="not-sure"
                          checked={formData.jobResponsibilitiesHelp === "not-sure"}
                          onChange={(e) =>
                            handleInputChange("jobResponsibilitiesHelp", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Not Sure
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="jobResponsibilitiesHelp"
                          value="definitely-not"
                          checked={formData.jobResponsibilitiesHelp === "definitely-not"}
                          onChange={(e) =>
                            handleInputChange("jobResponsibilitiesHelp", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Definitely not
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Recommendation
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-4">
                    Would you recommend this training to your colleagues?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recommendToColleagues"
                          value="definitely"
                          checked={formData.recommendToColleagues === "definitely"}
                          onChange={(e) =>
                            handleInputChange("recommendToColleagues", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Definitely
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recommendToColleagues"
                          value="probably"
                          checked={formData.recommendToColleagues === "probably"}
                          onChange={(e) =>
                            handleInputChange("recommendToColleagues", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Probably
                        </span>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recommendToColleagues"
                          value="not-certain"
                          checked={formData.recommendToColleagues === "not-certain"}
                          onChange={(e) =>
                            handleInputChange("recommendToColleagues", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Not certain
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recommendToColleagues"
                          value="definitely-not"
                          checked={formData.recommendToColleagues === "definitely-not"}
                          onChange={(e) =>
                            handleInputChange("recommendToColleagues", e.target.value)
                          }
                          className="mr-3 text-[#1B4A87] focus:ring-[#1B4A87]"
                        />
                        <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                          Definitely not
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
              <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
                Participant Signature
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
                    Participant's Signature:
                  </label>
                  <div className="border-b-2 border-[#0F1121] dark:border-white pb-2 min-h-[60px] flex items-end">
                    <span className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                      {formData.participantSignature || "Click here to add your signature"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.participantSignature}
                    onChange={(e) =>
                      handleInputChange("participantSignature", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent mt-2"
                    placeholder="Type your full name as signature"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-inter text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-gradient-to-r from-[#1B4A87] to-[#2563EB] dark:from-[#1E3A8A] dark:to-[#1D4ED8] text-white font-jakarta font-semibold text-lg rounded-lg hover:from-[#1E40AF] hover:to-[#1D4ED8] dark:hover:from-[#1E40AF] dark:hover:to-[#1E40AF] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Training Feedback"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Font imports */}
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
