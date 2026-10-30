"""Fabrique chaque appli (ci/, gs/, ce2/) à partir du modèle commun et de son contenu.
Usage : python3 source/construire.py   (depuis la racine du dépôt)"""
import json, pathlib, datetime

RACINE = pathlib.Path(__file__).resolve().parent.parent
SRC = RACINE / "source"
modele = (SRC / "modele.html").read_text(encoding="utf-8")
sw = (SRC / "sw.js").read_text(encoding="utf-8")
applis = json.loads((SRC / "applis.json").read_text(encoding="utf-8"))
version = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M")

def page_appli(ident, a):
    contenu = (SRC / f"contenu-{ident}.js").read_text(encoding="utf-8")
    corps = (modele.replace("__TITRE__", a["nom"]).replace("__COULEUR_CLAIRE__", a["clair"])
             .replace("__COULEUR__", a["couleur"]).replace("__CONTENU__", contenu + "\n" + (SRC / "lecons-plus.js").read_text(encoding="utf-8")))
    tete, reste = corps.split('<div class="app">', 1)
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icone-192.png">
<link rel="apple-touch-icon" href="icone-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{a['court']}">
{tete}
<style>:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}[hidden]{{display:none!important}}</style>
</head>
<body>
<div class="app">{reste.replace("<script>", '<script src="../voix/voix.js"></script>\n<script src="../sync/config.js"></script>\n<script src="../sync/sync.js"></script>\n<script>', 1)}
<script>if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");</script>
</body>
</html>
"""

# Tous les contenus réunis, pour le duel en famille (chacun reçoit les questions de sa classe).
(RACINE / "commun").mkdir(exist_ok=True)
(RACINE / "commun" / "contenus.js").write_text("window.TOUS_CONTENUS = window.TOUS_CONTENUS || {};\n" + "".join(
    f"(function () {{ const garde = window.CONTENU;\n{(SRC / f'contenu-{i}.js').read_text(encoding='utf-8')}\nwindow.TOUS_CONTENUS[{json.dumps(i)}] = window.CONTENU; window.CONTENU = garde; }})();\n"
    for i, x in applis.items() if not x.get("manuel")), encoding="utf-8")

for ident, a in applis.items():
    dossier = RACINE / ident
    dossier.mkdir(exist_ok=True)
    if not a.get("manuel"):  # l'appli Papa (papa/index.html) est écrite à la main
        (dossier / "index.html").write_text(page_appli(ident, a), encoding="utf-8")
    voix = ["../voix/voix.js", "../sync/config.js", "../sync/sync.js", "../commun/contenus.js"] + sorted("../voix/" + f.name for f in (RACINE / "voix").glob("*.mp3"))
    (dossier / "sw.js").write_text(sw.replace("__VERSION__", f"{ident}-{version}").replace('"./icone-512.png"]', '"./icone-512.png", ' + ", ".join(json.dumps(v) for v in voix) + "]"), encoding="utf-8")
    manifeste = {
        "name": a["nom"], "short_name": a["court"], "lang": "fr", "id": "./", "start_url": "./", "scope": "./",
        "display": "standalone", "orientation": "portrait", "background_color": "#fff6e6", "theme_color": a["couleur"],
        "icons": [
            {"src": "icone-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable"},
            {"src": "icone-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"},
        ],
    }
    (dossier / "manifest.webmanifest").write_text(json.dumps(manifeste, ensure_ascii=False, indent=2), encoding="utf-8")
    print("construit", ident)
