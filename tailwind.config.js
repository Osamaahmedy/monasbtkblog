export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.jsx',
    './resources/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#794BC7',
        secondary: '#FF157D',
        shining: '#6B00C9',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      fontFamily: {
        'mikhak-bold': ['Mikhak-Bold', 'sans-serif'],
        'mikhak-medium': ['Mikhak-Medium', 'sans-serif'],
        'mikhak-regular': ['Mikhak-Regular', 'sans-serif'],
        'mikhak-light': ['Mikhak-Light', 'sans-serif'],
        'katty-purry': ['KattyPurry', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
