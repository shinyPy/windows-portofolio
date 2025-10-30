import React, { useState, useEffect } from 'react';

const MobileProjects = ({ filesystem, findItemById, initialFilesystem, onBack, language = 'en' }) => {
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
            description: getProjectDescription(item.name, language),
            category: language === 'en' ? 'Web Application' : 'Aplikasi Web',
            tech: getProjectTech(item.name)
          };
        } else if (item.type === 'file' && item.name.includes('.mp4')) {
          return {
            id: item.id,
            name: item.name,
            type: 'video',
            src: item.src,
            description: language === 'en' ? 'Development process video' : 'Video proses pengembangan',
            category: language === 'en' ? 'Development' : 'Pengembangan',
            tech: ['React', 'JavaScript', 'CSS']
          };
        }
        return null;
      }).filter(Boolean);

      setProjects(projectList);
    }
  }, [findItemById, filesystem, language]);

  const getProjectDescription = (name, lang) => {
    switch (name) {
      case 'TEFAREN':
        return lang === 'en'
          ? 'A comprehensive web application built with modern technologies, featuring responsive design and interactive user interfaces.'
          : 'Aplikasi web komprehensif yang dibangun dengan teknologi modern, menampilkan desain responsif dan antarmuka pengguna interaktif.';
      default:
        return lang === 'en'
          ? 'An innovative project showcasing technical skills and creative problem-solving.'
          : 'Proyek inovatif yang menampilkan keterampilan teknis dan pemecahan masalah kreatif.';
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

  const text = {
    en: {
      tapToVisit: 'Tap to visit',
      tapToWatch: 'Tap to watch',
      noProjects: 'No Projects Found',
      checkLater: 'Check back later for updates',
      close: 'Close'
    },
    id: {
      tapToVisit: 'Ketuk untuk kunjungi',
      tapToWatch: 'Ketuk untuk tonton',
      noProjects: 'Tidak Ada Proyek',
      checkLater: 'Periksa kembali nanti untuk pembaruan',
      close: 'Tutup'
    }
  };

  const t = text[language] || text.en;

  return (
    <div className="min-h-screen p-5 pb-8">
      {/* Projects Grid */}
      {projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className="w-full ios-card dark:ios-card-dark p-5 hover:scale-[1.02] transition-all cursor-pointer ios-fade-in text-left active:scale-95"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              {/* Header */}
              <div className="flex items-start mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 ios-shadow-sm">
                  <span className="text-white text-2xl">
                    {project.type === 'link' ? '🔗' : '🎬'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-2 truncate">
                    {project.name.replace(/\.(mp4|exe)$/, '')}
                  </h3>
                  <span className="inline-block text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-lg font-semibold">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg font-semibold border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {project.type === 'link' ? t.tapToVisit : t.tapToWatch}
                </span>
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center ios-shadow-sm">
                  <span className="text-white text-sm font-bold">
                    {project.type === 'link' ? '↗' : '▶'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center ios-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 ios-shadow-lg">
            <span className="text-5xl">📁</span>
          </div>
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">{t.noProjects}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t.checkLater}</p>
        </div>
      )}

      {/* Video Modal */}
      {selectedProject && selectedProject.type === 'video' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="ios-card dark:ios-card-dark p-5 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white font-bold text-lg truncate flex-1">
                {selectedProject.name.replace(/\.(mp4|exe)$/, '')}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl w-9 h-9 flex items-center justify-center ml-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <video
              controls
              className="w-full rounded-xl mb-4 ios-shadow-lg"
              src={selectedProject.src}
            >
              Your browser does not support the video tag.
            </video>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {selectedProject.description}
            </p>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3.5 px-4 rounded-xl transition-all font-semibold active:scale-95 ios-shadow-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileProjects;
