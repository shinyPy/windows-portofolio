import React, { useState, useEffect } from 'react';

const MobileProjects = ({ filesystem, findItemById, initialFilesystem, onBack }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const projectsFolder = findItemById(filesystem, 3);
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
    <div className="min-h-screen bg-gray-900 p-5">
      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg p-5 hover:brightness-110 transition-all cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white text-xl">
                  {project.type === 'link' ? '🔗' : '🎬'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-bold mb-1">
                  {project.name.replace(/\.(mp4|exe)$/, '')}
                </h3>
                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded font-medium">
                  {project.category}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-700 text-gray-200 px-3 py-1.5 rounded font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <span className="text-gray-400 text-sm">
                {project.type === 'link' ? 'Tap to visit' : 'Tap to watch'}
              </span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">
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
          <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📁</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">No Projects Found</h3>
          <p className="text-gray-400">Check back later for updates</p>
        </div>
      )}

      {/* Video Modal */}
      {selectedProject && selectedProject.type === 'video' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-800 rounded-lg p-5 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">
                {selectedProject.name.replace(/\.(mp4|exe)$/, '')}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <video
              controls
              className="w-full rounded-lg mb-4"
              src={selectedProject.src}
            >
              Your browser does not support the video tag.
            </video>

            <p className="text-gray-300 text-sm mb-4">
              {selectedProject.description}
            </p>

            <button
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
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
