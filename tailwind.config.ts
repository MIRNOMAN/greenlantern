import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Optional: Center the container
        screens: {
          "2xl": "1440px",
        }, // Optional: Add padding
      },
      colors: {
        background: "#323232",
        color: "black",
        primary: "#E7A647",
        secondary: "#AA7C38",
        gray: "#ECECEC",
        blacks: "#000000",
      },
    },
    fontFamily: {
      Roboto: "var(--font-roboto)",
      geist:"var(--font-geist)",
    },
    },

    plugins: [],
} satisfies Config;
