import React from 'react';

function LoadingSkeleton({ count = 1, type = 'card' }) {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, i) => (
          <div key={i} className="skeleton-card animate-skeleton-pulse bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-700 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'text') {
    return (
      <>
        {skeletons.map((_, i) => (
          <div key={i} className="animate-skeleton-pulse space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-700 rounded w-4/6" />
          </div>
        ))}
      </>
    );
  }

  if (type === 'tile') {
    return (
      <>
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="skeleton-tile animate-skeleton-pulse bg-gray-700 rounded-lg"
            style={{ aspectRatio: '1/1' }}
          />
        ))}
      </>
    );
  }

  return null;
}

export default LoadingSkeleton;
