// components/MobileWarning.js
const MobileWarning = () => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-5 rounded-lg z-50 flex items-center justify-center">
    <div className="text-center text-lg font-mono">
      Mobile version is work in progress. Please use a desktop browser for the full experience.
    </div>
  </div>
);

export default MobileWarning;
