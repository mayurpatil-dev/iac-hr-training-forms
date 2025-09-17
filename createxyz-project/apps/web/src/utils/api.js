// Google Apps Script submission using iframe method

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzF99rqkCwoUIda08R9mg9dq2mTLClTUNcVuEoI5p0c5-KyLvR8mSmp2PILVi-umiyPUg/exec";

export async function submitToGoogleScript(data) {
  try {
    console.log("Submitting data to Google Apps Script:", data);
    
    // Create FormData for POST request
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    // Submit using fetch with no-cors mode
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    console.log("Form submitted successfully to Google Apps Script");
    return {
      success: true,
      data: {
        success: true,
        message: "Form submitted successfully"
      }
    };
    
  } catch (error) {
    console.error("Submission failed:", error);
    throw new Error(`Failed to submit form: ${error.message}`);
  }
}

// Test function
export async function testAPIRoute() {
  try {
    const testData = { 
      type: 'employeeFeedback',
      employeeName: 'Test User',
      employeeCode: 'TEST123',
      department: 'Test Department'
    };
    const result = await submitToGoogleScript(testData);
    console.log("Test successful:", result);
    return { success: true, result };
  } catch (error) {
    console.error("Test failed:", error);
    return { success: false, error: error.message };
  }
}