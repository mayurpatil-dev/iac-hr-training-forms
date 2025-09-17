export default function AssessmentInfoSection({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          HOD Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.hodName}
          onChange={(e) => handleInputChange("hodName", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Department <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={formData.department}
          onChange={(e) => handleInputChange("department", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
        >
          <option value="">Select Department</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
          <option value="Finance">Finance</option>
          <option value="IT">Information Technology</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Quality">Quality Assurance</option>
        </select>
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Employee ID <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.employeeId}
          onChange={(e) => handleInputChange("employeeId", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
          placeholder="Enter your employee ID"
        />
      </div>
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block mb-2">
          Assessment Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={formData.assessmentDate}
          onChange={(e) => handleInputChange("assessmentDate", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#EA580C] dark:focus:ring-[#FB923C] focus:border-transparent"
        />
      </div>
    </div>
  );
}
