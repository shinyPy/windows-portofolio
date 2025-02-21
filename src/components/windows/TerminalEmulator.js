import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import '../../assets/css/terminal.css';
import initialFilesystem from '../../utils/filesystem/initialFilesystem';  // Import your filesystem data
import { useLanguage } from '../../utils/LanguageContext'; // Import the language context

const formatClasses = {
  error: 'text-red-500',
  success: 'text-green-400',
  info: 'text-cyan-400',
  warning: 'text-yellow-400',
  bold: 'font-bold'
};

const asciiLogo = `
▗▄▄▖  ▄▄▄  ▄▄▄▄▄ ▗▞▀▜▌
▐▌ ▐▌█   █  ▄▄▄▀ ▝▚▄▟▌
▐▛▀▚▖▀▄▄▄▀ █▄▄▄▄
▐▌ ▐▌

`;

const parseFilesystem = (fs) => {
  const virtualFS = { '/': [] };

  const traverse = (node, path = '/') => {
    virtualFS[path] = node.contents || [];
    (node.contents || []).forEach(child => {
      if (child.type === 'folder') {
        const childPath = `${path}${path === '/' ? '' : '/'}${child.name}`;
        traverse(child, childPath);
      }
    });
  };

  fs.forEach(node => traverse(node));
  return virtualFS;
};

const resolvePath = (currentDir, targetPath) => {
  const isAbsolute = targetPath.startsWith('/');
  const parts = (isAbsolute ? [] : currentDir.split('/').filter(Boolean));

  targetPath.split('/').forEach(part => {
    if (part === '..') parts.length && parts.pop();
    else if (part && part !== '.') parts.push(part);
  });

  return '/' + parts.join('/');
};

const formatText = (text, type) => {
  return <span className={formatClasses[type]}>{text}</span>;
};

