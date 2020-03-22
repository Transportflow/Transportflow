module.exports = {
  theme: {
    extend: {
      colors: {
        unselected: "#252e3d"
      },
      fontFamily: {
        inter: ["Inter"]
      }
    }
  },
  variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
      "dark-focus"
    ],
    cursor: ["responsive", "hover", "focus", "disabled"],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
      "dark-focus"
    ],
    placeholderColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
      "dark-focus"
    ],
    borderColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
      "dark-focus"
    ],
    borderWidth: ["responsive", "dark"],
    boxShadow: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
      "dark-focus"
    ]
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant("disabled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`;
        });
      });
    },
    require("./tailwindcss-dark-mode.js")()
  ]
};
