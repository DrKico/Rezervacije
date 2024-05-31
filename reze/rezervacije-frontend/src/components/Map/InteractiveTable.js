import React, { useState } from 'react';
import tableImage from '../../image1.png';

const InteractiveTable = ({ selectedTable, setSelectedTable }) => {
  const [tables, setTables] = useState([
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 250, y: 50 },
    { id: 4, x: 50, y: 150 },
    { id: 5, x: 150, y: 150 },
    { id: 6, x: 250, y: 150 }
  ]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '200px', background: `url(${tableImage}) no-repeat center/contain` }}>
      {tables.map(table => (
        <div
          key={table.id}
          onClick={() => setSelectedTable(table.id)}
          style={{
            position: 'absolute',
            left: `${table.x}px`,
            top: `${table.y}px`,
            width: '30px',
            height: '30px',
            backgroundColor: selectedTable === table.id ? 'green' : 'red',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveTable;
