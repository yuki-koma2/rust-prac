/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'rain': 'rain 1.5s linear infinite',
        'puddle': 'puddle 3s ease-in-out infinite',
        'wind-cloud': 'windCloud 15s linear infinite',
        'wind-line': 'windLine 3s linear infinite',
        'sway': 'sway 2s ease-in-out infinite',
        'snow': 'snow 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        puddle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
        },
        windCloud: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        windLine: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 50px))', opacity: '0' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        snow: {
          '0%': { transform: 'translateY(-10px) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(100vh) translateX(20px)', 
            opacity: '0' 
          },
        },
      },
    },
  },
  plugins: [],
};
