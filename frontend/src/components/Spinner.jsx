import React from 'react';
import { ClipLoader } from 'react-spinners'; 

export const Spinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <ClipLoader size={50} color="#4a90e2" />
    </div>
  );
};


