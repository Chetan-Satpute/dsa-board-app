/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: 'Ubuntu Mono',
        marker: 'Permanent Marker',
        kalam: 'Kalam',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
