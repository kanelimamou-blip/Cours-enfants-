/* Paliers 2, 3 et 4 de chaque classe (programme CEB), ajoutés aux mondes du palier 1.
   window.PALIERS_PLUS(classe) renvoie { paliers: [...], lecons: [{ monde, palier, ... }] }. */
window.PALIERS_PLUS = function (classe) {
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const cle = x => JSON.stringify(x.t || x.html || x.e || x.items);
  const q = (consigne, scene, bonne, autres, extra) => {
    const vus = new Set([cle(bonne)]);
    autres = autres.filter(x => { const c = cle(x); return !vus.has(c) && vus.add(c); });
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  };
  const NOMBRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
  const img = (e, t, dire) => ({ k: "image", e, t, dire: dire || t });
  const mot = (t, dire) => ({ k: "mots", t, dire: dire || t });
  const phr = (t, dire) => ({ k: "phrase", t, dire: dire || t });
  const ch = n => ({ k: "chiffre", t: String(n), dire: n <= 20 ? NOMBRES[n] : String(n) });
  const lettre = (t, dire) => ({ k: "lettre", t, dire: dire || t });
  const tas = (n, e) => ({ k: "tas", items: fois(n, () => e) });
  // [question, bonne, fausses, emoji?]
  const quiz = (faits, n) => () => tirer(faits, Math.min(n || 8, faits.length)).map(([question, bonne, fausses, e]) => {
    const c = x => (String(x).length > 22 ? phr(x) : mot(x));
    return q(question, e ? { k: "image", e } : null, c(bonne), tirer(fausses, 3).map(c), { dire: question });
  });
  const proches = (n, min, max, k) => { const s = new Set(); let g = 0; while (s.size < (k || 3) && g++ < 60) { const x = n + r(-3, 3); if (x !== n && x >= (min || 0) && x <= (max || 9999)) s.add(x); } return [...s]; };
  // Dizaines et unités en barres et points
  const blocs = n => ({ k: "html", html: '<span class="blocs">' + fois(Math.floor(n / 10), () => '<i class="dizaine"></i>').join("") + fois(n % 10, () => '<i class="unite"></i>').join("") + "</span>" });
  const lecons = [];
  const L = (palier, monde, id, icone, titre, objectif, questions) => lecons.push({ id: classe + "-" + palier + "-" + id, palier, monde, icone, titre, objectif, questions });

  // ----- Outils de lecture communs -----
  function toucherLettre(cibles, total, son) {
    return () => fois(8, i => { const c = cibles[i % cibles.length]; return q("Touche la lettre " + c, null, lettre(c, "la lettre " + ((son && son[c]) || c)), tirer(total.filter(x => x !== c), 3).map(x => lettre(x, "la lettre " + ((son && son[x]) || x))), { dire: "Touche la lettre " + ((son && son[c]) || c) + "." }); });
  }
  function syllabes(cons, voy) {
    voy = voy || ["a", "i", "o", "u", "é", "e"];
    return () => fois(8, i => {
      const s = cons + hasard(voy);
      if (i % 2) { const v = s.slice(cons.length); return q(cons + " et " + v + ", ça fait…", { k: "mots", t: cons + " + " + v }, lettre(s), tirer(voy.map(x => cons + x).filter(x => x !== s), 2).map(x => lettre(x)), { dire: "La lettre " + cons + " avec " + v + ", ça fait quoi ?" }); }
      return q("Touche la syllabe que tu entends", null, lettre(s), tirer(voy.map(x => cons + x).concat(["la", "mi", "po", "ru"]).filter(x => x !== s), 3).map(x => lettre(x)), { dire: "Touche : " + s + "." });
    });
  }
  // Lire des mots illustrés : [mot, emoji]
  function lireMots(liste) {
    return () => fois(8, i => {
      const [b, ...f] = tirer(liste, 3);
      if (i % 2) return q("Lis le mot. Touche la bonne image.", { k: "mots", t: b[0] }, img(b[1], "", b[0]), f.map(x => img(x[1], "", x[0])), { dire: "Lis le mot, puis touche la bonne image.", disposition: "trois" });
      return q("Touche le mot qui va avec l'image", { k: "image", e: b[1] }, mot(b[0]), f.map(x => mot(x[0])), { dire: "Quel mot va avec l'image ?", disposition: "trois" });
    });
  }
  // Entendre un son : liste [mot, emoji, sons]
  function entendre(son, liste, ecrit) {
    return () => fois(8, () => {
      const avec = liste.filter(m => m[2].includes(son)), sans = liste.filter(m => !m[2].includes(son));
      const b = hasard(avec);
      return q("Dans quel mot entends-tu « " + (ecrit || son) + " » ?", { k: "lettre", t: ecrit || son }, img(b[1], b[0]), tirer(sans, 2).map(m => img(m[1], m[0])), { dire: "Dans quel mot entends-tu le son " + son + " ?", disposition: "trois" });
    });
  }
  function compterTas(min, max, objets) {
    objets = objets || ["🥭", "🐟", "⚽", "⭐", "🥜", "🐐", "🍬"];
    return () => fois(8, () => { const n = r(min, max), e = hasard(objets); return q("Combien ?", tas(n, e), ch(n), proches(n, 1, max + 2, 2).map(ch), { dire: "Compte bien. Combien y en a-t-il ?", disposition: "trois" }); });
  }
  function dizaines(min, max) {
    return () => fois(8, i => {
      const n = r(min, max);
      if (i % 2) return q("Combien de dizaines dans " + n + " ?", { k: "mots", t: String(n) }, ch(Math.floor(n / 10)), [ch(n % 10), ch(Math.floor(n / 10) + 1)], { dire: "Combien de dizaines dans " + n + " ?", disposition: "trois" });
      return q("Quel nombre est représenté ?", blocs(n), ch(n), [ch(Math.floor(n / 10) + (n % 10) * 10 === n ? n + 1 : Math.floor(n / 10) + (n % 10) * 10), ch(n + 10 <= max + 10 ? n + 10 : n - 10)].filter(x => +x.t !== n), { dire: "Une barre, c'est dix. Un point, c'est un. Quel nombre ?", disposition: "trois" });
    });
  }
  function calculs(op, maxA, maxB) {
    return () => fois(8, () => {
      let a = r(1, maxA), b = r(1, maxB);
      if (op === "-" && b > a) [a, b] = [b, a];
      const s = op === "+" ? a + b : op === "-" ? a - b : a * b, signe = op === "*" ? "×" : op === "-" ? "−" : "+", dit = op === "+" ? " plus " : op === "-" ? " moins " : " fois ";
      return q(a + " " + signe + " " + b + " = ?", null, ch(s), proches(s, 0, 99999).map(ch), { dire: a + dit + b + " ?" });
    });
  }
  function comparer(max) {
    return () => fois(8, () => {
      let a = r(0, max), b = r(0, max); if (Math.random() < 0.15) b = a;
      const s = a > b ? ">" : a < b ? "<" : "=";
      return q("Quel signe ? " + a + " … " + b, { k: "mots", t: a + "  ?  " + b }, lettre(s, s === ">" ? "plus grand que" : s === "<" ? "plus petit que" : "égal"), ["<", ">", "="].filter(x => x !== s).map(x => lettre(x, x === ">" ? "plus grand que" : x === "<" ? "plus petit que" : "égal")), { dire: "Compare " + a + " et " + b + ". Quel signe ?", disposition: "trois" });
    });
  }
  function suites(max, pas) {
    return () => fois(8, () => {
      const p = hasard(pas || [1]), debut = r(0, Math.max(0, max - 5 * p)), l = fois(5, i => debut + i * p), k = r(1, 4), b = l[k];
      return q("Quel nombre manque ?", { k: "mots", t: l.map((x, i) => i === k ? "?" : x).join("  ") }, ch(b), proches(b, 0, max + 10, 2).map(ch), { dire: "Quel nombre manque ? " + l.map((x, i) => i === k ? "lequel ?" : x).join(", "), disposition: "trois" });
    });
  }
  function problemes(liste) {
    return () => fois(8, () => { const [txt, s, e] = hasard(liste)(); return q(txt, e ? { k: "image", e } : null, ch(s), proches(s, 0, 99999).map(ch), { dire: txt }); });
  }

  // ================================= GRANDE SECTION =================================
  if (classe === "gs") {
    const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V"];
    const SON = { R: "r", S: "s", T: "t", N: "n", D: "d", F: "f", V: "v", C: "c", J: "j", G: "g" };
    const ANIMAUX_PETITS = [["la poule", "🐔", "le poussin", "🐣"], ["la vache", "🐄", "le veau", "🐂"], ["la chèvre", "🐐", "le chevreau", "🐐"], ["la chatte", "🐈", "le chaton", "🐱"], ["la chienne", "🐕", "le chiot", "🐶"], ["la cane", "🦆", "le caneton", "🐥"]];
    const MOMENTS = [["Le matin, je me réveille.", "🌅"], ["Je vais à l'école.", "🏫"], ["À midi, je mange.", "🍛"], ["L'après-midi, je joue.", "⚽"], ["Le soir, je me lave.", "🛁"], ["La nuit, je dors.", "🌙"]];
    const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const TRANSPORTS = [["la voiture", "🚗"], ["le bus", "🚌"], ["l'avion", "✈️"], ["le bateau", "🚢"], ["la pirogue", "🛶"], ["le vélo", "🚲"], ["la moto", "🏍️"], ["le train", "🚂"], ["la charrette", "🐎"]];
    const imagier = (liste, consigne) => () => fois(8, () => { const [b, ...f] = tirer(liste, 3); return q((consigne || "Touche") + " " + b[0], null, img(b[1], "", b[0]), f.map(x => img(x[1], "", x[0])), { dire: (consigne || "Touche") + " " + b[0] + ".", disposition: "trois" }); });
    const position = () => fois(8, () => {
      const P = [["sur la table", "dessus"], ["sous la table", "dessous"]], [t, s] = hasard(P), e = hasard(["🐱", "⚽", "🧸"]);
      const dessin = pos => ({ k: "html", html: '<span style="display:inline-grid;font-size:34px;line-height:1">' + (pos === "dessus" ? e : "&nbsp;") + '<span style="font-size:40px">🪑</span>' + (pos === "dessous" ? e : "&nbsp;") + "</span>", dire: pos });
      return q("Où est le chat ? Touche : " + t, null, dessin(s), [dessin(s === "dessus" ? "dessous" : "dessus")], { dire: "Touche l'image où l'objet est " + t + "." });
    });
    const ranger = () => fois(8, i => {
      const e = hasard(["🐘", "🌳", "🏠", "🐟"]), grand = i % 2 === 0;
      const t = px => ({ k: "html", html: '<span style="font-size:' + px + 'px;line-height:1">' + e + "</span>" });
      return q("Touche " + (grand ? "le plus grand" : "le plus petit"), null, t(grand ? 72 : 22), [t(40), t(grand ? 22 : 72)], { dire: "Touche " + (grand ? "le plus grand" : "le plus petit") + ".", disposition: "trois" });
    });
    const ajouter1 = () => fois(8, () => { const n = r(1, 8), e = hasard(["🥭", "🐟", "⭐"]); return q("J'en ajoute un. Combien ?", { k: "html", html: '<span class="tas">' + fois(n, () => "<i>" + e + "</i>").join("") + "<i>➕</i><i>" + e + "</i></span>" }, ch(n + 1), [ch(n), ch(n + 2)], { dire: "Il y en a " + n + ". J'en ajoute un. Combien ça fait ?", disposition: "trois" }); });
    const jours = () => fois(8, () => { const k = r(0, 5); return q("Quel jour vient après " + JOURS[k] + " ?", { k: "image", e: "📅" }, mot(JOURS[k + 1]), tirer(JOURS.filter((x, i) => i !== k + 1), 2).map(x => mot(x)), { dire: "Quel jour vient après " + JOURS[k] + " ?", disposition: "trois" }); });
    const meteo = quiz([["Il pleut. Que prends-tu ?", "le parapluie", ["les lunettes de soleil", "le bonnet de bain"], "🌧️"], ["Il fait très chaud. Que bois-tu ?", "de l'eau fraîche", ["du thé brûlant", "rien"], "☀️"], ["Le ciel est plein de nuages gris. Il va…", "pleuvoir", ["neiger du sucre", "faire nuit"], "☁️"], ["Le vent souffle fort. Qu'est-ce qui vole ?", "le cerf-volant", ["la maison", "le puits"], "🌬️"], ["Quand il pleut beaucoup, c'est…", "l'hivernage", ["la nuit", "la fête"], "🌧️"], ["Quand le soleil brille, je mets…", "une casquette", ["un manteau", "des bottes"], "🧢"]], 6);
    const momentsOrdre = () => fois(8, () => { const k = r(0, 4), [a] = MOMENTS[k], [b, e] = MOMENTS[k + 1]; return q("Qu'est-ce qui vient après ?", { k: "phrase", t: a }, img(e, b), tirer(MOMENTS.filter((x, i) => i !== k + 1 && i !== k), 2).map(x => img(x[1], x[0])), { dire: a + " Et après ?", disposition: "trois" }); });
    const petits = () => fois(8, () => { const [b, ...f] = tirer(ANIMAUX_PETITS, 3); return q("Qui est le petit de " + b[0] + " ?", { k: "image", e: b[1] }, img(b[3], b[2]), f.map(x => img(x[3], x[2])), { dire: "Qui est le petit de " + b[0] + " ?", disposition: "trois" }); });
    const lirePrenom = lireMots([["papa", "👨🏾"], ["maman", "👩🏾"], ["bébé", "👶🏾"], ["moto", "🏍️"], ["lit", "🛏️"], ["ami", "🧒🏾"], ["riz", "🍚"], ["vélo", "🚲"]]);
    const commencePar = (l) => () => fois(8, () => { const M = { R: [["robe", "👗"], ["riz", "🍚"], ["radio", "📻"]], S: [["soleil", "☀️"], ["sac", "👜"], ["serpent", "🐍"]], T: [["tomate", "🍅"], ["tortue", "🐢"], ["tambour", "🥁"]], F: [["fleur", "🌸"], ["fourchette", "🍴"], ["feu", "🔥"]], V: [["vache", "🐄"], ["vélo", "🚲"], ["voiture", "🚗"]], P: [["poisson", "🐟"], ["pomme", "🍎"], ["pied", "🦶🏾"]], B: [["banane", "🍌"], ["bateau", "⛵"], ["ballon", "⚽"]], M: [["mangue", "🥭"], ["moto", "🏍️"], ["maison", "🏠"]], L: [["lune", "🌙"], ["lion", "🦁"], ["lit", "🛏️"]], C: [["camion", "🚚"], ["cadeau", "🎁"], ["canard", "🦆"]] };
      const c = hasard(l), b = hasard(M[c]), autres = tirer(Object.keys(M).filter(x => x !== c).map(x => hasard(M[x])), 2);
      return q("Quel mot commence par " + c + " ?", { k: "lettre", t: c }, img(b[1], b[0]), autres.map(x => img(x[1], x[0])), { dire: "Quel mot commence par le son " + (SON[c] || c.toLowerCase()) + " ?", disposition: "trois" }); });
    const cuisineQ = (faits) => quiz(faits, 6);
    // Palier 2
    L("p2", "parler", "l1", "R", "Les lettres R, S, T, N", "Reconnaître de nouvelles lettres capitales", toucherLettre(["R", "S", "T", "N"], LETTRES, SON));
    L("p2", "parler", "l2", "👂", "Le son du début : R, S, T", "Entendre le premier son d'un mot", commencePar(["R", "S", "T"]));
    L("p2", "parler", "l3", "🐣", "Les animaux et leurs petits", "Enrichir le vocabulaire", petits);
    L("p2", "compter", "c1", "7", "Je compte jusqu'à 7", "Dénombrer jusqu'à 7", compterTas(3, 7));
    L("p2", "compter", "c2", "🪑", "Sur et sous", "Se repérer dans l'espace", position);
    L("p2", "compter", "c3", "📏", "Du plus petit au plus grand", "Comparer des tailles", ranger);
    L("p2", "cuisine", "k1", "🧺", "Au marché avec maman", "Vocabulaire du marché", imagier([["la tomate", "🍅"], ["l'oignon", "🧅"], ["le piment", "🌶️"], ["la carotte", "🥕"], ["le poisson", "🐟"], ["le pain", "🥖"], ["l'œuf", "🥚"], ["le citron", "🍋"]]));
    L("p2", "docteure", "m1", "🌡️", "La docteure soigne", "Les gestes du soin", cuisineQ([["La docteure prend la température avec…", "le thermomètre", ["la cuillère", "le crayon"], "🌡️"], ["Pour écouter le cœur, elle utilise…", "le stéthoscope", ["la règle", "le seau"], "🩺"], ["Sur une petite blessure, on met…", "un pansement", ["du sable", "de la peinture"], "🩹"], ["Quand on est malade, on se repose…", "au lit", ["sur le toit", "dans l'arbre"], "🛏️"], ["Le médicament, on le prend avec…", "un adulte", ["tout seul", "son chat"], "💊"], ["Pour ne pas tomber malade, on mange…", "des fruits et des légumes", ["des bonbons", "du sable"], "🥕"]]));
    L("p2", "decouvrir", "d1", "🌦️", "Le temps qu'il fait", "Observer la météo", meteo);
    L("p2", "decouvrir", "d2", "🕐", "Les moments de la journée", "Se repérer dans le temps", momentsOrdre);
    // Palier 3
    L("p3", "parler", "l1", "F", "Les lettres F, V, C, D", "Reconnaître de nouvelles lettres capitales", toucherLettre(["F", "V", "C", "D"], LETTRES, SON));
    L("p3", "parler", "l2", "👂", "Le son du début : F, V, B, P", "Entendre le premier son d'un mot", commencePar(["F", "V", "B", "P"]));
    L("p3", "parler", "l3", "🚗", "Les transports", "Nommer les moyens de transport", imagier(TRANSPORTS));
    L("p3", "compter", "c1", "🔟", "Je compte jusqu'à 10", "Dénombrer jusqu'à 10", compterTas(5, 10));
    L("p3", "compter", "c2", "➕", "Un de plus", "Ajouter un", ajouter1);
    L("p3", "compter", "c3", "🔢", "Le nombre qui manque", "Connaître la suite des nombres", suites(10));
    L("p3", "cuisine", "k1", "🍽️", "Mettre la table", "Vocabulaire des ustensiles", imagier([["l'assiette", "🍽️"], ["la cuillère", "🥄"], ["la fourchette", "🍴"], ["le couteau", "🔪"], ["le verre", "🥛"], ["la marmite", "🍲"], ["le bol", "🥣"], ["la théière", "🫖"]]));
    L("p3", "docteure", "m1", "🦷", "Des dents en bonne santé", "Hygiène des dents", cuisineQ([["Je me brosse les dents…", "matin et soir", ["une fois par an", "jamais"], "🪥"], ["Pour se brosser les dents, il faut…", "une brosse et du dentifrice", ["un peigne", "du savon"], "🪥"], ["Qui soigne les dents ?", "la dentiste", ["la boulangère", "la pilote"], "🦷"], ["Ce qui abîme les dents :", "trop de bonbons", ["l'eau", "les légumes"], "🍬"], ["Je bois…", "de l'eau", ["du soda tout le temps", "du sirop toute la journée"], "💧"], ["Le bébé a…", "pas encore de dents", ["des dents en or", "cent dents"], "👶🏾"]]));
    L("p3", "decouvrir", "d1", "📅", "Les jours de la semaine", "Se repérer dans la semaine", jours);
    L("p3", "decouvrir", "d2", "🌱", "La graine qui pousse", "Comment pousse une plante", cuisineQ([["Pour pousser, la graine a besoin…", "d'eau et de soleil", ["de bonbons", "de musique"], "🌱"], ["On met la graine…", "dans la terre", ["dans le frigo", "dans le cartable"], "🪴"], ["D'abord la graine, puis…", "la petite pousse", ["le gros arbre", "la mangue"], "🌱"], ["Le manguier donne…", "des mangues", ["des poissons", "des œufs"], "🥭"], ["Si on n'arrose pas, la plante…", "sèche", ["grandit vite", "chante"], "🥀"], ["Les racines sont…", "sous la terre", ["dans le ciel", "sur les feuilles"], "🌳"]]));
    // Palier 4
    L("p4", "parler", "l1", "J", "Les lettres J, G, et les autres", "Reconnaître toutes les lettres capitales", toucherLettre(["J", "G", "R", "S", "T", "V"], LETTRES, SON));
    L("p4", "parler", "l2", "📖", "Je lis mes premiers mots", "Reconnaître des mots écrits", lirePrenom);
    L("p4", "parler", "l3", "👂", "Le son du début : M, L, C", "Entendre le premier son d'un mot", commencePar(["M", "L", "C", "R"]));
    L("p4", "compter", "c1", "➕", "Ajouter et compter", "Petites additions avec des images", () => fois(8, () => { const a = r(1, 4), b = r(1, 4), e = hasard(["🥭", "⚽", "🐟"]); return q(a + " et " + b + ", ça fait ?", { k: "html", html: '<span class="tas">' + fois(a, () => "<i>" + e + "</i>").join("") + "<i>➕</i>" + fois(b, () => "<i>" + e + "</i>").join("") + "</span>" }, ch(a + b), [ch(a + b + 1), ch(Math.max(1, a + b - 1))], { dire: a + " et " + b + ", ça fait combien ?", disposition: "trois" }); }));
    L("p4", "compter", "c2", "🔢", "Les nombres jusqu'à 10", "Ordonner les nombres", suites(10));
    L("p4", "compter", "c3", "🔷", "Les formes partout", "Retrouver les formes autour de soi", cuisineQ([["Quelle forme a une roue ?", "rond", ["carré", "triangle"], "🛞"], ["Quelle forme a une fenêtre ?", "carré", ["rond", "triangle"], "🪟"], ["Quelle forme a un toit de case ?", "triangle", ["rond", "carré"], "🛖"], ["Quelle forme a le soleil ?", "rond", ["triangle", "carré"], "☀️"], ["Quelle forme a une part de pizza ?", "triangle", ["carré", "rond"], "🍕"], ["Quelle forme a un dé ?", "carré", ["rond", "triangle"], "🎲"]]));
    L("p4", "cuisine", "k1", "🍹", "Les boissons de chez nous", "Vocabulaire et goûts", cuisineQ([["Le bissap est de couleur…", "rouge", ["bleu", "vert"], "🌺"], ["Le bouye est fait avec le fruit…", "du baobab", ["du palmier", "du pommier"], "🌳"], ["Le gingembre a un goût…", "piquant", ["salé", "de chocolat"], "🫚"], ["Le thé, on le boit…", "chaud", ["glacé dans la neige", "en mangeant du sable"], "🫖"], ["Le lait vient de…", "la vache", ["la poule", "le poisson"], "🐄"], ["Pour faire un jus d'orange, on presse…", "des oranges", ["des pierres", "des tomates"], "🍊"]]));
    L("p4", "docteure", "m1", "🫀", "À l'intérieur du corps", "Cœur, poumons, ventre", cuisineQ([["Qu'est-ce qui bat dans ma poitrine ?", "le cœur", ["le pied", "l'oreille"], "🫀"], ["Avec quoi je respire ?", "les poumons", ["les cheveux", "les ongles"], "🫁"], ["Où va la nourriture ?", "dans le ventre", ["dans la tête", "dans le genou"], "🍽️"], ["Avec quoi je pense ?", "le cerveau", ["le coude", "le nez"], "🧠"], ["Ce qui tient mon corps debout :", "les os", ["les vêtements", "les cheveux"], "🦴"], ["Quand je cours, mon cœur bat…", "plus vite", ["plus lentement", "plus du tout"], "🏃🏾‍♀️"]]));
    L("p4", "decouvrir", "d1", "🚦", "Je traverse la rue", "Prudence sur la route", cuisineQ([["Le petit bonhomme est rouge. Je…", "m'arrête", ["traverse", "danse"], "🚦"], ["Le petit bonhomme est vert. Je…", "traverse avec un adulte", ["m'assois sur la route", "cours seule"], "🟢"], ["Je traverse…", "sur le passage piéton", ["entre les voitures", "en courant"], "🦓"], ["En voiture, je mets…", "ma ceinture", ["mon bonnet", "mes lunettes"], "🚗"], ["Je donne la main…", "à un adulte", ["au chien", "à personne"], "🤝🏾"], ["Le ballon est sur la route. Je…", "appelle un adulte", ["cours le chercher", "saute"], "⚽"]]));
  }

  // ================================= CI =================================
  if (classe === "ci") {
    const SONS = [
      ["rat", "🐀", "a"], ["robe", "👗", "o"], ["riz", "🍚", "i"], ["sac", "👜", "a"], ["sel", "🧂", "è"], ["tapis", "🧶", "ai"], ["tomate", "🍅", "oa"], ["tortue", "🐢", "uo"], ["nid", "🪺", "i"], ["navire", "🚢", "ai"], ["pomme", "🍎", "o"], ["pied", "🦶🏾", "é"],
      ["poule", "🐔", "ou"], ["loup", "🐺", "ou"], ["roue", "🛞", "ou"], ["mouton", "🐑", "ouon"], ["ballon", "⚽", "aon"], ["pont", "🌉", "on"], ["maman", "👩🏾", "aan"], ["dent", "🦷", "an"], ["éléphant", "🐘", "éan"], ["lapin", "🐰", "ain"], ["sapin", "🌲", "ain"], ["main", "✋🏾", "in"],
      ["roi", "🤴🏾", "oi"], ["poisson", "🐟", "oion"], ["étoile", "⭐", "éoi"], ["vélo", "🚲", "éo"], ["lune", "🌙", "u"], ["cheval", "🐎", "eah"], ["chat", "🐈", "ah"], ["vache", "🐄", "ah"], ["chameau", "🐪", "hao"], ["château", "🏰", "hao"],
    ].map(([m, e, s]) => [m, e, s.replace("h", "ch")]);
    const MOTS_P2 = [["rat", "🐀"], ["riz", "🍚"], ["sac", "👜"], ["tomate", "🍅"], ["nid", "🪺"], ["tapis", "🧶"], ["mur", "🧱"], ["sirop", "🍯"], ["salade", "🥗"], ["radis", "🫜"]];
    const MOTS_P3 = [["poule", "🐔"], ["loup", "🐺"], ["roue", "🛞"], ["mouton", "🐑"], ["ballon", "⚽"], ["pont", "🌉"], ["dent", "🦷"], ["lapin", "🐰"], ["sapin", "🌲"], ["main", "✋🏾"], ["bonbon", "🍬"], ["avion", "✈️"]];
    const MOTS_P4 = [["roi", "🤴🏾"], ["poisson", "🐟"], ["étoile", "⭐"], ["cheval", "🐎"], ["chat", "🐈"], ["vache", "🐄"], ["château", "🏰"], ["montagne", "⛰️"], ["oiseau", "🐦"], ["chemise", "👕"], ["araignée", "🕷️"], ["champignon", "🍄"]];
    const PHRASES = [["Le rat mange du riz.", "🐀", ["Le chat boit du lait.", "La poule pond un œuf."]], ["Papa a un vélo.", "🚲", ["Maman a une robe.", "Ali a un ballon."]], ["La vache est dans le champ.", "🐄", ["Le poisson est dans l'eau.", "Le chat est sur le lit."]], ["Le roi a un château.", "🏰", ["Le lion a une crinière.", "Le bébé a un hochet."]], ["Le poisson nage dans la mer.", "🐟", ["L'oiseau vole dans le ciel.", "Le cheval court vite."]], ["L'oiseau chante sur la branche.", "🐦", ["La vache mange de l'herbe.", "Le loup dort."]], ["Ali joue au ballon.", "⚽", ["Awa lit un livre.", "Papa conduit la voiture."]], ["La lune brille la nuit.", "🌙", ["Le soleil brille le jour.", "La pluie tombe."]]];
    const lirePhrase = () => melange(PHRASES).map(([b, e, f]) => q("Lis. Quelle phrase va avec l'image ?", { k: "image", e }, phr(b), f.map(x => phr(x)), { dire: "Lis bien les phrases. Laquelle va avec l'image ?" }));
    const problemesCI = (max) => problemes([
      () => { const a = r(2, max - 3), b = r(1, Math.min(5, max - a)); return ["Awa a " + a + " billes. Elle en gagne " + b + ". Combien en a-t-elle ?", a + b, "🔵"]; },
      () => { const a = r(4, max), b = r(1, a - 1); return ["Il y a " + a + " oiseaux sur l'arbre. " + b + " s'envolent. Combien en reste-t-il ?", a - b, "🐦"]; },
      () => { const a = r(2, Math.min(9, max - 2)), b = r(1, Math.min(9, max - a)); return ["Ali a " + a + " bonbons. Maman lui en donne " + b + ". Combien en a-t-il ?", a + b, "🍬"]; },
      () => { const a = r(5, max), b = r(1, 4); return ["Le marchand a " + a + " mangues. Il en vend " + b + ". Combien lui en reste-t-il ?", a - b, "🥭"]; },
    ]);
    const corps2 = quiz([["Que mange le mouton ?", "de l'herbe", ["de la viande", "des cailloux"], "🐑"], ["Que mange le lion ?", "de la viande", ["de l'herbe", "du riz"], "🦁"], ["Où vit le poisson ?", "dans l'eau", ["dans un arbre", "dans le désert"], "🐟"], ["Combien de pattes a une poule ?", "2", ["4", "6"], "🐔"], ["Combien de pattes a une chèvre ?", "4", ["2", "8"], "🐐"], ["Qui pond des œufs ?", "la poule", ["la vache", "le chat"], "🥚"], ["Qui donne du lait ?", "la vache", ["le poisson", "le coq"], "🥛"], ["L'oiseau a…", "des plumes", ["des écailles", "des poils de lion"], "🐦"], ["Le poisson a…", "des nageoires", ["des ailes", "des sabots"], "🐟"]], 8);
    const plantes = quiz([["Une plante a besoin…", "d'eau, de lumière et de terre", ["de bonbons", "de musique et de télé"], "🌱"], ["Sous la terre, il y a…", "les racines", ["les fleurs", "les fruits"], "🌳"], ["Le tronc de l'arbre est…", "entre les racines et les branches", ["sous les racines", "dans le fruit"], "🌳"], ["Qu'est-ce qui pousse dans le champ de mon village ?", "le mil", ["les voitures", "les maisons"], "🌾"], ["La mangue pousse sur…", "le manguier", ["le palmier", "le baobab"], "🥭"], ["On plante la graine…", "dans la terre", ["dans l'eau salée", "sur le toit"], "🌰"], ["L'arachide pousse…", "sous la terre", ["en haut des arbres", "dans la mer"], "🥜"], ["Les feuilles des arbres sont souvent…", "vertes", ["bleues", "violettes"], "🍃"]], 8);
    const alimentation = quiz([["Pour bien grandir, je mange…", "de tout un peu", ["seulement des bonbons", "seulement du pain"], "🍽️"], ["Quel aliment donne de la force ?", "le riz", ["le soda", "le chewing-gum"], "🍚"], ["Quel est un fruit ?", "la banane", ["la carotte", "le poisson"], "🍌"], ["Quel est un légume ?", "la carotte", ["la mangue", "l'orange"], "🥕"], ["Le lait est bon pour…", "les os et les dents", ["les cheveux seulement", "rien"], "🥛"], ["Avant de manger un fruit, je…", "le lave", ["le jette", "le cache"], "🍎"], ["Je bois chaque jour…", "de l'eau propre", ["de l'eau de la flaque", "de l'eau de mer"], "💧"], ["Le petit-déjeuner se prend…", "le matin", ["la nuit", "jamais"], "🌅"]], 8);
    const eau = quiz([["L'eau qu'on boit doit être…", "propre", ["sale", "salée"], "💧"], ["Où trouve-t-on de l'eau au village ?", "au puits", ["dans le four", "dans le sable"], "🪣"], ["L'eau de la mer est…", "salée", ["sucrée", "chaude comme le thé"], "🌊"], ["Quand il fait très froid, l'eau devient…", "de la glace", ["du sable", "du lait"], "🧊"], ["Quand on chauffe l'eau, elle…", "bout et fait de la vapeur", ["devient du riz", "devient de la glace"], "♨️"], ["Pour ne pas gaspiller l'eau, je…", "ferme le robinet", ["laisse couler", "joue avec"], "🚰"], ["La pluie tombe pendant…", "l'hivernage", ["la nuit seulement", "la Tabaski"], "🌧️"], ["Les plantes ont besoin…", "d'eau", ["de sel", "de sucre"], "🌱"]], 8);
    const metiers = quiz([["Qui soigne les malades ?", "le médecin", ["le maçon", "le pêcheur"], "🩺"], ["Qui fait le pain ?", "le boulanger", ["le tailleur", "le pilote"], "🥖"], ["Qui attrape les poissons ?", "le pêcheur", ["le boulanger", "le maître"], "🎣"], ["Qui construit les maisons ?", "le maçon", ["le médecin", "le tailleur"], "🧱"], ["Qui coud les habits ?", "le tailleur", ["le pêcheur", "le chauffeur"], "🧵"], ["Qui conduit le car ?", "le chauffeur", ["le cultivateur", "le boulanger"], "🚌"], ["Qui cultive le mil et l'arachide ?", "le cultivateur", ["le pilote", "le tailleur"], "🌾"], ["Qui répare les voitures ?", "le mécanicien", ["le médecin", "le maître"], "🔧"], ["Qui enseigne à l'école ?", "le maître", ["le pêcheur", "le mécanicien"], "🏫"]], 8);
    const transports = quiz([["Pour aller sur la mer, on prend…", "la pirogue", ["le vélo", "la charrette"], "🛶"], ["Pour voyager dans le ciel, on prend…", "l'avion", ["le bus", "la moto"], "✈️"], ["Le car rapide roule…", "sur la route", ["sur l'eau", "dans le ciel"], "🚌"], ["Le train roule sur…", "des rails", ["l'eau", "les nuages"], "🚂"], ["Qui tire la charrette ?", "le cheval ou l'âne", ["le poisson", "le chat"], "🐎"], ["Quel transport n'a pas de moteur ?", "le vélo", ["la moto", "la voiture"], "🚲"], ["Le bateau navigue sur…", "l'eau", ["la route", "le sable"], "🚢"], ["Dans la voiture, je mets…", "ma ceinture", ["mes chaussons", "mon cartable sur la tête"], "🚗"]], 8);
    // Palier 2
    L("p2", "lire", "l1", "r", "Les lettres r et s", "Lire ra, ri, ro, sa, si, so", () => syllabes("r")().slice(0, 4).concat(syllabes("s")().slice(0, 4)));
    L("p2", "lire", "l2", "t", "Les lettres t et n", "Lire ta, ti, to, na, ni, no", () => syllabes("t")().slice(0, 4).concat(syllabes("n")().slice(0, 4)));
    L("p2", "lire", "l3", "p", "Les lettres p et d", "Lire pa, pi, po, da, di, do", () => syllabes("p")().slice(0, 4).concat(syllabes("d")().slice(0, 4)));
    L("p2", "lire", "l4", "📝", "Je lis des mots", "Lire des mots avec r, s, t, n, p, d", lireMots(MOTS_P2));
    L("p2", "compter", "c1", "🔟", "Les nombres jusqu'à 10", "Compter et écrire jusqu'à 10", compterTas(5, 10));
    L("p2", "compter", "c2", "➕", "J'ajoute", "Additions jusqu'à 10", calculs("+", 5, 5));
    L("p2", "compter", "c3", "⚖️", "Plus grand, plus petit", "Comparer les nombres jusqu'à 10 avec < et >", comparer(10));
    L("p2", "compter", "c4", "🧩", "Petits problèmes", "Résoudre un problème simple", problemesCI(10));
    L("p2", "decouvrir", "d1", "🐐", "Les animaux", "Ce qu'ils mangent, où ils vivent", corps2);
    L("p2", "decouvrir", "d2", "🌱", "Les plantes", "Les besoins et les parties d'une plante", plantes);
    // Palier 3
    L("p3", "lire", "l1", "ou", "Le son ou", "Lire et entendre ou", entendre("ou", SONS));
    L("p3", "lire", "l2", "on", "Le son on", "Lire et entendre on", entendre("on", SONS));
    L("p3", "lire", "l3", "an", "Les sons an et in", "Lire et entendre an, en, in", () => entendre("an", SONS)().slice(0, 4).concat(entendre("in", SONS)().slice(0, 4)));
    L("p3", "lire", "l4", "📝", "Je lis des mots", "Lire des mots avec ou, on, an, in", lireMots(MOTS_P3));
    L("p3", "compter", "c1", "🧱", "Dizaines et unités", "Les nombres jusqu'à 30", dizaines(10, 30));
    L("p3", "compter", "c2", "➖", "J'enlève", "Soustractions jusqu'à 10", calculs("-", 10, 5));
    L("p3", "compter", "c3", "🔢", "La suite des nombres", "Compter jusqu'à 30, de 2 en 2", suites(30, [1, 2]));
    L("p3", "compter", "c4", "🧩", "Petits problèmes", "Additions et soustractions en histoires", problemesCI(15));
    L("p3", "decouvrir", "d1", "🍽️", "Bien manger", "L'alimentation équilibrée", alimentation);
    L("p3", "decouvrir", "d2", "💧", "L'eau", "L'eau propre et ses états", eau);
    // Palier 4
    L("p4", "lire", "l1", "ch", "Le son ch", "Lire cha, chi, cho et entendre ch", () => syllabes("ch")().slice(0, 4).concat(entendre("ch", SONS)().slice(0, 4)));
    L("p4", "lire", "l2", "oi", "Le son oi", "Lire et entendre oi", entendre("oi", SONS));
    L("p4", "lire", "l3", "📝", "Je lis des mots", "Lire des mots avec ch, oi", lireMots(MOTS_P4));
    L("p4", "lire", "l4", "📖", "Je lis des phrases", "Comprendre une phrase simple", lirePhrase);
    L("p4", "compter", "c1", "💯", "Les nombres jusqu'à 99", "Dizaines et unités", dizaines(20, 99));
    L("p4", "compter", "c2", "➕", "Additions jusqu'à 20", "Calculer des additions", calculs("+", 12, 8));
    L("p4", "compter", "c3", "⚖️", "Comparer jusqu'à 99", "Utiliser < , > et =", comparer(99));
    L("p4", "compter", "c4", "🧩", "Problèmes", "Résoudre des problèmes jusqu'à 20", problemesCI(20));
    L("p4", "decouvrir", "d1", "👷🏾", "Les métiers", "Qui fait quoi ?", metiers);
    L("p4", "decouvrir", "d2", "🚌", "Les transports", "Se déplacer sur terre, sur l'eau, dans le ciel", transports);
  }

  // ================================= CE2 =================================
  if (classe === "ce2") {
    const FUTUR = [["jouer", ["jouerai", "joueras", "jouera", "jouerons", "jouerez", "joueront"]], ["marquer", ["marquerai", "marqueras", "marquera", "marquerons", "marquerez", "marqueront"]], ["finir", ["finirai", "finiras", "finira", "finirons", "finirez", "finiront"]], ["être", ["serai", "seras", "sera", "serons", "serez", "seront"]], ["avoir", ["aurai", "auras", "aura", "aurons", "aurez", "auront"]], ["aller", ["irai", "iras", "ira", "irons", "irez", "iront"]]];
    const IMPARFAIT = [["jouer", ["jouais", "jouais", "jouait", "jouions", "jouiez", "jouaient"]], ["courir", ["courais", "courais", "courait", "courions", "couriez", "couraient"]], ["être", ["étais", "étais", "était", "étions", "étiez", "étaient"]], ["avoir", ["avais", "avais", "avait", "avions", "aviez", "avaient"]], ["finir", ["finissais", "finissais", "finissait", "finissions", "finissiez", "finissaient"]]];
    const PASSE = [["marquer", ["ai marqué", "as marqué", "a marqué", "avons marqué", "avez marqué", "ont marqué"]], ["finir", ["ai fini", "as fini", "a fini", "avons fini", "avez fini", "ont fini"]], ["aller", ["suis allé", "es allé", "est allé", "sommes allés", "êtes allés", "sont allés"]], ["prendre", ["ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris"]], ["faire", ["ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"]]];
    const PR = ["Je", "Tu", "Il", "Nous", "Vous", "Ils"], PRJ = ["J'", "Tu", "Il", "Nous", "Vous", "Ils"];
    const conj = (table, temps) => () => fois(8, () => {
      const [v, f] = hasard(table), i = r(0, 5), b = f[i], pr = /^[aeiouéèh]/.test(b) && i === 0 ? PRJ[0] : PR[i];
      return q("Conjugue « " + v + " » " + temps + " : " + pr + (pr.endsWith("'") ? "" : " ") + "…", { k: "mots", t: pr + (pr.endsWith("'") ? "" : " ") + "___" }, mot(b), tirer(f.filter(x => x !== b), 2).map(x => mot(x)), { dire: "Conjugue le verbe " + v + " " + temps + ". " + pr.replace("'", "e") + "…", disposition: "trois" });
    });
    const accordAdj = quiz([["Les joueurs sont ___ .", "rapides", ["rapide", "rapidee"]], ["Une ___ victoire.", "belle", ["beau", "belles"]], ["Des maillots ___ .", "bleus", ["bleu", "bleue"]], ["La pelouse est ___ .", "verte", ["vert", "vertes"]], ["Les supportrices sont ___ .", "contentes", ["content", "contents"]], ["Un ballon ___ .", "neuf", ["neuve", "neufs"]], ["Des chaussures ___ .", "noires", ["noir", "noire"]], ["Une équipe ___ .", "forte", ["fort", "forts"]]].map(([a, b, c]) => ["Choisis le bon adjectif : " + a, b, c, "🎨"]), 8);
    const types = quiz([["Quel signe termine une question ?", "?", [".", "!"], "❓"], ["« Quel beau but ! » est une phrase…", "exclamative", ["interrogative", "déclarative"], "❗"], ["« Où joues-tu ? » est une phrase…", "interrogative", ["exclamative", "déclarative"], "❓"], ["« Le match commence à 17 heures. » est une phrase…", "déclarative", ["interrogative", "exclamative"], "⚪"], ["Une phrase commence toujours par…", "une majuscule", ["un point", "une virgule"], "🔠"], ["La forme négative de « Il joue » :", "Il ne joue pas.", ["Il joue pas ne.", "Ne il joue."], "🚫"], ["La forme négative de « Nous gagnons » :", "Nous ne gagnons pas.", ["Nous gagnons ne pas.", "Ne nous gagnons."], "🚫"], ["Quel signe termine une phrase déclarative ?", ".", ["?", "!"], "⚪"]], 8);
    const synonymes = quiz([["Un synonyme de « rapide » :", "vite", ["lent", "lourd"], "⚡"], ["Le contraire de « gagner » :", "perdre", ["marquer", "jouer"], "🏆"], ["Un synonyme de « content » :", "joyeux", ["triste", "fâché"], "😄"], ["Le contraire de « grand » :", "petit", ["géant", "haut"], "📏"], ["Le contraire de « attaquer » :", "défendre", ["tirer", "courir"], "🛡️"], ["Un synonyme de « débuter » :", "commencer", ["finir", "arrêter"], "▶️"], ["Le contraire de « facile » :", "difficile", ["simple", "rapide"], "🧗🏾"], ["Un synonyme de « maison » :", "demeure", ["voiture", "école"], "🏠"]], 8);
    const alpha = () => fois(8, () => { const M = tirer(["ballon", "arbitre", "but", "corner", "dribble", "équipe", "filet", "gardien", "match", "pelouse", "tir", "zone"], 3); const t = M.slice().sort((a, b) => a.localeCompare(b, "fr")); return q("Quel mot vient en premier dans le dictionnaire ?", { k: "mots", t: M.join(" · ") }, mot(t[0]), t.slice(1).map(x => mot(x)), { dire: "Range ces mots dans l'ordre alphabétique. Lequel vient en premier ?", disposition: "trois" }); });
    const TEXTES = [
      { t: "Moussa habite à Ziguinchor, en Casamance. Chaque samedi, il va à la plage de Cap Skirring avec son oncle. Ils ramassent des coquillages et regardent les pêcheurs rentrer. Moussa rêve de devenir capitaine d'un grand bateau.", q: [["Où habite Moussa ?", "à Ziguinchor", ["à Dakar", "à Saint-Louis"]], ["Avec qui va-t-il à la plage ?", "avec son oncle", ["avec sa sœur", "seul"]], ["Que ramassent-ils ?", "des coquillages", ["des mangues", "des cailloux"]], ["Quel est le rêve de Moussa ?", "être capitaine d'un bateau", ["être footballeur", "être boulanger"]]] },
      { t: "Pendant l'hivernage, il pleut beaucoup au village de Fatou. Les champs de mil deviennent verts. Le grand-père de Fatou dit que la pluie est une bénédiction. Mais quand il pleut trop, la route devient boueuse et le car ne passe plus.", q: [["Quand pleut-il beaucoup ?", "pendant l'hivernage", ["pendant la Tabaski", "en mars"]], ["Que deviennent les champs ?", "verts", ["jaunes", "blancs"]], ["Que dit le grand-père ?", "la pluie est une bénédiction", ["la pluie est méchante", "il faut partir"]], ["Que se passe-t-il quand il pleut trop ?", "la route devient boueuse", ["il neige", "les poissons volent"]]] },
      { t: "Le jour du match, Seydina se lève tôt. Il range ses crampons, son maillot et sa gourde dans son sac. Avant de partir, il prend un bon petit-déjeuner. Son entraîneur a dit : « Un bon joueur, c'est d'abord un joueur en forme. »", q: [["Quand Seydina se lève-t-il ?", "tôt", ["tard", "à midi"]], ["Que range-t-il dans son sac ?", "ses crampons, son maillot et sa gourde", ["ses livres", "son repas"]], ["Que fait-il avant de partir ?", "il prend un bon petit-déjeuner", ["il dort encore", "il regarde la télé"]], ["Selon l'entraîneur, un bon joueur est d'abord…", "un joueur en forme", ["un joueur riche", "un joueur grand"]]] },
    ];
    const lecture = () => melange(TEXTES).flatMap(x => x.q.map(([qq, b, f]) => q(qq, { k: "texte", t: x.t }, phr(b), f.map(y => phr(y)), { dire: x.t + " " + qq }))).slice(0, 8);
    const multiplier = () => fois(8, () => { const a = r(11, 49), b = r(2, 9); return q(a + " × " + b + " = ?", null, ch(a * b), [a * b + b, a * b - b, a * b + 10].map(ch), { dire: a + " fois " + b }); });
    const diviser = () => fois(8, () => { const b = r(2, 9), s = r(2, 10), a = b * s; return q(a + " partagé en " + b + " = ?", { k: "mots", t: a + " ÷ " + b }, ch(s), proches(s, 1, 20).map(ch), { dire: a + " partagé en " + b + " parts égales, ça fait combien ?" }); });
    const doubles = () => fois(8, i => { const n = r(5, 50) * (i % 2 ? 2 : 1); return i % 2 ? q("Quelle est la moitié de " + n + " ?", null, ch(n / 2), proches(n / 2, 1, 100).map(ch), { dire: "La moitié de " + n + " ?" }) : q("Quel est le double de " + n + " ?", null, ch(2 * n), proches(2 * n, 1, 200).map(ch), { dire: "Le double de " + n + " ?" }); });
    const geometrie = quiz([["Combien d'angles droits a un rectangle ?", "4", ["2", "3", "0"], "▭"], ["Un triangle a combien de sommets ?", "3", ["4", "2", "6"], "🔺"], ["Deux droites qui ne se croisent jamais sont…", "parallèles", ["perpendiculaires", "courbes", "sécantes"], "🟰"], ["Deux droites qui forment un angle droit sont…", "perpendiculaires", ["parallèles", "rondes", "égales"], "➕"], ["Avec quoi trace-t-on un cercle ?", "un compas", ["une règle", "une gomme", "un taille-crayon"], "⭕"], ["Le centre du rond central du terrain est…", "le centre du cercle", ["un angle droit", "un sommet", "une diagonale"], "⚽"], ["Le terrain de foot a la forme d'un…", "rectangle", ["cercle", "triangle", "losange"], "🏟️"], ["Avec quoi vérifie-t-on un angle droit ?", "une équerre", ["un compas", "une gomme", "un rapporteur de match"], "📐"]], 8);
    const mesures = quiz([["1 heure = combien de minutes ?", "60", ["100", "30", "24"], "⏰"], ["Un match dure 2 mi-temps de 45 minutes. Combien de minutes en tout ?", "90", ["45", "100", "60"], "⏱️"], ["1 jour = combien d'heures ?", "24", ["12", "60", "7"], "📅"], ["1 semaine = combien de jours ?", "7", ["5", "10", "30"], "📆"], ["Le match commence à 16 h et dure 2 heures. Il finit à…", "18 h", ["17 h", "20 h", "14 h"], "🕕"], ["1 m 50 cm = combien de centimètres ?", "150 cm", ["15 cm", "1 500 cm", "105 cm"], "📏"], ["Un sac de 5 kg de riz pèse combien de grammes ?", "5 000 g", ["500 g", "50 g", "50 000 g"], "🍚"], ["Une bouteille de 2 L contient combien de demi-litres ?", "4", ["2", "3", "8"], "🧴"]], 8);
    const problemesCE2 = problemes([
      () => { const n = r(3, 9), p = r(12, 45) * 25; return ["Un maillot coûte " + p + " F. Combien coûtent " + n + " maillots ?", n * p, "👕"]; },
      () => { const t = r(3, 9), e = r(20, 30); return [t + " cars transportent chacun " + e + " supporters. Combien de supporters en tout ?", t * e, "🚌"]; },
      () => { const g = r(4, 9), s = r(4, 12); return [g * s + " bouteilles d'eau sont partagées entre " + g + " équipes. Combien par équipe ?", s, "💧"]; },
      () => { const a = r(1200, 4800), b = r(300, 900); return ["Le stade a " + a + " places. " + b + " sont vides. Combien de spectateurs ?", a - b, "🏟️"]; },
      () => { const a = r(150, 800), b = r(150, 800), c = r(150, 800); return ["Une équipe court " + a + " m, puis " + b + " m, puis " + c + " m. Quelle distance en tout ?", a + b + c, "🏃🏾"]; },
    ]);
    const histoire = quiz([["Quel royaume du Sénégal était dirigé par le Bourba ?", "le Djolof", ["le Cayor", "le Mali", "le Ghana"], "👑"], ["Le roi du Cayor portait le titre de…", "Damel", ["Pharaon", "Empereur", "Bourba"], "👑"], ["Quelle île au large de Dakar rappelle la traite des esclaves ?", "Gorée", ["Ngor", "Carabane", "la Madeleine"], "🏝️"], ["En quelle année le Sénégal est-il devenu indépendant ?", "1960", ["1902", "2000", "1945"], "🎉"], ["Qui fut le premier président du Sénégal ?", "Léopold Sédar Senghor", ["Lat Dior", "Abdou Diouf", "Blaise Diagne"], "📖"], ["Le royaume du Walo était situé près…", "du fleuve Sénégal", ["de Kédougou", "de Ziguinchor", "du Lac Rose"], "🏞️"], ["Quelle reine du Walo a résisté aux colons ?", "Ndaté Yalla", ["Aline Sitoé Diatta", "Mariama Bâ", "Coumba Gawlo"], "👸🏾"], ["La Maison des esclaves se trouve…", "à Gorée", ["à Touba", "à Thiès", "à Matam"], "🏚️"]], 8);
    const corpsCE2 = quiz([["Quel organe pompe le sang ?", "le cœur", ["l'estomac", "le foie", "le cerveau"], "🫀"], ["Où commence la digestion ?", "dans la bouche", ["dans les pieds", "dans les poumons", "dans le cœur"], "👄"], ["Les poumons servent à…", "respirer", ["digérer", "voir", "marcher"], "🫁"], ["Combien d'os environ dans le corps d'un adulte ?", "206", ["20", "2 000", "50"], "🦴"], ["Les muscles servent à…", "bouger", ["respirer", "penser", "digérer"], "💪🏾"], ["Après un match, pour récupérer, il faut…", "boire et dormir", ["manger des bonbons", "ne pas dormir", "rester au soleil"], "😴"], ["Le moustique peut transmettre…", "le paludisme", ["le rhume des foins", "la varicelle", "la grippe des oiseaux"], "🦟"], ["Pour se protéger des moustiques, on dort sous…", "une moustiquaire", ["un parasol", "une tente de plage", "un drapeau"], "🛏️"]], 8);
    const environnement = quiz([["Que fait-on des sachets plastiques ?", "on les jette à la poubelle ou on les recycle", ["on les brûle dans la maison", "on les jette dans la mer", "on les mange"], "🛍️"], ["Pourquoi planter des arbres ?", "pour l'ombre, l'air et contre le désert", ["pour cacher le soleil pour toujours", "pour gêner les voitures", "pour rien"], "🌳"], ["La Grande Muraille verte sert à…", "arrêter l'avancée du désert", ["faire des matchs", "protéger la mer", "construire des routes"], "🌿"], ["Une énergie qui ne s'épuise pas :", "le soleil", ["le charbon", "le pétrole", "le gaz"], "☀️"], ["Pour économiser l'eau, je…", "ferme le robinet", ["lave la voiture tous les jours", "laisse couler", "joue avec le tuyau"], "🚰"], ["Les déchets dans la mer tuent…", "les poissons et les tortues", ["les nuages", "les étoiles", "le sable"], "🐢"], ["Le vent peut produire…", "de l'électricité", ["de l'eau", "du riz", "du pétrole"], "🌬️"], ["Couper trop d'arbres provoque…", "l'avancée du désert", ["plus de pluie", "plus de forêts", "la neige"], "🏜️"]], 8);
    const animauxCE2 = quiz([["Un animal qui mange de l'herbe est…", "herbivore", ["carnivore", "insectivore", "piscivore"], "🐄"], ["Un animal qui mange de la viande est…", "carnivore", ["herbivore", "frugivore", "granivore"], "🦁"], ["Les mammifères nourrissent leurs petits avec…", "du lait", ["des graines", "des insectes", "de l'eau de mer"], "🍼"], ["Lequel est un mammifère ?", "la baleine", ["le requin", "la tortue", "le crocodile"], "🐋"], ["Lequel est un insecte ?", "la fourmi", ["l'araignée", "le ver de terre", "l'escargot"], "🐜"], ["Combien de pattes a un insecte ?", "6", ["8", "4", "10"], "🐞"], ["Le crocodile est un…", "reptile", ["mammifère", "oiseau", "poisson"], "🐊"], ["La grenouille naît dans l'eau sous forme de…", "têtard", ["poussin", "chenille", "chiot"], "🐸"]], 8);
    const footP2 = quiz([["Combien de joueurs par équipe sur le terrain ?", "11", ["10", "9", "12"], "⚽"], ["Combien de remplacements un entraîneur peut-il faire en général ?", "5", ["1", "11", "20"], "🔁"], ["La surface de réparation se trouve…", "devant chaque but", ["au milieu", "dans les tribunes", "dans le vestiaire"], "🥅"], ["Un penalty se tire à…", "11 mètres du but", ["5 mètres", "30 mètres", "100 mètres"], "🎯"], ["Que montre l'arbitre pour une expulsion ?", "un carton rouge", ["un carton jaune", "un drapeau vert", "un ballon"], "🟥"], ["Deux cartons jaunes font…", "un carton rouge", ["un penalty", "un but", "un corner"], "🟨"], ["La VAR, c'est…", "l'arbitrage vidéo", ["un vestiaire", "une tribune", "un ballon"], "📺"], ["Le gardien peut prendre le ballon à la main…", "dans sa surface", ["partout", "jamais", "dans le rond central"], "🧤"]], 8);
    const footP3 = quiz([["Qui a remporté la Coupe du monde 2022 ?", "l'Argentine", ["la France", "le Brésil", "le Maroc"], "🏆"], ["Quel pays africain a atteint la demi-finale en 2022 ?", "le Maroc", ["le Sénégal", "le Cameroun", "le Ghana"], "🇲🇦"], ["Où la Coupe du monde 2026 a-t-elle lieu ?", "aux États-Unis, au Canada et au Mexique", ["au Sénégal", "en France", "en Chine"], "🌎"], ["Quel joueur brésilien a joué au Barça avec Messi ?", "Neymar", ["Mbappé", "Sadio Mané", "Ronaldo"], "🇧🇷"], ["Le stade du FC Barcelone s'appelle…", "le Camp Nou", ["le Parc des Princes", "Wembley", "le stade Léopold-Senghor"], "🏟️"], ["La « Masia » est…", "le centre de formation du Barça", ["un plat espagnol", "une coupe", "un arbitre"], "🏫"], ["La Ligue des champions oppose…", "les meilleurs clubs d'Europe", ["les équipes nationales", "les écoles", "les arbitres"], "⭐"], ["Le grand stade de Diamniadio porte le nom de…", "Abdoulaye Wade", ["Senghor", "Sadio Mané", "Lat Dior"], "🏟️"]], 8);
    const footP4 = quiz([["Le « tiki-taka », c'est…", "beaucoup de passes courtes", ["de longs dégagements", "jouer sans ballon", "défendre à 11"], "🔁"], ["Le « faux 9 », c'est un attaquant qui…", "redescend au milieu pour combiner", ["reste dans le but", "ne touche jamais le ballon", "joue gardien"], "9️⃣"], ["Le « contre-pressing », c'est…", "presser tout de suite après avoir perdu le ballon", ["se reposer", "tirer au but", "faire une touche"], "⚡"], ["Un « bloc haut » veut dire que l'équipe…", "défend loin de son but", ["défend dans son but", "ne défend pas", "joue à 10"], "⬆️"], ["« Changer d'aile », c'est…", "envoyer le ballon de l'autre côté du terrain", ["changer de maillot", "sortir du terrain", "faire une faute"], "↔️"], ["Pourquoi faire « le triangle » entre joueurs ?", "pour avoir toujours une solution de passe", ["pour se cacher", "pour faire joli", "pour gêner l'arbitre"], "🔺"], ["Une équipe en 3-5-2 joue avec…", "3 défenseurs centraux", ["3 gardiens", "5 attaquants", "2 milieux"], "📋"], ["« Fixer » un défenseur, c'est…", "l'attirer vers soi pour libérer un coéquipier", ["l'attacher", "le pousser", "le regarder"], "🎯"]], 8);
    // Palier 2
    L("p2", "francais", "f1", "🔮", "Le futur", "Conjuguer au futur simple", conj(FUTUR, "au futur"));
    L("p2", "francais", "f2", "🎨", "L'adjectif et l'accord", "Accorder l'adjectif avec le nom", accordAdj);
    L("p2", "francais", "f3", "❓", "Les types de phrases", "Déclarative, interrogative, exclamative, négative", types);
    L("p2", "francais", "f4", "📚", "Je lis et je comprends", "Comprendre un texte", lecture);
    L("p2", "maths", "m1", "✖️", "Multiplier un grand nombre", "Multiplier par un nombre à un chiffre", multiplier);
    L("p2", "maths", "m2", "📐", "Géométrie", "Angles droits, parallèles, cercle", geometrie);
    L("p2", "maths", "m3", "💰", "Problèmes", "Problèmes à plusieurs étapes", problemesCE2);
    L("p2", "foot", "s1", "🟥", "Les règles avancées", "Cartons, penalty, VAR, remplacements", footP2);
    L("p2", "decouvrir", "d1", "🐊", "Le monde animal", "Classer les animaux", animauxCE2);
    L("p2", "decouvrir", "d2", "🫀", "Le corps humain", "Organes, digestion, santé", corpsCE2);
    // Palier 3
    L("p3", "francais", "f1", "⏳", "L'imparfait", "Conjuguer à l'imparfait", conj(IMPARFAIT, "à l'imparfait"));
    L("p3", "francais", "f2", "🔁", "Synonymes et contraires", "Enrichir son vocabulaire", synonymes);
    L("p3", "francais", "f3", "🔤", "L'ordre alphabétique", "Chercher dans le dictionnaire", alpha);
    L("p3", "francais", "f4", "📚", "Je lis et je comprends", "Comprendre un texte", lecture);
    L("p3", "maths", "m1", "➗", "Le partage", "Diviser en parts égales", diviser);
    L("p3", "maths", "m2", "✌🏾", "Doubles et moitiés", "Calcul mental", doubles);
    L("p3", "maths", "m3", "⏱️", "Durées et mesures", "Heures, minutes, conversions", mesures);
    L("p3", "foot", "s1", "🌍", "Le football dans le monde", "Coupes, clubs, stades", footP3);
    L("p3", "decouvrir", "d1", "👑", "L'histoire du Sénégal", "Royaumes, Gorée, indépendance", histoire);
    // Palier 4
    L("p4", "francais", "f1", "✅", "Le passé composé", "Conjuguer au passé composé", conj(PASSE, "au passé composé"));
    L("p4", "francais", "f2", "🎨", "Accords dans la phrase", "Accorder adjectifs et noms", accordAdj);
    L("p4", "francais", "f3", "❓", "Je construis des phrases", "Types et formes de phrases", types);
    L("p4", "maths", "m1", "➕", "Calculs jusqu'à 9 999", "Additions et soustractions", () => calculs("+", 5000, 4000)().slice(0, 4).concat(calculs("-", 9000, 3000)().slice(0, 4)));
    L("p4", "maths", "m2", "✖️", "Multiplier et partager", "Révision des tables et du partage", () => multiplier().slice(0, 4).concat(diviser().slice(0, 4)));
    L("p4", "maths", "m3", "💰", "Grands problèmes", "Problèmes de la vie courante", problemesCE2);
    L("p4", "foot", "s1", "📋", "La tactique des grands", "Tiki-taka, faux 9, bloc haut", footP4);
    L("p4", "decouvrir", "d1", "🌿", "Protéger l'environnement", "Déchets, arbres, énergies", environnement);
  }

  const paliers = [
    { id: "p2", titre: "Palier 2", periode: "janvier à mars" },
    { id: "p3", titre: "Palier 3", periode: "avril à mai" },
    { id: "p4", titre: "Palier 4", periode: "juin et vacances" },
  ];
  return { paliers, lecons };
};
