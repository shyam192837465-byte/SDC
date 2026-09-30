import React, { useState } from 'react';
import CustomCalendarModal from './CustomCalendarModal';
import BookingSuccessModal from './BookingSuccessModal';
import { db, collection, addDoc, serverTimestamp } from '../firebase';
import { formatDateFormatted, formatDateDDMMYYYY, getSessionName } from '../utils';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    age: '',
    treatment: '',
    notes: '',
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);
  const [formMsg, setFormMsg] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      setFormMsg({ text: 'Please click to select an appointment date from the calendar.', type: 'error' });
      setIsCalendarOpen(true);
      return;
    }

    if (!selectedTime) {
      setFormMsg({ text: 'Please select a specific appointment time slot.', type: 'error' });
      return;
    }

    const { name, phone, gender, age, treatment, notes } = formData;

    if (!name || !phone || !gender || !age || !treatment) {
      setFormMsg({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    if (phone.length < 10) {
      setFormMsg({ text: 'Please enter a valid 10-digit phone number.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setFormMsg({ text: '', type: '' });

    const formattedDateStr = formatDateDDMMYYYY(selectedDate);
    const sessionName = getSessionName(selectedTime);
    const isMorning = sessionName.startsWith('Morning');

    try {
      // Save appointment to Firestore
      await addDoc(collection(db, 'appointments'), {
        name,
        phone,
        gender,
        age,
        treatment,
        date: formattedDateStr,
        time: selectedTime,
        session: sessionName,
        appointmentDateTime: `${formattedDateStr} at ${selectedTime}`,
        notes: notes || '',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Send FCM push notification
      fetch('/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: name,
          gender,
          age,
          treatment,
          date: formattedDateStr,
          time: selectedTime,
          session: sessionName,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log('FCM sent:', data))
        .catch((err) => console.error('FCM error:', err));

      setConfirmedData({
        name,
        gender,
        age,
        treatment,
        date: formattedDateStr,
        time: selectedTime,
        sessionShort: isMorning ? 'Morning' : 'Evening',
      });

      setIsSuccessModalOpen(true);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        gender: '',
        age: '',
        treatment: '',
        notes: '',
      });
      setSelectedDate(null);
      setSelectedTime('');
    } catch (err) {
      console.error('Firebase save error:', err);
      setFormMsg({
        text: '⚠️ Booking could not be saved. Please try again or call us directly.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        {/* Appointment Booking Form */}
        <div className="booking-form-wrapper glass-card">
          <span className="section-tag" style={{ marginBottom: '0.75rem' }}>Easy Scheduling</span>
          <h3>Book Appointment</h3>
          <p>Fill out the form below, and we'll confirm your slot shortly.</p>

          {/* Form message */}
          {formMsg.text && (
            <div className={`form-message ${formMsg.type}`} id="formMsg" style={{ display: 'block' }}>
              {formMsg.text}
            </div>
          )}

          <form id="bookingForm" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="e.g. Shyam"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="e.g. 8122790927"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  id="gender"
                  className="form-input"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  id="age"
                  className="form-input"
                  placeholder="e.g. 25"
                  min="1"
                  max="150"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="treatment" className="form-label">Treatment Type</label>
                <select
                  id="treatment"
                  className="form-input"
                  value={formData.treatment}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Dental Treatment</option>
                  <option value="Preventive Care">Preventive Dentistry</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Root Canal">Root Canal Therapy</option>
                  <option value="Orthodontics">Orthodontics / Braces</option>
                  <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                  <option value="Pediatric Dentistry">Pediatric Care</option>
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>

              <div className="form-group calendar-form-group">
                <label htmlFor="calendarTrigger" className="form-label">Preferred Date</label>
                <div
                  className={`custom-calendar-trigger ${isCalendarOpen ? 'active' : ''}`}
                  id="calendarTrigger"
                  tabIndex="0"
                  role="button"
                  aria-haspopup="dialog"
                  aria-expanded={isCalendarOpen}
                  onClick={() => setIsCalendarOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsCalendarOpen(true);
                    }
                  }}
                >
                  <div className="calendar-trigger-info">
                    <svg className="calendar-trigger-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {selectedDate ? (
                      <span id="calendarTriggerText" className="calendar-trigger-text">
                        📅 {formatDateFormatted(selectedDate)}{selectedTime ? ` • ${selectedTime}` : ''}
                      </span>
                    ) : (
                      <span id="calendarTriggerText" className="calendar-trigger-placeholder">
                        Select Appointment Date
                      </span>
                    )}
                  </div>
                  <svg className="calendar-trigger-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeSlot" className="form-label">Preferred Timing</label>
                <select
                  id="timeSlot"
                  className="form-input"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  required
                >
                  <option value="" disabled>Select Specific Time Slot</option>
                  <optgroup label="☀️ Morning Session (09:30 AM - 01:30 PM)">
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                  </optgroup>
                  <optgroup label="🌙 Evening Session (04:30 PM - 08:30 PM)">
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="07:30 PM">07:30 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes" className="form-label">Special Notes / Symptoms (Optional)</label>
                <textarea
                  id="notes"
                  className="form-input"
                  placeholder="Briefly describe your dental issue..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Saving Appointment...
                </span>
              ) : (
                <>
                  Confirm Appointment Booking
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info">
          {/* Opening Hours */}
          <div className="info-card glass-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="info-card-details">
              <h4>Opening Hours</h4>
              <p>
                <strong>Mon - Sat:</strong> 09:30 AM &ndash; 01:30 PM &nbsp;|&nbsp; 04:30 PM &ndash; 08:30 PM
                <br />
                <span className="closed-tag">Sunday: Closed (Emergency on call)</span>
              </p>
            </div>
          </div>

          {/* Direct Contact Details */}
          <div className="info-card glass-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="info-card-details">
              <h4>Call or WhatsApp Us</h4>
              <div className="contact-btn-group">
                <a href="tel:+918122790927" className="btn btn-white btn-sm">📞 8122790927</a>
                <a href="tel:+918122790928" className="btn btn-white btn-sm">📞 8122790928</a>
                <a href="https://wa.me/918122790927?text=Hello%20Dr.%20Saranya,%20I%20want%20to%20book%20an%20appointment" target="_blank" rel="noreferrer" className="btn btn-white btn-sm">💬 WhatsApp Chat</a>
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>Email: dr.saranyarvs@gmail.com</p>
            </div>
          </div>

          {/* Instagram Social */}
          <div className="info-card glass-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="info-card-details">
              <h4>Follow Us on Instagram</h4>
              <p style={{ marginBottom: '0.5rem' }}>@SARANYA_DENTAL_CLINIC_</p>
              <a href="https://www.instagram.com/saranya_dental_clinic_" target="_blank" rel="noreferrer" className="btn btn-white btn-sm">
                Visit Instagram Profile &rarr;
              </a>
            </div>
          </div>

          {/* Interactive Google Map Location Card */}
          <div className="info-card glass-card map-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.2281!2d77.1583!3d11.0805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9aa13c1c73f55%3A0xa10214a1e9df6db8!2sSomanur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, outline: 'none', borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saranya Dental Clinic Location Map"
            />
            <div className="map-bar">
              <span className="map-bar-text">📍 Main Road, Near Railway Station, Somanur</span>
              <a href="https://maps.app.goo.gl/byPScMEd6mKNkLsHA" target="_blank" rel="noreferrer" className="btn btn-white btn-sm">
                Open Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calendar Modal */}
      <CustomCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={(date) => setSelectedDate(date)}
        selectedTime={selectedTime}
        onSelectTime={(time) => setSelectedTime(time)}
        onApply={() => setIsCalendarOpen(false)}
      />

      {/* Success Confirmation Modal */}
      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        appointmentData={confirmedData}
      />
    </section>
  );
}
