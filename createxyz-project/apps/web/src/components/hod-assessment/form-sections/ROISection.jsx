export default function ROISection({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Productivity Increase (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.productivityIncrease}
          onChange={(e) =>
            handleInputChange("productivityIncrease", e.target.value)
          }
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter percentage increase"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Quality Improvement (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.qualityImprovement}
          onChange={(e) =>
            handleInputChange("qualityImprovement", e.target.value)
          }
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter quality improvement percentage"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Error Reduction (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.errorReduction}
          onChange={(e) => handleInputChange("errorReduction", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter error reduction percentage"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Cost Savings (USD)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.costSavings}
          onChange={(e) => handleInputChange("costSavings", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter estimated cost savings"
        />
      </div>
      <div className="md:col-span-2">
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Revenue Impact (USD)
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.revenueImpact}
          onChange={(e) => handleInputChange("revenueImpact", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter estimated revenue impact (positive or negative)"
        />
      </div>
    </div>
  );
}
