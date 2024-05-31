import React from 'react';
import './InteractiveMap.css';

const InteractiveMap = ({ onTableSelect }) => {
  const handleTableClick = (tableId) => {
    onTableSelect(tableId);
  };

  return (
    <div className="interactive-map">
      <img src="/path/to/tlocrt/image.png" alt="Club Layout" className="map-image" />
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`VIP-${i+1}`} className="table vip" id={`VIP-${i+1}`} onClick={() => handleTableClick(`VIP-${i+1}`)}></div>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`R-${i+1}`} className="table regular" id={`R-${i+1}`} onClick={() => handleTableClick(`R-${i+1}`)}></div>
      ))}
      {/* Pozicioniranje elemenata stolova prema tlocrtu */}
      <div className="standing-tables">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={`S-${i+1}`} className="table standing" id={`S-${i+1}`} onClick={() => handleTableClick(`S-${i+1}`)}></div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap;
