import React, { useState, useEffect, useRef } from 'react';

const MobileTerminal = ({ onClose, language = 'en' }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'Portfolio Terminal v1.0',
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

  const text = {
    en: {
      title: 'Terminal',
      placeholder: 'Type a command...',
      availableCommands: 'Available commands:',
      about: 'Portfolio - Mobile Version',
      aboutDesc: 'An interactive portfolio showcasing web development skills',
      built: 'Built with React.js and modern web technologies',
      optimized: 'Optimized for mobile devices with touch-friendly interface',
      skills: 'Technical Skills:',
      frontend: 'Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS',
      backend: 'Backend: Node.js, Express.js, API Development',
      tools: 'Tools: Git, VS Code, npm/yarn, Vercel',
      other: 'Other: Problem Solving, UI/UX Design, Responsive Design',
      projects: 'Featured Projects:',
      contact: 'Contact Information:',
      github: 'GitHub: https://github.com/shinyPy/',
      portfolio: 'Portfolio: https://github.com/shinyPy/windows-portofolio',
      reachOut: 'Feel free to reach out for collaborations!',
      currentUser: 'ShinyPy',
      developer: 'Full Stack Developer',
      passionate: 'Passionate about creating innovative web solutions',
      notRecognized: 'is not recognized as a command.',
      typeHelp: 'Type "help" for available commands.'
    },
    id: {
      title: 'Terminal',
      placeholder: 'Ketik perintah...',
      availableCommands: 'Perintah yang tersedia:',
      about: 'Portofolio - Versi Mobile',
      aboutDesc: 'Portofolio interaktif yang menampilkan keterampilan pengembangan web',
      built: 'Dibangun dengan React.js dan teknologi web modern',
      optimized: 'Dioptimalkan untuk perangkat mobile dengan antarmuka ramah sentuhan',
      skills: 'Keterampilan Teknis:',
      frontend: 'Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS',
      backend: 'Backend: Node.js, Express.js, Pengembangan API',
      tools: 'Tools: Git, VS Code, npm/yarn, Vercel',
      other: 'Lainnya: Pemecahan Masalah, Desain UI/UX, Desain Responsif',
      projects: 'Proyek Unggulan:',
      contact: 'Informasi Kontak:',
      github: 'GitHub: https://github.com/shinyPy/',
      portfolio: 'Portofolio: https://github.com/shinyPy/windows-portofolio',
      reachOut: 'Jangan ragu untuk menghubungi untuk kolaborasi!',
      currentUser: 'ShinyPy',
      developer: 'Pengembang Full Stack',
      passionate: 'Bersemangat tentang menciptakan solusi web inovatif',
      notRecognized: 'tidak dikenali sebagai perintah.',
      typeHelp: 'Ketik "help" untuk perintah yang tersedia.'
    }
  };

  const t = text[language] || text.en;

  const commands = {
    help: () => [
      t.availableCommands,
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
      t.about,
      t.aboutDesc,
      t.built,
      t.optimized,
      ''
    ],
    skills: () => [
      t.skills,
      '  ' + t.frontend,
      '  ' + t.backend,
      '  ' + t.tools,
      '  ' + t.other,
      ''
    ],
    projects: () => [
      t.projects,
      '  • TEFAREN - Web application with modern tech stack',
      '  • Windows Portfolio - This interactive portfolio',
      '  • Development Videos - Process documentation',
      '',
      language === 'en' ? 'Visit the Projects tab to explore more!' : 'Kunjungi tab Proyek untuk menjelajah lebih!',
      ''
    ],
    contact: () => [
      t.contact,
      '  ' + t.github,
      '  ' + t.portfolio,
      '',
      t.reachOut,
      ''
    ],
    whoami: () => [
      t.currentUser,
      t.developer,
      t.passionate,
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

    return [`'${command}' ${t.notRecognized}`, t.typeHelp, ''];
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
    <div className="fixed inset-0 bg-black z-50 flex flex-col animate-slide-up-screen">
      {/* Terminal Header */}
      <div className="bg-gray-900/95 ios-blur px-4 h-16 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mr-3 ios-shadow-sm">
            <span className="text-white text-xl">💻</span>
          </div>
          <span className="text-white text-lg font-bold">{t.title}</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors active:scale-95"
          aria-label="Close terminal"
        >
          ✕
        </button>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Output Area */}
        <div
          ref={outputRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400"
        >
          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words mb-1 leading-relaxed">
              {line}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800/50 bg-gray-900/50">
          <div className="flex items-center">
            <span className="text-green-400 font-mono text-sm mr-2 font-bold">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none placeholder-gray-600"
              placeholder={t.placeholder}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </form>
      </div>

      {/* Quick Commands */}
      <div className="bg-gray-900/95 ios-blur px-4 py-3 border-t border-gray-700/50">
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
              className="px-4 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-xl text-xs font-semibold hover:from-green-500/30 hover:to-emerald-500/30 transition-all active:scale-95 border border-green-500/30"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTerminal;
