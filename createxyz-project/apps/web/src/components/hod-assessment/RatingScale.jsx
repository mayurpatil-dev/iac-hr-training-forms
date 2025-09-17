export default function RatingScale({ value, onChange, label, description }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="font-inter font-medium text-sm text-[#0F1121] dark:text-white block">
          {label} <span className="text-red-500">*</span>
        </label>
        {description && (
          <p className="font-inter text-xs text-[#59647A] dark:text-[#A0A0A0] mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`w-10 h-10 rounded-lg border-2 font-jakarta font-semibold text-sm transition-all ${
              rating <= value
                ? "bg-[#EA580C] border-[#EA580C] text-white"
                : "bg-white dark:bg-[#262626] border-[#E8EDF8] dark:border-[#3A3A3A] text-[#59647A] dark:text-[#A0A0A0] hover:border-[#EA580C] dark:hover:border-[#FB923C]"
            }`}
          >
            {rating}
          </button>
        ))}
        <span className="ml-3 font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
          {value > 0 ? `${value}/5` : "Not rated"}
        </span>
      </div>
      <div className="flex justify-between text-xs text-[#59647A] dark:text-[#A0A0A0] font-inter">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
}
