import dev from "../../assets/videos/dev.mp4";
import devs from "../../assets/videos/devs.mp4";

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
      createFolder(5, "Projects!", [
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
        createFile(19, "info.txt", "file"),
      ]),
      createFile(8, "skills.txt", "file"),
      createFile(9, "welcome.txt", "file"),
      createFile(10, "about website.txt", "file"),
    ]),
  ]),
];

export default initialFilesystem;
