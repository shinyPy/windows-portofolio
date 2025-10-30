import React, { useState } from 'react';

const MobileFileManager = ({ filesystem, findItemById, onBack, language = 'en' }) => {
  const [currentPath, setCurrentPath] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);

  const text = {
    en: {
      files: 'Files',
      folders: 'Folders',
      items: 'items',
      empty: 'Empty Folder',
      noFiles: 'No files to display',
      back: 'Back'
    },
    id: {
      files: 'Berkas',
      folders: 'Folder',
      items: 'item',
      empty: 'Folder Kosong',
      noFiles: 'Tidak ada berkas untuk ditampilkan',
      back: 'Kembali'
    }
  };

  const t = text[language] || text.en;

  const getRootFolder = () => {
    if (!filesystem || filesystem.length === 0) return null;
    return filesystem[0]?.contents?.[0];
  };

  const getCurrentContents = () => {
    if (currentPath.length === 0) {
      const root = getRootFolder();
      return root?.contents || [];
    }
    
    let current = getRootFolder();
    for (const pathId of currentPath) {
      const found = current?.contents?.find(item => item.id === pathId);
      if (found) current = found;
    }
    return current?.contents || [];
  };

  const handleFolderClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.id]);
      setCurrentFolder(item);
    } else if (item.type === 'link') {
      window.open(item.url, '_blank');
    }
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      
      if (newPath.length > 0) {
        let current = getRootFolder();
        for (const pathId of newPath) {
          const found = current?.contents?.find(item => item.id === pathId);
          if (found) current = found;
        }
        setCurrentFolder(current);
      } else {
        setCurrentFolder(null);
      }
    } else {
      onBack();
    }
  };

  const getItemIcon = (item) => {
    if (item.type === 'folder') return '📁';
    if (item.type === 'link') return '🔗';
    if (item.type === 'file') {
      if (item.name.includes('.txt')) return '📄';
      if (item.name.includes('.mp4')) return '🎬';
      if (item.name.includes('.exe')) return '⚙️';
      if (item.name.includes('.jpg') || item.name.includes('.png')) return '🖼️';
    }
    return '📄';
  };

  const contents = getCurrentContents();

  return (
    <div className="min-h-screen p-5 pb-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-500 hover:text-blue-600 font-semibold transition-colors active:scale-95"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {currentPath.length > 0 ? t.back : t.files}
        </button>
        
        {currentFolder && (
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold mt-2">
            {currentFolder.name}
          </h2>
        )}
      </div>

      {/* File/Folder Grid */}
      {contents.length > 0 ? (
        <div className="space-y-3">
          {contents.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleFolderClick(item)}
              className="w-full ios-card dark:ios-card-dark p-5 hover:scale-[1.02] transition-all cursor-pointer ios-fade-in text-left active:scale-95"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 ios-shadow-sm">
                  <span className="text-2xl">{getItemIcon(item)}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1 truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg font-semibold border border-blue-100 dark:border-blue-800">
                      {item.type === 'folder' ? t.folders : item.type}
                    </span>
                    {item.type === 'folder' && item.contents && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.contents.length} {t.items}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {item.type === 'folder' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center ios-shadow-sm ml-3">
                    <span className="text-white text-sm font-bold">›</span>
                  </div>
                )}
                {item.type === 'link' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center ios-shadow-sm ml-3">
                    <span className="text-white text-sm font-bold">↗</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center ios-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 ios-shadow-lg">
            <span className="text-5xl">📂</span>
          </div>
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">{t.empty}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t.noFiles}</p>
        </div>
      )}
    </div>
  );
};

export default MobileFileManager;
