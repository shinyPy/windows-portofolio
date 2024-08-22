import saberImage from "../../assets/images/saber.jpg";
import dev from "../../assets/videos/dev.mp4";
import devs from "../../assets/videos/devs.mp4";

import {
  skillsText,
  welcomeText,
  aboutwebsiteText,
  infoText,
} from "../../data/texts";

const createFile = (id, name, type, src = null, url = null) => ({
  id,
  name,
  type,
  src,
  url,
});

const createFolder = (id, name, contents = []) => ({
  id,
  name,
  type: "folder",
  contents,
});

const initialFilesystem = [
  createFolder(1, "/", [
    createFolder(2, "desktop", [
      createFolder(3, "Achievements", [
        createFile(4, "picture.jpg", "file", saberImage),
      ]),
      createFolder(5, "Projects!", [
        // createFile(6, "My Github", "link", null, "https://github.com/shinyPy/"),
        createFile(
          17,
          "TEFAREN",
          "link",
          null,
          "https://fe-tefaren-v2.vercel.app/",
        ),
        createFile(
          11,
          "Earlier Development Stage of this website.mp4",
          "file",
          dev,
        ),
        createFile(
          21,
          "Earlier Development Stage of this website 2.mp4",
          "file",
          devs,
        ),
      ]),
      createFolder(12, "About me!", [
        createFile(
          13,
          "My Github",
          "link",
          null,
          "https://github.com/shinyPy/",
        ),
        // createFile(14, "rawr.mp4", "file", rawrVideo),
        createFile(19, "info.txt", "file", infoText),
      ]),
      createFile(8, "skills.txt", "file", skillsText),
      createFile(9, "welcome.txt", "file", welcomeText),
      createFile(10, "about website.txt", "file", aboutwebsiteText),
    ]),
  ]),
];

export default initialFilesystem;
