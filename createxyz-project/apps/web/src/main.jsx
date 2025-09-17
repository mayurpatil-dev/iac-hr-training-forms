import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'

// Import pages
import HomePage from './app/page.jsx'
import EmployeeFeedbackPage from './app/employee-feedback/page.jsx'
import HODLoginPage from './app/hod-login/page.jsx'
import HODAssessmentPage from './app/hod-assessment/page.jsx'
import HRDashboardPage from './app/hr-dashboard/page.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee-feedback" element={<EmployeeFeedbackPage />} />
        <Route path="/hod-login" element={<HODLoginPage />} />
        <Route path="/hod-assessment" element={<HODAssessmentPage />} />
        <Route path="/hr-dashboard" element={<HRDashboardPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)