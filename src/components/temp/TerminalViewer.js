// src/components/windows/TerminalViewer.js
import React, { useState } from 'react';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  background: black;
  color: green;
  padding: 10px;
  height: 100%;
  overflow: auto;
  font-family: 'Courier New', Courier, monospace;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: green;
  width: 100%;
  outline: none;
`;

function TerminalViewer({ title, onClose }) {
  const [commands, setCommands] = useState([]);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      setCommands([...commands, e.target.value]);
      e.target.value = '';
    }
  };

  return (
    <div className="w-[600px] h-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl absolute flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center rounded-t-xl">
        <div className="text-base font-semibold">{title}</div>
        <button onClick={onClose} className="text-2xl p-1 transition-colors">
          ×
        </button>
      </div>
      <TerminalContainer>
        {commands.map((cmd, index) => (
          <div key={index}>{`> ${cmd}`}</div>
        ))}
        <Input type="text" onKeyPress={handleInput} autoFocus />
      </TerminalContainer>
    </div>
  );
}

export default TerminalViewer;
