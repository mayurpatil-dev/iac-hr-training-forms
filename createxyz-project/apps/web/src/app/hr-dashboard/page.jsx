'use client';

import { useState, useEffect } from "react";
import { ArrowLeft, Building2, User, Search } from "lucide-react";

export default function HRDashboardPage() {
  const [userAuth, setUserAuth] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFormType, setActiveFormType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  const HR_TEAM = [
    { name: "Shrikant Patil", role: "HR Manager", photo: "/Hr-manager.jpeg" },
    { name: "Ravi Kumar", role: "Training Coordinator", photo: "https://i.pravatar.cc/150?img=12" },
    { name: "Lalit Chavan", role: "HR Officer", photo: "/hr-officer.jpeg" },
  ];

  const EMPLOYEE_WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycby4cmaTKtKqn4xrel8PurBYtnH34sOwLBJg2ZGKsNJg6SvdOlLi77_rM92dq6E0u6NINw/exec";
  const HOD_WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyv5ajNSK2baVIT6mRnb_cQ3PJOv1hmgXNimZG9iWNqmWn8zi4SiBOxmTZQ64AnX6NW/exec"; // replace with actual HOD endpoint

  const normalizeKeys = (row) => {
    const normalized = {};
    Object.keys(row).forEach((key) => {
      const cleanKey = key.trim().toUpperCase();
      normalized[cleanKey] = row[key];
    });
    return normalized;
  };

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      if (parsedAuth.role === "hr" && parsedAuth.isAuthenticated) {
        setUserAuth(parsedAuth);
      } else {
        window.location.href = "/hod-login";
      }
    } else {
      window.location.href = "/hod-login";
    }
  }, []);

  const fetchData = async (type) => {
    setLoading(true);
    setActiveFormType(type);
    const url = type === "employee" ? EMPLOYEE_WEB_APP_URL : HOD_WEB_APP_URL;

    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setFeedbacks(json.data.map(normalizeKeys));
      } else {
        console.error("Error fetching sheet:", json.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    window.location.href = "/";
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    const query = searchQuery.toLowerCase();
    
    switch (searchType) {
      case "name":
        const name = (f["EMPLOYEE NAME"] || f["Employee name"] || "").toLowerCase();
        const id = String(f["EMPLOYEE ID"] || f["Employee ID"] || "").toLowerCase();
        return name.includes(query) || id.includes(query);
      
      case "training":
        const training = (f["TRANING"] || f["TRAINING IMPARTED"] || "").toLowerCase();
        return training.includes(query);
      
      case "faculty":
        const faculty = (f["FACULTY"] || f["COURSE CONDUCTED BY"] || "").toLowerCase();
        return faculty.includes(query);
      
      case "date":
        const date = (f["TIME & DATE"] || f["DATE"] || "").toLowerCase();
        return date.includes(query);
      
      default:
        return true;
    }
  });

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4A87] mx-auto mb-4"></div>
          <p className="text-[#59647A] dark:text-[#A0A0A0]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <header className="w-full bg-white dark:bg-[#121212] border-b border-[#E4E6F0] dark:border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="flex items-center space-x-2 text-[#1B4A87] dark:text-[#4A90E2] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-inter text-sm">Back to Home</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Building2 size={32} className="text-[#1B4A87] dark:text-[#4A90E2]" />
            <div>
              <h1 className="font-jakarta font-bold text-xl text-[#1B4A87] dark:text-white">
                IAC HR Dashboard
              </h1>
              <p className="font-inter text-xs text-[#5B5F70] dark:text-[#A0A0A0]">
                Welcome, {userAuth.department}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-inter text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ✅ Hero Section with HR details */}
          <div className="text-center mb-12">
            <h2 className="font-jakarta font-bold text-3xl text-[#0F1121] dark:text-white mb-4">
              Welcome to IAC Human Resources Dashboard
            </h2>
            <p className="font-inter text-[#59647A] dark:text-[#A0A0A0] max-w-2xl mx-auto mb-8">
              “Empowering people through continuous learning and growth.”  
              <br /> Our HR team is here to support employees and strengthen our workplace.
            </p>

            <div className="flex flex-wrap justify-center gap-8">
              {HR_TEAM.map((member, idx) => (
                <div
                  key={idx}
                  className="text-center bg-white dark:bg-[#1E1E1E] shadow rounded-xl p-4 w-48"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 mx-auto rounded-full mb-3"
                  />
                  <h4 className="font-jakarta font-semibold text-lg text-[#0F1121] dark:text-white">
                    {member.name}
                  </h4>
                  <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-6 justify-center">
            <button
              onClick={() => fetchData("employee")}
              className="px-6 py-3 bg-[#1B4A87] text-white rounded-lg font-medium hover:bg-[#1E40AF] transition-colors"
            >
              View Employee Forms
            </button>
            <button
              onClick={() => fetchData("hod")}
              className="px-6 py-3 bg-[#EA580C] text-white rounded-lg font-medium hover:bg-[#DC2626] transition-colors"
            >
              View HOD Forms
            </button>
          </div>

          {/* Search */}
          {feedbacks.length > 0 && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-4 mb-4">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-4 py-3 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                >
                  <option value="name">Name/ID</option>
                  <option value="training">Training</option>
                  <option value="faculty">Faculty</option>
                  <option value="date">Date</option>
                </select>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={`Search by ${searchType === 'name' ? 'Name or ID' : searchType}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-[#E8EDF8] dark:border-[#3A3A3A] rounded-lg bg-white dark:bg-[#262626] text-[#0F1121] dark:text-white focus:ring-2 focus:ring-[#1B4A87] dark:focus:ring-[#4A90E2] focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>
            </div>
          )}

          {/* Cards */}
{loading && (
  <p className="text-center text-[#59647A] dark:text-[#A0A0A0]">
    Loading {activeFormType} submissions...
  </p>
)}

{!loading && filteredFeedbacks.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredFeedbacks.map((f, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E8EDF8] dark:border-[#3A3A3A] p-6 shadow hover:shadow-lg transition cursor-pointer"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <User size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-jakarta font-bold text-lg text-[#0F1121] dark:text-white">
              {f["EMPLOYEE NAME"] || f["Employee name"]}
            </h3>
            <p className="font-inter text-sm text-[#59647A] dark:text-[#A0A0A0]">
              ID: {f["EMPLOYEE ID"] || f["Employee ID"]}
            </p>
          </div>
        </div>

        {activeFormType === "employee" ? (
  <>
    <p className="font-inter text-sm">
      <strong>Training:</strong> {f["TRANING"]}
    </p>
    <p className="font-inter text-sm">
      <strong>Faculty:</strong> {f["FACULTY"]}
    </p>
    <p className="font-inter text-sm">
      <strong>Venue:</strong> {f["VENUE"]}
    </p>
  </>
) : (
  <>
    <p className="font-inter text-sm">
      <strong>Training:</strong> {f["TRAINING IMPARTED"]}
    </p>
    <p className="font-inter text-sm">
      <strong>Date Duration:</strong> {f["DATE DURATION"]}
    </p>
    <p className="font-inter text-sm">
      <strong>Conducted By:</strong> {f["COURSE CONDUCTED BY"]}
    </p>
    <p className="font-inter text-sm">
      <strong>HOD:</strong> {f["DEPARTMENT HEAD"]}
    </p>
  </>
)}
<p className="font-inter text-xs text-[#59647A] mt-2">
  {new Date(f["TIME & DATE"] || f["DATE"]).toLocaleDateString()}
</p>

        {/* <p className="font-inter text-xs text-[#59647A] mt-2">
          {new Date(f["TIME & DATE"] || f["Date"]).toLocaleDateString()}
        </p> */}
      </div>
    ))}
  </div>
)}
        </div>
      </main>
    </div>
  );
}
