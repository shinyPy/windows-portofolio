import React from "react";
import folderIconSrc from "../../assets/icons/folder.png";
import fileIconSrc from "../../assets/icons/file.png";
import exeIconSrc from "../../assets/icons/exeIcon.png";
import mdIconSrc from "../../assets/icons/mdIcon.png"; // Import the .md icon
import FileExplorerIcon from "../../assets/icons/file-explorer.png";
import DesktopIcon from "../icon/DesktopIcon";
import "../../assets/css/animations.css"; // Import CSS for the animation

const DesktopIconContainer = ({ filesystem, onFileClick, openWindow }) => {
  return (
    <div className="desktop">
      <DesktopIcon
        className="desktop-icon desktop-icon-appear transition05"
        name="Thunar"
        iconSrc={FileExplorerIcon}
        onDoubleClick={() => openWindow("Thunar", 1)}
      />
      {filesystem.map((item) => (
        <DesktopIcon
          key={item.id}
          className="desktop-icon desktop-icon-appear transition05"
          name={item.name}
          iconSrc={
            item.type === "folder"
              ? folderIconSrc
              : item.name.endsWith(".exe")
                ? exeIconSrc
                : item.name.endsWith(".md") // Check for .md files
                  ? mdIconSrc
                  : fileIconSrc
          }
          onDoubleClick={() => onFileClick(item.id)}
        />
      ))}
    </div>
  );
};

export default DesktopIconContainer;