const TerminalEmulator = ({ onClose }) => {
  const [history, setHistory] = useState([
    <pre key="logo" className="text-cyan-400">{asciiLogo}</pre>,
    formatText('Welcome to Portfolio Terminal. Type "help" for commands.', 'success')
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/desktop');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const { texts } = useLanguage(); // Use the language context

  const virtualFS = useMemo(() => parseFilesystem(initialFilesystem), []);

  const getTextContent = (name) => {
    const textMapping = {
      "skills.txt": texts.skillsText,
      "welcome.txt": texts.welcomeText,
      "aboutWebsite.txt": texts.aboutwebsiteText,
      "info.txt": texts.infoText,
      "changelog.txt": texts.changelogText,
    };
    return textMapping[name] || "File not found.";
  };

  const commands = {
    help: () => (
      <div className="space-y-2">
        {formatText('Available commands:\n', 'info')}
        <div className="grid grid-cols-2 gap-4">
          <div>
            {formatText('File System:', 'bold')}
            <div>{formatText('cd [dir]', 'bold')} - Change directory</div>
            <div>{formatText('ls [-l]', 'bold')} - List directory</div>
            <div>{formatText('pwd', 'bold')} - Show current directory</div>
            <div>{formatText('cat [file]', 'bold')} - Show file content</div>
          </div>
          <div>
            {formatText('Utilities:', 'bold')}
            <div>{formatText('clear', 'bold')} - Clear screen</div>
            <div>{formatText('echo [text]', 'bold')} - Display text</div>
            <div>{formatText('open [file]', 'bold')} - Open file/link</div>
            <div>{formatText('neofetch', 'bold')} - System info</div>
          </div>
        </div>
      </div>
    ),

    cd: (args) => {
      const target = args[0] || '/';
      const resolvedPath = resolvePath(currentDir, target);

      if (!virtualFS[resolvedPath]) {
        return formatText(`cd: ${resolvedPath}: No such directory`, 'error');
      }

      setCurrentDir(resolvedPath);
      return formatText(`Changed directory to ${resolvedPath}`, 'success');
    },

    ls: (args) => {
      const contents = virtualFS[currentDir] || [];
      const detailed = args.includes('-l');

      return detailed ? (
        <div className="space-y-1">
          {contents.map(item => (
            <div key={item.name} className="flex gap-4">
              <span className="w-24">{item.type === 'folder' ? 'drwxr-xr-x' : '-rw-r--r--'}</span>
              <span className="w-48">
                {item.type === 'folder' ?
                  formatText(item.name, 'blue-400') :
                  item.type === 'link' ?
                    formatText(item.name, 'green-400') :
                    item.name}
              </span>
              {detailed && <span className="text-gray-400">{item.size || '0KB'}</span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {contents.map(item => (
            <span key={item.name} className={
              item.type === 'folder' ? 'text-blue-400' :
                item.type === 'link' ? 'text-green-400' :
                  'text-gray-200'
            }>
              {item.name}
            </span>
          ))}
        </div>
      );
    },

    cat: (args) => {
      if (!args.length) return formatText('cat: missing file operand', 'error');
      const [fileName] = args;
      const file = (virtualFS[currentDir] || []).find(f => f.name === fileName);

      if (!file) return formatText(`cat: ${fileName}: No such file`, 'error');
      if (file.type === 'folder') return formatText(`cat: ${fileName}: Is a directory`, 'error');
      if (file.type === 'file' && fileName.endsWith('.txt')) {
        const content = getTextContent(fileName);
        return <pre className="whitespace-pre-wrap">{content}</pre>;
      }
      return formatText(`cat: Cannot display ${fileName}`, 'error');
    },

    open: (args) => {
      if (!args.length) return formatText('open: missing file operand', 'error');
      const [fileName] = args;
      const file = (virtualFS[currentDir] || []).find(f => f.name === fileName);

      if (!file) return formatText(`open: ${fileName}: No such file`, 'error');
      if (file.type === 'folder') return formatText(`open: ${fileName}: Is a directory`, 'error');
      if (file.type === 'link') {
        window.open(file.url, '_blank');
        return formatText(`Opened link: ${file.url}`, 'success');
      }
      return formatText(`open: Cannot open ${file.type}`, 'error');
    },

    neofetch: () => (
      <div className="flex gap-8">
        <pre className="text-cyan-400">{asciiLogo}</pre>
        <div className="space-y-1">
          {formatText('Portfolio Terminal', 'bold')}
          {formatText('---------------------------', 'info')}
          <div>{formatText('OS:', 'bold')} Portfolio OS</div>
          <div>{formatText('Shell:', 'bold')} React Terminal v2.0</div>
          <div>{formatText('Resolution:', 'bold')} {window.innerWidth}x{window.innerHeight}</div>
        </div>
      </div>
    ),

    clear: () => {
      setHistory([]);
      return '';
    },

    echo: (args) => args.join(' '),

    pwd: () => formatText(currentDir, 'info'),
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const [cmd, ...args] = currentCommand.trim().split(/\s+/);
      const commandFn = commands[cmd.toLowerCase()]; // Add toLowerCase()
      const output = commandFn ? commandFn(args) : formatText(`${cmd}: command not found`, 'error');

      setHistory(prev => [
        ...prev,
        <div key={prev.length} className="flex gap-1">
          {formatText('user@portfolio', 'success')}:
          {formatText(currentDir, 'info')}$ {currentCommand}
        </div>,
        output
      ]);

      setCommandHistory(prev => [...prev, currentCommand]);
      setCurrentCommand('');
      setHistoryIndex(-1);
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

        <div
          className="flex-1 bg-[#1e1e1e] p-2 font-mono text-sm overflow-auto"
          ref={terminalRef}
          style={{ scrollBehavior: 'smooth' }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="text-gray-200 mb-1">{line}</div>
          ))}
          <div className="flex items-center">
            <span className="text-green-400">user@portfolio:~$&nbsp;</span>
            <input
              ref={inputRef}
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
