/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        vividorange: '#FFB347',
        hotpink: '#FF69B4',
        mintgreen: '#A9D18E',
        greenhover: '#98BF7E',
        lavender: '#C1A7E2',
        sienna: '#8F3F2E',
        palepink: '#FADADD',
        lightyellow: '#FFEC8B',
        skyblue: '#87CEFA',
        khaki: '#F0E68C',
        beige: '#F5F5DC'
      },
      fontFamily: {
        motivasansblack: ['MotivaSansBlack', 'sans-serif'],
        motivasansbold: ['MotivaSansBold', 'sans-serif'],
        motivasansextrabold: ['MotivaSansExtraBold', 'sans-serif'],
        motivasanslight: ['MotivaSansLight', 'sans-serif'],
        motivasansmedium: ['MotivaSansMedium', 'sans-serif'],
        motivasansregular: ['MotivaSansRegular', 'sans-serif'],
        motivasansthin: ['MotivaSansThin', 'sans-serif'],
        finkheavy: ['FinkHeavy', 'sans-serif']
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'xs': '360px', // added new screen sizes
        'xxs': '280px'
      },
    },
  },
  plugins: [],
};