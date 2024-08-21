// Breadcrumb.js
import React from 'react';

function Breadcrumb({ currentPath, goToFolder, goBack, findItemById, filesystem }) {
  return (
    <nav className="flex px-4 py-2 text-gray-700 border border-gray-200 rounded-lg bg-white mb-4 shadow-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2">
        {currentPath.length > 1 && (
          <li className="inline-flex items-center">
            <button
              onClick={goBack}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Back
            </button>
          </li>
        )}
        {currentPath.map((id, index) => {
          const folder = findItemById(filesystem, id);
          return (
            <li key={id} className="inline-flex items-center">
              {index > 0 && (
                <svg
                  className="w-3 h-3 mx-1 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              )}
              <button
                onClick={() => goToFolder(id)}
                className={`text-sm font-medium ${
                  index === currentPath.length - 1
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-500 transition-colors'
                }`}
              >
                {folder.name === '/' ? 'root' : folder.name}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
