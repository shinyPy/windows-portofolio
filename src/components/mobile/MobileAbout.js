import React, { useState, useEffect } from 'react';

const MobileAbout = ({ filesystem, findItemById }) => {
  const [aboutInfo, setAboutInfo] = useState({
    info: '',
    github: '',
    achievements: []
  });

  useEffect(() => {
    // Load about information from filesystem
    const aboutFolder = findItemById(9); // About_me folder
    const achievementsFolder = findItemById(7); // Achievements folder

    if (aboutFolder && aboutFolder.contents) {
      const githubLink = aboutFolder.contents.find(item => item.name === 'My_Github');
      const infoFile = aboutFolder.contents.find(item => item.name === 'info.txt');

      setAboutInfo(prev => ({
        ...prev,
        github: githubLink ? githubLink.url : '',
        info: infoFile ? 'Passionate developer with a love for creating innovative solutions and learning new technologies.' : ''
      }));
    }

    if (achievementsFolder && achievementsFolder.contents) {
      const achievements = achievementsFolder.contents.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        src: item.src
      }));

      setAboutInfo(prev => ({
        ...prev,
        achievements
      }));
    }
  }, [findItemById]);

  const personalInfo = [
    { label: 'Name', value: 'ShinyPy', icon: '👤' },
    { label: 'Role', value: 'Full Stack Developer', icon: '💻' },
    { label: 'Location', value: 'Remote', icon: '🌍' },
    { label: 'Experience', value: '2+ Years', icon: '🚀' }
  ];

  const interests = [
    { name: 'Web Development', icon: '🌐' },
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'Problem Solving', icon: '🧩' },
    { name: 'Technology', icon: '⚡' },
    { name: 'Learning', icon: '📚' },
    { name: 'Open Source', icon: '🔓' }
  ];

  const handleGithubClick = () => {
    if (aboutInfo.github) {
      window.open(aboutInfo.github, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-white mb-2">About Me</h1>
        <p className="text-white/80 text-sm">Get to know me better</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
            SP
          </div>
          <h2 className="text-xl font-semibold text-white">ShinyPy</h2>
          <p className="text-white/80 text-sm">Full Stack Developer</p>
        </div>

        <p className="text-white/80 text-sm leading-relaxed text-center">
          {aboutInfo.info || 'Passionate developer with a love for creating innovative solutions and learning new technologies. Always eager to take on new challenges and contribute to meaningful projects.'}
        </p>
      </div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {personalInfo.map((info, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">{info.icon}</span>
              <span className="text-white/60 text-xs">{info.label}</span>
            </div>
            <span className="text-white font-medium text-sm">{info.value}</span>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
              <span className="text-white text-sm">
                {interest.icon} {interest.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {aboutInfo.achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Achievements</h3>
          <div className="space-y-3">
            {aboutInfo.achievements.map((achievement, index) => (
              <div key={achievement.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏆</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">
                      {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                    </h4>
                    <p className="text-white/60 text-xs">Certificate of completion</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-3">Get In Touch</h3>

        <div className="space-y-3">
          <button
            onClick={handleGithubClick}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center active:scale-95"
          >
            <span className="text-xl mr-3">📱</span>
            <span>View My GitHub</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center text-sm active:scale-95">
              <span className="mr-2">💼</span>
              <span>LinkedIn</span>
            </button>
            <button className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center text-sm active:scale-95">
              <span className="mr-2">✉️</span>
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-3">Fun Facts</h3>
        <div className="space-y-2">
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
            Loves creating interactive web experiences
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Always learning new technologies
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            Enjoys solving complex problems
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
