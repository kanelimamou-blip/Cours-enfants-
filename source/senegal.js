/* Grande mise à jour : deux fois plus d'étapes, plus simples, autour du Sénégal.
   window.SENEGAL_PLUS(classe) renvoie { monde: {...}, lecons: [{ monde, palier, ... }] }.
   Les étapes vont dans le nouveau monde « Mon Sénégal » ou dans les mondes existants. */
window.SENEGAL_PLUS = function (classe) {
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const NOMBRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
  const cle = x => JSON.stringify(x.t || x.html || x.e || x.items);
  const q = (consigne, scene, bonne, autres, extra) => {
    const vus = new Set([cle(bonne)]);
    autres = autres.filter(x => { const c = cle(x); return !vus.has(c) && vus.add(c); });
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  };
  const legende = classe !== "gs";
  const img = (e, t) => ({ k: "image", e, t: legende ? t : "", dire: t });
  const mot = t => ({ k: "mots", t, dire: t });
  const phr = t => ({ k: "phrase", t, dire: t });
  const ch = n => ({ k: "chiffre", t: String(n), dire: n <= 20 ? NOMBRES[n] : String(n) });
  const tas = (n, e) => ({ k: "tas", items: fois(n, () => e) });
  const proches = (n, min, max, k) => { const s = new Set(); let g = 0; while (s.size < (k || 2) && g++ < 60) { const x = n + r(-3, 3); if (x !== n && x >= min && x <= max) s.add(x); } return [...s]; };
  const N = 6; // six questions par étape : des parties courtes

  // ----- La banque du Sénégal : [nom, emoji] -----
  const PLATS = [["le thiéboudienne", "🍛"], ["le yassa", "🍗"], ["le mafé", "🥜"], ["le thiakry", "🥣"], ["les fataya", "🥟"], ["les beignets", "🍩"], ["le pain", "🥖"], ["le café Touba", "☕"], ["le bissap", "🌺"], ["le lait caillé", "🥛"], ["le poisson grillé", "🐟"], ["le riz", "🍚"]];
  const FRUITS = [["la mangue", "🥭"], ["la banane", "🍌"], ["la pastèque", "🍉"], ["l'orange", "🍊"], ["la noix de coco", "🥥"], ["l'arachide", "🥜"], ["le citron", "🍋"], ["l'ananas", "🍍"], ["la papaye", "🍈"]];
  const ANIMAUX = [["le lion", "🦁"], ["le crocodile", "🐊"], ["l'hippopotame", "🦛"], ["le singe", "🐒"], ["le flamant rose", "🦩"], ["la tortue", "🐢"], ["le chameau", "🐪"], ["le mouton", "🐑"], ["la chèvre", "🐐"], ["le cheval", "🐎"], ["le zébu", "🐂"], ["le pélican", "🦤"], ["l'éléphant", "🐘"], ["le phacochère", "🐗"]];
  const MUSIQUE = [["le tam-tam", "🥁"], ["la kora", "🪕"], ["la flûte", "🪈"], ["le micro du griot", "🎤"], ["la danse", "💃🏾"], ["la chanson", "🎵"]];
  const HABITS = [["le boubou", "👘"], ["le pagne", "🧣"], ["les babouches", "🥿"], ["le chapeau", "👒"], ["le maillot des Lions", "👕"], ["le foulard", "🧕🏾"], ["la robe", "👗"], ["les sandales", "🩴"]];
  const TRANSPORTS = [["le car rapide", "🚌"], ["la pirogue", "🛶"], ["le TER", "🚆"], ["le taxi", "🚕"], ["la charrette", "🐴"], ["l'avion", "✈️"], ["la moto", "🏍️"], ["le vélo", "🚲"], ["le bateau pour Gorée", "⛴️"]];
  const METIERS = [["le pêcheur", "🎣", "le poisson", "🐟"], ["le tailleur", "🧵", "le boubou", "👘"], ["le boulanger", "👨🏾‍🍳", "le pain", "🥖"], ["la docteure", "👩🏾‍⚕️", "le stéthoscope", "🩺"], ["le cultivateur", "👨🏾‍🌾", "l'arachide", "🥜"], ["le maçon", "👷🏾", "la brique", "🧱"], ["la maîtresse", "👩🏾‍🏫", "le tableau", "📚"], ["le chauffeur", "🧑🏾‍✈️", "le car rapide", "🚌"], ["le pompier", "🧑🏾‍🚒", "le feu", "🔥"]];
  const NATURE = [["le baobab", "🌳"], ["la mer", "🌊"], ["le fleuve", "🏞️"], ["le soleil", "☀️"], ["la pluie", "🌧️"], ["le sable", "🏖️"], ["le palmier", "🌴"], ["la lune", "🌙"], ["l'étoile", "⭐"], ["la fleur", "🌸"]];
  const FETES = [["la Tabaski", "🐑"], ["la Korité", "🌙"], ["le 4 avril", "🇸🇳"], ["Noël", "🎄"], ["un baptême", "👶🏾"], ["un anniversaire", "🎂"]];
  const MARCHE = [["la tomate", "🍅"], ["l'oignon", "🧅"], ["le piment", "🌶️"], ["la carotte", "🥕"], ["le chou", "🥬"], ["la pomme de terre", "🥔"], ["l'œuf", "🥚"], ["le poisson", "🐟"], ["le poulet", "🍗"], ["le sel", "🧂"]];
  const OBJETS_COMPTER = ["🥭", "🐟", "🥜", "🐑", "🛶", "🥁", "🌴", "🍩", "⚽", "🐐", "🌺", "🐢"];
  const COULEURS = [["vert", "#2e9e5b"], ["jaune", "#f5c518"], ["rouge", "#e0533d"], ["bleu", "#2f6fd1"], ["blanc", "#ffffff"], ["noir", "#222222"], ["orange", "#f08a1c"], ["rose", "#ff8fc7"]];

  // ----- Fabriques de questions simples -----
  const imagier = (liste, debut) => () => fois(N, () => { const [b, ...f] = tirer(liste, 3); return q((debut || "Touche") + " " + b[0], null, img(b[1], b[0]), f.map(x => img(x[1], x[0])), { dire: (debut || "Touche") + " " + b[0] + "." }); });
  const quelNom = liste => () => fois(N, () => { const [b, ...f] = tirer(liste, 3); return q("Qu'est-ce que c'est ?", { k: "image", e: b[1] }, mot(b[0]), f.map(x => mot(x[0])), { dire: "Qu'est-ce que c'est ?" }); });
  const compter = (min, max, objets) => () => fois(N, () => { const n = r(min, max), e = hasard(objets || OBJETS_COMPTER); return q("Combien ?", tas(n, e), ch(n), proches(n, 1, max + 2).map(ch), { dire: "Compte bien. Combien y en a-t-il ?" }); });
  const lePlus = (max, moins) => () => fois(N, () => { const e = hasard(OBJETS_COMPTER), l = tirer(fois(max, i => i + 1), 3); const bonne = moins ? Math.min(...l) : Math.max(...l); return q(moins ? "Où y en a-t-il le moins ?" : "Où y en a-t-il le plus ?", null, tas(bonne, e), l.filter(x => x !== bonne).map(x => tas(x, e)), { dire: moins ? "Touche le groupe où il y en a le moins." : "Touche le groupe où il y en a le plus." }); });
  const montrerNombre = (max, objets) => () => fois(N, () => { const n = r(1, max), e = hasard(objets || OBJETS_COMPTER); return q("Touche " + n, { k: "chiffre", t: String(n) }, tas(n, e), proches(n, 1, max).map(x => tas(x, e)), { dire: "Touche le groupe où il y en a " + NOMBRES[n] + "." }); });
  const pastille = c => ({ k: "html", html: '<span style="display:inline-block;width:1.4em;height:1.4em;border-radius:50%;font-size:56px;background:' + c[1] + ';box-shadow:inset 0 0 0 3px rgba(0,0,0,.25)"></span>', dire: c[0] });
  const couleurs = liste => () => fois(N, () => { const [b, ...f] = tirer(liste, 3); return q("Touche le " + b[0], null, pastille(b), f.map(pastille), { dire: "Touche la couleur " + b[0] + "." }); });
  const drapeau = () => fois(N, i => {
    const D = '<span style="display:inline-flex;font-size:0;border-radius:6px;overflow:hidden;box-shadow:0 2px 0 rgba(0,0,0,.2)">';
    const bande = (c, etoile) => '<span style="display:inline-grid;place-items:center;width:44px;height:96px;background:' + c + ';font-size:30px;color:#2e9e5b">' + (etoile ? "★" : "") + "</span>";
    const vrai = { k: "html", html: D + bande("#2e9e5b") + bande("#f5c518", true) + bande("#e0533d") + "</span>", dire: "le drapeau du Sénégal" };
    const faux1 = { k: "html", html: D + bande("#e0533d") + bande("#f5c518") + bande("#2e9e5b") + "</span>", dire: "un autre drapeau" };
    const faux2 = { k: "html", html: D + bande("#2f6fd1") + bande("#ffffff", true) + bande("#e0533d") + "</span>", dire: "un autre drapeau" };
    if (i % 2) return q("Touche le vert du drapeau", vrai, pastille(COULEURS[0]), [pastille(COULEURS[3]), pastille(COULEURS[5])], { dire: "Le drapeau du Sénégal est vert, jaune, rouge. Touche le vert." });
    return q("Touche le drapeau du Sénégal", null, vrai, [faux1, faux2], { dire: "Touche le drapeau du Sénégal : vert, jaune, rouge, avec une étoile verte." });
  });
  const intrus = (groupes) => () => fois(N, () => {
    const noms = Object.keys(groupes), g = hasard(noms), autre = hasard(noms.filter(x => x !== g)), [a, b] = tirer(groupes[g], 2), c = hasard(groupes[autre]);
    return q("Lequel n'est pas " + g + " ?", null, img(c[1], c[0]), [img(a[1], a[0]), img(b[1], b[0])], { dire: "Deux images sont " + g + ". Laquelle n'en est pas ?" });
  });
  const associer = (paires, question) => () => fois(N, () => { const [b, ...f] = tirer(paires, 3); return q(question(b), { k: "image", e: b[1] }, img(b[3], b[2]), f.map(x => img(x[3], x[2])), { dire: question(b) }); });
  // Quiz en images : [question, [nom, emoji], [[nom, emoji], ...], emoji de la scène]
  const quizImg = faits => () => tirer(faits, Math.min(N, faits.length)).map(([question, b, f, e]) => q(question, e ? { k: "image", e } : null, img(b[1], b[0]), tirer(f, 2).map(x => img(x[1], x[0])), { dire: question }));
  // Quiz en mots courts : [question, bonne, [fausses], emoji]
  const quiz = faits => () => tirer(faits, Math.min(N, faits.length)).map(([question, b, f, e]) => { const c = x => (String(x).length > 22 ? phr(x) : mot(x)); return q(question, e ? { k: "image", e } : null, c(b), tirer(f, 2).map(c), { dire: question }); });
  const lireMots = liste => () => fois(N, i => { const [b, ...f] = tirer(liste, 3); return i % 2 ? q("Lis le mot. Touche l'image.", { k: "mots", t: b[0] }, img(b[1], ""), f.map(x => img(x[1], "")), { dire: "Lis le mot, puis touche la bonne image." }) : q("Quel mot va avec l'image ?", { k: "image", e: b[1] }, mot(b[0]), f.map(x => mot(x[0])), { dire: "Quel mot va avec l'image ?" }); });
  const calcul = (op, maxA, maxB, objets) => () => fois(N, () => {
    let a = r(1, maxA), b = r(1, maxB); if (op === "-" && b > a) [a, b] = [b, a];
    const s = op === "+" ? a + b : op === "-" ? a - b : a * b, signe = op === "*" ? "×" : op === "-" ? "−" : "+", dit = op === "+" ? " plus " : op === "-" ? " moins " : " fois ";
    const e = objets && a + b <= 10 && op !== "*" ? hasard(objets) : null;
    const scene = e ? { k: "html", html: '<span class="tas">' + fois(a, () => "<i>" + e + "</i>").join("") + "<i>" + (op === "+" ? "➕" : "➖") + "</i>" + fois(b, () => "<i>" + e + "</i>").join("") + "</span>" } : { k: "mots", t: a + " " + signe + " " + b };
    return q(a + " " + signe + " " + b + " = ?", scene, ch(s), proches(s, 0, 99999).map(ch), { dire: a + dit + b + ", ça fait combien ?" });
  });
  const histoires = liste => () => fois(N, () => { const [txt, s, e] = hasard(liste)(); return q(txt, e ? { k: "image", e } : null, ch(s), proches(s, 0, 999999).map(ch), { dire: txt }); });
  const avantApres = max => () => fois(N, i => { const n = r(1, max - 1), avant = i % 2; const b = avant ? n - 1 : n + 1; return q("Quel nombre vient " + (avant ? "avant " : "après ") + n + " ?", { k: "chiffre", t: String(n) }, ch(b), proches(b, 0, max + 1, 3).filter(x => x !== n).slice(0, 2).map(ch), { dire: "Quel nombre vient " + (avant ? "avant " : "après ") + NOMBRES[n] + " ?" }); });

  const lecons = [];
  const L = (palier, monde, id, icone, titre, objectif, questions) => lecons.push({ id: classe + "-sn-" + palier + "-" + id, palier, monde, icone, titre, objectif, questions });

  // Faits du Sénégal, réutilisés par plusieurs classes
  const SENEGAL_SIMPLE = [
    ["Quel animal est le symbole du Sénégal ?", ["le lion", "🦁"], [["le chat", "🐈"], ["la poule", "🐔"], ["le poisson", "🐟"]], "🇸🇳"],
    ["À la Tabaski, on prépare…", ["le mouton", "🐑"], [["le gâteau", "🎂"], ["le sapin", "🎄"], ["la glace", "🍦"]], "🕌"],
    ["Quel arbre géant pousse au Sénégal ?", ["le baobab", "🌳"], [["le sapin", "🌲"], ["le cactus", "🌵"]], "🌍"],
    ["Pour pêcher en mer, le pêcheur prend…", ["la pirogue", "🛶"], [["l'avion", "✈️"], ["le vélo", "🚲"]], "🌊"],
    ["Quel instrument fait boum boum ?", ["le tam-tam", "🥁"], [["la kora", "🪕"], ["la flûte", "🪈"]], "👂"],
    ["Le thiéboudienne, c'est du riz avec…", ["du poisson", "🐟"], [["des bonbons", "🍬"], ["du chocolat", "🍫"]], "🍛"],
    ["Le bissap est une boisson…", ["rouge", "🌺"], [["bleue", "💙"], ["noire", "🖤"]], "🥤"],
    ["Le Lac Rose est de quelle couleur ?", ["rose", "🩷"], [["vert", "💚"], ["noir", "🖤"]], "🏞️"],
    ["Avec l'arachide, on fait…", ["le mafé", "🥜"], [["la glace", "🍦"], ["le pain", "🥖"]], "🍲"],
    ["Pendant l'hivernage, il y a…", ["la pluie", "🌧️"], [["la neige", "❄️"], ["les sapins", "🎄"]], "🌦️"],
    ["L'équipe de foot du Sénégal, ce sont…", ["les Lions", "🦁"], [["les Tigres", "🐯"], ["les Ours", "🐻"]], "⚽"],
    ["Dans le désert de Lompoul, on voit…", ["le chameau", "🐪"], [["le pingouin", "🐧"], ["la baleine", "🐋"]], "🏜️"],
  ];
  const SENEGAL_CI = [
    ["Quelle est la capitale du Sénégal ?", "Dakar", ["Paris", "Thiès", "Touba"], "🏙️"],
    ["Quelles sont les couleurs du drapeau ?", "vert, jaune, rouge", ["bleu, blanc, rouge", "noir, rouge, vert"], "🇸🇳"],
    ["Quelle île est en face de Dakar ?", "Gorée", ["Madagascar", "la Corse"], "🏝️"],
    ["La fête de l'indépendance, c'est le…", "4 avril", ["25 décembre", "1er janvier"], "🎉"],
    ["Quelle langue parle-t-on beaucoup au Sénégal ?", "le wolof", ["le chinois", "l'anglais"], "🗣️"],
    ["Le grand pont de Saint-Louis s'appelle…", "le pont Faidherbe", ["le pont de Paris", "le pont du lac"], "🌉"],
    ["Quelle grande ville est en Casamance ?", "Ziguinchor", ["Dakar", "Kaolack"], "🌴"],
    ["Avec quelle monnaie paie-t-on au Sénégal ?", "le franc CFA", ["l'euro", "le dollar"], "🪙"],
    ["Quel océan borde le Sénégal ?", "l'océan Atlantique", ["l'océan Indien", "la mer Rouge"], "🌊"],
    ["Quel fleuve passe à Saint-Louis ?", "le fleuve Sénégal", ["le Nil", "la Seine"], "🏞️"],
    ["Quel sport fait le lutteur au Sénégal ?", "la lutte", ["le ski", "le hockey"], "🤼🏾"],
    ["Comment dit-on bonjour en wolof ?", "Na nga def", ["Hello", "Hola"], "👋🏾"],
  ];

  // ================================= GRANDE SECTION =================================
  if (classe === "gs") {
    const GROUPES = { "un fruit": FRUITS, "un animal": ANIMAUX, "un habit": HABITS, "un transport": TRANSPORTS };
    const QUI_MANGE = [["le mouton", "🐑", "l'herbe", "🌿"], ["le singe", "🐒", "la banane", "🍌"], ["le lion", "🦁", "la viande", "🍖"], ["le chat", "🐈", "le poisson", "🐟"], ["la poule", "🐔", "les graines", "🌾"], ["le bébé", "👶🏾", "le lait", "🍼"]];
    const MAISONS = [["le poisson", "🐟", "la mer", "🌊"], ["l'oiseau", "🐦", "le nid", "🪺"], ["le chameau", "🐪", "le désert", "🏜️"], ["le singe", "🐒", "l'arbre", "🌳"], ["le crocodile", "🐊", "le fleuve", "🏞️"], ["la vache", "🐄", "le champ", "🌾"]];
    const SOINS = [["J'ai mal aux dents. Je vais chez…", ["le dentiste", "🦷"], [["le boulanger", "🥖"], ["le tailleur", "🧵"]], "😣"],
      ["Avant de manger, je me lave…", ["les mains", "🧼"], [["les pieds", "🦶🏾"], ["les cheveux", "💇🏾"]], "🍛"],
      ["Pour écouter le cœur, la docteure prend…", ["le stéthoscope", "🩺"], [["la cuillère", "🥄"], ["le ballon", "⚽"]], "👩🏾‍⚕️"],
      ["Contre les moustiques, je dors sous…", ["la moustiquaire", "🦟"], [["la table", "🪑"], ["la pluie", "🌧️"]], "🛏️"],
      ["Quand j'ai de la fièvre, on prend…", ["le thermomètre", "🌡️"], [["le crayon", "✏️"], ["la fourchette", "🍴"]], "🤒"],
      ["Pour avoir des dents propres, j'utilise…", ["la brosse à dents", "🪥"], [["le peigne", "🪮"], ["le savon", "🧼"]], "😁"],
      ["Je me suis coupé le doigt. On met…", ["un pansement", "🩹"], [["du sucre", "🍬"], ["de la boue", "🟤"]], "☝🏾"],
      ["Pour être en forme, je bois…", ["de l'eau", "💧"], [["du soda", "🥤"], ["du café", "☕"]], "💪🏾"]];
    const CUISINE = [["Pour cuire le riz, maman utilise…", ["la marmite", "🍲"], [["le seau", "🪣"], ["le ballon", "⚽"]], "🍚"],
      ["Le yassa se fait avec beaucoup…", ["d'oignons", "🧅"], [["de bonbons", "🍬"], ["de chocolat", "🍫"]], "🍗"],
      ["Le matin, on mange souvent…", ["du pain", "🥖"], [["du gâteau d'anniversaire", "🎂"], ["de la pizza", "🍕"]], "🌅"],
      ["Pour couper, on prend…", ["le couteau", "🔪"], [["la cuillère", "🥄"], ["le verre", "🥛"]], "🧅"],
      ["Le thiakry est fait avec…", ["du lait caillé", "🥛"], [["du poisson", "🐟"], ["du piment", "🌶️"]], "🥣"],
      ["Le piment, c'est…", ["piquant", "🌶️"], [["sucré", "🍬"], ["froid", "🧊"]], "😮"],
      ["Pour boire, je prends…", ["un verre", "🥛"], [["une fourchette", "🍴"], ["un couteau", "🔪"]], "💧"],
      ["Après le repas, on lave…", ["les assiettes", "🍽️"], [["la voiture", "🚗"], ["le mouton", "🐑"]], "🧽"]];
    // Palier 1
    L("p1", "senegal", "a1", "🇸🇳", "Le drapeau du Sénégal", "Reconnaître le drapeau et ses couleurs", drapeau);
    L("p1", "senegal", "a2", "🥭", "Les fruits de chez nous", "Nommer les fruits", imagier(FRUITS));
    L("p1", "compter", "a3", "🥜", "Je compte les arachides", "Dénombrer jusqu'à 3", compter(1, 3, ["🥜", "🥭", "🐟"]));
    L("p1", "senegal", "a4", "🦁", "Les animaux du Sénégal", "Nommer les animaux", imagier(ANIMAUX));
    L("p1", "compter", "a5", "🐑", "Le plus de moutons", "Comparer des quantités", lePlus(5));
    L("p1", "parler", "a6", "🎨", "Les couleurs", "Reconnaître les couleurs", couleurs(COULEURS.slice(0, 4)));
    L("p1", "cuisine", "a7", "🍛", "Les plats de chez nous", "Nommer les plats sénégalais", imagier(PLATS));
    L("p1", "compter", "a8", "4", "Je compte jusqu'à 4", "Dénombrer jusqu'à 4", compter(1, 4));
    L("p1", "docteure", "a9", "🧼", "Je prends soin de moi", "Hygiène et santé", quizImg(SOINS));
    L("p1", "senegal", "a10", "🥁", "La musique de chez nous", "Les instruments du Sénégal", imagier(MUSIQUE));
    // Palier 2
    L("p2", "senegal", "b1", "🚌", "Les transports du Sénégal", "Car rapide, pirogue, TER…", imagier(TRANSPORTS));
    L("p2", "compter", "b2", "5", "Je compte jusqu'à 5", "Dénombrer jusqu'à 5", compter(2, 5));
    L("p2", "parler", "b3", "🌈", "Encore des couleurs", "Reconnaître huit couleurs", couleurs(COULEURS));
    L("p2", "cuisine", "b4", "🧺", "Au marché de Sandaga", "Les légumes du marché", imagier(MARCHE));
    L("p2", "compter", "b5", "🔢", "Montre-moi le nombre", "Associer un chiffre à une quantité", montrerNombre(5));
    L("p2", "senegal", "b6", "👘", "Les habits de fête", "Boubou, pagne, babouches…", imagier(HABITS));
    L("p2", "docteure", "b7", "🩺", "Chez la docteure", "Les gestes du soin", quizImg(SOINS));
    L("p2", "decouvrir", "b8", "🍌", "Qui mange quoi ?", "Les animaux et leur nourriture", associer(QUI_MANGE, b => "Que mange " + b[0] + " ?"));
    L("p2", "compter", "b9", "🐟", "Le moins de poissons", "Comparer des quantités", lePlus(5, true));
    L("p2", "senegal", "b10", "🦁", "Mon pays, le Sénégal", "Les symboles et la culture", quizImg(SENEGAL_SIMPLE));
    L("p2", "parler", "b11", "🔍", "L'intrus", "Classer les images", intrus(GROUPES));
    L("p2", "cuisine", "b12", "🍲", "Dans la cuisine", "Ustensiles et recettes", quizImg(CUISINE));
    L("p2", "compter", "b13", "6", "Je compte jusqu'à 6", "Dénombrer jusqu'à 6", compter(3, 6));
    L("p2", "decouvrir", "b14", "🌳", "La nature autour de moi", "Baobab, mer, soleil…", imagier(NATURE));
    L("p2", "senegal", "b15", "🎉", "Les fêtes de chez nous", "Tabaski, Korité, 4 avril", imagier(FETES));
    // Palier 3
    L("p3", "decouvrir", "c1", "🏠", "Où habite-t-il ?", "Les animaux et leur milieu", associer(MAISONS, b => "Où vit " + b[0] + " ?"));
    L("p3", "compter", "c2", "7", "Je compte jusqu'à 7", "Dénombrer jusqu'à 7", compter(4, 7));
    L("p3", "senegal", "c3", "👷🏾", "Les métiers", "Qui fait quoi ?", associer(METIERS, b => "Qu'utilise " + b[0] + " ?"));
    L("p3", "compter", "c4", "➕", "J'ajoute des mangues", "Ajouter avec des images", calcul("+", 3, 2, ["🥭", "🐟", "🥜"]));
    L("p3", "parler", "c5", "🔍", "Encore l'intrus", "Classer les images", intrus(GROUPES));
    L("p3", "cuisine", "c6", "🥤", "Les boissons et les fruits", "Bissap, bouye, fruits", imagier(FRUITS.concat([["le bissap", "🌺"], ["le lait", "🥛"], ["l'eau", "💧"]])));
    L("p3", "compter", "c7", "🔢", "Montre-moi jusqu'à 7", "Associer un chiffre à une quantité", montrerNombre(7));
    L("p3", "docteure", "c8", "🦷", "Docteure des dents", "Hygiène et santé", quizImg(SOINS));
    L("p3", "senegal", "c9", "🇸🇳", "Encore le drapeau", "Le drapeau du Sénégal", drapeau);
    L("p3", "decouvrir", "c10", "🐒", "Les animaux de la savane", "Nommer les animaux", imagier(ANIMAUX));
    L("p3", "compter", "c11", "⏭️", "Après, c'est quoi ?", "Le nombre qui suit", avantApres(7));
    L("p3", "cuisine", "c12", "🧅", "Je cuisine avec maman", "Ustensiles et recettes", quizImg(CUISINE));
    L("p3", "senegal", "c13", "🥁", "Musique et danse", "Les instruments du Sénégal", imagier(MUSIQUE));
    L("p3", "compter", "c14", "🐑", "Le plus, le moins", "Comparer des quantités", () => lePlus(7)().slice(0, 3).concat(lePlus(7, true)().slice(0, 3)));
    L("p3", "senegal", "c15", "🦁", "Quiz du Sénégal", "Les symboles et la culture", quizImg(SENEGAL_SIMPLE));
    // Palier 4
    L("p4", "compter", "d1", "8", "Je compte jusqu'à 8", "Dénombrer jusqu'à 8", compter(4, 8));
    L("p4", "senegal", "d2", "🛶", "En voyage au Sénégal", "Les transports", imagier(TRANSPORTS));
    L("p4", "compter", "d3", "➕", "Ajouter des poissons", "Petites additions", calcul("+", 4, 3, ["🐟", "🥭", "🍩"]));
    L("p4", "parler", "d4", "🎨", "Toutes les couleurs", "Reconnaître les couleurs", couleurs(COULEURS));
    L("p4", "cuisine", "d5", "🍛", "Le grand repas", "Les plats sénégalais", imagier(PLATS));
    L("p4", "compter", "d6", "🔢", "Montre-moi jusqu'à 9", "Associer un chiffre à une quantité", montrerNombre(9));
    L("p4", "docteure", "d7", "🩹", "Les petits bobos", "Hygiène et santé", quizImg(SOINS));
    L("p4", "decouvrir", "d8", "🍌", "Les repas des animaux", "Les animaux et leur nourriture", associer(QUI_MANGE, b => "Que mange " + b[0] + " ?"));
    L("p4", "compter", "d9", "🔟", "Je compte jusqu'à 10", "Dénombrer jusqu'à 10", compter(5, 10));
    L("p4", "senegal", "d10", "👷🏾", "Les métiers de chez nous", "Qui fait quoi ?", associer(METIERS, b => "Qu'utilise " + b[0] + " ?"));
    L("p4", "compter", "d11", "⏮️", "Avant ou après ?", "Le nombre avant, le nombre après", avantApres(10));
    L("p4", "decouvrir", "d12", "🏠", "Chacun sa maison", "Les animaux et leur milieu", associer(MAISONS, b => "Où vit " + b[0] + " ?"));
    L("p4", "parler", "d13", "🔍", "Le super intrus", "Classer les images", intrus(GROUPES));
    L("p4", "senegal", "d14", "🎉", "Les fêtes", "Tabaski, Korité, 4 avril", imagier(FETES));
    L("p4", "compter", "d15", "➖", "J'en mange un", "Enlever avec des images", calcul("-", 5, 2, ["🥭", "🍩", "🍌"]));
    L("p4", "senegal", "d16", "🌟", "Le grand quiz du Sénégal", "Les symboles et la culture", quizImg(SENEGAL_SIMPLE));

    // ----- Encore plus pour Bineta : cuisine, mode, docteurs, lettres et syllabes -----
    const DOCTEURS = [["la dentiste", "🦷", "Elle soigne les dents."], ["le pédiatre", "👶🏾", "Il soigne les bébés et les enfants."], ["l'ophtalmologue", "👁️", "Elle soigne les yeux."], ["le cardiologue", "🫀", "Il soigne le cœur."], ["l'orthopédiste", "🦴", "Il soigne les os."], ["la chirurgienne", "😷", "Elle opère à l'hôpital."], ["l'ORL", "👂🏾", "Il soigne les oreilles et le nez."], ["la sage-femme", "🤰🏾", "Elle aide les bébés à naître."]];
    const docteurQui = () => fois(N, () => { const [b, ...f] = tirer(DOCTEURS, 3); return q(b[2] + " Qui est-ce ?", null, img(b[1], b[0]), f.map(x => img(x[1], x[0])), { dire: b[2] + " Touche l'image qui va avec " + b[0] + "." }); });
    const RECETTES_I = [["le yassa", "🍗", [["l'oignon", "🧅"], ["le citron", "🍋"], ["le poulet", "🍗"]]], ["le thiéboudienne", "🍛", [["le riz", "🍚"], ["le poisson", "🐟"], ["la carotte", "🥕"]]], ["le mafé", "🥜", [["l'arachide", "🥜"], ["la viande", "🍖"], ["la tomate", "🍅"]]], ["le thiakry", "🥣", [["le lait caillé", "🥛"], ["le sucre", "🍬"]]], ["le bissap", "🌺", [["la fleur d'hibiscus", "🌺"], ["l'eau", "💧"], ["le sucre", "🍬"]]], ["les beignets", "🍩", [["la farine", "🌾"], ["l'œuf", "🥚"], ["le sucre", "🍬"]]]];
    const PAS_CUISINE = [["la glace", "🧊"], ["le savon", "🧼"], ["la chaussure", "👟"], ["le crayon", "✏️"], ["le ballon", "⚽"], ["la voiture", "🚗"]];
    const ingredients = () => fois(N, () => { const [plat, e, ing] = hasard(RECETTES_I), b = hasard(ing), f = tirer(PAS_CUISINE, 2); return q("Que met-on dans " + plat + " ?", { k: "image", e }, img(b[1], b[0]), f.map(x => img(x[1], x[0])), { dire: "Pour faire " + plat + ", que met-on ?" }); });
    const MODE = [["la robe", "👗"], ["le boubou", "👘"], ["les chaussures à talons", "👠"], ["le sac à main", "👜"], ["le collier", "📿"], ["la bague", "💍"], ["les lunettes de soleil", "🕶️"], ["le chapeau", "👒"], ["le rouge à lèvres", "💄"], ["le foulard", "🧕🏾"]];
    const METEO_MODE = [["Il fait très chaud. Je mets…", ["les lunettes de soleil", "🕶️"], [["le manteau", "🧥"], ["les gants", "🧤"]], "☀️"], ["Il pleut. Je prends…", ["le parapluie", "☂️"], [["les lunettes de soleil", "🕶️"], ["le maillot de bain", "👙"]], "🌧️"], ["Je vais à la plage. Je mets…", ["le maillot de bain", "👙"], [["le manteau", "🧥"], ["le boubou de fête", "👘"]], "🏖️"], ["C'est la Tabaski. Je mets…", ["le beau boubou", "👘"], [["le pyjama", "🛌"], ["le maillot de bain", "👙"]], "🐑"], ["Je vais dormir. Je mets…", ["le pyjama", "🛌"], [["les chaussures à talons", "👠"], ["le chapeau", "👒"]], "🌙"], ["Je vais à l'école. Je prends…", ["le cartable", "🎒"], [["le parapluie", "☂️"], ["la bague", "💍"]], "🏫"]];
    const MOTS_GS = [["mangue", "🥭", "M"], ["maman", "👩🏾", "M"], ["mouton", "🐑", "M"], ["lion", "🦁", "L"], ["lune", "🌙", "L"], ["lait", "🥛", "L"], ["poisson", "🐟", "P"], ["pain", "🥖", "P"], ["pirogue", "🛶", "P"], ["banane", "🍌", "B"], ["baobab", "🌳", "B"], ["boubou", "👘", "B"], ["riz", "🍚", "R"], ["robe", "👗", "R"], ["tomate", "🍅", "T"], ["tortue", "🐢", "T"], ["sac", "👜", "S"], ["soleil", "☀️", "S"]];
    const SONS_GS = { M: "mmm", L: "lll", P: "p", B: "b", R: "rrr", T: "t", S: "sss" };
    const premiereLettre = () => fois(N, () => { const b = hasard(MOTS_GS), f = tirer([...new Set(MOTS_GS.map(x => x[2]))].filter(x => x !== b[2]), 2); return q("Par quelle lettre commence " + b[0] + " ?", { k: "image", e: b[1] }, { k: "lettre", t: b[2], dire: b[2] }, f.map(x => ({ k: "lettre", t: x, dire: x })), { dire: b[0] + ". " + b[0] + " commence par le son " + SONS_GS[b[2]] + ". Quelle lettre ?" }); });
    const SYLL = [["riz", "🍚", 1], ["pain", "🥖", 1], ["lait", "🥛", 1], ["sac", "👜", 1], ["lion", "🦁", 1], ["ma-man", "👩🏾", 2], ["pa-pa", "👨🏾", 2], ["mou-ton", "🐑", 2], ["to-mate", "🍅", 2], ["ba-nane", "🍌", 3], ["pi-rogue", "🛶", 2], ["ba-o-bab", "🌳", 3], ["to-ma-te", "🍅", 3], ["chau-ssure", "👟", 2], ["é-lé-phant", "🐘", 3], ["ca-ra-mel", "🍬", 3]];
    const syllabesGS = () => fois(N, () => { const b = hasard(SYLL.filter((x, i, t) => t.findIndex(y => y[1] === x[1]) === i)), n = b[2]; return q("Tape dans tes mains : combien de morceaux ?", { k: "image", e: b[1] }, tas(n, "👏🏾"), [1, 2, 3].filter(x => x !== n).map(x => tas(x, "👏🏾")), { dire: b[0].replace(/-/g, " … ") + ". Tape dans tes mains. Combien de morceaux ?" }); });
    const formesNous = quizImg([["La roue de la charrette est…", ["ronde", "⚪"], [["carrée", "🟥"], ["en triangle", "🔺"]], "🛞"], ["Le toit de la case est en…", ["triangle", "🔺"], [["rond", "⚪"], ["carré", "🟥"]], "🛖"], ["La fenêtre est…", ["carrée", "🟥"], [["ronde", "⚪"], ["en triangle", "🔺"]], "🪟"], ["La lune pleine est…", ["ronde", "⚪"], [["carrée", "🟥"], ["en triangle", "🔺"]], "🌕"], ["Le ballon est…", ["rond", "⚪"], [["carré", "🟥"], ["en triangle", "🔺"]], "⚽"], ["Le morceau de pastèque ressemble à un…", ["triangle", "🔺"], [["carré", "🟥"], ["rond", "⚪"]], "🍉"]]);
    const POSITIONS = [["dans", "📦", "🐱"], ["sur", "🪑", "🐱"], ["sous", "🪑", "🐱"]];
    const position2 = () => fois(N, () => {
      const [b, ...f] = tirer(POSITIONS, 3);
      const dessin = ([pos, o, a]) => ({ k: "html", html: '<span style="position:relative;display:inline-block;font-size:60px;line-height:1">' + o + '<span style="position:absolute;left:50%;transform:translateX(-50%);font-size:30px;' + (pos === "sur" ? "top:-26px" : pos === "sous" ? "bottom:2px" : "top:22px") + '">' + a + "</span></span>", dire: pos });
      return q("Le chat est " + b[0] + " ?", null, dessin(b), f.map(dessin), { dire: "Touche l'image où le chat est " + b[0] + "." });
    });
    // Palier 1
    L("p1", "docteure", "e1", "👶🏾", "Les docteurs des enfants", "Découvrir les métiers de la santé", docteurQui);
    L("p1", "cuisine", "e2", "🧅", "Que met-on dans le plat ?", "Les ingrédients des plats", ingredients);
    L("p1", "parler", "e3", "👏🏾", "Je tape les syllabes", "Compter les syllabes d'un mot", syllabesGS);
    L("p1", "senegal", "e4", "👗", "La mode de Binta", "Le vocabulaire des habits et bijoux", imagier(MODE));
    L("p1", "compter", "e5", "🔺", "Les formes autour de moi", "Rond, carré, triangle", formesNous);
    L("p1", "parler", "e6", "M", "La première lettre", "Trouver la lettre du début d'un mot", premiereLettre);
    // Palier 2
    L("p2", "docteure", "e7", "🦷", "Quel docteur ?", "Les docteurs et ce qu'ils soignent", docteurQui);
    L("p2", "cuisine", "e8", "🍛", "La recette du thiéboudienne", "Les ingrédients des plats", ingredients);
    L("p2", "senegal", "e9", "☂️", "Je m'habille selon le temps", "Choisir ses habits", quizImg(METEO_MODE));
    L("p2", "compter", "e10", "📦", "Dans, sur, sous", "Se repérer dans l'espace", position2);
    L("p2", "parler", "e11", "👏🏾", "Encore les syllabes", "Compter les syllabes d'un mot", syllabesGS);
    L("p2", "parler", "e12", "L", "Par quelle lettre ?", "Trouver la lettre du début d'un mot", premiereLettre);
    // Palier 3
    L("p3", "docteure", "e13", "🫀", "Les docteurs du corps", "Cœur, os, yeux, oreilles", docteurQui);
    L("p3", "senegal", "e14", "💄", "Le défilé de mode", "Le vocabulaire de la mode", imagier(MODE));
    L("p3", "cuisine", "e15", "🥜", "Le mafé et le yassa", "Les ingrédients des plats", ingredients);
    L("p3", "compter", "e16", "🛞", "Les formes du village", "Rond, carré, triangle", formesNous);
    L("p3", "parler", "e17", "P", "La lettre du début", "Trouver la lettre du début d'un mot", premiereLettre);
    L("p3", "compter", "e18", "🐱", "Où est le chat ?", "Se repérer dans l'espace", position2);
    // Palier 4
    L("p4", "docteure", "e19", "😷", "Docteure Binta à l'hôpital", "Les métiers de la santé", docteurQui);
    L("p4", "parler", "e20", "👏🏾", "Le roi des syllabes", "Compter les syllabes d'un mot", syllabesGS);
    L("p4", "cuisine", "e21", "🍩", "Les bonnes recettes", "Les ingrédients des plats", ingredients);
    L("p4", "senegal", "e22", "👒", "Habillée pour chaque jour", "Choisir ses habits", quizImg(METEO_MODE));
    L("p4", "parler", "e23", "B", "Toutes les premières lettres", "Trouver la lettre du début d'un mot", premiereLettre);
    L("p4", "compter", "e24", "➕", "Encore des additions", "Petites additions avec des images", calcul("+", 4, 4, ["🥭", "🍩", "🐟"]));
  }

  // ================================= CI =================================
  if (classe === "ci") {
    const MOTS_A = [["riz", "🍚"], ["moto", "🏍️"], ["lit", "🛏️"], ["ami", "🧒🏾"], ["mur", "🧱"], ["taxi", "🚕"], ["papa", "👨🏾"], ["sac", "👜"], ["lune", "🌙"], ["pirate", "🏴‍☠️"]];
    const MOTS_B = [["mafé", "🥜"], ["pagne", "🧣"], ["lion", "🦁"], ["pirogue", "🛶"], ["tomate", "🍅"], ["banane", "🍌"], ["sable", "🏖️"], ["mouton", "🐑"], ["tortue", "🐢"], ["mangue", "🥭"]];
    const MOTS_C = [["baobab", "🌳"], ["boubou", "👘"], ["poisson", "🐟"], ["chameau", "🐪"], ["oignon", "🧅"], ["pêcheur", "🎣"], ["marché", "🧺"], ["drapeau", "🇸🇳"], ["tambour", "🥁"], ["chèvre", "🐐"]];
    const MARCHE_CFA = [
      () => { const a = r(2, 6), b = r(1, 4); return ["Awa achète " + a + " mangues et " + b + " bananes. Combien de fruits ?", a + b, "🥭"]; },
      () => { const a = r(5, 10), b = r(1, 4); return ["Le pêcheur a " + a + " poissons. Il en vend " + b + ". Combien en reste-t-il ?", a - b, "🐟"]; },
      () => { const a = r(2, 8), b = r(2, 8); return ["Il y a " + a + " moutons et " + b + " chèvres. Combien d'animaux ?", a + b, "🐑"]; },
      () => { const a = r(6, 12), b = r(1, 5); return ["Dans le car rapide, il y a " + a + " personnes. " + b + " descendent. Combien restent ?", a - b, "🚌"]; },
      () => { const a = r(3, 9), b = r(2, 9); return ["Moussa a " + a + " billes. Fatou lui en donne " + b + ". Combien en a-t-il ?", a + b, "🔵"]; },
    ];
    const GROUPES = { "un fruit": FRUITS, "un animal": ANIMAUX, "un habit": HABITS, "un transport": TRANSPORTS, "un plat": PLATS };
    const SANTE = [["Avant de manger, je…", "me lave les mains", ["joue au ballon", "dors"], "🧼"], ["Contre le paludisme, je dors sous…", "une moustiquaire", ["la table", "la pluie"], "🦟"], ["L'eau à boire doit être…", "propre", ["sale", "salée"], "💧"], ["Je me brosse les dents…", "matin et soir", ["jamais", "une fois par an"], "🪥"], ["Pour grandir, je mange…", "de tout un peu", ["que des bonbons", "que du sucre"], "🍽️"], ["Quand il fait chaud, je bois…", "de l'eau", ["du soda", "rien"], "☀️"], ["Pour traverser, je regarde…", "à gauche et à droite", ["le ciel", "mes pieds"], "🚦"], ["Après les toilettes, je…", "me lave les mains", ["mange tout de suite", "cours dehors"], "🚽"]];
    // Palier 1
    L("p1", "senegal", "a1", "🇸🇳", "Le drapeau du Sénégal", "Les couleurs du drapeau", drapeau);
    L("p1", "lire", "a2", "📝", "Je lis des petits mots", "Lire des mots simples", lireMots(MOTS_A));
    L("p1", "compter", "a3", "🥜", "Je compte jusqu'à 5", "Dénombrer jusqu'à 5", compter(1, 5));
    L("p1", "senegal", "a4", "🦁", "Les animaux du Sénégal", "Nommer les animaux", quelNom(ANIMAUX));
    L("p1", "compter", "a5", "🐑", "Le plus grand groupe", "Comparer des quantités", lePlus(6));
    L("p1", "decouvrir", "a6", "🧼", "Ma santé", "Hygiène et santé", quiz(SANTE));
    L("p1", "compter", "a7", "➕", "J'ajoute des mangues", "Additions avec des images", calcul("+", 3, 3, ["🥭", "🐟", "🥜"]));
    L("p1", "senegal", "a8", "🍛", "Les plats de chez nous", "Nommer les plats", quelNom(PLATS));
    L("p1", "lire", "a9", "🔍", "L'intrus", "Classer des mots et des images", intrus(GROUPES));
    L("p1", "compter", "a10", "⏭️", "Avant, après", "La suite des nombres jusqu'à 10", avantApres(10));
    L("p1", "senegal", "a11", "🥁", "La musique de chez nous", "Les instruments", quelNom(MUSIQUE));
    L("p1", "compter", "a12", "🔢", "Montre-moi le nombre", "Associer un chiffre à une quantité", montrerNombre(8));
    // Palier 2
    L("p2", "lire", "b1", "📝", "Je lis des mots du Sénégal", "Lire des mots de deux syllabes", lireMots(MOTS_B));
    L("p2", "senegal", "b2", "🚌", "Les transports de chez nous", "Car rapide, pirogue, TER…", quelNom(TRANSPORTS));
    L("p2", "compter", "b3", "➕", "Additions jusqu'à 10", "Calculer des additions", calcul("+", 5, 5, ["🥭", "🐟"]));
    L("p2", "senegal", "b4", "🏙️", "Mon pays", "Capitale, drapeau, langues", quiz(SENEGAL_CI));
    L("p2", "compter", "b5", "➖", "J'enlève", "Soustractions jusqu'à 10", calcul("-", 10, 4, ["🥭", "🍩"]));
    L("p2", "decouvrir", "b6", "👷🏾", "Les métiers", "Qui utilise quoi ?", associer(METIERS, b => "Qu'utilise " + b[0] + " ?"));
    L("p2", "compter", "b7", "🧺", "Histoires du marché", "Petits problèmes", histoires(MARCHE_CFA));
    L("p2", "lire", "b8", "🔍", "Encore l'intrus", "Classer des mots et des images", intrus(GROUPES));
    L("p2", "senegal", "b9", "👘", "Les habits", "Boubou, pagne, babouches…", quelNom(HABITS));
    L("p2", "compter", "b10", "🔟", "Je compte jusqu'à 10", "Dénombrer jusqu'à 10", compter(4, 10));
    L("p2", "decouvrir", "b11", "🌳", "La nature", "Baobab, fleuve, mer…", quelNom(NATURE));
    L("p2", "senegal", "b12", "🎉", "Les fêtes", "Tabaski, Korité, 4 avril", quelNom(FETES));
    // Palier 3
    L("p3", "lire", "c1", "📝", "Je lis des mots plus longs", "Lire des mots avec ou, on, ch, oi", lireMots(MOTS_C));
    L("p3", "compter", "c2", "➕", "Additions jusqu'à 10", "Calculer des additions", calcul("+", 6, 4));
    L("p3", "senegal", "c3", "🏝️", "Quiz du Sénégal", "Villes, fleuves, fêtes", quiz(SENEGAL_CI));
    L("p3", "compter", "c4", "🧺", "Problèmes du marché", "Additions et soustractions en histoires", histoires(MARCHE_CFA));
    L("p3", "decouvrir", "c5", "🧼", "Rester en bonne santé", "Hygiène et santé", quiz(SANTE));
    L("p3", "compter", "c6", "⏭️", "Avant, après jusqu'à 20", "La suite des nombres", avantApres(20));
    L("p3", "lire", "c7", "📝", "Mots du marché", "Lire des mots illustrés", lireMots(MOTS_B.concat(MOTS_C)));
    L("p3", "senegal", "c8", "🦁", "Les animaux du Sénégal", "Nommer les animaux", quelNom(ANIMAUX));
    L("p3", "compter", "c9", "➖", "Soustractions jusqu'à 10", "Calculer des soustractions", calcul("-", 10, 4));
    L("p3", "senegal", "c10", "🍛", "La cuisine sénégalaise", "Les plats et les fruits", quelNom(PLATS.concat(FRUITS)));
    L("p3", "compter", "c11", "🐑", "Le plus, le moins", "Comparer des quantités", () => lePlus(9)().slice(0, 3).concat(lePlus(9, true)().slice(0, 3)));
    L("p3", "decouvrir", "c12", "🚌", "En route", "Les transports", quelNom(TRANSPORTS));
    // Palier 4
    L("p4", "lire", "d1", "📝", "Je lis tous les mots", "Lire des mots illustrés", lireMots(MOTS_A.concat(MOTS_B, MOTS_C)));
    L("p4", "compter", "d2", "➕", "Additions jusqu'à 15", "Calculer des additions", calcul("+", 8, 6));
    L("p4", "senegal", "d3", "🇸🇳", "Le grand quiz du Sénégal", "Villes, fleuves, fêtes", quiz(SENEGAL_CI));
    L("p4", "compter", "d4", "🧺", "Grands problèmes du marché", "Additions et soustractions en histoires", histoires(MARCHE_CFA));
    L("p4", "decouvrir", "d5", "👷🏾", "Les métiers de chez nous", "Qui utilise quoi ?", associer(METIERS, b => "Qu'utilise " + b[0] + " ?"));
    L("p4", "compter", "d6", "➖", "Soustractions jusqu'à 12", "Calculer des soustractions", calcul("-", 12, 5));
    L("p4", "lire", "d7", "🔍", "Le super intrus", "Classer des mots et des images", intrus(GROUPES));
    L("p4", "senegal", "d8", "🥁", "Musique et fêtes", "Instruments et fêtes", quelNom(MUSIQUE.concat(FETES)));
    L("p4", "compter", "d9", "🔢", "Avant, après jusqu'à 20", "La suite des nombres", avantApres(20));
    L("p4", "decouvrir", "d10", "🌳", "Animaux et nature", "Nommer animaux et paysages", quelNom(ANIMAUX.concat(NATURE)));
    L("p4", "compter", "d11", "✌🏾", "Les doubles", "Calculer les doubles", () => fois(N, () => { const n = r(1, 10); return q("Le double de " + n + " ?", { k: "html", html: '<span class="tas">' + fois(n, () => "<i>🥭</i>").join("") + "<i>➕</i>" + fois(n, () => "<i>🥭</i>").join("") + "</span>" }, ch(2 * n), proches(2 * n, 0, 22).map(ch), { dire: "Le double de " + NOMBRES[n] + ", ça fait combien ?" }); }));
    L("p4", "senegal", "d12", "🏙️", "Les villes du Sénégal", "Dakar, Saint-Louis, Ziguinchor…", quiz(SENEGAL_CI));
  }

  // ================================= CE2 =================================
  if (classe === "ce2") {
    const GEO = [["Quelle est la capitale du Sénégal ?", "Dakar", ["Thiès", "Saint-Louis", "Kaolack"], "🏙️"], ["Combien de régions compte le Sénégal ?", "14", ["10", "8", "20"], "🗺️"], ["Quel fleuve forme la frontière nord ?", "le fleuve Sénégal", ["la Gambie", "la Casamance", "le Saloum"], "🏞️"], ["Quel pays est presque entouré par le Sénégal ?", "la Gambie", ["le Mali", "la Mauritanie", "la Guinée"], "🗺️"], ["La région la plus au sud-ouest est…", "Ziguinchor", ["Matam", "Louga", "Dakar"], "🌴"], ["Le parc du Niokolo-Koba est dans la région de…", "Tambacounda", ["Dakar", "Louga", "Fatick"], "🦁"], ["Quelle ville est la capitale du rail ?", "Thiès", ["Touba", "Ziguinchor", "Podor"], "🚂"], ["Le parc du Djoudj est célèbre pour ses…", "oiseaux", ["lions", "éléphants", "chameaux"], "🦩"], ["Le point le plus à l'ouest de l'Afrique est…", "la pointe des Almadies", ["le Lac Rose", "Gorée", "Kédougou"], "📍"], ["Quelle région a des cascades et des collines ?", "Kédougou", ["Dakar", "Louga", "Diourbel"], "⛰️"], ["Quel pays est au nord du Sénégal ?", "la Mauritanie", ["la Guinée", "la Gambie", "le Ghana"], "🧭"], ["Kaolack est connue pour…", "l'arachide et le sel", ["la neige", "les montagnes", "le pétrole"], "🥜"]];
    const HISTOIRE = [["Qui fut le premier président du Sénégal ?", "Léopold Sédar Senghor", ["Abdou Diouf", "Lat Dior", "Macky Sall"], "🏛️"], ["En quelle année le Sénégal est-il devenu indépendant ?", "1960", ["1945", "1980", "2000"], "🇸🇳"], ["Quel résistant du Cayor s'est battu contre les colons ?", "Lat Dior", ["Senghor", "Sadio Mané", "Youssou Ndour"], "🐎"], ["Quelle reine de Casamance a résisté aux colons ?", "Aline Sitoé Diatta", ["Ndaté Yalla", "Awa Diop", "Mariama Bâ"], "👑"], ["Quelle reine du Waalo a dirigé son royaume ?", "Ndaté Yalla Mbodj", ["Aline Sitoé", "Cléopâtre", "Yaa Asantewaa"], "👑"], ["L'île de Gorée rappelle…", "la traite des esclaves", ["la Coupe du monde", "la pêche", "l'indépendance"], "🏝️"], ["Senghor était aussi un grand…", "poète", ["footballeur", "lutteur", "pilote"], "✍🏾"], ["Le Monument de la Renaissance africaine est à…", "Dakar", ["Touba", "Kédougou", "Matam"], "🗽"], ["Cheikh Anta Diop était un grand…", "savant historien", ["chanteur", "lutteur", "cuisinier"], "📚"], ["Quel ancien royaume avait pour roi le Bourba ?", "le Djolof", ["le Cayor", "le Waalo", "le Sine"], "👑"]];
    const CULTURE = [["Quelle est la devise du Sénégal ?", "Un Peuple, Un But, Une Foi", ["Liberté, Égalité", "Unité et Travail", "Paix et Joie"], "🇸🇳"], ["L'hymne national s'appelle…", "Le Lion rouge", ["La Marseillaise", "Le Baobab", "Teranga"], "🎶"], ["Que veut dire « teranga » ?", "l'hospitalité", ["la guerre", "la pluie", "le marché"], "🤝🏾"], ["Le sabar est…", "un tambour", ["un plat", "un poisson", "un habit"], "🥁"], ["La kora a combien de cordes environ ?", "21", ["3", "6", "100"], "🪕"], ["Quel chanteur sénégalais est célèbre dans le monde ?", "Youssou Ndour", ["Lat Dior", "Senghor", "Sadio Mané"], "🎤"], ["Le laamb, c'est…", "la lutte sénégalaise", ["le foot", "la natation", "la danse"], "🤼🏾"], ["Le Magal se fête à…", "Touba", ["Dakar", "Saint-Louis", "Ziguinchor"], "🕌"], ["Quelle langue est la plus parlée au Sénégal ?", "le wolof", ["le français", "le sérère", "l'anglais"], "🗣️"], ["Le Sénégal a gagné la CAN en…", "2022", ["2002", "2010", "1990"], "🏆"]];
    const ECONOMIE = [["Quelle plante cultive-t-on beaucoup dans le bassin arachidier ?", "l'arachide", ["le blé", "le café", "la vigne"], "🥜"], ["Avec quoi les pêcheurs vont-ils en mer ?", "la pirogue", ["le TER", "la charrette", "le car rapide"], "🛶"], ["Le sel du Lac Rose est récolté par…", "des femmes et des hommes à la main", ["des robots", "des avions", "des chameaux"], "🧂"], ["La Grande Muraille verte, c'est…", "une ligne d'arbres contre le désert", ["un mur de briques", "un stade", "une route"], "🌳"], ["Le TER relie Dakar à…", "Diamniadio et l'AIBD", ["Ziguinchor", "Paris", "Kédougou"], "🚆"], ["Où vend-on fruits et poissons ?", "au marché", ["à la mosquée", "au stade", "à l'école"], "🧺"]];
    const PROB = [
      () => { const p = r(3, 9) * 25, n = r(3, 8); return ["Un pain coûte " + p + " F. Combien coûtent " + n + " pains ?", p * n, "🥖"]; },
      () => { const k = r(2, 6), p = r(10, 30) * 50; return ["Awa achète " + k + " kg de poisson à " + p + " F le kilo. Combien paie-t-elle ?", k * p, "🐟"]; },
      () => { const a = r(1000, 5000), b = r(200, 900); return ["Moussa a " + a + " F. Il dépense " + b + " F au marché. Combien lui reste-t-il ?", a - b, "🧺"]; },
      () => { const n = r(3, 8), e = r(12, 25); return ["Une pirogue transporte " + e + " passagers. Combien pour " + n + " pirogues ?", n * e, "🛶"]; },
      () => { const g = r(3, 8), s = r(4, 12); return [g * s + " mangues sont partagées entre " + g + " enfants. Combien chacun ?", s, "🥭"]; },
      () => { const a = r(120, 480), b = r(120, 480); return ["Le TER transporte " + a + " voyageurs le matin et " + b + " le soir. Combien en tout ?", a + b, "🚆"]; },
    ];
    const PHRASES_SN = [["Hier, nous ___ à Gorée.", "sommes allés", ["allons", "irons"]], ["Demain, Awa ___ du bissap.", "préparera", ["préparait", "a préparé"]], ["Autrefois, les pêcheurs ___ à la rame.", "ramaient", ["rameront", "rament"]], ["Chaque matin, je ___ au marché.", "vais", ["irai", "allais"]], ["Les Lions ___ la CAN en 2022.", "ont gagné", ["gagneront", "gagnent"]], ["L'an prochain, nous ___ le Lac Rose.", "visiterons", ["visitions", "avons visité"]], ["Maintenant, tu ___ le thiéboudienne.", "manges", ["mangeras", "mangeais"]], ["Pendant l'hivernage, il ___ beaucoup.", "pleut", ["pleuvra", "a plu"]]];
    const ACCORDS = [["Les pirogues ___ partent en mer.", "colorées", ["coloré", "colorée"]], ["Une ___ mangue.", "grosse", ["gros", "grosses"]], ["Des boubous ___ .", "blancs", ["blanc", "blanche"]], ["La plage est ___ .", "belle", ["beau", "belles"]], ["Les baobabs sont ___ .", "géants", ["géant", "géantes"]], ["Une rue ___ .", "animée", ["animé", "animés"]]];
    const NATURE_SN = [["Le baobab peut vivre…", "plus de 1 000 ans", ["2 ans", "10 ans", "50 jours"], "🌳"], ["Le lamantin vit dans…", "les fleuves et la mer", ["le désert", "les arbres", "les grottes"], "🐋"], ["L'hivernage dure environ de…", "juillet à octobre", ["janvier à mars", "avril à mai", "toute l'année"], "🌧️"], ["L'harmattan est un vent…", "chaud et sec", ["froid et humide", "glacé", "salé"], "🌬️"], ["La mangrove pousse…", "dans l'eau salée des fleuves", ["sur les montagnes", "dans le sable sec", "sur la neige"], "🌿"], ["Les tortues marines pondent…", "sur la plage", ["dans les arbres", "dans le désert", "sous la neige"], "🐢"]];
    const LIRE_SN = [
      { t: "Awa vend des mangues au marché de Kaolack. Le matin, elle range ses fruits sur une table. Les clients aiment ses mangues sucrées.", q: [["Que vend Awa ?", "des mangues", ["des poissons", "des pagnes"]], ["Où est le marché ?", "à Kaolack", ["à Dakar", "à Touba"]]] },
      { t: "Le dimanche, Ibou prend la chaloupe pour Gorée avec sa classe. Sur l'île, il n'y a pas de voitures. Les élèves visitent la Maison des esclaves.", q: [["Comment va-t-on à Gorée ?", "en chaloupe", ["en car rapide", "en train"]], ["Qu'est-ce qui manque sur l'île ?", "les voitures", ["les maisons", "les arbres"]]] },
      { t: "À Saint-Louis, le pont Faidherbe traverse le fleuve. Le soir, Fatou regarde les pirogues de Guet Ndar rentrer de la pêche.", q: [["Que traverse le pont ?", "le fleuve", ["la mer", "le désert"]], ["Que regarde Fatou ?", "les pirogues", ["les avions", "les chameaux"]]] },
    ];
    const lireSN = () => melange(LIRE_SN).flatMap(x => x.q.map(([qq, b, f]) => q(qq, { k: "texte", t: x.t }, phr(b), f.map(phr), { dire: x.t + " " + qq }))).slice(0, N);
    const phrasesQuiz = liste => () => tirer(liste, Math.min(N, liste.length)).map(([p, b, f]) => q("Complète la phrase", { k: "phrase", t: p }, mot(b), f.map(mot), { dire: p.replace("___", "quoi") + " Choisis le bon mot." }));
    // Palier 1
    L("p1", "decouvrir", "a1", "🗺️", "La géographie du Sénégal", "Régions, fleuves, frontières", quiz(GEO));
    L("p1", "maths", "a2", "➕", "Calcul mental", "Additions jusqu'à 100", calcul("+", 60, 39));
    L("p1", "francais", "a3", "📚", "Je lis : le Sénégal", "Comprendre un texte court", lireSN);
    L("p1", "maths", "a4", "🧺", "Problèmes du marché", "Problèmes en francs CFA", histoires(PROB));
    L("p1", "decouvrir", "a5", "🎶", "La culture sénégalaise", "Devise, hymne, musique", quiz(CULTURE));
    L("p1", "francais", "a6", "🎨", "Les accords", "Accorder l'adjectif", phrasesQuiz(ACCORDS));
    L("p1", "maths", "a7", "➖", "Soustractions", "Soustraire jusqu'à 100", calcul("-", 99, 40));
    L("p1", "foot", "a8", "🦁", "Les Lions du Sénégal", "Culture et sport", quiz(CULTURE.filter(x => /CAN|laamb|Lions/.test(x[0] + x[1])).concat(CULTURE)));
    L("p1", "decouvrir", "a9", "🌳", "La nature du Sénégal", "Climat, baobab, mangrove", quiz(NATURE_SN));
    L("p1", "maths", "a10", "✖️", "Les tables de 2 à 5", "Multiplications simples", calcul("*", 5, 9));
    // Palier 2
    L("p2", "decouvrir", "b1", "👑", "Les héros du Sénégal", "Histoire et personnages", quiz(HISTOIRE));
    L("p2", "francais", "b2", "⏳", "Passé, présent, futur", "Choisir le bon temps", phrasesQuiz(PHRASES_SN));
    L("p2", "maths", "b3", "🧺", "Problèmes en CFA", "Multiplier et soustraire", histoires(PROB));
    L("p2", "decouvrir", "b4", "🥜", "Les métiers et richesses", "Arachide, pêche, sel", quiz(ECONOMIE));
    L("p2", "maths", "b5", "✖️", "Les tables de 6 à 9", "Multiplications", () => fois(N, () => { const a = r(6, 9), b = r(2, 9); return q(a + " × " + b + " = ?", null, ch(a * b), [a * b + a, a * b - b].map(ch), { dire: a + " fois " + b + " ?" }); }));
    L("p2", "francais", "b6", "📚", "Je lis : Gorée et Saint-Louis", "Comprendre un texte court", lireSN);
    L("p2", "foot", "b7", "🎶", "Sport et culture", "Lutte, foot, musique", quiz(CULTURE));
    L("p2", "maths", "b8", "➕", "Additions posées", "Additions jusqu'à 1 000", calcul("+", 600, 399));
    L("p2", "decouvrir", "b9", "🗺️", "Les régions", "Villes et régions du Sénégal", quiz(GEO));
    L("p2", "francais", "b10", "🎨", "Accords au Sénégal", "Accorder l'adjectif", phrasesQuiz(ACCORDS));
    L("p2", "maths", "b11", "✌🏾", "Doubles et moitiés", "Calcul mental", () => fois(N, i => { const n = r(6, 50) * 2; return i % 2 ? q("La moitié de " + n + " ?", null, ch(n / 2), proches(n / 2, 1, 200).map(ch), { dire: "La moitié de " + n + " ?" }) : q("Le double de " + n / 2 + " ?", null, ch(n), proches(n, 1, 200).map(ch), { dire: "Le double de " + n / 2 + " ?" }); }));
    L("p2", "decouvrir", "b12", "🌿", "Climat et nature", "Hivernage, harmattan, mangrove", quiz(NATURE_SN));
    L("p2", "maths", "b13", "➖", "Soustractions jusqu'à 1 000", "Soustraire", calcul("-", 999, 400));
    L("p2", "francais", "b14", "⏳", "Les temps des verbes", "Choisir le bon temps", phrasesQuiz(PHRASES_SN));
    // Palier 3
    L("p3", "decouvrir", "c1", "🏛️", "Grandes figures", "Senghor, Lat Dior, Aline Sitoé…", quiz(HISTOIRE));
    L("p3", "maths", "c2", "🧺", "Le marché de Sandaga", "Problèmes en francs CFA", histoires(PROB));
    L("p3", "francais", "c3", "📚", "Je lis et je comprends", "Comprendre un texte court", lireSN);
    L("p3", "maths", "c4", "✖️", "Multiplier par 10 et 100", "Calcul mental", () => fois(N, i => { const a = r(3, 99), m = i % 2 ? 100 : 10; return q(a + " × " + m + " = ?", null, ch(a * m), [a * m * 10, a + m].map(ch), { dire: a + " fois " + m + " ?" }); }));
    L("p3", "decouvrir", "c5", "🥜", "Le travail au Sénégal", "Arachide, pêche, sel, TER", quiz(ECONOMIE));
    L("p3", "francais", "c6", "🎨", "Les bons accords", "Accorder l'adjectif", phrasesQuiz(ACCORDS));
    L("p3", "foot", "c7", "🦁", "Quiz des Lions", "Culture et sport", quiz(CULTURE));
    L("p3", "maths", "c8", "➗", "Partager", "Divisions simples", () => fois(N, () => { const b = r(2, 9), s = r(2, 10); return q(b * s + " ÷ " + b + " = ?", null, ch(s), proches(s, 1, 20).map(ch), { dire: b * s + " partagé en " + b + " ?" }); }));
    L("p3", "decouvrir", "c9", "🗺️", "Voyage dans les régions", "Géographie du Sénégal", quiz(GEO));
    L("p3", "francais", "c10", "⏳", "Conjuguer au Sénégal", "Choisir le bon temps", phrasesQuiz(PHRASES_SN));
    L("p3", "maths", "c11", "➕", "Grandes additions", "Additions jusqu'à 10 000", calcul("+", 5000, 4000));
    L("p3", "decouvrir", "c12", "🌳", "Protéger la nature", "Climat, arbres, animaux", quiz(NATURE_SN));
    L("p3", "maths", "c13", "🔢", "Avant, après", "Les grands nombres", avantApres(9999));
    L("p3", "decouvrir", "c14", "🎶", "Traditions et fêtes", "Devise, hymne, teranga", quiz(CULTURE));
    // Palier 4
    L("p4", "decouvrir", "d1", "🇸🇳", "Le grand quiz du Sénégal", "Géographie, histoire, culture", quiz(GEO.concat(HISTOIRE, CULTURE)));
    L("p4", "maths", "d2", "🧺", "Grands problèmes du marché", "Problèmes en francs CFA", histoires(PROB));
    L("p4", "francais", "d3", "📚", "Lecture du Sénégal", "Comprendre un texte court", lireSN);
    L("p4", "maths", "d4", "✖️", "Toutes les tables", "Multiplications", calcul("*", 9, 9));
    L("p4", "francais", "d5", "⏳", "Les temps : révision", "Choisir le bon temps", phrasesQuiz(PHRASES_SN));
    L("p4", "decouvrir", "d6", "👑", "Histoire : révision", "Royaumes et résistants", quiz(HISTOIRE));
    L("p4", "maths", "d7", "➖", "Grandes soustractions", "Soustraire jusqu'à 10 000", calcul("-", 9999, 5000));
    L("p4", "foot", "d8", "🏆", "Champions d'Afrique", "Culture et sport", quiz(CULTURE));
    L("p4", "decouvrir", "d9", "🥜", "Économie : révision", "Arachide, pêche, sel", quiz(ECONOMIE.concat(NATURE_SN)));
    L("p4", "francais", "d10", "🎨", "Accords : révision", "Accorder l'adjectif", phrasesQuiz(ACCORDS));
    L("p4", "maths", "d11", "➗", "Partager et multiplier", "Divisions et multiplications", () => fois(N, i => { const b = r(2, 9), s = r(2, 10); return i % 2 ? q(b * s + " ÷ " + b + " = ?", null, ch(s), proches(s, 1, 20).map(ch), { dire: b * s + " partagé en " + b + " ?" }) : q(b + " × " + s + " = ?", null, ch(b * s), proches(b * s, 1, 100).map(ch), { dire: b + " fois " + s + " ?" }); }));
    L("p4", "decouvrir", "d12", "🗺️", "Géographie : révision", "Régions et fleuves", quiz(GEO));
    L("p4", "maths", "d13", "🔢", "Les grands nombres", "Avant et après", avantApres(99999));
    L("p4", "decouvrir", "d14", "🌍", "Le Sénégal dans le monde", "Culture et histoire", quiz(CULTURE.concat(HISTOIRE)));
    L("p4", "maths", "d15", "✌🏾", "Calcul mental rapide", "Doubles, moitiés, tables", () => calcul("*", 9, 9)().slice(0, 3).concat(calcul("+", 50, 49)().slice(0, 3)));
  }

  return { monde: { id: "senegal", titre: "Mon Sénégal", icone: "🇸🇳", couleur: "#c8ecc0", lecons: [] }, lecons };
};
