export default function TrainingDetailsSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Training Title/Program <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.trainingTitle}
          onChange={(e) => handleInputChange("trainingTitle", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter the training program title"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Training Provider <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.trainingProvider}
          onChange={(e) =>
            handleInputChange("trainingProvider", e.target.value)
          }
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter training provider/vendor"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Training Dates <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.trainingDates}
          onChange={(e) => handleInputChange("trainingDates", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="e.g., Jan 15-17, 2025"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Number of Participants <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.participantCount}
          onChange={(e) =>
            handleInputChange("participantCount", e.target.value)
          }
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter number of participants"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Training Cost (USD)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.trainingCost}
          onChange={(e) => handleInputChange("trainingCost", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter total training cost"
        />
      </div>
    </div>
  );
}
