import type { ShareModel } from "@/types/share";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(value: string, maxCharsPerLine: number) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    currentLine = candidate;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function renderTextLines(
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  return lines
    .map(
      (line, index) =>
        `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");
}

export function buildShareMessage(model: ShareModel, url: string) {
  return [model.shareText, "", "Open the seal:", url].join("\n");
}

export function buildPosterSvg(model: ShareModel, url: string) {
  const punchlineLines = wrapText(model.punchline, 22).slice(0, 3);
  const headlineLines = wrapText(model.headline, 34).slice(0, 3);
  const subtextLines = wrapText(model.subtext, 42).slice(0, 4);
  const hashtagLine = model.hashtags.join("   ");
  const onlineCtaLines = wrapText(model.onlineCtaLabel, 24).slice(0, 2);
  const urlLines = wrapText(url, 44).slice(0, 3);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1800" viewBox="0 0 1200 1800" role="img" aria-label="SigilLab share sigil">
  <defs>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#121323" />
      <stop offset="100%" stop-color="#070810" />
    </linearGradient>
    <radialGradient id="haloGold" cx="50%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#3e3013" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#3e3013" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="haloBlue" cx="78%" cy="18%" r="36%">
      <stop offset="0%" stop-color="#133546" stop-opacity="0.78" />
      <stop offset="100%" stop-color="#133546" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="haloViolet" cx="50%" cy="100%" r="52%">
      <stop offset="0%" stop-color="#281244" stop-opacity="0.84" />
      <stop offset="100%" stop-color="#281244" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="1800" fill="#05060d" />
  <rect width="1200" height="1800" fill="url(#haloGold)" />
  <rect width="1200" height="1800" fill="url(#haloBlue)" />
  <rect width="1200" height="1800" fill="url(#haloViolet)" />
  <rect x="88" y="88" width="1024" height="1624" rx="72" fill="url(#card)" stroke="rgba(255,255,255,0.12)" />
  <rect x="140" y="146" width="244" height="52" rx="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
  <circle cx="176" cy="172" r="8" fill="#f5d58a" />
  <text x="200" y="180" fill="#f7e8bd" font-size="24" font-family="Georgia, serif" letter-spacing="8">${escapeXml(model.title.toUpperCase())}</text>
  <text x="600" y="296" text-anchor="middle" fill="rgba(186,230,253,0.86)" font-size="24" font-family="Georgia, serif" letter-spacing="10">EMOTIONAL READING</text>
  <circle cx="600" cy="680" r="252" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
  <circle cx="600" cy="680" r="210" fill="none" stroke="rgba(245,215,138,0.2)" />
  <circle cx="600" cy="680" r="166" fill="none" stroke="rgba(125,211,252,0.14)" />
  <circle cx="600" cy="680" r="122" fill="none" stroke="rgba(216,180,254,0.16)" />
  <line x1="420" y1="680" x2="780" y2="680" stroke="rgba(255,255,255,0.34)" />
  <line x1="600" y1="500" x2="600" y2="860" stroke="rgba(255,255,255,0.34)" />
  <rect x="490" y="570" width="220" height="220" transform="rotate(45 600 680)" fill="none" stroke="rgba(255,255,255,0.18)" />
  <circle cx="600" cy="680" r="82" fill="none" stroke="rgba(255,255,255,0.28)" />
  <path d="M600 462 L660 598 L798 680 L660 762 L600 898 L540 762 L402 680 L540 598 Z" fill="none" stroke="rgba(255,255,255,0.76)" stroke-width="4" />
  <path d="M600 538 L718 680 L600 822 L482 680 Z" fill="none" stroke="rgba(255,255,255,0.58)" stroke-width="4" />
  <circle cx="600" cy="680" r="16" fill="#fff9eb" />
  <text x="600" y="1040" text-anchor="middle" fill="#fff5df" font-size="78" font-weight="600" font-family="Georgia, serif">${renderTextLines(punchlineLines, 600, 1040, 86)}</text>
  <text x="600" y="1230" text-anchor="middle" fill="rgba(245,245,244,0.88)" font-size="36" font-family="Georgia, serif">${renderTextLines(headlineLines, 600, 1230, 50)}</text>
  <text x="600" y="1380" text-anchor="middle" fill="rgba(214,211,209,0.8)" font-size="28" font-family="Georgia, serif">${renderTextLines(subtextLines, 600, 1380, 40)}</text>
  <text x="600" y="1554" text-anchor="middle" fill="rgba(231,229,228,0.74)" font-size="24" font-family="Georgia, serif">${escapeXml(hashtagLine)}</text>
  <rect x="312" y="1600" width="576" height="132" rx="37" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
  <text x="600" y="1638" text-anchor="middle" fill="#f4ead6" font-size="26" font-family="Georgia, serif">${renderTextLines(onlineCtaLines, 600, 1638, 30)}</text>
  <text x="600" y="1698" text-anchor="middle" fill="rgba(214,211,209,0.7)" font-size="20" font-family="Georgia, serif">${renderTextLines(urlLines, 600, 1698, 28)}</text>
</svg>
  `.trim();
}
