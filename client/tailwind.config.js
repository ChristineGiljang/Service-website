/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // Dark Gray (Navbar Background)
        secondary: "#374151", // Slightly lighter gray for contrast
        accent: "#008080", // Teal (For buttons, highlights, links)
        background: "#F9FAFB", // Light Grayish White (Main Background)
        text: "#F9FAFB", // Off-White (Text on Dark Navbar)
        border: "#E5E7EB", // Light Gray (For dividers, subtle borders)
        success: "#22C55E", // Green (For success messages)
        error: "#EF4444", // Red (For error messages)
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

