import React from 'react';

const ErrorMessage = ({ label, message }) => {
  return (
    <p className="error-message">
      {message ? (label ? `${label}: ` : '') + `${message}` : ''}
    </p>
  );
};

export default ErrorMessage;
