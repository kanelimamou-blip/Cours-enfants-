// Dessine les icônes des applis (node source/icones.js) avec le navigateur installé.
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const applis = JSON.parse(fs.readFileSync(path.join(__dirname, "applis.json"), "utf8"));
(async () => {
  const b = await chromium.launch();
  for (const [id, a] of Object.entries(applis)) {
    for (const t of [192, 512]) {
      const p = await b.newPage({ viewport: { width: t, height: t } });
      await p.setContent(`<body style="margin:0;width:${t}px;height:${t}px;background:${a.couleur};display:grid;place-items:center">
        <div style="width:${t * 0.62}px;height:${t * 0.62}px;border-radius:50%;background:#fff6e6;display:grid;place-items:center;font-size:${t * 0.4}px;font-family:'Noto Color Emoji'">${a.avatar}</div></body>`);
      fs.mkdirSync(path.join(__dirname, "..", id), { recursive: true });
      await p.screenshot({ path: path.join(__dirname, "..", id, `icone-${t}.png`) });
    }
  }
  await b.close();
})();
