# IAC Group Training Feedback System

This system allows employees to submit training feedback and department heads to submit training assessments. The system uses Google Apps Script to process form submissions, store data in Google Sheets, and generate Google Docs with the submitted information.

## System Components

1. **HTML Forms** - Direct submission forms for employees and department heads
2. **Google Apps Script** - Backend processing for form submissions
3. **Google Sheets** - Data storage for form submissions
4. **Google Drive** - Storage for generated documents

## Setup Instructions

### 1. Google Apps Script Setup

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the contents of `apps/google-apps-script-code.js` into the script editor
4. Update the configuration variables at the top of the script:
   ```javascript
   const CONFIG = {
     EMPLOYEE_FEEDBACK_SHEET_ID: 'YOUR_EMPLOYEE_FEEDBACK_SHEET_ID',
     HOD_ASSESSMENT_SHEET_ID: 'YOUR_HOD_ASSESSMENT_SHEET_ID',
     DRIVE_FOLDER_ID: 'YOUR_DRIVE_FOLDER_ID'
   };
   ```
5. Create two Google Sheets (one for employee feedback and one for HOD assessments)
6. Create a Google Drive folder to store the generated documents
7. Copy the IDs of the sheets and folder (from their URLs) and update the configuration
8. Deploy the script as a web app:
   - Click on "Deploy" > "New deployment"
   - Select "Web app" as the deployment type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
9. Copy the web app URL provided after deployment

### 2. Update HTML Forms

1. Open the HTML form files:
   - `apps/web/src/app/employee-feedback/form.html`
   - `apps/web/src/app/hod-assessment/form.html`
2. Update the form action URL with your Google Apps Script web app URL:
   ```html
   <form action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" method="POST">
   ```

### 3. Deploy the HTML Forms

You can deploy the HTML forms using any web hosting service. Some options include:

- **GitHub Pages** - Free and easy to set up
- **Netlify** - Free tier available with continuous deployment
- **Vercel** - Free tier available with continuous deployment
- **Google Cloud Storage** - Static website hosting

## Usage

1. Access the main page (`index.html`) to select which form to use
2. Fill out the appropriate form (Employee Feedback or HOD Assessment)
3. Submit the form
4. The system will:
   - Store the submission data in Google Sheets
   - Generate a Google Doc with the submission details
   - Move the document to the specified Google Drive folder
   - Make the document accessible via a shareable link
   - Display a success page with a link to the generated document

## Form Fields

### Employee Feedback Form

- **Employee Information**
  - Employee Name (required)
  - Employee ID
  - Department
- **Training Information**
  - Training Programme (required)
  - Training Date (required)
  - Trainer Name (required)
- **Training Evaluation**
  - Ratings (1-5) for:
    - Relevance to Job
    - Content Quality
    - Presentation Quality
    - Interactivity
    - Venue & Facilities
    - Overall Rating
- **Additional Feedback**
  - Training Strengths
  - Areas for Improvement
  - Additional Comments

### HOD Assessment Form

- **Head of Department Information**
  - HOD Name (required)
  - Department (required)
- **Employee & Training Information**
  - Employee Name (required)
  - Employee ID
  - Training Title (required)
  - Training Date (required)
  - Assessment Date (required)
- **Assessment**
  - Knowledge Application
  - Performance Improvement
  - Additional Training Needed
  - Additional Comments

## Troubleshooting

- **Form submission fails**: Check that the Google Apps Script URL is correct and the script is deployed as a web app
- **Document not generated**: Verify that the Google Drive folder ID is correct and that the script has permission to create documents
- **Data not stored in sheets**: Verify that the Google Sheet IDs are correct and that the script has permission to write to the sheets

## Security Considerations

- The Google Apps Script is deployed with "Anyone" access, which means anyone with the URL can submit forms
- Consider adding form validation or authentication if needed for your use case
- The generated documents are shared with "Anyone with the link" permission for viewing only