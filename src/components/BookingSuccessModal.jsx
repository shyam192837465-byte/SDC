import React from 'react';

export default function BookingSuccessModal({ isOpen, onClose, appointmentData }) {
  if (!isOpen || !appointmentData) return null;

  return (
    <div
      className="modal-overlay active"
      id="successModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content glass-card">
        <div className="success-icon-wrapper">
          <svg className="success-check-svg" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>Booking Confirmed!</h3>
        <p>
          Your appointment request has been received. Our clinical assistant will reach out to you via call/SMS to confirm your appointment time.
        </p>

        <div className="modal-details">
          <div className="modal-details-row">
            <span className="modal-details-label">Patient Name:</span>
            <span className="modal-details-val" id="mName">{appointmentData.name || '-'}</span>
          </div>
          <div className="modal-details-row">
            <span className="modal-details-label">Gender / Age:</span>
            <span className="modal-details-val" id="mGenderAge">
              {appointmentData.gender && appointmentData.age ? `${appointmentData.gender} / ${appointmentData.age}` : '-'}
            </span>
          </div>
          <div className="modal-details-row">
            <span className="modal-details-label">Date Requested:</span>
            <span className="modal-details-val" id="mDate">{appointmentData.date || '-'}</span>
          </div>
          <div className="modal-details-row">
            <span className="modal-details-label">Time Slot:</span>
            <span className="modal-details-val" id="mTime">
              {appointmentData.time ? `${appointmentData.time} (${appointmentData.sessionShort || 'Morning'})` : '-'}
            </span>
          </div>
          <div className="modal-details-row">
            <span className="modal-details-label">Department:</span>
            <span className="modal-details-val" id="mTreatment">{appointmentData.treatment || '-'}</span>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} id="closeModalBtn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
