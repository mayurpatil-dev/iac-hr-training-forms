"use client";

import { useState } from "react";
import { submitToGoogleScript } from "../utils/api";
import { testDirectGoogleScriptConnection, submitDirectToGoogleScript } from "../utils/directFetch";

export default function ConnectionTest() {
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      // Try direct fetch first to bypass any interceptors
      const result = await testDirectGoogleScriptConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestSubmission = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const testData = {
        formType: 'employee-feedback',
        employeeName: 'Test Employee',
        employeeCode: 'TEST001',
        department: 'IT',
        trainingProgramme: 'Test Training',
        faculty: 'Test Faculty',
        trainingFromDate: '15',
        trainingFromMonth: '01',
        trainingFromYear: '2025',
        trainingToDate: '17',
        trainingToMonth: '01',
        trainingToYear: '2025',
        venue: 'Test Venue',
        courseStructure: 4,
        courseContent: 4,
        qualityOfExercise: 3,
        handoutTrainingAids: 4,
        durationOfTraining: 3,
        trainingCoordination: 4,
        trainingEnvironment: 4,
        subjectKnowledge: 4,
        learningEnvironment: 4,
        trainingSkills: 3,
        presentationMethodology: 4,
        guidanceSupport: 4,
        likedBest: 'Test feedback',
        couldBeBetter: 'Test suggestions',
        learningExperienceComparison: 'Test comparison',
        jobResponsibilitiesHelp: 'definitely-large-extent',
        recommendToColleagues: 'yes',
        participantSignature: 'Test Employee',
        submittedAt: new Date().toISOString()
      };
      
      // Try direct fetch first to bypass any interceptors
      const result = await submitDirectToGoogleScript(testData);
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E8EDF8] dark:border-[#3A3A3A]">
      <h3 className="text-lg font-semibold mb-4">Google Apps Script Connection Test</h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isTesting ? 'Testing...' : 'Test GET Connection (Direct)'}
          </button>
          
          <button
            onClick={handleTestSubmission}
            disabled={isTesting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isTesting ? 'Testing...' : 'Test POST Submission (Direct)'}
          </button>
          

        </div>
      </div>
      
      {testResult && (
        <div className={`mt-4 p-4 rounded ${
          testResult.success 
            ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <h4 className={`font-semibold ${
            testResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
          }`}>
            {testResult.success ? '✅ Success' : '❌ Error'}
          </h4>
          <p className={`text-sm ${
            testResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {testResult.error || 'Connection successful!'}
          </p>
          {testResult.data && (
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
