export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let finalHash = hash;
  for (let i = 0; i < str.length / 2; i++) {
    finalHash = str.charCodeAt(i) + ((finalHash << 3) - finalHash);
  }
  for (let i = 0; i < str.length; i++) {
    finalHash = str.charCodeAt(i) + ((finalHash << 5) - finalHash);
  }

  const hue = finalHash % 360;
  const saturation = 50 + (finalHash % 10);
  const lightness = 40 + (finalHash % 10);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}