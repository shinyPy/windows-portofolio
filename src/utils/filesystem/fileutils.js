import React from "react";
import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw"; // Import the plugin for rendering raw HTML
import { useLanguage } from "../LanguageContext"; // Import the useLanguage hook

const FileUtils = ({ viewingFile, closeViewer, showCloseButton }) => {
  const { texts } = useLanguage(); // Get the current texts based on selected language
  const { skillsText, welcomeText, aboutwebsiteText, infoText } = texts;

  const handleLinkClick = () => {
    if (viewingFile.type === "link" && viewingFile.url) {
      window.open(viewingFile.url, "_blank");
    }
  };

  const renderContent = () => {
    const { type, name } = viewingFile;

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
              src={viewingFile.src}
              alt={name}
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          );
        } else if (name.endsWith(".mp4")) {
          return (
            <video controls className="max-w-[90%] max-h-[90%] rounded-lg">
              <source src={viewingFile.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        } else if (name.endsWith(".txt")) {
          // Determine the correct text content based on the file name
          let content;
          switch (name) {
            case "skills.txt":
              content = skillsText;
              break;
            case "welcome.txt":
              content = welcomeText;
              break;
            case "about website.txt":
              content = aboutwebsiteText;
              break;
            case "info.txt":
              content = infoText;
              break;
            default:
              content = "File not found.";
              break;
          }

          return (
            <div className="w-full h-full bg-white p-4 rounded-lg whitespace-pre-wrap overflow-auto text-balance text-black">
              <pre className="font-mono text-base leading-relaxed w-full h-full overflow-x text-balance">
                {content}
              </pre>
            </div>
          );
        } else if (name.endsWith(".md")) {
          return (
            <div className="w-full h-full bg-white p-4 rounded-lg overflow-auto text-balance prose prose-sm">
              <ReactMarkdown>{viewingFile.src}</ReactMarkdown>
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
