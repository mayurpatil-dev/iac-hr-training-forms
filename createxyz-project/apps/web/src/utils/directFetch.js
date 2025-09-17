// Direct fetch utility that bypasses all interceptors
// This is specifically for external API calls like Google Apps Script

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8SKL4FpsGrLrGDNDGbtOM0oiPHxEMvY6P3GmKuWPppYldLNzUEJfa9sXlsR7cOR7Z7g/exec';

// Create our own fetch function that definitely uses the browser's native fetch
const createDirectFetch = () => {
  // Get the original fetch before any modifications
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  const originalFetch = iframe.contentWindow.fetch;
  document.body.removeChild(iframe);
  return originalFetch.bind(window);
};

let directFetch;

export async function submitDirectToGoogleScript(data) {
  try {
    // Initialize direct fetch if not already done
    if (!directFetch) {
      directFetch = createDirectFetch();
    }

    console.log('Direct submit to Google Apps Script:', { url: GOOGLE_SCRIPT_URL, data });
    
    const response = await directFetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Direct response received:', { 
      status: response.status, 
      statusText: response.statusText, 
      headers: Object.fromEntries(response.headers.entries()) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Non-JSON response received:', textResponse);
      throw new Error(`Expected JSON response but got ${contentType || 'unknown'}: ${textResponse.substring(0, 200)}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Direct API call failed:', error);
    return { success: false, error: error.message };
  }
}

export async function testDirectGoogleScriptConnection() {
  try {
    // Initialize direct fetch if not already done
    if (!directFetch) {
      directFetch = createDirectFetch();
    }

    console.log('Direct testing Google Apps Script connection:', GOOGLE_SCRIPT_URL);
    
    const response = await directFetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Direct test response:', { 
      status: response.status, 
      statusText: response.statusText, 
      headers: Object.fromEntries(response.headers.entries()) 
    });
    
    if (response.ok) {
      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        return { success: false, error: `Expected JSON response but got ${contentType || 'unknown'}` };
      }
      
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: `HTTP ${response.status} - ${response.statusText}` };
    }
  } catch (error) {
    console.error('Direct connection test failed:', error);
    return { success: false, error: error.message };
  }
}
