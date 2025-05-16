import React, { useMemo } from "react";
import PropTypes from "prop-types";

/**
 * FileItem component for displaying individual files and folders
 * @param {Object} props - Component props
 * @param {Object} props.item - The file/folder item data
 * @param {Function} props.updatePath - Function to update path on item click
 */
function FileItem({ item, updatePath }) {
  /**
   * Get appropriate icon based on item type and extension
   * @returns {string} The emoji icon to display
   */
  const icon = useMemo(() => {
    switch (item.type) {
      case "folder":
        return "📁";
      case "link":
        return "🔗";
      default:
        if (item.name.endsWith(".exe")) return "💻";
        if (item.name.endsWith(".md")) return "📝";
        if (item.name.endsWith(".mp4")) return "📽️";
        if (/\.(jpg|png|gif|jpeg|svg)$/i.test(item.name)) return "🖼️";
        return "📄";
    }
  }, [item.type, item.name]);

  /**
   * Handle double click event
   */
  const handleDoubleClick = () => {
    if (item.type === "link") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      updatePath(item.id);
    }
  };

  /**
   * Handle keyboard navigation - activate on Enter key
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDoubleClick();
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className="fileItem flex flex-col items-center p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 hover:bg-gray-50 transition-all macos-file-item"
      role="button"
      tabIndex="0"
      aria-label={`Open ${item.name}`}
    >
      <span className="text-4xl mb-4" aria-hidden="true">
        {icon}
      </span>
      <span className="text-sm text-center break-all font-medium text-clip text-gray-800 w-full">
        {item.name}
      </span>
    </div>
  );
}

FileItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string, // Only for link types
    src: PropTypes.string, // For files with sources
  }).isRequired,
  updatePath: PropTypes.func.isRequired,
};

export default React.memo(FileItem);
