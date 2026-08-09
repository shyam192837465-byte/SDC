const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Load service account from Environment Variable or fallback to local file
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
    serviceAccount = require('./serviceAccountKey.json');
  } catch (e) {
    console.error('Could not find serviceAccountKey.json locally.');
  }
}

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files if hosted directly via Express
app.use(express.static(__dirname));

app.post('/send-notification', async (req, res) => {
  const { patientName, treatment, date, time, session } = req.body;

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

  try {
    const response = await admin.messaging().send(message);
    console.log('FCM sent:', response);
    res.json({ success: true, response });
  } catch (error) {
    console.error('FCM error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
}

module.exports = app;

