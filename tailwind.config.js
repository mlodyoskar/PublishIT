/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-primary': '0 10px 30px rgba(99, 102, 241, 0.3) ',
        'glow-secondary': '0 10px 30px rgba(249, 250, 251, 0.3) ',

      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),

  ],
}