import React, { useState, useEffect } from 'react';
import { skillsText } from '../../data/texts';

const MobileSkills = ({ filesystem, findItemById, onBack, language = 'en' }) => {
  const [skillsContent, setSkillsContent] = useState('');

  useEffect(() => {
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

  const text = {
    en: {
      skills: 'Skills',
      categories: 'Categories',
      totalSkills: 'Total Skills',
      overview: 'Overview'
    },
    id: {
      skills: 'Keterampilan',
      categories: 'Kategori',
      totalSkills: 'Total Keterampilan',
      overview: 'Ringkasan'
    }
  };

  const t = text[language] || text.en;

  return (
    <div className="min-h-screen p-5 pb-8">
      <div className="flex-1 overflow-y-auto">
        {/* Skills Sections */}
        <div className="space-y-4">
          {skillsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="ios-card dark:ios-card-dark p-6 ios-fade-in hover:scale-[1.01] transition-transform" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
                  <span className="text-white text-xl">
                    {section.title.includes('Tools') ? '🛠️' :
                     section.title.includes('Frameworks') ? '⚙️' :
                     section.title.includes('Languages') ? '📝' :
                     section.title.includes('Databases') ? '🗄️' :
                     section.title.includes('Architectures') ? '🏗️' : '💡'}
                  </span>
                </div>
                <h2 className="ios-title text-lg font-bold text-gray-900 dark:text-white">{section.title}</h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/30 dark:to-transparent rounded-lg p-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4 flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="ios-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
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
            <h3 className="ios-title text-gray-900 dark:text-white">{t.overview}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {skillsSections.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t.categories}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {skillsSections.reduce((total, section) => total + section.items.length, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t.totalSkills}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSkills;
