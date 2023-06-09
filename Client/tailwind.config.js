/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: {
          50: "#e0e5eb",
          100: "#b3bdcf",
          200: "#8692b2",
          300: "#597797",
          400: "#2c4c7a",
          500: "#071931",
          600: "#061127",
          700: "#050d1d",
          800: "#030912",
          900: "#020507",
          light: "#e0e5eb",
          dark: "#020507",
        },
        secondary: {
          50: "#f2f6f8",
          100: "#dbe4e9",
          200: "#c3d2da",
          300: "#abbecb",
          400: "#94abbd",
          500: "#7c97ae",
          600: "#637c92",
          700: "#4b6275",
          800: "#32475a",
          900: "#1a2d3d",
          light: "#f2f6f8",
          dark: "#1a2d3d",
        },
        tertiary: {
          50: "#f2f7f7",
          100: "#dbebeb",
          200: "#c3dfdf",
          300: "#acd3d3",
          400: "#94c7c7",
          500: "#7cbcbc",
          600: "#63afaf",
          700: "#4b9f9f",
          800: "#328f8f",
          900: "#1a8080",
          light: "#f2f7f7",
          dark: "#1a8080",
        },
        quaternary: {
          50: "#e5e1d4",
          100: "#ccc5a9",
          200: "#b2af7e",
          300: "#999953",
          400: "#807327",
          500: "#666619",
          600: "#4d4c0e",
          700: "#333206",
          800: "#1a1a00",
          900: "#000000",
          light: "#e5e1d4",
          dark: "#000000",
        },
        accent: {
          50: "#f9f4e9",
          100: "#f1e1c1",
          200: "#e9ce99",
          300: "#e1bb70",
          400: "#d9a947",
          500: "#d1972f",
          600: "#a57824",
          700: "#775a19",
          800: "#4a3b0e",
          900: "#1d1d03",
          light: "#f9f4e9",
          dark: "#1d1d03",
        },
      },
      animation: {
        "slide-in": "slide-in 1s ease-in-out forwards",
        "lunge-right": "lunge-right 0.5s ease-in-out forwards",
        "lunge-left": "lunge-left 0.5s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        blink: "blink 0.5s ease-in-out 3",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: 0,
            transform: "translateX(-100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "lunge-right": {
          "0%": {
            transform: "translateX(0) translateY(0)",
          },
          "10%": {
            transform: "translateX(-2px) translateY(1px)",
          },
          "40%": {
            transform: "translateX(15px) translateY(-1px)",
          },
          "100%": {
            transform: "translateX(0) translateY(0)",
          },
        },
        "lunge-left": {
          "0%": {
            transform: "translateX(0) translateY(0)",
          },
          "10%": {
            transform: "translateX(2px) translateY(-1px)",
          },
          "40%": {
            transform: "translateX(-15px) translateY(1px)",
          },
          "100%": {
            transform: "translateX(0) translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: 0,
            transform: "translateY(-50px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        blink: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
      ],
      textColor: [
        "dark",
        "dark-hover",
        "dark-group-hover",
        "dark-even",
        "dark-odd",
      ],
    },
  },

  plugins: [],
};
