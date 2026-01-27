import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [data, setData] = useState<{ message: string, database?: { rowCount: number } } | null>(null);

  useEffect(() => {
    // In a real setup, we might use an SDK or a relative path handled by proxy
    fetch('http://api.framework.local/api/hello')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Banner fetch failed", err));
  }, []);

  return (
    <div style={{ padding: '15px', backgroundColor: '#ffcc00', textAlign: 'center', borderRadius: '8px', margin: '10px 0' }}>
      <div>Special Offer: Get 50% off on all plugins today!</div>
      {data ? (
        <div style={{ fontSize: '0.8em', marginTop: '5px', color: '#333' }}>
          API Message: {data.message} | DB Rows: {data.database?.rowCount ?? 'N/A'}
        </div>
      ) : (
        <div style={{ fontSize: '0.8em', marginTop: '5px' }}>Connecting to API...</div>
      )}
    </div>
  );
};

export default Banner;
