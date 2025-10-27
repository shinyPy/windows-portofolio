/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'icon-bounce-appear': 'iconBounceAppear 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'icon-bounce-click': 'iconDoubleClickBounce 300ms ease-out',
        'window-expand': 'windowExpandFromTaskbar 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'window-close-rotate': 'windowCloseWithRotate 300ms ease-out forwards',
        'window-minimize': 'windowMinimizeBounce 400ms cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards',
        'window-maximize': 'windowMaximize 350ms ease-out',
        'window-restore': 'windowRestore 350ms ease-out',
        'taskbar-press': 'taskbarItemPress 250ms ease-out',
        'ripple-effect': 'ripple 600ms ease-out',
        'tile-cycle': 'tileContentCycle 3000ms ease-in-out infinite',
        'tile-press': 'tilePress 150ms ease-out',
        'tile-enter': 'tileEnter 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up-screen': 'slideUpScreen 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-down-screen': 'slideDownScreen 350ms ease-in',
        'skeleton-pulse': 'skeletonPulse 1500ms ease-in-out infinite',
        'spin-bounce': 'spinBounce 800ms ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10%)', opacity: '0' },
        },
        iconBounceAppear: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(180deg)' },
          '60%': { opacity: '1', transform: 'scale(1.2) rotate(0deg)' },
          '80%': { transform: 'scale(0.9) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        iconDoubleClickBounce: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        windowExpandFromTaskbar: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '70%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        windowCloseWithRotate: {
          '0%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1) rotate(3deg)' },
          '100%': { opacity: '0', transform: 'scale(0) rotate(5deg)' },
        },
        windowMinimizeBounce: {
          '0%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.05)' },
          '20%': { transform: 'scale(0.95)' },
          '100%': { opacity: '0', transform: 'scale(0.3)' },
        },
        windowMaximize: {
          '0%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        windowRestore: {
          '0%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        taskbarItemPress: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(2px) scale(0.97)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        tileContentCycle: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '45%': { transform: 'translateY(-10px)', opacity: '0' },
          '55%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        tilePress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        tileEnter: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUpScreen: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDownScreen: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        skeletonPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        spinBounce: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      },
    },
  },
  plugins: [],
}

