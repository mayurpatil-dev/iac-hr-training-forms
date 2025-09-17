import RatingScale from "../RatingScale";

export default function OverallAssessmentSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="space-y-6">
      <RatingScale
        value={formData.overallRating}
        onChange={(value) => handleInputChange("overallRating", value)}
        label="Overall Training Effectiveness"
        description="Rate the overall effectiveness of this training program"
      />

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Would you recommend this training to other departments?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="wouldRecommend"
              value="yes"
              checked={formData.wouldRecommend === "yes"}
              onChange={(e) =>
                handleInputChange("wouldRecommend", e.target.value)
              }
              className="mr-2 text-[#EA580C] focus:ring-[#EA580C]"
              required
            />
            <span className="font-inter text-sm text-[#0F1121] dark:text-white">
              Yes
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="wouldRecommend"
              value="no"
              checked={formData.wouldRecommend === "no"}
              onChange={(e) =>
                handleInputChange("wouldRecommend", e.target.value)
              }
              className="mr-2 text-[#EA580C] focus:ring-[#EA580C]"
              required
            />
            <span className="font-inter text-sm text-[#0F1121] dark:text-white">
              No
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="wouldRecommend"
              value="conditional"
              checked={formData.wouldRecommend === "conditional"}
              onChange={(e) =>
                handleInputChange("wouldRecommend", e.target.value)
              }
              className="mr-2 text-[#EA580C] focus:ring-[#EA580C]"
              required
            />
            <span className="font-inter text-sm text-[#0F1121] dark:text-white">
              Conditional
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Critical success factors
        </label>
        <textarea
          value={formData.criticalSuccessFactors}
          onChange={(e) =>
            handleInputChange("criticalSuccessFactors", e.target.value)
          }
          rows={4}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="What were the key factors that made this training successful?"
        />
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Key lessons learned
        </label>
        <textarea
          value={formData.lessonsLearned}
          onChange={(e) => handleInputChange("lessonsLearned", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="What are the key takeaways from this training experience?"
        />
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Areas for improvement
        </label>
        <textarea
          value={formData.improvementAreas}
          onChange={(e) =>
            handleInputChange("improvementAreas", e.target.value)
          }
          rows={4}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="What areas need improvement for future training programs?"
        />
      </div>
    </div>
  );
}
