/**
 * Simple Google Apps Script for testing CORS and basic functionality
 * Deploy this first to test if the connection works, then upgrade to the full version
 */

/**
 * Handle GET requests
 */
function doGet(e) {
  return createResponse({
    success: true,
    message: 'GET request successful',
    timestamp: new Date().toISOString(),
    method: 'GET'
  });
}

/**
 * Handle POST requests
 */
function doPost(e) {
  try {
    let data = {};
    
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
    return createResponse({
      success: true,
      message: 'POST request successful',
      timestamp: new Date().toISOString(),
      method: 'POST',
      receivedData: data
    });
  } catch (error) {
    return createResponse({
      success: false,
      message: 'Error processing POST request',
      error: error.toString(),
      timestamp: new Date().toISOString()
    }, 500);
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return createResponse({
    success: true,
    message: 'OPTIONS request successful',
    method: 'OPTIONS',
    timestamp: new Date().toISOString()
  });
}

/**
 * Create response with CORS headers
 */
function createResponse(content, status = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(content));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Set CORS headers
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
  output.setHeader('Access-Control-Max-Age', '86400');
  
  return output;
}
