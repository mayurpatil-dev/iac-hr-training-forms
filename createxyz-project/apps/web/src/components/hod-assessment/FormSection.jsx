export default function FormSection({ icon, title, children }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6">
      <div className="flex items-center space-x-3 mb-6">
        {icon}
        <h3 className="font-jakarta font-bold text-xl text-[#0F1121] dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
