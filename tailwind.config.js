/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1A6B4A',
          light: '#BFDC9A',
          bg: '#E8F5D0',
        },
        cream: '#F1ECE5',
        ink: '#0D0D0D',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        pill: '50px',
        card: '18px',
      },
    },
  },
  plugins: [],
}
