import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    screens: {
      'xs': '320px',     // iPhone SE
      'sm': '375px',     // iPhone X/11/12
      'md': '768px',     // Tablets
      'lg': '1024px',    // Laptops
      'xl': '1280px',    // Desktop
      '2xl': '1536px',   // Large Screens
      '3xl': '1920px',   // Extra Large Screens
    },
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: '#FF5555',
          light: '#FF7777',
          dark: '#E63939',
        },
        accent1: {
          DEFAULT: '#00C4CC',
          light: '#1AD6DE',
          dark: '#00A3AA',
        },
        accent2: {
          DEFAULT: '#F9E900',
          light: '#FFEF33',
          dark: '#E6D700',
        },
        dark: {
          DEFAULT: '#333333',
          light: '#4A4A4A',
          lighter: '#666666',
        },
        light: {
          DEFAULT: '#FFF8E7',
          dark: '#F5EED9',
          darker: '#E6D9B8',
        },
        // Dark theme colors
        darkTheme: {
          bg: '#1A1A1A',
          surface: '#2A2A2A',
          surfaceHover: '#3A3A3A',
          border: '#404040',
          borderHover: '#505050',
          text: '#E0E0E0',
          textSecondary: '#A0A0A0',
          accent: '#FF5555',
          accentHover: '#FF7777',
          highlight: '#00C4CC',
          card: '#252525',
          cardHover: '#303030',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto-flex)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-josefin-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-playfair-display)', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        'xxs': '0.625rem',      // 10px
        'xs': '0.75rem',        // 12px
        'sm': '0.875rem',       // 14px
        'base': '1rem',         // 16px
        'lg': '1.125rem',       // 18px
        'xl': '1.25rem',        // 20px
        '2xl': '1.5rem',        // 24px
        '3xl': '1.875rem',      // 30px
        '4xl': '2.25rem',       // 36px
        '5xl': '3rem',          // 48px
        '6xl': '3.75rem',       // 60px
        '7xl': '4.5rem',        // 72px
        '8xl': '6rem',          // 96px
        '9xl': '8rem',          // 128px
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
      },
      maxWidth: {
        'xxs': '16rem',
        'xs': '20rem',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        'hard': '0 8px 30px 0 rgba(0, 0, 0, 0.2)',
        'dark-soft': '0 2px 15px 0 rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 4px 20px 0 rgba(0, 0, 0, 0.4)',
        'dark-hard': '0 8px 30px 0 rgba(0, 0, 0, 0.5)',
      },
      zIndex: {
        '-1': '-1',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}