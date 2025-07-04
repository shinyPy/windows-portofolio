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
    const projectsFolder = findItemById(3); // Projects folder ID
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
  }, [findItemById]);

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
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Mobile App Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-3"
            >
              ←
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg">💼</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h1>
            </div>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm font-semibold">{language === 'en' ? 'ID' : 'EN'}</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 active:scale-98"
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">
                        {project.type === 'link' ? '🔗' : '🎬'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                        {project.name.replace(/\.(mp4|exe)$/, '')}
                      </h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {project.type === 'link' ? 'Tap to visit website' : 'Tap to watch video'}
                </span>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    {project.type === 'link' ? '↗' : '▶'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-16">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm mt-2">Check back later for updates</p>
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
