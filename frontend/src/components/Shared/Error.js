import React from 'react';

export const Error = ({ error }) => {
  return (
    <div style={{ padding: '2%' }}>
      {error.message && 'Credentials not Valid'}
    </div>
  );
};
