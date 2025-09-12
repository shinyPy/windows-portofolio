import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import MobileInAppNavigation from './MobileInAppNavigation';

const MobileFileManager = ({ filesystem, findItemById, onBack }) => {
  const { language, setLanguage, texts } = useLanguage();
  const [currentView, setCurrentView] = useState('main');
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

      setAboutInfo(prev => ({
        ...prev,
        github: githubLink ? githubLink.url : '',
        info: texts.infoText
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
  }, [findItemById, texts]);

  const parseSkillsText = (text) => {
    const sections = text.split('\n\n').filter(section => section.trim());
    return sections.map(section => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0].replace(':', '');
      const items = lines.slice(1).map(line => {
        const match = line.match(/^- (.+)/);
        if (match) {
          const parts = match[1].split('\n');
          const name = parts[0];
          const description = parts.slice(1).join(' ').trim();
          return { name, description };
        }
        return null;
      }).filter(Boolean);

      return { title, items };
    });
  };

  const skillsSections = parseSkillsText(texts.skillsText);

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

  const fileStructure = [
    {
      id: 'about',
      name: 'About Me',
      type: 'folder',
      icon: '👤',
      description: 'Personal information and background'
    },
    {
      id: 'skills',
      name: 'Skills',
      type: 'folder',
      icon: '🛠️',
      description: 'Technical skills and tools'
    },
    {
      id: 'achievements',
      name: 'Achievements',
      type: 'folder',
      icon: '🏆',
      description: 'Certificates and accomplishments'
    },
    {
      id: 'contact',
      name: 'Contact',
      type: 'folder',
      icon: '📞',
      description: 'Ways to get in touch'
    }
  ];

  const handleFileClick = (fileId) => {
    setCurrentView(fileId);
  };

  const handleGithubClick = () => {
    if (aboutInfo.github) {
      window.open(aboutInfo.github, '_blank');
    }
  };

  const renderMainView = () => (
    <div className="px-4 pb-4 pt-4">
      {/* File Structure */}
      <div className="space-y-3">
        {fileStructure.map((item) => (
          <button
            key={item.id}
            onClick={() => handleFileClick(item.id)}
            className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 active:scale-98"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
              <div className="text-gray-400 text-xl">›</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAboutView = () => (
    <div className="px-4 pb-4 pt-4">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-lg">
            SP
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">ShinyPy</h2>
          <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">Full Stack Developer</p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
          {aboutInfo.info || 'Passionate developer with a love for creating innovative solutions and learning new technologies.'}
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
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
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
    </div>
  );

  const renderSkillsView = () => (
    <div className="px-4 pb-4 pt-4">
      {/* Skills Sections */}
      <div className="space-y-6">
        {skillsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg">
                  {section.title.includes('Tools') ? '🛠️' :
                   section.title.includes('Frameworks') ? '⚙️' :
                   section.title.includes('Languages') ? '📝' :
                   section.title.includes('Databases') ? '🗄️' :
                   section.title.includes('Architectures') ? '🏗️' : '💡'}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="text-gray-900 dark:text-white font-medium text-lg mb-1">{item.name}</h3>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievementsView = () => (
    <div className="px-4 pb-4 pt-4">
      {aboutInfo.achievements.length > 0 ? (
        <div className="space-y-3">
          {aboutInfo.achievements.map((achievement, index) => (
            <div key={achievement.id} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white font-medium text-lg">
                    {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Certificate of completion</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-16">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <p className="text-lg font-medium">No achievements found</p>
          <p className="text-sm mt-2">Check back later for updates</p>
        </div>
      )}
    </div>
  );

  const renderContactView = () => (
    <div className="px-4 pb-4 pt-4">
      <div className="space-y-4">
        <button
          onClick={handleGithubClick}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-2xl transition-all flex items-center justify-center active:scale-95 shadow-lg"
        >
          <span className="text-2xl mr-4">📱</span>
          <span className="font-medium text-lg">View My GitHub</span>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-2xl transition-all flex flex-col items-center justify-center active:scale-95 shadow-lg">
            <span className="text-2xl mb-2">💼</span>
            <span className="text-sm font-medium">LinkedIn</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-2xl transition-all flex flex-col items-center justify-center active:scale-95 shadow-lg">
            <span className="text-2xl mb-2">✉️</span>
            <span className="text-sm font-medium">Email</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Discord</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">shiniya_</p>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'about':
        return renderAboutView();
      case 'skills':
        return renderSkillsView();
      case 'achievements':
        return renderAchievementsView();
      case 'contact':
        return renderContactView();
      default:
        return renderMainView();
    }
  };

  const getCurrentTitle = () => {
    switch (currentView) {
      case 'about':
        return 'About Me';
      case 'skills':
        return 'Skills';
      case 'achievements':
        return 'Achievements';
      case 'contact':
        return 'Contact';
      default:
        return 'File Manager';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black ios-fade-in">
      <MobileInAppNavigation
        title={getCurrentTitle()}
        onBack={currentView === 'main' ? onBack : () => setCurrentView('main')}
      />

      <div className="flex-1 overflow-y-auto">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default MobileFileManager;
