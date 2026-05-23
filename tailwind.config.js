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
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out infinite 2s",
        "float-alt": "float-alt 7s ease-in-out infinite 1s",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
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
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-alt": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.5" },
        },
      },
      fontFamily: {
        'mikhak-bold': ['Mikhak-Bold', 'sans-serif'],
        'mikhak-medium': ['Mikhak-Medium', 'sans-serif'],
        'mikhak-regular': ['Mikhak-Regular', 'sans-serif'],
        'mikhak-light': ['Mikhak-Light', 'sans-serif'],
        'katty-purry': ['KattyPurry', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
