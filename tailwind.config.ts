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
        primary: {
          DEFAULT: '#E04343',
          light: '#e66a6a',
          dark: '#b33535',
        },
        secondary: {
          DEFAULT: '#FFE800',
          light: '#fff133',
          dark: '#ccba00',
        },
        dark: {
          DEFAULT: '#353535',
          light: '#545454',
          lighter: '#8c9398',
        },
        light: {
          DEFAULT: '#f3f5f8',
          dark: '#e9ecf2',
          darker: '#d8dde6',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-fira-sans)', ...defaultTheme.fontFamily.sans],
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
        'hard': '0 8px 30px 0 rgba(0, 0, 0, 0.15)',
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