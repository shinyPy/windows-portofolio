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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black ios-fade-in">
      {/* iOS Navigation Bar */}
      <div className="bg-white/95 dark:bg-black/95 ios-blur border-b border-gray-200/50 dark:border-gray-800/50 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center ios-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-95 mr-3"
          >
            <span className="text-lg">‹</span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 ios-shadow-sm">
              <span className="text-white text-lg">👤</span>
            </div>
            <h1 className="ios-title text-black dark:text-white">About</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Profile Card */}
        <div className="ios-card dark:ios-card-dark p-8 mb-6 text-center ios-fade-in">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6 ios-shadow-lg">
            SP
          </div>
          <h2 className="ios-title text-black dark:text-white mb-2">ShinyPy</h2>
          <p className="ios-blue font-medium mb-4">Full Stack Developer</p>
          <p className="ios-body text-gray-600 dark:text-gray-300">
            {aboutInfo.info || 'Passionate developer with a love for creating innovative solutions and learning new technologies. Always eager to take on new challenges and contribute to meaningful projects.'}
          </p>
        </div>

        {/* Personal Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {personalInfo.map((info, index) => (
            <div key={index} className="ios-card dark:ios-card-dark p-4 ios-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-xl ios-blue">{info.icon}</span>
                </div>
                <span className="ios-caption dark:text-gray-400 font-medium">{info.label}</span>
              </div>
              <span className="font-semibold text-black dark:text-white">{info.value}</span>
            </div>
          ))}
        </div>

        {/* Interests Card */}
        <div className="ios-card dark:ios-card-dark p-6 mb-6">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-lg">❤️</span>
            </div>
            <h3 className="ios-title text-black dark:text-white">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div key={index} className="ios-bg-gray dark:bg-gray-800 rounded-full px-4 py-2">
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {interest.icon} {interest.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Card */}
        {aboutInfo.achievements.length > 0 && (
          <div className="ios-card dark:ios-card-dark p-6 mb-6">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
                <span className="text-white text-lg">🏆</span>
              </div>
              <h3 className="ios-title text-black dark:text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
              {aboutInfo.achievements.map((achievement, index) => (
                <div key={achievement.id} className="ios-bg-gray dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                      </h4>
                      <p className="ios-caption dark:text-gray-400">Certificate of completion</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Card */}
        <div className="ios-card dark:ios-card-dark p-6 mb-6">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-lg">📞</span>
            </div>
            <h3 className="ios-title text-black dark:text-white">Get In Touch</h3>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGithubClick}
              className="w-full bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white py-4 px-4 rounded-xl transition-all flex items-center justify-center active:scale-95 ios-shadow font-medium"
            >
              <span className="text-xl mr-3">🔗</span>
              <span>View My GitHub</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="ios-bg-blue text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 ios-shadow font-medium">
                <span className="mr-2">💼</span>
                <span>LinkedIn</span>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 ios-shadow font-medium">
                <span className="mr-2">✉️</span>
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fun Facts Card */}
        <div className="ios-card dark:ios-card-dark p-6">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-lg">✨</span>
            </div>
            <h3 className="ios-title text-black dark:text-white">Fun Facts</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300">Loves creating interactive web experiences</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 ios-bg-blue rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300">Always learning new technologies</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300">Enjoys solving complex problems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
