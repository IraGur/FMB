/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "node_modules/flowbite-react/lib/esm/**/*.js",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         colors: {
            greyviolet: "#9794b1 !important",
            greyvioletl: "#b9b7cb !important",
            greyviolet2: "#524d7d !important",
            greyviolet3: "#a8a6be !important",
            modalText: "#393557 !important",
            eligible: "#99BD8F !important",
            notEligible: "#ff8b8f !important",
         },
      },
   },
   plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
