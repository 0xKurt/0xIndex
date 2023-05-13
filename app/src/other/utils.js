export function stringToColor2(str) {
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

export function stringToColor(text) {
  let str = text;
  let hash = 0;
  for (let i = 0; i < str.length / 2; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = Math.floor((Math.abs(Math.sin(hash+0)) * 256) % 256);
  const g = Math.floor((Math.abs(Math.sin(hash+1)) * 256) % 256);
  const b = Math.floor((Math.abs(Math.sin(hash+2)) * 256) % 256);

  // modulo function on str.length to chose between aa, bb, cc, dd
  const append = ["88", "aa", "66", "cc"][str.length % 4];
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${append}`;
}