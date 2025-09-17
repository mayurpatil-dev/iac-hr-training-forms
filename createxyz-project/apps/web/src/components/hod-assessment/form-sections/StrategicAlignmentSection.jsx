export default function StrategicAlignmentSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Does this training align with organizational goals?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            "Strongly Agree",
            "Agree",
            "Neutral",
            "Disagree",
            "Strongly Disagree",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="alignsWithGoals"
                value={option}
                checked={formData.alignsWithGoals === option}
                onChange={(e) =>
                  handleInputChange("alignsWithGoals", e.target.value)
                }
                className="mr-2 text-[#EA580C] focus:ring-[#EA580C]"
                required
              />
              <span className="font-inter text-sm text-[#0F1121] dark:text-white">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          How well does it support business strategy?
        </label>
        <textarea
          value={formData.supportsStrategy}
          onChange={(e) =>
            handleInputChange("supportsStrategy", e.target.value)
          }
          rows={3}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Describe how this training supports business strategy..."
        />
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Does it address identified skill gaps?
        </label>
        <textarea
          value={formData.meetsSkillGaps}
          onChange={(e) => handleInputChange("meetsSkillGaps", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Describe how it addresses skill gaps..."
        />
      </div>
    </div>
  );
}
