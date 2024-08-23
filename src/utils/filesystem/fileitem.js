import React from "react";

function FileItem({ item, updatePath }) {
  const getIcon = () => {
    if (item.type === "folder") return "📁";
    if (item.type === "link") return "🔗"; // Icon for link type
    if (item.name.endsWith(".exe")) return "💻";
    // if (item.name.endsWith(".md")) return "📝"; // Icon for Markdown files
    return "📄";
  };

  const handleDoubleClick = () => {
    if (item.type === "link") {
      window.open(item.url, "_blank"); // Open link in a new tab
    } else {
      updatePath(item.id);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="fileExplorerItem flex items-center p-3 cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition-all"
    >
      <span className="mr-3 text-lg">{getIcon()}</span>
      <span className="text-sm font-medium text-gray-700">{item.name}</span>
    </div>
  );
}

export default FileItem;
