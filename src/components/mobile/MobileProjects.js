import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../utils/LanguageContext';

const MobileProjects = ({ filesystem, findItemById, initialFilesystem, onBack }) => {
  const { language, setLanguage } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  useEffect(() => {
    // Find the Projects folder and extract projects
    const projectsFolder = findItemById(filesystem, 3); // Projects folder ID
    if (projectsFolder && projectsFolder.contents) {
      const projectList = projectsFolder.contents.map(item => {
        if (item.type === 'link') {
          return {
            id: item.id,
            name: item.name,
            type: 'link',
            url: item.url,
            description: getProjectDescription(item.name),
            category: 'Web Application',
            tech: getProjectTech(item.name)
          };
        } else if (item.type === 'file' && item.name.includes('.mp4')) {
          return {
            id: item.id,
            name: item.name,
            type: 'video',
            src: item.src,
            description: 'Development process video',
            category: 'Development',
            tech: ['React', 'JavaScript', 'CSS']
          };
        }
        return null;
      }).filter(Boolean);

      setProjects(projectList);
    }
  }, [findItemById, filesystem]);

  const getProjectDescription = (name) => {
    switch (name) {
      case 'TEFAREN':
        return 'A comprehensive web application built with modern technologies, featuring responsive design and interactive user interfaces.';
      default:
        return 'An innovative project showcasing technical skills and creative problem-solving.';
    }
  };

  const getProjectTech = (name) => {
    switch (name) {
      case 'TEFAREN':
        return ['React', 'JavaScript', 'CSS', 'API Integration'];
      default:
        return ['JavaScript', 'HTML', 'CSS'];
    }
  };

  const handleProjectClick = (project) => {
    if (project.type === 'link') {
      window.open(project.url, '_blank');
    } else if (project.type === 'video') {
      setSelectedProject(project);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black ios-fade-in">
      {/* iOS Navigation Bar */}
      <div className="bg-white/95 dark:bg-black/95 ios-blur border-b border-gray-200/50 dark:border-gray-800/50 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 ios-shadow-sm">
                <span className="text-white text-lg">💼</span>
              </div>
              <h1 className="ios-title text-black dark:text-white">Portfolio</h1>
            </div>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg ios-bg-gray dark:bg-gray-800 transition-all duration-200 active:scale-95"
          >
            <span className="text-sm font-semibold ios-blue">{language === 'en' ? 'ID' : 'EN'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="ios-card dark:ios-card-dark p-6 hover:ios-shadow-lg transition-all duration-200 active:scale-98 ios-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 ios-shadow-sm">
                      <span className="text-white text-xl">
                        {project.type === 'link' ? '🔗' : '🎬'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="ios-title text-black dark:text-white mb-1">
                        {project.name.replace(/\.(mp4|exe)$/, '')}
                      </h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 ios-blue px-3 py-1 rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="ios-body text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs ios-bg-gray dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="ios-caption dark:text-gray-400">
                  {project.type === 'link' ? 'Tap to visit website' : 'Tap to watch video'}
                </span>
                <div className="w-7 h-7 ios-bg-blue rounded-full flex items-center justify-center ios-shadow-sm">
                  <span className="text-white text-sm font-medium">
                    {project.type === 'link' ? '↗' : '▶'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center mt-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 ios-shadow-sm">
              <span className="text-3xl">📁</span>
            </div>
            <h3 className="ios-title text-black dark:text-white mb-2">No Projects Found</h3>
            <p className="ios-caption dark:text-gray-400">Check back later for updates</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedProject && selectedProject.type === 'video' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-sm w-full border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                {selectedProject.name.replace(/\.(mp4|exe)$/, '')}
              </h3>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <video
              controls
              className="w-full rounded-lg mb-4"
              src={selectedProject.src}
            >
              Your browser does not support the video tag.
            </video>

            <p className="text-white/80 text-sm mb-4">
              {selectedProject.description}
            </p>

            <button
              onClick={closeModal}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileProjects;
