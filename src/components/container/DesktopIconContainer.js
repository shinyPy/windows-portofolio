import React from "react";
import folderIconSrc from "../../assets/icons/folder.png";
import fileIconSrc from "../../assets/icons/file.png";
import exeIconSrc from "../../assets/icons/exeIcon.png";
import mdIconSrc from "../../assets/icons/mdIcon.png";
import linkIconSrc from "../../assets/icons/linkIcon.png";
import FileExplorerIcon from "../../assets/icons/file-explorer.png";
import DesktopIcon from "../icon/DesktopIcon";
import "../../assets/css/animations.css";

const DesktopIconContainer = ({ filesystem, onFileClick, openWindow }) => {
  const getIconSrc = (item) => {
    if (item.type === "folder") return folderIconSrc;
    if (item.type === "link") return linkIconSrc;
    if (item.name.endsWith(".exe")) return exeIconSrc;
    if (item.name.endsWith(".md")) return mdIconSrc;
    return fileIconSrc;
  };

  return (
    <div className="desktop-container">
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
          iconSrc={getIconSrc(item)}
          onDoubleClick={() => onFileClick(item.id)}
        />
      ))}
    </div>
  );
};

export default DesktopIconContainer;
