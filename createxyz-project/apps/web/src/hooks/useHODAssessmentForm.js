import { useState, useEffect } from "react";
import { submitToGoogleScript } from "../utils/api";

const initialFormData = {
  hodName: "",
  department: "",
  employeeId: "",
  assessmentDate: "",
  trainingTitle: "",
  trainingProvider: "",
  trainingDates: "",
  participantCount: "",
  trainingCost: "",
  knowledgeRetention: 0,
  skillImprovement: 0,
  behaviorChange: 0,
  jobPerformance: 0,
  teamCollaboration: 0,
  productivityIncrease: "",
  qualityImprovement: "",
  errorReduction: "",
  costSavings: "",
  revenueImpact: "",
  alignsWithGoals: "",
  supportsStrategy: "",
  meetsSkillGaps: "",
  enhancesCapabilities: "",
  followUpRequired: "",
  additionalTraining: "",
  recommendations: "",
  budgetRequest: "",
  overallRating: 0,
  wouldRecommend: "",
  criticalSuccessFactors: "",
  lessonsLearned: "",
  improvementAreas: "",
};

export function useHODAssessmentForm(userInfo) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        assessmentDate: new Date().toISOString().split("T")[0],
        hodName:
          userInfo.username
            .replace("hod.", "")
            .replace(/\./g, " ")
            .toUpperCase() + " HOD",
      }));
    }
  }, [userInfo]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = {
        formType: "hod-assessment",
        ...formData,
        submittedBy: userInfo.username,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitToGoogleScript(submissionData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      if (!result.data.success) {
        throw new Error(result.data.message || "Failed to submit form");
      }

      const existingAssessments = JSON.parse(
        localStorage.getItem("hodAssessments") || "[]",
      );
      const newAssessment = {
        ...submissionData,
        id: Date.now(),
        googleResult: result.data.data,
      };
      existingAssessments.push(newAssessment);
      localStorage.setItem(
        "hodAssessments",
        JSON.stringify(existingAssessments),
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        `Failed to submit assessment: ${error.message}. Please try again.`,
      );

      const existingAssessments = JSON.parse(
        localStorage.getItem("hodAssessments") || "[]",
      );
      const newAssessment = {
        formType: "hod-assessment",
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        submittedBy: userInfo.username,
        fallbackMode: true,
      };
      existingAssessments.push(newAssessment);
      localStorage.setItem(
        "hodAssessments",
        JSON.stringify(existingAssessments),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    submitted,
    submitError,
  };
}
