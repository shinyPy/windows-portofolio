import React, { useState, useEffect } from 'react';

const MobileAbout = ({ filesystem, findItemById, onBack, language = 'en' }) => {
  const [aboutInfo, setAboutInfo] = useState({
    info: '',
    github: '',
    achievements: []
  });

  useEffect(() => {
    const aboutFolder = findItemById(filesystem, 9);
    const achievementsFolder = findItemById(filesystem, 7);

    if (aboutFolder && aboutFolder.contents) {
      const githubLink = aboutFolder.contents.find(item => item.name === 'My_Github');
      const infoFile = aboutFolder.contents.find(item => item.name === 'info.txt');

      setAboutInfo(prev => ({
        ...prev,
        github: githubLink ? githubLink.url : '',
        info: infoFile ? 'Passionate developer with a love for creating innovative solutions and learning new technologies.' : ''
      }));
    }

    if (achievementsFolder && achievementsFolder.contents) {
      const achievements = achievementsFolder.contents.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        src: item.src
      }));

      setAboutInfo(prev => ({
        ...prev,
        achievements
      }));
    }
  }, [findItemById, filesystem]);

  const text = {
    en: {
      role: 'Full Stack Developer',
      location: 'Remote',
      experience: '2+ Years',
      interests: 'Interests',
      achievements: 'Achievements',
      contact: 'Get In Touch',
      viewGithub: 'View My GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
      funFacts: 'Fun Facts',
      fact1: 'Loves creating interactive web experiences',
      fact2: 'Always learning new technologies',
      fact3: 'Enjoys solving complex problems',
      certificate: 'Certificate of completion'
    },
    id: {
      role: 'Pengembang Full Stack',
      location: 'Jarak Jauh',
      experience: '2+ Tahun',
      interests: 'Minat',
      achievements: 'Prestasi',
      contact: 'Hubungi',
      viewGithub: 'Lihat GitHub Saya',
      linkedin: 'LinkedIn',
      email: 'Email',
      funFacts: 'Fakta Menarik',
      fact1: 'Suka membuat pengalaman web interaktif',
      fact2: 'Selalu mempelajari teknologi baru',
      fact3: 'Senang memecahkan masalah kompleks',
      certificate: 'Sertifikat penyelesaian'
    }
  };

  const t = text[language] || text.en;

  const personalInfo = [
    { label: language === 'en' ? 'Name' : 'Nama', value: 'ShinyPy', icon: '👤' },
    { label: language === 'en' ? 'Role' : 'Peran', value: t.role, icon: '💻' },
    { label: language === 'en' ? 'Location' : 'Lokasi', value: t.location, icon: '🌍' },
    { label: language === 'en' ? 'Experience' : 'Pengalaman', value: t.experience, icon: '🚀' }
  ];

  const interests = [
    { name: language === 'en' ? 'Web Development' : 'Pengembangan Web', icon: '🌐' },
    { name: language === 'en' ? 'UI/UX Design' : 'Desain UI/UX', icon: '🎨' },
    { name: language === 'en' ? 'Problem Solving' : 'Pemecahan Masalah', icon: '🧩' },
    { name: language === 'en' ? 'Technology' : 'Teknologi', icon: '⚡' },
    { name: language === 'en' ? 'Learning' : 'Belajar', icon: '📚' },
    { name: language === 'en' ? 'Open Source' : 'Sumber Terbuka', icon: '🔓' }
  ];

  const handleGithubClick = () => {
    if (aboutInfo.github) {
      window.open(aboutInfo.github, '_blank');
    }
  };

  return (
    <div className="min-h-screen p-5 pb-8">
      {/* Profile Card */}
      <div className="ios-card dark:ios-card-dark p-6 mb-4 text-center ios-fade-in">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4 ios-shadow-lg">
          SP
        </div>
        <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">ShinyPy</h2>
        <p className="text-blue-500 font-semibold mb-3">{t.role}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {aboutInfo.info || language === 'en' 
            ? 'Passionate developer with a love for creating innovative solutions and learning new technologies. Always eager to take on new challenges and contribute to meaningful projects.'
            : 'Pengembang yang bersemangat dengan kecintaan untuk menciptakan solusi inovatif dan mempelajari teknologi baru. Selalu ingin mengambil tantangan baru dan berkontribusi pada proyek yang bermakna.'}
        </p>
      </div>

      {/* Personal Info Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {personalInfo.map((info, index) => (
          <div
            key={index}
            className="ios-card dark:ios-card-dark p-4 ios-fade-in hover:scale-[1.02] transition-transform active:scale-95"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{info.icon}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wide">{info.label}</span>
            </div>
            <span className="text-gray-900 dark:text-white font-bold">{info.value}</span>
          </div>
        ))}
      </div>

      {/* Interests Card */}
      <div className="ios-card dark:ios-card-dark p-5 mb-4 ios-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mr-3 ios-shadow-sm">
            <span className="text-white text-xl">❤️</span>
          </div>
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">{t.interests}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800 rounded-xl px-4 py-2.5 ios-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.05}s` }}
            >
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                {interest.icon} {interest.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Card */}
      {aboutInfo.achievements.length > 0 && (
        <div className="ios-card dark:ios-card-dark p-5 mb-4 ios-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mr-3 ios-shadow-sm">
              <span className="text-white text-xl">🏆</span>
            </div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold">{t.achievements}</h3>
          </div>
          <div className="space-y-3">
            {aboutInfo.achievements.map((achievement, index) => (
              <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">🏆</span>
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-1">
                      {achievement.name.replace(/\.(jpg|png|pdf)$/, '')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.certificate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Card */}
      <div className="ios-card dark:ios-card-dark p-5 mb-4 ios-fade-in" style={{ animationDelay: '1s' }}>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-3 ios-shadow-sm">
            <span className="text-white text-xl">📞</span>
          </div>
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">{t.contact}</h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGithubClick}
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-3.5 px-4 rounded-xl transition-all flex items-center justify-center active:scale-95 font-semibold ios-shadow-sm"
          >
            <span className="text-xl mr-3">🔗</span>
            <span>{t.viewGithub}</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 font-semibold ios-shadow-sm">
              <span className="mr-2">💼</span>
              <span>{t.linkedin}</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-3.5 px-4 rounded-xl transition-all flex items-center justify-center text-sm active:scale-95 font-semibold ios-shadow-sm">
              <span className="mr-2">✉️</span>
              <span>{t.email}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fun Facts Card */}
      <div className="ios-card dark:ios-card-dark p-5 ios-fade-in" style={{ animationDelay: '1.2s' }}>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3 ios-shadow-sm">
            <span className="text-white text-xl">✨</span>
          </div>
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">{t.funFacts}</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{t.fact1}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{t.fact2}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{t.fact3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
