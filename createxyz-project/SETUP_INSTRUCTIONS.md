# IAC Group Training Feedback System - Complete Setup Instructions

## 🎯 System Overview
This system consists of:
1. **React Web Forms** - Employee Feedback and HOD Assessment forms
2. **Google Apps Script Backend** - Handles form submissions and generates documents
3. **Google Sheets** - Stores form data
4. **Google Drive** - Stores generated documents

## 📋 Prerequisites
- Google account with access to Google Apps Script, Google Sheets, and Google Drive
- Node.js and npm installed for React development

## 🚀 Setup Steps

### Step 1: Google Apps Script Setup

1. **Create Google Apps Script Project**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Replace the default code with the content from `apps/google-apps-script-code.js`

2. **Update Configuration**
   - Replace the placeholder IDs in the CONFIG object with your actual IDs:
   ```javascript
   const CONFIG = {
     EMPLOYEE_FEEDBACK_SHEET_ID: 'YOUR_EMPLOYEE_FEEDBACK_SHEET_ID',
     HOD_ASSESSMENT_SHEET_ID: 'YOUR_HOD_ASSESSMENT_SHEET_ID', 
     DRIVE_FOLDER_ID: 'YOUR_DRIVE_FOLDER_ID'
   };
   ```

3. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the web app URL

### Step 2: Google Sheets Setup

1. **Create Employee Feedback Sheet**
   - Create a new Google Sheet
   - Copy the Sheet ID from the URL
   - Update `EMPLOYEE_FEEDBACK_SHEET_ID` in the Google Apps Script

2. **Create HOD Assessment Sheet**
   - Create another Google Sheet
   - Copy the Sheet ID from the URL
   - Update `HOD_ASSESSMENT_SHEET_ID` in the Google Apps Script

### Step 3: Google Drive Folder Setup

1. **Create Documents Folder**
   - Create a new folder in Google Drive for storing generated documents
   - Copy the folder ID from the URL
   - Update `DRIVE_FOLDER_ID` in the Google Apps Script

### Step 4: React Application Setup

1. **Install Dependencies**
   ```bash
   cd apps/web
   npm install
   ```

2. **Create Environment File**
   Create `.env.local` in the `apps/web` directory:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=YOUR_GOOGLE_SCRIPT_WEB_APP_URL
   ```

3. **Update Form URLs**
   The forms are already configured to use the environment variable. If you prefer to hardcode:
   - Update `apps/web/src/app/employee-feedback/page.jsx`
   - Update `apps/web/src/app/hod-assessment/page.jsx`
   - Update `apps/web/src/hooks/useHODAssessmentForm.js`

4. **Run the Application**
   ```bash
   npm run dev
   ```

## 🔧 Configuration Details

### Google Apps Script Web App URL
Your current web app URL: `https://script.google.com/macros/s/AKfycbx8SKL4FpsGrLrGDNDGbtOM0oiPHxEMvY6P3GmKuWPppYldLNzUEJfa9sXlsR7cOR7Z7g/exec`

### Form Types
- **Employee Feedback**: `formType: "employee-feedback"`
- **HOD Assessment**: `formType: "hod-assessment"`

### Document Generation
- **Employee Feedback**: Creates documents with format INF-SHR-30.6
- **HOD Assessment**: Creates documents with format INF-SHR-30.7

## 📊 Data Flow

1. **User fills form** → React application
2. **Form submission** → Google Apps Script via POST request
3. **Data processing** → Google Apps Script processes the data
4. **Spreadsheet logging** → Data saved to Google Sheets
5. **Document generation** → Google Doc created and saved to Drive folder
6. **Response** → Success/error response sent back to React app

## 🧪 Testing

### Test Google Apps Script
1. Open your Google Apps Script project
2. Run the `testSetup()` function
3. Check the execution logs for any errors

### Test Form Submissions
1. Fill out the Employee Feedback form
2. Submit and check:
   - Google Sheet for new row
   - Google Drive folder for new document
   - Browser console for response

## 🔍 Troubleshooting

### Common Issues

1. **"Script function not found: doGet"**
   - Ensure the `doGet` function is present in your Google Apps Script
   - Redeploy the web app

2. **CORS Errors**
   - The script includes CORS headers
   - Ensure the web app URL is correct

3. **Permission Errors**
   - Check that the Google Apps Script has access to Sheets and Drive
   - Verify the Sheet IDs and Folder ID are correct

4. **Form Data Not Saving**
   - Check the browser console for errors
   - Verify the form field names match the Google Apps Script expectations

### Debug Steps
1. Check Google Apps Script execution logs
2. Check browser console for JavaScript errors
3. Verify all IDs are correct
4. Test with the `testSetup()` function

## 📝 Form Field Mapping

### Employee Feedback Form Fields
- `employeeName`, `employeeCode`, `department`
- `trainingProgramme`, `faculty`, `venue`
- `trainingFromDate`, `trainingFromMonth`, `trainingFromYear`
- `trainingToDate`, `trainingToMonth`, `trainingToYear`
- `courseStructure`, `courseContent`, `qualityOfExercise`
- `handoutTrainingAids`, `durationOfTraining`, `trainingCoordination`
- `trainingEnvironment`, `subjectKnowledge`, `learningEnvironment`
- `trainingSkills`, `presentationMethodology`, `guidanceSupport`
- `likedBest`, `couldBeBetter`, `learningExperienceComparison`
- `jobResponsibilitiesHelp`, `recommendToColleagues`, `participantSignature`

### HOD Assessment Form Fields
- `hodName`, `department`, `employeeId`, `assessmentDate`
- `trainingTitle`, `trainingProvider`, `trainingDates`
- `participantCount`, `trainingCost`
- `knowledgeRetention`, `skillImprovement`, `behaviorChange`
- `jobPerformance`, `teamCollaboration`
- `productivityIncrease`, `qualityImprovement`, `errorReduction`
- `costSavings`, `revenueImpact`
- `alignsWithGoals`, `supportsStrategy`, `meetsSkillGaps`
- `enhancesCapabilities`, `followUpRequired`, `additionalTraining`
- `recommendations`, `budgetRequest`
- `overallRating`, `wouldRecommend`
- `criticalSuccessFactors`, `lessonsLearned`, `improvementAreas`
- `submittedBy`

## ✅ Verification Checklist

- [ ] Google Apps Script deployed successfully
- [ ] Web app URL accessible
- [ ] Google Sheets created and IDs configured
- [ ] Google Drive folder created and ID configured
- [ ] React application running
- [ ] Environment variables set
- [ ] Employee Feedback form submission working
- [ ] HOD Assessment form submission working
- [ ] Documents generating in Google Drive
- [ ] Data logging to Google Sheets

## 🎉 Success!
Once all steps are completed, your system will:
- Accept form submissions from both forms
- Generate professional documents in Google Drive
- Log all data to Google Sheets
- Provide real-time feedback to users

The system is now ready for production use!
