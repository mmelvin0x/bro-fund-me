/** @type {import("tailwindcss").Config} */
module.exports = {
  purge: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gizmo: {
          primary: "#F89720",

          secondary: "#567EBE",

          accent: "#EFD377",

          neutral: "#1F1B27",

          "base-100": "#232323",

          info: "#567EBE",

          success: "#EFD377",

          warning: "#FC0606",

          error: "#1F1B27",
        },
      },
    ],
  },
};
