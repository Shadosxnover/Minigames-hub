/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
            'custom-gradient': 'radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)',
          },
      },
    },
    plugins: [],
  };
  