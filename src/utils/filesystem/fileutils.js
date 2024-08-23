import React from "react";
import { useLanguage } from "../LanguageContext";

const FileUtils = ({ viewingFile, closeViewer, showCloseButton }) => {
  const { texts } = useLanguage();
  const { skillsText, welcomeText, aboutwebsiteText, infoText } = texts;

  const getTextContent = (name) => {
    const textMapping = {
      "skills.txt": skillsText,
      "welcome.txt": welcomeText,
      "about website.txt": aboutwebsiteText,
      "info.txt": infoText,
    };
    return textMapping[name] || "File not found.";
  };

  const renderImage = (src, name) => (
    <img src={src} alt={name} className="max-w-[90%] max-h-[90%] rounded-lg" />
  );

  const renderVideo = (src) => (
    <video controls className="max-w-[90%] max-h-[90%] rounded-lg">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  const renderTextFile = (content) => (
    <div className="w-full h-full bg-white p-4 rounded-lg whitespace-pre-wrap overflow-auto text-balance text-black">
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
          className="text-blue-500 underline bg-white hover:text-blue-700"
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
          <div>Unsupported file format</div>
        ),
    };

    return contentMapping[type] || <div>Unsupported file type</div>;
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
