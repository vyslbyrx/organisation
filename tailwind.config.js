module.exports = {
    theme: {
      extend: {
        colors: {
          primary: '#D97706', // Amber-600
          secondary: '#92400E', // Amber-800
          'footer-bg': '#111827', // bg-gray-900
            'footer-text': '#D1D5DB', // text-gray-300
            'footer-accent': '#D97706', // amber-500
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        animation: {
            fadeIn: "fadeIn 1.5s ease-in-out",
            bounce: "bounce 2s infinite"
        },
        keyframes: {
        fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 }
        }
        },
        transitionProperty: {
            'shadow': 'box-shadow',
            'transform': 'transform'
          },
          scale: {
            '105': '1.05'
          }
      },
    },
    variants: {},
    plugins: [],
  }