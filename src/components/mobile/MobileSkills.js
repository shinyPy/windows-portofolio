import React, { useState, useEffect } from 'react';
import { skillsText } from '../../data/texts';

const MobileSkills = ({ filesystem, findItemById, onBack }) => {
  const [skillsContent, setSkillsContent] = useState('');

  useEffect(() => {
    // Load skills text from data
    setSkillsContent(skillsText);
  }, []);

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

  const skillsSections = parseSkillsText(skillsContent);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black ios-fade-in">
      {/* iOS Navigation Bar */}
      <div className="bg-white/95 dark:bg-black/95 ios-blur border-b border-gray-200/50 dark:border-gray-800/50 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 ios-shadow-sm">
              <span className="text-white text-lg">🛠️</span>
            </div>
            <h1 className="ios-title text-black dark:text-white">Skills</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Skills Sections */}
        <div className="space-y-4">
          {skillsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="ios-card dark:ios-card-dark p-6 ios-fade-in" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
                  <span className="text-white text-xl">
                    {section.title.includes('Tools') ? '🛠️' :
                     section.title.includes('Frameworks') ? '⚙️' :
                     section.title.includes('Languages') ? '📝' :
                     section.title.includes('Databases') ? '🗄️' :
                     section.title.includes('Architectures') ? '🏗️' : '💡'}
                  </span>
                </div>
                <h2 className="ios-title text-black dark:text-white">{section.title}</h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start">
                    <div className="w-1 h-6 ios-bg-blue rounded-full mr-4 flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black dark:text-white mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="ios-body text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Overview */}
        <div className="mt-6 ios-card dark:ios-card-dark p-6">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-lg">📊</span>
            </div>
            <h3 className="ios-title text-black dark:text-white">Overview</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="ios-bg-gray dark:bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold ios-blue mb-2">
                {skillsSections.length}
              </div>
              <div className="ios-caption dark:text-gray-400">Categories</div>
            </div>
            <div className="ios-bg-gray dark:bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {skillsSections.reduce((total, section) => total + section.items.length, 0)}
              </div>
              <div className="ios-caption dark:text-gray-400">Total Skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSkills;
