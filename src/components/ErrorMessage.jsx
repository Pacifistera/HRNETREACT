import React from 'react';
import '../styles/errorMessage.scss';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <span className="error-message">{message}</span>;
};

export default ErrorMessage;
