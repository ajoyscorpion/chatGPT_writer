/**
 * @type {import('postcss').ProcessOptions}
 */
// module.exports = {
//   plugins: {
//     tailwindcss: {}
//   }
// }

module.exports = {
  plugins: [
    require('tailwindcss'),
    // require('autoprefixer'),
  ]
}
