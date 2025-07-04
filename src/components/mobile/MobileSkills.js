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
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-lg">🛠️</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h1>
          </div>
        </div>
      </div>

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

        {/* Skills Overview */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Overview</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-500 mb-1">
                {skillsSections.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Categories</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {skillsSections.reduce((total, section) => total + section.items.length, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSkills;
