import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import '../../assets/css/terminal.css'; // Import CSS for animations
const formatClasses = {
  error: 'text-red-500',
  success: 'text-green-400',
  info: 'text-cyan-400',
  warning: 'text-yellow-400',
  bold: 'font-bold'
};

// Add ASCII logo
const asciiLogo = `
    .--.      .--.
   |    \\    /    |
   |  |\\ \\  / /|  |
   |  | \\ \\/ / |  |
   |  |  \\  /  |  |
   |  |   \\/   |  |
   |  |        |  |
   |__|        |__|`;

const TerminalEmulator = ({ onClose, filesystem }) => {
  const [history, setHistory] = useState(['Welcome to Terminal v1.0']);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/desktop');
  const terminalRef = useRef(null);

  const parseFilesystem = (fs) => {
    const virtualFS = {
      '/': [],
      '/desktop': []
    };

    // Helper function to get the full path
    const getFullPath = (node, parentPath = '') => {
      const nodePath = parentPath ? `${parentPath}/${node.name}` : `/${node.name}`;
      return nodePath.replace('//', '/');
    };

    // Recursive function to traverse filesystem
    const traverse = (node, parentPath = '') => {
      const currentPath = getFullPath(node, parentPath);

      // Initialize path in virtualFS if it doesn't exist
      if (!virtualFS[currentPath]) {
        virtualFS[currentPath] = [];
      }

      // Add contents to current path
      if (node.contents) {
        virtualFS[currentPath] = node.contents.map(item => ({
          name: item.name,
          type: item.type,
          url: item.url || null
        }));

        // Recursively traverse child folders
        node.contents.forEach(child => {
          if (child.type === 'folder') {
            traverse(child, currentPath);
          }
        });
      }
    };

    // Start traversal from root
    fs.forEach(node => traverse(node));
    return virtualFS;
  };

  const virtualFS = parseFilesystem(filesystem);

  const formatText = (text, type) => {
    return <span className={formatClasses[type]}>{text}</span>;
  };

  const commands = {
    help: () => (
      <div>
        {formatText('Available commands:\n', 'info')}
        {formatText('File System:\n', 'bold')}
        cd        - Change directory
        ls        - List directory contents
        pwd       - Print working directory

        {formatText('System Info:\n', 'bold')}
        whoami    - Show current user
        date      - Show current date/time
        uname     - Show system information
        neofetch  - Display system information with logo

        {formatText('Utilities:\n', 'bold')}
        clear     - Clear terminal screen
        help      - Show this help message
        echo      - Print text
      </div>
    ),

    cd: (args) => {
        let newPath = args[0] || '/desktop';

        // Handle relative paths
        if (!newPath.startsWith('/')) {
          newPath = `${currentDir}/${newPath}`.replace('//', '/');
        }

        // Handle parent directory
        if (newPath.includes('..')) {
          const parts = currentDir.split('/').filter(Boolean);
          parts.pop();
          newPath = parts.length ? `/${parts.join('/')}` : '/';
        }

        if (virtualFS[newPath]) {
          setCurrentDir(newPath);
          return formatText(`Changed directory to ${newPath}`, 'success');
        }
        return formatText(`cd: no such directory: ${newPath}`, 'error');
      },

      ls: () => {
        const contents = virtualFS[currentDir];
        if (!contents) return formatText('ls: cannot access directory', 'error');

        return (
          <div className="grid grid-cols-4 gap-2">
            {contents.map(item => (
              <span
                key={item.name}
                className={`${
                  item.type === 'folder'
                    ? 'text-blue-400'
                    : item.type === 'link'
                      ? 'text-green-400'
                      : item.name.endsWith('.exe')
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                }`}
              >
                {item.name}
              </span>
            ))}
          </div>
        );
      },

    pwd: () => formatText(currentDir, 'info'),

    clear: () => {
      setHistory(['']);
      return '';
    },

    echo: (args) => args.join(' '),

    whoami: () => 'user@portfolio',

    date: () => new Date().toLocaleString(),

    uname: () => 'Portfolio OS [Version 1.0.0]',

    neofetch: () => (
      <div>
        {formatText(asciiLogo, 'info')}
        <br />
        {formatText('-----------------', 'bold')}
        <br />
        {formatText('OS:', 'info')} Portfolio OS<br />
        {formatText('KERNEL:', 'info')} React 18.2.0<br />
        {formatText('SHELL:', 'info')} Portfolio Terminal<br />
        {formatText('CPU:', 'info')} JavaScript V8<br />
        {formatText('MEMORY:', 'info')} Browser Memory<br />
        {formatText('UPTIME:', 'info')} Since page load<br />
        {formatText('PACKAGES:', 'info')} npm<br />
        {formatText('RESOLUTION:', 'info')} {window.innerWidth}x{window.innerHeight}<br />
        {formatText('DE:', 'info')} React Portfolio<br />
        {formatText('TERMINAL:', 'info')} Portfolio Terminal
      </div>
    ),
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const args = currentCommand.split(' ');
      const cmd = args[0].toLowerCase();
      const output = commands[cmd]
        ? commands[cmd](args.slice(1))
        : formatText(`Command not found: ${cmd}`, 'error');

      setHistory([
        ...history,
        <div key={history.length} className="flex items-center gap-1">
          {formatText('user@portfolio', 'success')}:
          {formatText(currentDir, 'info')}$&nbsp;
          {currentCommand}
        </div>,
        output
      ]);

      setCommandHistory([...commandHistory, currentCommand]);
      setHistoryIndex(-1);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const initialX = Math.round(window.innerWidth / 2 - 400);
  const initialY = Math.round(window.innerHeight / 2 - 300);

  return (
    <Rnd
      default={{
        x: initialX,
        y: initialY,
        width: 800,
        height: 600,
      }}
      minWidth={600}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
    >
      <div className="w-full h-full flex flex-col rounded-lg overflow-hidden border border-gray-300 shadow-lg">
        <div className="window-drag-handle bg-gray-900 px-3 py-2 flex items-center justify-between select-none cursor-move">
        <div className="flex-1 text-center text-sm text-white font-semibold">
            Terminal
          </div>
          <div className="flex space-x-1 ml-auto">
            <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span
              onClick={onClose}
              className="block w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            ></span>
          </div>
        </div>

        <div className="flex-1 bg-[#1e1e1e] p-2 font-mono text-sm overflow-auto"
          ref={terminalRef}
          style={{ scrollBehavior: 'smooth' }}
        >
          {history.map((line, i) => (
            <div key={i} className="text-gray-200 mb-1">{line}</div>
          ))}
          <div className="flex items-center">
            <span className="text-green-400">user@desktop:~$&nbsp;</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none text-gray-200 caret-gray-200"
              autoFocus
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default TerminalEmulator;
