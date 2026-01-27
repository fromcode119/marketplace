import React, { useState, useEffect } from 'react';
import { Puzzle } from 'lucide-react';

export function TestWidget() {
  const [data, setData] = useState(null);
  const { t, locale, FROMCODE_API_URL } = window.Fromcode || {};
  const apiUrl = FROMCODE_API_URL || 'http://api.framework.local';

  useEffect(() => {
    const fetchUrl = `${apiUrl}/api/test-feature/api/hello?locale=${locale || 'en'}`;
    fetch(fetchUrl)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("[test-feature] Widget fetch failed:", err));
  }, [locale, apiUrl]);

  const title = data ? data.message : (t ? t('test-feature.welcome') : 'Plugin Frontend Loaded!');

  return (
    <div style={{
      padding: '24px',
      background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
      borderRadius: '16px',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Puzzle size={20} />
        <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{title}</h3>
      </div>
      <p style={{ color: '#e0e7ff', fontSize: '0.875rem' }}>
        {data ? `Live Data: ${data.database?.rowCount} rows found in database.` : 'This widget was loaded dynamically from the plugin\'s frontend/index.js file into the home hero slot!'}
      </p>
    </div>
  );
}
