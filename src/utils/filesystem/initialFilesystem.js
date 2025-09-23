import dev from "../../assets/videos/dev.mp4";
import devs from "../../assets/videos/devs.mp4";
import devFlutter from "../../assets/videos/dev-flutter.mp4";
import devST from "../../assets/videos/sitekalas.mp4";
import mern from "../../assets/images/udemy.jpg";
import wntl1 from "../../assets/images/wn-tl-1.png";
import wntl2 from "../../assets/images/wn-tl-2.png";
import certificateMagang from "../../assets/images/sertifikat-magang.png";
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
      createFolder(3, "Projects", [
        createFolder(30, "TEFAREN", [
          createFile(
            4,
            "TEFAREN",
            "link",
            null,
            "https://fe-tefaren-v2.vercel.app/",
          ),
          createFile(32, "info-tefaren.txt", "file"),
        ]),
        createFolder(31, "Portfolio Development", [
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
          createFile(33, "info.txt", "file"),
        ]),
        createFolder(19, "webnovel ai-translation", [
          createFile(20, "wntl1.jpg", "file", wntl1),
          createFile(21, "wntl2.jpg", "file", wntl2),
          createFile(22, "info-wn.txt", "file"),
        ]),
        createFolder(23, "Old Portfolio", [
          createFile(24, "info-porto.txt", "file"),
          createFile(25, "fthlrzi", "link", null, "https://fthlrzi.vercel.app/"),
          ]),
          createFolder(26, "Skatel News Mobile", [
            createFile(27, "info-news.txt", "file"),
            createFile(28, "skatel-news.mp4", "file", devFlutter ),
            ]),
            createFolder(29, "Profile Company Tunas Kembang Djati", [
              createFile(45, "info-pt.txt", "file"),
              createFile(31, "tunas-kembang-djati", "link", null, "https://teknikrekayasaindustri.co.id/"),
              ]),
          createFolder(89, "Project ST (Station Transportable)", [
          createFile(90, "ST-Overview.mp4", "file", devST),
          createFile(91, "info-st.txt", "file"),
          ]),
        ]),
        createFolder(7, "Achievements", [
          createFile(8, "certificate.jpg", "file", mern),
          createFile(34, "intern-certificate.jpg", "file", certificateMagang),
        ]),
        createFolder(9, "About_me", [
        createFile(
          10,
          "My_Github",
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
      createFile(16, "terminal.exe", "file"),
      createFile(
        17,
        "this_project",
        "link",
        null,
        "https://github.com/shinyPy/windows-portofolio",
      ),
    ]),
  ]),
];

export default initialFilesystem;
