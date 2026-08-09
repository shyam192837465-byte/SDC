const admin = require('firebase-admin');

// Load service account from Environment Variable or local file
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', e);
  }
}

if (!serviceAccount) {
  try {
    serviceAccount = require('../../serviceAccountKey.json');
  } catch (e) {
    console.error('Could not find serviceAccountKey.json locally.');
  }
}

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { patientName, treatment, date, time, session } = body;
    const timeText = time ? ` at ${time}` : '';

    const message = {
      notification: {
        title: 'New Appointment Request!',
        body: `${patientName} booked ${treatment} on ${date}${timeText}`,
      },
      topic: 'new_appointments',
      data: {
        patient_name: patientName || '',
        treatment: treatment || '',
        date: date || '',
        time: time || '',
        session: session || ''
      }
    };

    const response = await admin.messaging().send(message);
    console.log('FCM sent:', response);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, response })
    };
  } catch (error) {
    console.error('FCM error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
