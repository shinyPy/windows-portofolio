import React from "react";

function FileItem({ item, updatePath }) {
  const getIcon = () => {
    switch (item.type) {
      case "folder":
        return "📁";
      case "link":
        return "🔗";
      default:
        if (item.name.endsWith(".exe")) return "💻";
        if (item.name.endsWith(".md")) return "📝";
        if (item.name.endsWith(".mp4")) return "📽️";
        if (/\.(jpg|png)$/i.test(item.name)) return "🖼️";
        return "📄";
    }
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
      className="fileItem flex flex-col items-center p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 hover:bg-gray-50 transition-all macos-file-item"
      role="button"
      tabIndex="0"
      aria-label={`Open ${item.name}`}
    >
      <span className="text-4xl mb-4">{getIcon()}</span>
      <span className="text-sm text-center break-all font-medium text-gray-800 truncate w-full">
        {item.name}
      </span>
    </div>
  );
}

export default FileItem;
