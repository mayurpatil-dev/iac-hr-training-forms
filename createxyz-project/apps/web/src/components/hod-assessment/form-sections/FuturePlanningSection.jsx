export default function FuturePlanningSection({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Is follow-up training required?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="followUpRequired"
              value="yes"
              checked={formData.followUpRequired === "yes"}
              onChange={(e) =>
                handleInputChange("followUpRequired", e.target.value)
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
              name="followUpRequired"
              value="no"
              checked={formData.followUpRequired === "no"}
              onChange={(e) =>
                handleInputChange("followUpRequired", e.target.value)
              }
              className="mr-2 text-[#EA580C] focus:ring-[#EA580C]"
              required
            />
            <span className="font-inter text-sm text-[#0F1121] dark:text-white">
              No
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Additional training recommendations
        </label>
        <textarea
          value={formData.additionalTraining}
          onChange={(e) =>
            handleInputChange("additionalTraining", e.target.value)
          }
          rows={4}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Recommend additional training needs..."
        />
      </div>

      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Future budget considerations
        </label>
        <textarea
          value={formData.budgetRequest}
          onChange={(e) => handleInputChange("budgetRequest", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Budget requirements for future training..."
        />
      </div>
    </div>
  );
}
