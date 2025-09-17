import { Shield, DollarSign, TrendingUp, Users, Target } from "lucide-react";
import FormSection from "./FormSection";
import AssessmentInfoSection from "./form-sections/AssessmentInfoSection";
import TrainingDetailsSection from "./form-sections/TrainingDetailsSection";
import EffectivenessMetricsSection from "./form-sections/EffectivenessMetricsSection";
import ROISection from "./form-sections/ROISection";
import StrategicAlignmentSection from "./form-sections/StrategicAlignmentSection";
import FuturePlanningSection from "./form-sections/FuturePlanningSection";
import OverallAssessmentSection from "./form-sections/OverallAssessmentSection";

export default function HODAssessmentForm({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-jakarta font-bold text-3xl text-[#0F1121] dark:text-white mb-4">
            Training Effectiveness Assessment
          </h2>
          <div className="bg-[#FEF3E3] dark:bg-[#7C2D12] rounded-lg p-4 inline-block">
            <p className="font-inter text-sm text-[#9A3412] dark:text-[#FED7AA]">
              <strong>Form Reference:</strong> INF-SHR-30.7 •{" "}
              <strong>Access:</strong> Head of Department Only
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormSection
            icon={
              <Shield
                className="text-[#EA580C] dark:text-[#FB923C]"
                size={24}
              />
            }
            title="Assessment Information"
          >
            <AssessmentInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </FormSection>

          <FormSection
            icon={
              <Target
                className="text-[#EA580C] dark:text-[#FB923C]"
                size={24}
              />
            }
            title="Training Program Details"
          >
            <TrainingDetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </FormSection>

          <FormSection
            icon={
              <TrendingUp
                className="text-[#EA580C] dark:text-[#FB923C]"
                size={24}
              />
            }
            title="Training Effectiveness Metrics"
          >
            <EffectivenessMetricsSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </FormSection>

          <FormSection
            icon={
              <DollarSign
                className="text-[#EA580C] dark:text-[#FB923C]"
                size={24}
              />
            }
            title="Return on Investment (ROI) Assessment"
          >
            <ROISection formData={formData} handleInputChange={handleInputChange} />
          </FormSection>

          <FormSection
            icon={
              <Users
                className="text-[#EA580C] dark:text-[#FB923C]"
                size={24}
              />
            }
            title="Strategic Alignment Assessment"
          >
            <StrategicAlignmentSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </FormSection>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
            <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
              Future Planning & Recommendations
            </h3>
            <FuturePlanningSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
            <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white mb-6">
              Overall Assessment
            </h3>
            <OverallAssessmentSection
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-[#EA580C] to-[#DC2626] dark:from-[#7C2D12] dark:to-[#991B1B] text-white font-jakarta font-semibold text-lg rounded-lg hover:from-[#DC2626] hover:to-[#B91C1C] dark:hover:from-[#991B1B] dark:hover:to-[#7F1D1D] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting Assessment..." : "Submit Assessment"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
