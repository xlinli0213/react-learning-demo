export default function svgSpriteLoader() {
  const files = require.context('../assets/icon/', true, /\.svg$/);
  files.keys().forEach(files);
}
