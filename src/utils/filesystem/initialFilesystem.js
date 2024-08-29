import dev from "../../assets/videos/dev.mp4";
import devs from "../../assets/videos/devs.mp4";
import mern from "../../assets/images/udemy.jpg";

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
      createFolder(3, "Projects!", [
        createFile(
          4,
          "TEFAREN",
          "link",
          null,
          "https://fe-tefaren-v2.vercel.app/",
        ),
        createFile(
          5,
          "Earlier Development Stage of this website.mp4",
          "file",
          dev,
        ),
        createFile(
          6,
          "Earlier Development Stage of this website 2.mp4",
          "file",
          devs,
        ),
      ]),
      createFolder(7, "Achievements", [
        createFile(8, "certificate.jpg", "file", mern),
      ]),
      createFolder(9, "About me!", [
        createFile(
          10,
          "My Github",
          "link",
          null,
          "https://github.com/shinyPy/",
        ),
        createFile(11, "info.txt", "file"),
      ]),
      createFile(12, "skills.txt", "file"),
      createFile(13, "welcome.txt", "file"),
      createFile(14, "aboutWebsite.txt", "file"),
      createFile(15, "changelog.txt", "file"),
    ]),
  ]),
];

export default initialFilesystem;
