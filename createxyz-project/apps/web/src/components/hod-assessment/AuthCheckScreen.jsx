export default function AuthCheckScreen() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA580C] mx-auto mb-4"></div>
        <p className="font-jakarta text-lg text-[#59647A] dark:text-[#A0A0A0]">
          Checking authentication...
        </p>
      </div>
    </div>
  );
}
