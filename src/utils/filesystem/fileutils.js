import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // Import the plugin for rendering raw HTML

const FileUtils = ({ viewingFile, closeViewer, showCloseButton }) => {
  const handleLinkClick = () => {
    if (viewingFile.type === "link" && viewingFile.url) {
      window.open(viewingFile.url, "_blank");
    }
  };

  const renderContent = () => {
    const { type, name, src } = viewingFile;

    switch (type) {
      case "link":
        return (
          <button
            onClick={handleLinkClick}
            className="text-blue-500 underline bg-white hover:text-blue-700"
          >
            Open Link
          </button>
        );
      case "file":
        if (name.endsWith(".jpg") || name.endsWith(".png")) {
          return (
            <img
              src={src}
              alt={name}
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          );
        } else if (name.endsWith(".mp4")) {
          return (
            <video controls className="max-w-[90%] max-h-[90%] rounded-lg">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        } else if (name.endsWith(".txt")) {
          return (
            <div className="w-full h-full bg-white p-4 rounded-lg whitespace-pre-wrap overflow-auto text-balance text-black">
              <pre className="font-mono text-base leading-relaxed w-full h-full overflow-x text-balance">
                {src}
              </pre>
            </div>
          );
        } else if (name.endsWith(".md")) {
          return (
            <div className="w-full h-full bg-white p-4 rounded-lg overflow-auto text-balance prose prose-sm">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{src}</ReactMarkdown>
            </div>
          );
        } else {
          return <div>Unsupported file format</div>;
        }
      default:
        return <div>Unsupported file type</div>;
    }
  };

  return (
    <div className="fileUtils flex justify-center items-center w-full h-full bg-white text-black relative rounded-lg p-4 overflow-auto">
      {showCloseButton && (
        <button
          onClick={closeViewer}
          className="absolute top-5 right-5 bg-black bg-opacity-10 text-black border border-black border-opacity-20 px-4 py-2 rounded-full text-sm backdrop-blur-md transition-transform duration-300 hover:bg-opacity-20 hover:scale-110 focus:outline-none"
        >
          Close
        </button>
      )}
      {renderContent()}
    </div>
  );
};

export default FileUtils;
