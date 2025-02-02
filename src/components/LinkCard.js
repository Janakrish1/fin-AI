import React from 'react';

const LinkCard = ({ links }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Related Links:</h3>
      {links.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {links.map((link) => (
            <div
              key={link.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                width: '200px',
                textAlign: 'center',
              }}
            >
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                Link {link.id}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
};

export default LinkCard;