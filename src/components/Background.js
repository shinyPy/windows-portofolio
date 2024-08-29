// components/Background.js
import backgroundImage from "../assets/images/mountain.png";

const Background = ({ isMobile, children }) => (
  <div
    className={`w-[100vw] h-[100vh] bg-center bg-cover flex flex-col justify-between relative ${isMobile ? "filter blur-[5px]" : ""}`}
    style={{ backgroundImage: `url(${backgroundImage})`, overflow: "hidden" }}
  >
    {children}
  </div>
);

export default Background;
