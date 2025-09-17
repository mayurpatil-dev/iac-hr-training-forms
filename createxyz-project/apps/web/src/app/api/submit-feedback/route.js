// app/api/submit-feedback/route.js

// Handle POST requests
export async function POST(request) {
  console.log('POST request received at /api/submit-feedback');
  
  try {
    // Add CORS headers to handle cross-origin requests
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const body = await request.json();
    console.log('Request body:', body);

    // Forward to Google Apps Script
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbzF99rqkCwoUIda08R9mg9dq2mTLClTUNcVuEoI5p0c5-KyLvR8mSmp2PILVi-umiyPUg/exec";

    console.log('Forwarding to Google Apps Script...');
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body),
    });

    console.log('Google Apps Script response status:', res.status);

    if (!res.ok) {
      throw new Error(`Google Script responded with status: ${res.status}`);
    }

    const text = await res.text();
    console.log('Google Apps Script response text:', text);
    
    let data;

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.log("Raw response from Google Script:", text);
      data = { success: true, raw: text }; // fallback if Apps Script returns plain text
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(JSON.stringify({ 
      success: false,
      error: err.message,
      details: "Failed to submit feedback"
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// Handle GET requests (for testing)
export async function GET() {
  console.log('GET request received at /api/submit-feedback');
  return new Response(JSON.stringify({ 
    message: 'Submit feedback API endpoint is working',
    methods: ['POST'],
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}