import React from 'react';

export function PromoBanner() {
  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#ffcc00',
      color: '#000',
      textAlign: 'center',
      borderRadius: '8px',
      margin: '10px 0',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      Special Offer: Get 50% off on all plugins today!
    </div>
  );
}
