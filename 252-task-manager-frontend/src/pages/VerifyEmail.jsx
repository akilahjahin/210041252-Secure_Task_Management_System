import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`
        );
        console.log('✅ Verification success:', response.data);
        setMessage('✅ Email verified! You can now login.');
      } catch (err) {
        const errorMessage = err.response?.data?.message;

        console.error('❌ Verification error:', errorMessage || err.message);

        if (errorMessage === 'Email already verified') {
          setMessage('✅ Email is now verified. You can login.');
        } else {
          setMessage('❌ Verification failed. Invalid or expired token.');
        }
      }
    };

    verify();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;