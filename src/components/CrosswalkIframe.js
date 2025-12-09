import React from 'react';

export default function CrosswalkIframe() {
  if (typeof window === 'undefined') {
    // Prevent SSR from rendering iframe
    return <div>Loading crosswalk…</div>;
  }

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTgekv3wditmUSRm_CJv7O1PsC6KJHUDBNba7V8nYg2_kGiVj5dD8ho8WaUamf8czqvAnh-Xg9neT58/pubhtml"
        width="100%"
        height="850"
        style={{
          border: '1px solid #ccc',
          background: '#fff'
        }}
      />
    </div>
  );
}
