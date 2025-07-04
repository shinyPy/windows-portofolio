import React, { useState, useEffect } from 'react';

const MobileAbout = ({ filesystem, findItemById, onBack }) => {
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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      {/* Mobile App Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-3"
          >
            ←
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-lg">👤</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-lg">
              SP
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">ShinyPy</h2>
            <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">Full Stack Developer</p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
            {aboutInfo.info || 'Passionate developer with a love for creating innovative solutions and learning new technologies. Always eager to take on new challenges and contribute to meaningful projects.'}
          </p>
        </div>

        {/* Personal Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {personalInfo.map((info, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">{info.icon}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">{info.label}</span>
              </div>
              <span className="text-gray-900 dark:text-white font-medium text-sm">{info.value}</span>
            </div>
          ))}
        </div>

        {/* Interests Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">❤️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {interest.icon} {interest.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Card */}
        {aboutInfo.achievements.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
              {aboutInfo.achievements.map((achievement, index) => (
                <div key={achievement.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🏆</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white font-medium text-sm">
                        {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Certificate of completion</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">📞</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Get In Touch</h3>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGithubClick}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-4 rounded-xl transition-all flex items-center justify-center active:scale-95 shadow-lg"
            >
              <span className="text-xl mr-3">📱</span>
              <span className="font-medium">View My GitHub</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 shadow-lg">
                <span className="mr-2">💼</span>
                <span>LinkedIn</span>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 shadow-lg">
                <span className="mr-2">✉️</span>
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fun Facts Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fun Facts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Loves creating interactive web experiences
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Always learning new technologies
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Enjoys solving complex problems
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
