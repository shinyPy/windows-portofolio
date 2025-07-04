import React, { useState, useEffect, useRef } from 'react';

const MobileTerminal = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'Windows Portfolio Terminal v1.0',
    'Type "help" for available commands.',
    ''
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  clear    - Clear the terminal',
      '  about    - About this portfolio',
      '  skills   - List technical skills',
      '  projects - List projects',
      '  contact  - Contact information',
      '  whoami   - Current user info',
      '  ls       - List directory contents',
      '  pwd      - Show current directory',
      '  date     - Show current date and time',
      '  echo     - Display text',
      ''
    ],
    clear: () => {
      setOutput([]);
      return [];
    },
    about: () => [
      'Windows Portfolio - Mobile Version',
      'An interactive portfolio showcasing web development skills',
      'Built with React.js and modern web technologies',
      'Optimized for mobile devices with touch-friendly interface',
      ''
    ],
    skills: () => [
      'Technical Skills:',
      '  Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS',
      '  Backend: Node.js, Express.js, API Development',
      '  Tools: Git, VS Code, npm/yarn, Vercel',
      '  Other: Problem Solving, UI/UX Design, Responsive Design',
      ''
    ],
    projects: () => [
      'Featured Projects:',
      '  • TEFAREN - Web application with modern tech stack',
      '  • Windows Portfolio - This interactive portfolio',
      '  • Development Videos - Process documentation',
      '',
      'Visit the Projects tab to explore more!',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '  GitHub: https://github.com/shinyPy/',
      '  Portfolio: https://github.com/shinyPy/windows-portofolio',
      '',
      'Feel free to reach out for collaborations!',
      ''
    ],
    whoami: () => [
      'ShinyPy',
      'Full Stack Developer',
      'Passionate about creating innovative web solutions',
      ''
    ],
    ls: () => [
      'desktop/',
      '  Projects/',
      '    TEFAREN',
      '    Development Videos',
      '  Achievements/',
      '    certificate.jpg',
      '  About_me/',
      '    My_Github',
      '    info.txt',
      '  skills.txt',
      '  welcome.txt',
      '  terminal.exe',
      ''
    ],
    pwd: () => [
      '/desktop',
      ''
    ],
    date: () => [
      new Date().toLocaleString(),
      ''
    ]
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.split(' ');

    if (command === 'echo') {
      return args.length > 0 ? [args.join(' '), ''] : ['', ''];
    }

    if (commands[command]) {
      return commands[command]();
    }

    if (trimmedCmd === '') {
      return [''];
    }

    return [`'${command}' is not recognized as a command.`, 'Type "help" for available commands.', ''];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newOutput = [...output, `> ${input}`, ...handleCommand(input)];
      setOutput(newOutput);
      setHistory([...history, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : history[newIndex]);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg max-w-md w-full max-h-[80vh] border border-green-500/50 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-green-500/50">
          <div className="flex items-center">
            <span className="text-green-400 text-sm font-mono">Terminal</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Terminal Body */}
        <div className="h-96 flex flex-col">
          {/* Output Area */}
          <div
            ref={outputRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 bg-black"
          >
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap break-words">
                {line}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-green-500/30">
            <div className="flex items-center">
              <span className="text-green-400 font-mono text-sm mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none"
                placeholder="Type a command..."
                autoComplete="off"
              />
            </div>
          </form>
        </div>

        {/* Quick Commands */}
        <div className="bg-gray-900 px-4 py-3 border-t border-green-500/50">
          <div className="flex flex-wrap gap-2">
            {['help', 'clear', 'about', 'skills'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  const newOutput = [...output, `> ${cmd}`, ...handleCommand(cmd)];
                  setOutput(newOutput);
                  setHistory([...history, cmd]);
                  setInput('');
                }}
                className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono hover:bg-green-500/30 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTerminal;
