import React, { useState, useEffect } from 'react';

const MobileProjects = ({ filesystem, findItemById, initialFilesystem }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

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
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-white mb-2">My Projects</h1>
        <p className="text-white/80 text-sm">Explore my latest work and developments</p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {project.name.replace(/\.(mp4|exe)$/, '')}
                </h3>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              <div className="text-2xl ml-3">
                {project.type === 'link' ? '🔗' : '🎬'}
              </div>
            </div>

            <p className="text-white/80 text-sm mb-3 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">
                {project.type === 'link' ? 'Click to visit' : 'Click to watch'}
              </span>
              <span className="text-white/60 text-xs">
                {project.type === 'link' ? '↗' : '▶'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center text-white/60 mt-8">
          <div className="text-4xl mb-4">📁</div>
          <p>No projects found</p>
        </div>
      )}

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
