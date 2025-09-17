const CONFIG = {
  EMPLOYEE_FEEDBACK_SHEET_ID: '1gyVBXss19X3VmiX8A0Ec0u5QZTzdOSGEgEv5-frr6_E',
  HOD_ASSESSMENT_SHEET_ID: '1xjvshNt6SYRALkY4nzbTvHQmDmduyfBzpjnjwxOvZAE',
  DRIVE_FOLDER_ID: '1Ohl_X-48N_FPApPQ3mO5Nr3o0vywHbEs'
};

function doPost(e) {
  try {
    const data = e.parameter;
    
    if (data.type === 'employeeFeedback') {
      // Save to sheet
      const sheet = SpreadsheetApp.openById(CONFIG.EMPLOYEE_FEEDBACK_SHEET_ID).getSheets()[0];
      sheet.appendRow([
        new Date(),
        data.employeeName,
        data.employeeCode, 
        data.department,
        data.trainingProgramme,
        data.faculty,
        data.venue
      ]);
      
      // Copy template and fill with data
      const templateId = '1hPs7Cpt0tvgSDuBm2MzAqdX7bdQ0xGcy'; // Employee feedback template
      const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
      
      // Make a copy of the template
      const templateFile = DriveApp.getFileById(templateId);
      const copiedFile = templateFile.makeCopy(`INF-SHR-30.6 Training Feedback - ${data.employeeName} - ${new Date().toLocaleDateString()}`, folder);
      
      // Open the copied document
      const doc = DocumentApp.openById(copiedFile.getId());
      const body = doc.getBody();
      
      // Replace placeholders with actual data
      const fromDate = data.trainingFromDate ? new Date(data.trainingFromDate).toLocaleDateString() : '';
      const toDate = data.trainingToDate ? new Date(data.trainingToDate).toLocaleDateString() : '';
      
      // Replace text placeholders with form data
      const replacements = {
        '{{EMPLOYEE_NAME}}': data.employeeName || '',
        '{{EMPLOYEE_CODE}}': data.employeeCode || '',
        '{{DEPARTMENT}}': data.department || '',
        '{{TRAINING_PROGRAMME}}': data.trainingProgramme || '',
        '{{FACULTY}}': data.faculty || '',
        '{{TRAINING_FROM_DATE}}': fromDate,
        '{{TRAINING_TO_DATE}}': toDate,
        '{{VENUE}}': data.venue || '',
        '{{COURSE_STRUCTURE}}': data.courseStructure || '',
        '{{QUALITY_OF_EXERCISE}}': data.qualityOfExercise || '',
        '{{DURATION_OF_TRAINING}}': data.durationOfTraining || '',
        '{{TRAINING_ENVIRONMENT}}': data.trainingEnvironment || '',
        '{{COURSE_CONTENT}}': data.courseContent || '',
        '{{HANDOUT_TRAINING_AIDS}}': data.handoutTrainingAids || '',
        '{{TRAINING_COORDINATION}}': data.trainingCoordination || '',
        '{{SUBJECT_KNOWLEDGE}}': data.subjectKnowledge || '',
        '{{LEARNING_ENVIRONMENT}}': data.learningEnvironment || '',
        '{{TRAINING_SKILLS}}': data.trainingSkills || '',
        '{{PRESENTATION_METHODOLOGY}}': data.presentationMethodology || '',
        '{{GUIDANCE_SUPPORT}}': data.guidanceSupport || '',
        '{{LIKED_BEST}}': data.likedBest || '',
        '{{COULD_BE_BETTER}}': data.couldBeBetter || '',
        '{{LEARNING_EXPERIENCE_COMPARISON}}': data.learningExperienceComparison || '',
        '{{JOB_RESPONSIBILITIES_HELP}}': data.jobResponsibilitiesHelp || '',
        '{{RECOMMEND_TO_COLLEAGUES}}': data.recommendToColleagues || '',
        '{{PARTICIPANT_SIGNATURE}}': data.participantSignature || '',
        '{{SUBMISSION_DATE}}': new Date().toLocaleDateString()
      };
      
      // Apply all replacements
      Object.keys(replacements).forEach(placeholder => {
        body.replaceText(placeholder, replacements[placeholder]);
      });
      
      // Log for debugging
      console.log('Data received:', JSON.stringify(data));
      console.log('Replacements made:', JSON.stringify(replacements));
      
      doc.saveAndClose();
    }
    
    if (data.type === 'hodAssessment') {
      // Save to sheet
      const sheet = SpreadsheetApp.openById(CONFIG.HOD_ASSESSMENT_SHEET_ID).getSheets()[0];
      sheet.appendRow([
        new Date(),
        data.employeeName,
        data.employeeNo,
        data.trainingImparted,
        data.departmentHead,
        JSON.stringify(data.courseContents)
      ]);
      
      // Create document
      const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
      const doc = DocumentApp.create(`Training Effectiveness - ${data.employeeName} - ${new Date().toLocaleDateString()}`);
      const body = doc.getBody();
      
      body.appendParagraph('TRAINING EFFECTIVENESS FORM').setHeading(DocumentApp.ParagraphHeading.HEADING1);
      body.appendParagraph('');
      
      body.appendParagraph('EMPLOYEE INFORMATION').setHeading(DocumentApp.ParagraphHeading.HEADING2);
      body.appendParagraph(`Employee Name: ${data.employeeName || ''}`);
      body.appendParagraph(`Employee No: ${data.employeeNo || ''}`);
      body.appendParagraph(`Training Imparted: ${data.trainingImparted || ''}`);
      body.appendParagraph('');
      
      body.appendParagraph('COURSE CONTENT EVALUATION').setHeading(DocumentApp.ParagraphHeading.HEADING2);
      if (data.courseContents) {
        JSON.parse(data.courseContents || '[]').forEach((course, index) => {
          if (course.content) {
            body.appendParagraph(`${index + 1}. ${course.content}`);
            body.appendParagraph(`   Level Prior: ${course.levelPrior}/5, Level After: ${course.levelAfter}/5`);
          }
        });
      }
      body.appendParagraph('');
      
      body.appendParagraph('TRAINING OBSERVATION').setHeading(DocumentApp.ParagraphHeading.HEADING2);
      body.appendParagraph(`Date/Duration: ${data.dateDuration || ''}`);
      body.appendParagraph(`Course Conducted By: ${data.courseConductedBy || ''}`);
      body.appendParagraph('');
      
      body.appendParagraph('ASSESSMENT QUESTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING2);
      body.appendParagraph(`Skills Acquired: ${data.skillsAcquired || 'No response'}`);
      body.appendParagraph(`Implementation Success: ${data.implementationSuccess || 'No response'}`);
      body.appendParagraph(`Performance Improvement: ${data.performanceImprovement || 'No response'}`);
      body.appendParagraph(`Retraining Required: ${data.retrainingRequired || 'No response'}`);
      body.appendParagraph('');
      
      body.appendParagraph(`Department Head: ${data.departmentHead || ''}`);
      body.appendParagraph(`Submitted: ${new Date().toLocaleDateString()}`);
      
      doc.saveAndClose();
      
      // Move to folder
      const file = DriveApp.getFileById(doc.getId());
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    }
    
    return HtmlService.createHtmlOutput('<script>console.log("Success");</script>');
    
  } catch (error) {
    return HtmlService.createHtmlOutput(`<script>console.error("${error.message}");</script>`);
  }
}