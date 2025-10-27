import React, { useState, useEffect } from 'react';

const MobileAbout = ({ filesystem, findItemById, onBack }) => {
  const [aboutInfo, setAboutInfo] = useState({
    info: '',
    github: '',
    achievements: []
  });

  useEffect(() => {
    // Load about information from filesystem
    const aboutFolder = findItemById(filesystem, 9); // About_me folder
    const achievementsFolder = findItemById(filesystem, 7); // Achievements folder

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
  }, [findItemById, filesystem]);

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
    <div className="min-h-screen bg-gray-900 p-5">
      {/* Profile Card */}
      <div className="bg-gray-800 rounded-lg p-6 mb-4 text-center animate-fade-in">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4">
          SP
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">ShinyPy</h2>
        <p className="text-blue-400 font-medium mb-3">Full Stack Developer</p>
        <p className="text-gray-300 text-sm leading-relaxed">
          {aboutInfo.info || 'Passionate developer with a love for creating innovative solutions and learning new technologies. Always eager to take on new challenges and contribute to meaningful projects.'}
        </p>
      </div>

      {/* Personal Info Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {personalInfo.map((info, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 animate-fade-in hover:brightness-110 transition-all"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{info.icon}</span>
              <span className="text-gray-400 text-xs font-medium">{info.label}</span>
            </div>
            <span className="text-white font-semibold">{info.value}</span>
          </div>
        ))}
      </div>

      {/* Interests Card */}
      <div className="bg-gray-800 rounded-lg p-5 mb-4">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">❤️</span>
          <h3 className="text-white text-lg font-bold">Interests</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div key={index} className="bg-gray-700 rounded px-3 py-2">
              <span className="text-gray-200 text-sm font-medium">
                {interest.icon} {interest.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Card */}
      {aboutInfo.achievements.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-5 mb-4">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🏆</span>
            <h3 className="text-white text-lg font-bold">Achievements</h3>
          </div>
          <div className="space-y-3">
            {aboutInfo.achievements.map((achievement, index) => (
              <div key={achievement.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">🏆</span>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                    </h4>
                    <p className="text-gray-400 text-sm">Certificate of completion</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Card */}
      <div className="bg-gray-800 rounded-lg p-5 mb-4">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">📞</span>
          <h3 className="text-white text-lg font-bold">Get In Touch</h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGithubClick}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center active:scale-95 font-medium"
          >
            <span className="text-xl mr-3">🔗</span>
            <span>View My GitHub</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center text-sm active:scale-95 font-medium">
              <span className="mr-2">💼</span>
              <span>LinkedIn</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center text-sm active:scale-95 font-medium">
              <span className="mr-2">✉️</span>
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fun Facts Card */}
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">✨</span>
          <h3 className="text-white text-lg font-bold">Fun Facts</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Loves creating interactive web experiences</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Always learning new technologies</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Enjoys solving complex problems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
