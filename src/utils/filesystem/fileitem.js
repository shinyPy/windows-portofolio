import React from "react";

function FileItem({ item, updatePath }) {
  const getIcon = () => {
    if (item.type === "folder") return "📁";
    if (item.type === "link") return "🔗";
    if (item.name.endsWith(".exe")) return "💻";
    if (item.name.endsWith(".md")) return "📝";
    if (item.name.endsWith(".mp4")) return "📽️";
    if (item.name.endsWith(".jpg") || item.name.endsWith(".png")) return "🖼️";
    return "📄";
  };

  const handleDoubleClick = () => {
    if (item.type === "link") {
      window.open(item.url, "_blank");
    } else {
      updatePath(item.id);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="fileItem flex flex-col items-center p-3 cursor-pointer bg-white rounded-lg shadow-sm border border-gray-300 hover:bg-gray-100 transition-all macos-file-item"
    >
      <span className="text-4xl mb-5">{getIcon()}</span>
      <span className="text-xs text-center text-wrap font-medium text-gray-900">
        {item.name}
      </span>
    </div>
  );
}

export default FileItem;
