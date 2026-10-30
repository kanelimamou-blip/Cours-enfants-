"""Découpe le fichier voix-papa.wav (fait avec voix/enregistrer.html) en une phrase par fichier
et met à jour voix/voix.js. Usage : python3 source/decouper_voix.py chemin/voix-papa.wav"""
import json, pathlib, re, subprocess, sys

RACINE = pathlib.Path(__file__).resolve().parent.parent
VOIX = RACINE / "voix"
page = (VOIX / "enregistrer.html").read_text(encoding="utf-8")
cles = re.findall(r'\["(\w+)", "', page.split("const PHRASES = [", 1)[1].split("];", 1)[0])

src = sys.argv[1]
duree = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout)
log = subprocess.run(["ffmpeg", "-i", src, "-af", "silencedetect=noise=-90dB:d=1.2", "-f", "null", "-"], capture_output=True, text=True).stderr
debuts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
fins = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
morceaux, t = [], 0.0
for d, f in zip(debuts, fins + [duree]):
    morceaux.append((t, d)); t = f
assert len(morceaux) == len(cles), f"{len(morceaux)} morceaux pour {len(cles)} phrases"

carte = {}
for k, ((a, b), cle) in enumerate(zip(morceaux, cles), 1):
    if b - a < 0.35:  # bip court = phrase sautée
        continue
    nom = f"{k:02d}-{cle}.mp3"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", src,
                    "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5",
                    "-ac", "1", "-ar", "44100", "-b:a", "64k", str(VOIX / nom)], check=True)
    carte.setdefault(cle, []).append("../voix/" + nom)
# « Tu es trop fort/forte » rejoint les bravos selon l'enfant
(VOIX / "voix.js").write_text("// Voix de papa : chaque clé liste des fichiers audio (dossier voix/). Vide = voix du téléphone.\nwindow.VOIX_PAPA = " + json.dumps(carte, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print(len(sum(carte.values(), [])), "phrases :", ", ".join(f"{c}×{len(v)}" for c, v in carte.items()))
