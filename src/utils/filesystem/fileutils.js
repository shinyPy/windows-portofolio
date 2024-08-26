import React from "react";
import { useLanguage } from "../LanguageContext";

const FileUtils = ({ viewingFile, closeViewer, showCloseButton }) => {
  const { texts } = useLanguage();
  const { skillsText, welcomeText, aboutwebsiteText, infoText, changelogText } =
    texts;

  const getTextContent = (name) => {
    const textMapping = {
      "skills.txt": skillsText,
      "welcome.txt": welcomeText,
      "about website.txt": aboutwebsiteText,
      "info.txt": infoText,
      "changelog.txt": changelogText,
    };
    return textMapping[name] || "File not found.";
  };

  const renderImage = (src, name) => (
    <img
      src={src}
      alt={name}
      className="max-w-[90%] max-h-[90%] rounded-lg shadow-md border border-gray-300"
    />
  );

  const renderVideo = (src) => (
    <video controls className="max-w-[90%] max-h-[90%] rounded-lg shadow-md">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  const renderTextFile = (content) => (
    <div className="w-full h-full bg-white p-4 rounded-lg whitespace-pre-wrap overflow-auto text-balance text-black border border-gray-200">
      <pre className="font-mono text-base leading-relaxed w-full h-full overflow-x text-balance">
        {content}
      </pre>
    </div>
  );

  const renderContent = () => {
    const { type, name, src, url } = viewingFile;

    const contentMapping = {
      link: (
        <button
          onClick={() => window.open(url, "_blank")}
          className="text-blue-500 underline bg-white hover:text-blue-700 transition-colors"
        >
          Open Link
        </button>
      ),
      file:
        name.endsWith(".jpg") || name.endsWith(".png") ? (
          renderImage(src, name)
        ) : name.endsWith(".mp4") ? (
          renderVideo(src)
        ) : name.endsWith(".txt") ? (
          renderTextFile(getTextContent(name))
        ) : (
          <div className="text-gray-600">Unsupported file format</div>
        ),
    };

    return (
      contentMapping[type] || (
        <div className="text-gray-600">Unsupported file type</div>
      )
    );
  };

  return (
    <div className="fileUtils flex justify-center items-center w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 text-black relative rounded-lg p-4 overflow-auto">
      {showCloseButton && (
        <button
          onClick={closeViewer}
          className="absolute top-5 right-5 bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-300 transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          ✕
        </button>
      )}
      {renderContent()}
    </div>
  );
};

export default FileUtils;
