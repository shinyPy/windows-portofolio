import React, { useState, useEffect } from 'react';

const MobileSkills = ({ filesystem, findItemById }) => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load skills from skills.txt file
    const skillsFile = findItemById(12); // skills.txt ID
    if (skillsFile) {
      // Default skills data since we can't directly read the file content
      const defaultSkills = [
        {
          category: 'Frontend',
          icon: '🎨',
          skills: [
            { name: 'React', level: 90, description: 'Advanced component development' },
            { name: 'JavaScript', level: 85, description: 'ES6+ modern JavaScript' },
            { name: 'HTML5', level: 95, description: 'Semantic markup' },
            { name: 'CSS3', level: 90, description: 'Responsive design & animations' },
            { name: 'Tailwind CSS', level: 85, description: 'Utility-first CSS framework' }
          ]
        },
        {
          category: 'Backend',
          icon: '⚙️',
          skills: [
            { name: 'Node.js', level: 80, description: 'Server-side JavaScript' },
            { name: 'Express.js', level: 75, description: 'Web application framework' },
            { name: 'API Development', level: 85, description: 'RESTful services' },
            { name: 'Database', level: 70, description: 'MongoDB, MySQL' }
          ]
        },
        {
          category: 'Tools',
          icon: '🛠️',
          skills: [
            { name: 'Git', level: 90, description: 'Version control' },
            { name: 'VS Code', level: 95, description: 'Code editor' },
            { name: 'npm/yarn', level: 85, description: 'Package management' },
            { name: 'Vercel', level: 80, description: 'Deployment platform' }
          ]
        },
        {
          category: 'Other',
          icon: '💡',
          skills: [
            { name: 'Problem Solving', level: 90, description: 'Analytical thinking' },
            { name: 'UI/UX Design', level: 75, description: 'User experience focus' },
            { name: 'Responsive Design', level: 90, description: 'Mobile-first approach' },
            { name: 'Performance', level: 80, description: 'Optimization techniques' }
          ]
        }
      ];

      setSkills(defaultSkills);
    }
  }, [findItemById]);

  const categories = ['all', ...skills.map(cat => cat.category.toLowerCase())];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(cat => cat.category.toLowerCase() === selectedCategory);

  const getSkillColor = (level) => {
    if (level >= 80) return 'from-green-500 to-emerald-500';
    if (level >= 60) return 'from-blue-500 to-cyan-500';
    return 'from-yellow-500 to-orange-500';
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-white mb-2">My Skills</h1>
        <p className="text-white/80 text-sm">Technologies and tools I work with</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-white text-blue-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Categories */}
      <div className="space-y-6">
        {filteredSkills.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{category.icon}</span>
              <h2 className="text-xl font-semibold text-white">{category.category}</h2>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/60 text-sm">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  <p className="text-white/70 text-xs">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              {skills.reduce((total, cat) => total + cat.skills.length, 0)}
            </div>
            <div className="text-white/60 text-sm">Total Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {Math.round(
                skills.reduce((total, cat) =>
                  total + cat.skills.reduce((catTotal, skill) => catTotal + skill.level, 0), 0
                ) / skills.reduce((total, cat) => total + cat.skills.length, 0)
              ) || 0}%
            </div>
            <div className="text-white/60 text-sm">Average Level</div>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-3">Currently Learning</h3>
        <div className="space-y-2">
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Advanced React patterns and hooks
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            TypeScript for better code quality
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
            Next.js for full-stack development
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSkills;
