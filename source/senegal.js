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

  // ================= Encore plus d'étapes (deuxième série, même niveau simple) =================
  const CRIS = [["Meuh !", "la vache", "🐄"], ["Bêê !", "le mouton", "🐑"], ["Cocorico !", "le coq", "🐓"], ["Ouaf ouaf !", "le chien", "🐕"], ["Miaou !", "le chat", "🐈"], ["Hi-han !", "l'âne", "🫏"], ["Groar !", "le lion", "🦁"], ["Coin coin !", "le canard", "🦆"], ["Hennissement !", "le cheval", "🐎"], ["Cui cui !", "l'oiseau", "🐦"]];
  const cris = () => fois(N, () => { const [b, ...f] = tirer(CRIS, 3); return q("Qui fait « " + b[0] + " » ?", null, img(b[2], b[1]), f.map(x => img(x[2], x[1])), { dire: "Qui fait " + b[0] + " ?" }); });
  const EMOTIONS = [["content", "😀"], ["triste", "😢"], ["en colère", "😠"], ["surpris", "😮"], ["qui a peur", "😨"], ["fatigué", "😴"], ["amoureux", "😍"], ["malade", "🤒"]];
  const emotions = () => fois(N, () => { const [b, ...f] = tirer(EMOTIONS, 3); return q("Touche l'enfant " + b[0], null, img(b[1], b[0]), f.map(x => img(x[1], x[0])), { dire: "Touche le visage de l'enfant " + b[0] + "." }); });
  const CONTRAIRES = [["chaud", "🔥", "froid", "🧊"], ["jour", "☀️", "nuit", "🌙"], ["grand", "🐘", "petit", "🐭"], ["plein", "🍯", "vide", "🫙"], ["rapide", "🐆", "lent", "🐢"], ["content", "😀", "triste", "😢"], ["mouillé", "🌧️", "sec", "🏜️"], ["haut", "🦒", "bas", "🐊"]];
  const contraires = () => fois(N, () => { const [b, ...f] = tirer(CONTRAIRES, 3); return q("Le contraire de « " + b[0] + " » ?", { k: "image", e: b[1] }, img(b[3], b[2]), f.map(x => img(x[3], x[2])), { dire: "Quel est le contraire de " + b[0] + " ?" }); });
  const toucheChiffre = max => () => fois(N, () => { const n = r(1, max); return q("Touche le chiffre " + n, null, ch(n), proches(n, 0, max).map(ch), { dire: "Touche le chiffre " + NOMBRES[n] + "." }); });
  const lettre = t => ({ k: "lettre", t, dire: t });
  const toucheLettre = liste => () => fois(N, () => { const [b, ...f] = tirer(liste, 3); return q("Touche la lettre " + b, null, lettre(b), f.map(lettre), { dire: "Touche la lettre " + b.toLowerCase() + "." }); });
  const CORPS = [["la tête", "🙂"], ["la main", "✋🏾"], ["le pied", "🦶🏾"], ["l'œil", "👁️"], ["l'oreille", "👂🏾"], ["le nez", "👃🏾"], ["la bouche", "👄"], ["la dent", "🦷"], ["le bras", "💪🏾"], ["la jambe", "🦵🏾"]];
  const SENS = [["Avec quoi je vois ?", ["les yeux", "👀"], [["les pieds", "🦶🏾"], ["le nez", "👃🏾"]], "🌈"], ["Avec quoi j'entends ?", ["les oreilles", "👂🏾"], [["les yeux", "👀"], ["la main", "✋🏾"]], "🥁"], ["Avec quoi je sens les odeurs ?", ["le nez", "👃🏾"], [["l'oreille", "👂🏾"], ["le pied", "🦶🏾"]], "🌸"], ["Avec quoi je goûte ?", ["la langue", "👅"], [["le nez", "👃🏾"], ["la main", "✋🏾"]], "🍬"], ["Avec quoi je touche ?", ["la main", "✋🏾"], [["l'oreille", "👂🏾"], ["les yeux", "👀"]], "🧸"]];
  const COUL_FRUITS = [["la banane", "🍌", "jaune"], ["la tomate", "🍅", "rouge"], ["le citron vert", "🍈", "vert"], ["l'orange", "🍊", "orange"], ["la fraise", "🍓", "rouge"], ["la feuille", "🍃", "vert"], ["le ciel", "🌌", "bleu"], ["le lait", "🥛", "blanc"], ["le charbon", "⚫", "noir"]];
  const couleurDe = () => fois(N, () => { const b = hasard(COUL_FRUITS), c = COULEURS.find(x => x[0] === b[2]), f = tirer(COULEURS.filter(x => x[0] !== b[2]), 2); return q("De quelle couleur est " + b[0] + " ?", { k: "image", e: b[1] }, pastille(c), f.map(pastille), { dire: "De quelle couleur est " + b[0] + " ?" }); });
  const suiteImages = () => fois(N, () => { const [a, b] = tirer(OBJETS_COMPTER, 2), c = hasard(OBJETS_COMPTER.filter(x => x !== a && x !== b)); return q("Qu'est-ce qui vient après ?", { k: "tas", items: [a, b, a, b, a, "❓"] }, img(b, ""), [img(a, ""), img(c, "")], { dire: "Regarde bien. Qu'est-ce qui vient après ?" }); });
  const PIECES = [5, 10, 25, 50, 100, 200];
  const piece = v => ({ k: "html", html: '<span style="display:inline-grid;place-items:center;width:1.9em;height:1.9em;border-radius:50%;background:' + (v >= 100 ? "#d9d9d9" : "#e6b422") + ';box-shadow:inset 0 -4px 0 rgba(0,0,0,.2);font:800 26px/1 var(--titre);color:#3a2a00">' + v + "</span>", dire: v + " francs" });
  const monnaie = max => () => fois(N, () => { const l = PIECES.filter(v => v <= max), n = r(2, 3), ps = fois(n, () => hasard(l.slice(0, 3))), s = ps.reduce((a, b) => a + b, 0); return q("Combien d'argent ?", { k: "html", html: ps.map(v => piece(v).html).join(" ") }, ch(s), [s + 5, Math.max(5, s - 5)].map(ch), { dire: "Compte les pièces. Combien de francs ?" }); });
  const SINGPLUR = [["un poisson", "🐟", 1], ["des poissons", "🐟", 3], ["une mangue", "🥭", 1], ["des mangues", "🥭", 3], ["un mouton", "🐑", 1], ["des moutons", "🐑", 4], ["une pirogue", "🛶", 1], ["des pirogues", "🛶", 3]];
  const unDes = () => fois(N, () => { const b = hasard(SINGPLUR), autre = b[2] === 1 ? r(3, 4) : 1; return q("Touche : " + b[0], { k: "mots", t: b[0] }, tas(b[2], b[1]), [tas(autre, b[1])], { dire: "Lis : " + b[0] + ". Touche la bonne image." }); });
  const LELA = [["lion", "🦁", "le"], ["lune", "🌙", "la"], ["mouton", "🐑", "le"], ["tomate", "🍅", "la"], ["pirogue", "🛶", "la"], ["baobab", "🌳", "le"], ["robe", "👗", "la"], ["riz", "🍚", "le"], ["moto", "🏍️", "la"], ["pain", "🥖", "le"], ["mangue", "🥭", "la"], ["sac", "👜", "le"]];
  const leLa = () => fois(N, () => { const b = hasard(LELA); return q("Le ou la ? … " + b[0], { k: "image", e: b[1] }, mot(b[2]), [mot(b[2] === "le" ? "la" : "le")], { dire: "Dit-on le ou la " + b[0] + " ?" }); });
  const MOTS_TROU = [["ma_gue", "n", "🥭", "mangue"], ["l_on", "i", "🦁", "lion"], ["ri_", "z", "🍚", "riz"], ["mo_o", "t", "🏍️", "moto"], ["l_ne", "u", "🌙", "lune"], ["pa_a", "p", "👨🏾", "papa"], ["s_c", "a", "👜", "sac"], ["vé_o", "l", "🚲", "vélo"], ["ta_i", "x", "🚕", "taxi"], ["ro_e", "b", "👗", "robe"]];
  const lettreManque = () => fois(N, () => { const b = hasard(MOTS_TROU), f = tirer(["a", "e", "i", "o", "u", "m", "l", "p", "t", "r", "s"].filter(x => x !== b[1]), 2); return q("Quelle lettre manque ?", { k: "html", html: '<span class="emoji">' + b[2] + '</span><span class="mots">' + b[0] + "</span>" }, lettre(b[1]), f.map(lettre), { dire: "C'est le mot " + b[3] + ". Quelle lettre manque ?" }); });
  const complement10 = () => fois(N, () => { const a = r(1, 9), b = 10 - a; return q(a + " + ? = 10", { k: "html", html: '<span class="tas">' + fois(a, () => "<i>🥭</i>").join("") + fois(b, () => "<i>⬜</i>").join("") + "</span>" }, ch(b), proches(b, 0, 10).map(ch), { dire: a + " plus combien font dix ?" }); });
  const L2 = (palier, monde, id, icone, titre, objectif, questions) => L(palier, monde, "f" + id, icone, titre, objectif, questions);

  if (classe === "gs") {
    L2("p1", "decouvrir", "1", "🐄", "Qui fait ce cri ?", "Reconnaître les cris des animaux", cris);
    L2("p1", "parler", "2", "😀", "Mes émotions", "Reconnaître les émotions", emotions);
    L2("p1", "compter", "3", "1", "Les chiffres de 1 à 5", "Reconnaître les chiffres", toucheChiffre(5));
    L2("p1", "parler", "4", "A", "Les voyelles", "Reconnaître A, E, I, O, U", toucheLettre(["A", "E", "I", "O", "U"]));
    L2("p1", "docteure", "5", "👃🏾", "Mon corps", "Nommer les parties du corps", imagier(CORPS));
    L2("p1", "cuisine", "6", "🍌", "La couleur des fruits", "Couleurs et fruits", couleurDe);
    L2("p1", "compter", "7", "🔁", "Qu'est-ce qui vient après ?", "Continuer une suite", suiteImages);
    L2("p2", "parler", "8", "🔥", "Les contraires", "Chaud, froid, jour, nuit…", contraires);
    L2("p2", "docteure", "9", "👀", "Mes cinq sens", "Voir, entendre, sentir, goûter, toucher", quizImg(SENS));
    L2("p2", "compter", "10", "7", "Les chiffres de 1 à 7", "Reconnaître les chiffres", toucheChiffre(7));
    L2("p2", "decouvrir", "11", "🐓", "Les cris de la ferme", "Reconnaître les cris des animaux", cris);
    L2("p2", "parler", "12", "M", "Les lettres de MAMAN et PAPA", "Reconnaître M, A, P", toucheLettre(["M", "A", "P", "N"]));
    L2("p2", "compter", "13", "🔢", "Encore compter", "Dénombrer jusqu'à 6", compter(2, 6));
    L2("p2", "cuisine", "14", "🍅", "Les couleurs dans l'assiette", "Couleurs et aliments", couleurDe);
    L2("p3", "parler", "15", "😢", "Comment il se sent ?", "Reconnaître les émotions", emotions);
    L2("p3", "compter", "16", "9", "Les chiffres de 1 à 9", "Reconnaître les chiffres", toucheChiffre(9));
    L2("p3", "docteure", "17", "🦵🏾", "Les parties du corps", "Nommer les parties du corps", imagier(CORPS));
    L2("p3", "compter", "18", "🔁", "Les suites d'images", "Continuer une suite", suiteImages);
    L2("p3", "parler", "19", "🐘", "Encore les contraires", "Grand, petit, plein, vide…", contraires);
    L2("p3", "compter", "20", "🥭", "Je compte jusqu'à 8", "Dénombrer jusqu'à 8", compter(3, 8));
    L2("p3", "parler", "21", "B", "Les lettres de BINTA", "Reconnaître B, I, N, T, A", toucheLettre(["B", "I", "N", "T", "A"]));
    L2("p4", "compter", "22", "🔟", "Les chiffres de 1 à 10", "Reconnaître les chiffres", toucheChiffre(10));
    L2("p4", "decouvrir", "23", "🦁", "Les cris de la savane", "Reconnaître les cris des animaux", cris);
    L2("p4", "docteure", "24", "👂🏾", "Docteure des cinq sens", "Les cinq sens", quizImg(SENS));
    L2("p4", "parler", "25", "O", "Toutes les voyelles", "Reconnaître A, E, I, O, U", toucheLettre(["A", "E", "I", "O", "U"]));
    L2("p4", "compter", "26", "🔟", "Faire 10", "Compléter jusqu'à 10 avec des images", complement10);
    L2("p4", "parler", "27", "😍", "Toutes les émotions", "Reconnaître les émotions", emotions);
    L2("p4", "compter", "28", "🐟", "Je compte jusqu'à 10", "Dénombrer jusqu'à 10", compter(5, 10));
  }
  if (classe === "ci") {
    L2("p1", "lire", "1", "a", "Les voyelles", "Reconnaître a, e, i, o, u, é", toucheLettre(["a", "e", "i", "o", "u", "é"]));
    L2("p1", "compter", "2", "🔢", "Les chiffres jusqu'à 10", "Reconnaître les nombres", toucheChiffre(10));
    L2("p1", "decouvrir", "3", "👀", "Les cinq sens", "Voir, entendre, sentir, goûter, toucher", quizImg(SENS));
    L2("p1", "lire", "4", "🐟", "Un ou des ?", "Singulier et pluriel", unDes);
    L2("p1", "compter", "5", "🔁", "Les suites d'images", "Continuer une suite", suiteImages);
    L2("p1", "decouvrir", "6", "😀", "Les émotions", "Reconnaître les émotions", emotions);
    L2("p1", "lire", "7", "🔥", "Les contraires", "Le vocabulaire des contraires", contraires);
    L2("p2", "lire", "8", "🦁", "Le ou la ?", "Le genre des noms", leLa);
    L2("p2", "compter", "9", "🪙", "Les pièces de monnaie", "Compter de petites sommes", monnaie(25));
    L2("p2", "lire", "10", "m", "Les lettres m, l, p, t", "Reconnaître les consonnes", toucheLettre(["m", "l", "p", "t", "r", "s"]));
    L2("p2", "compter", "11", "🔟", "Faire 10", "Compléter jusqu'à 10", complement10);
    L2("p2", "decouvrir", "12", "🐄", "Les cris des animaux", "Reconnaître les animaux", cris);
    L2("p2", "lire", "13", "✏️", "La lettre qui manque", "Compléter un mot simple", lettreManque);
    L2("p2", "compter", "14", "🔢", "Les nombres jusqu'à 20", "Reconnaître les nombres", toucheChiffre(20));
    L2("p3", "lire", "15", "📝", "Encore la lettre qui manque", "Compléter un mot simple", lettreManque);
    L2("p3", "compter", "16", "🪙", "Au marché avec des pièces", "Compter de petites sommes", monnaie(50));
    L2("p3", "lire", "17", "🌙", "Le ou la ? (suite)", "Le genre des noms", leLa);
    L2("p3", "decouvrir", "18", "🦵🏾", "Mon corps", "Nommer les parties du corps", quelNom(CORPS));
    L2("p3", "compter", "19", "🔟", "Les amis de 10", "Compléter jusqu'à 10", complement10);
    L2("p3", "lire", "20", "🥭", "Un, une, des", "Singulier et pluriel", unDes);
    L2("p3", "decouvrir", "21", "😢", "Comment je me sens", "Reconnaître les émotions", emotions);
    L2("p4", "lire", "22", "🔤", "Toutes les lettres", "Reconnaître les lettres", toucheLettre(["b", "d", "p", "q", "m", "n", "f", "v", "ch", "on", "ou", "an"]));
    L2("p4", "compter", "23", "🪙", "Les pièces de 100", "Compter des sommes", monnaie(100));
    L2("p4", "lire", "24", "✏️", "Le mot à compléter", "Compléter un mot simple", lettreManque);
    L2("p4", "compter", "25", "🔢", "Les nombres jusqu'à 30", "Reconnaître les nombres", toucheChiffre(30));
    L2("p4", "decouvrir", "26", "👂🏾", "Les sens, révision", "Les cinq sens", quizImg(SENS));
    L2("p4", "lire", "27", "🔥", "Contraires, révision", "Le vocabulaire des contraires", contraires);
    L2("p4", "compter", "28", "🔁", "Suites, révision", "Continuer une suite", suiteImages);
  }
  if (classe === "ce2") {
    const HOMO = [["Awa ___ une pirogue.", "a", ["à"]], ["Il va ___ Dakar.", "à", ["a"]], ["Le lion ___ fort.", "est", ["et"]], ["Moussa ___ Fatou jouent.", "et", ["est"]], ["Ils ___ au marché.", "sont", ["son"]], ["Il range ___ cartable.", "son", ["sont"]], ["Les Lions ___ gagné.", "ont", ["on"]], ["___ joue au foot ce soir.", "On", ["Ont"]], ["Je vais ___ la plage.", "à", ["a"]], ["La mer ___ calme.", "est", ["et"]]];
    const NATURE = [["« mangue » est…", "un nom", ["un verbe", "un adjectif"], "🥭"], ["« courir » est…", "un verbe", ["un nom", "un adjectif"], "🏃🏾"], ["« rapide » est…", "un adjectif", ["un verbe", "un nom"], "⚡"], ["« Dakar » est…", "un nom propre", ["un verbe", "un adjectif"], "🏙️"], ["« manger » est…", "un verbe", ["un nom", "un adjectif"], "🍛"], ["« joli » est…", "un adjectif", ["un nom", "un verbe"], "🌸"], ["« ballon » est…", "un nom", ["un verbe", "un adjectif"], "⚽"], ["« marquer » est…", "un verbe", ["un adjectif", "un nom"], "🥅"]];
    const PLUR = [["un cheval", "des chevaux", ["des chevals", "des chevauxs"]], ["un journal", "des journaux", ["des journals", "des journales"]], ["un bateau", "des bateaux", ["des bateaus", "des bateauxs"]], ["un jeu", "des jeux", ["des jeus", "des jeuxs"]], ["un clou", "des clous", ["des cloux", "des clouxs"]], ["un bijou", "des bijoux", ["des bijous", "des bijouxs"]], ["un pneu", "des pneus", ["des pneux", "des pneuxs"]], ["un animal", "des animaux", ["des animals", "des animales"]]];
    const ETRE_AVOIR = [["Nous ___ au stade.", "sommes", ["avons", "êtes"]], ["Tu ___ un ballon.", "as", ["es", "a"]], ["Ils ___ contents.", "sont", ["ont", "est"]], ["J' ___ faim.", "ai", ["suis", "as"]], ["Vous ___ des Lions.", "êtes", ["avez", "sont"]], ["Elle ___ à Dakar.", "est", ["a", "es"]], ["Nous ___ une pirogue.", "avons", ["sommes", "ont"]], ["Je ___ en CE2.", "suis", ["ai", "es"]]];
    const SCIENCES = [["L'eau qui gèle devient…", "de la glace", ["de la vapeur", "du sable"], "🧊"], ["L'eau qui bout devient…", "de la vapeur", ["de la glace", "du sel"], "♨️"], ["La Terre tourne autour…", "du Soleil", ["de la Lune", "de Mars"], "🌍"], ["Combien de sens avons-nous ?", "5", ["3", "7"], "👀"], ["Les plantes fabriquent leur nourriture grâce…", "à la lumière", ["au bruit", "au vent"], "🌱"], ["Le cœur est un…", "muscle", ["os", "poumon"], "🫀"], ["Un aimant attire…", "le fer", ["le bois", "le plastique"], "🧲"], ["La Lune tourne autour…", "de la Terre", ["du Soleil", "de Mars"], "🌙"]];
    const fraction = { 2: "un demi", 3: "un tiers", 4: "un quart" };
    const fractions = () => fois(N, () => { const d = hasard([2, 3, 4]), tranche = (k, n) => '<svg viewBox="-1 -1 2 2" width="90" height="90">' + fois(n, i => { const a0 = 2 * Math.PI * i / n - Math.PI / 2, a1 = 2 * Math.PI * (i + 1) / n - Math.PI / 2; return '<path d="M0 0L' + Math.cos(a0).toFixed(3) + " " + Math.sin(a0).toFixed(3) + "A1 1 0 0 1 " + Math.cos(a1).toFixed(3) + " " + Math.sin(a1).toFixed(3) + 'Z" fill="' + (i < k ? "#e6b422" : "#f5ecd8") + '" stroke="#2b2118" stroke-width=".04"/>'; }).join("") + "</svg>"; const fr = n => ({ k: "html", html: tranche(1, n), dire: fraction[n] }); return q("Touche " + fraction[d] + " de la galette", null, fr(d), [2, 3, 4].filter(x => x !== d).map(fr), { dire: "Touche " + fraction[d] + " de la galette." }); });
    const COTES = [["un triangle", 3, "🔺"], ["un carré", 4, "🟥"], ["un rectangle", 4, "▭"], ["un pentagone", 5, "⬠"], ["un hexagone", 6, "⬡"]];
    const cotes = () => fois(N, () => { const b = hasard(COTES); return q("Combien de côtés a " + b[0] + " ?", { k: "image", e: b[2] }, ch(b[1]), proches(b[1], 2, 8).map(ch), { dire: "Combien de côtés a " + b[0] + " ?" }); });
    const table = t => () => fois(N, () => { const b = r(2, 10); return q(t + " × " + b + " = ?", null, ch(t * b), proches(t * b, 0, 100).filter(x => x !== t * b).map(ch), { dire: t + " fois " + b + " ?" }); });
    const rendre = () => fois(N, () => { const p = r(2, 19) * 25, billet = p <= 500 ? 500 : 1000; return q("Je paie " + p + " F avec " + billet + " F. On me rend ?", { k: "image", e: "🧾" }, ch(billet - p), proches(billet - p, 0, 1000).map(x => ch(x * 1)), { dire: "J'achète pour " + p + " francs. Je donne " + billet + " francs. Combien me rend-on ?" }); });
    const butsMaths = histoires([
      () => { const a = r(1, 4), b = r(1, 4), c = r(1, 4); return ["Les Lions marquent " + a + ", puis " + b + ", puis " + c + " buts. Combien en tout ?", a + b + c, "⚽"]; },
      () => { const m = r(3, 9), b = r(1, 3); return ["En " + m + " matchs, Sadio marque " + b + " buts par match. Combien de buts ?", m * b, "🦁"]; },
      () => { const s = r(30000, 60000), v = r(5000, 20000); return ["Le stade a " + s + " places. " + v + " sont vides. Combien de spectateurs ?", s - v, "🏟️"]; },
    ]);
    const phrasesQuiz2 = liste => () => tirer(liste, Math.min(N, liste.length)).map(([p, b, f]) => q("Complète la phrase", { k: "phrase", t: p }, mot(b), f.map(mot), { dire: p.replace("___", "quoi") + " Choisis le bon mot." }));
    L2("p1", "francais", "1", "à", "a ou à ? et ou est ?", "Les homophones", phrasesQuiz2(HOMO));
    L2("p1", "maths", "2", "2", "La table de 2", "Réciter la table de 2", table(2));
    L2("p1", "francais", "3", "🏷️", "Nom, verbe ou adjectif ?", "La nature des mots", quiz(NATURE));
    L2("p1", "maths", "4", "3", "La table de 3", "Réciter la table de 3", table(3));
    L2("p1", "decouvrir", "5", "🧊", "Les sciences", "L'eau, la Terre, le corps", quiz(SCIENCES));
    L2("p1", "francais", "6", "✅", "Être et avoir", "Conjuguer être et avoir au présent", phrasesQuiz2(ETRE_AVOIR));
    L2("p1", "maths", "7", "🔺", "Les côtés des formes", "Les polygones", cotes);
    L2("p2", "maths", "8", "4", "La table de 4", "Réciter la table de 4", table(4));
    L2("p2", "francais", "9", "🐎", "Les pluriels en -aux", "Le pluriel des noms", quiz(PLUR.map(([a, b, f]) => ["Le pluriel de « " + a + " » ?", b, f])));
    L2("p2", "maths", "10", "🥧", "Les fractions", "Demi, tiers, quart", fractions);
    L2("p2", "foot", "11", "⚽", "Les maths du foot", "Problèmes avec des buts", butsMaths);
    L2("p2", "maths", "12", "5", "La table de 5", "Réciter la table de 5", table(5));
    L2("p2", "francais", "13", "son", "son ou sont ? on ou ont ?", "Les homophones", phrasesQuiz2(HOMO));
    L2("p2", "decouvrir", "14", "🌍", "La Terre et le ciel", "Sciences", quiz(SCIENCES));
    L2("p3", "maths", "15", "6", "La table de 6", "Réciter la table de 6", table(6));
    L2("p3", "francais", "16", "🏷️", "La nature des mots (suite)", "Nom, verbe, adjectif", quiz(NATURE));
    L2("p3", "maths", "17", "🧾", "Rendre la monnaie", "Calculer ce qu'on rend", rendre);
    L2("p3", "maths", "18", "7", "La table de 7", "Réciter la table de 7", table(7));
    L2("p3", "francais", "19", "✅", "Être et avoir (suite)", "Conjuguer être et avoir", phrasesQuiz2(ETRE_AVOIR));
    L2("p3", "foot", "20", "🏟️", "Le stade en chiffres", "Problèmes avec des buts", butsMaths);
    L2("p3", "maths", "21", "🥧", "Partager la galette", "Demi, tiers, quart", fractions);
    L2("p4", "maths", "22", "8", "La table de 8", "Réciter la table de 8", table(8));
    L2("p4", "francais", "23", "🐎", "Pluriels difficiles", "Le pluriel des noms", quiz(PLUR.map(([a, b, f]) => ["Le pluriel de « " + a + " » ?", b, f])));
    L2("p4", "maths", "24", "9", "La table de 9", "Réciter la table de 9", table(9));
    L2("p4", "decouvrir", "25", "🧲", "Sciences, révision", "L'eau, la Terre, le corps", quiz(SCIENCES));
    L2("p4", "maths", "26", "🧾", "Le marchand rend la monnaie", "Calculer ce qu'on rend", rendre);
    L2("p4", "francais", "27", "à", "Homophones, révision", "a/à, et/est, son/sont", phrasesQuiz2(HOMO));
    L2("p4", "maths", "28", "⬡", "Formes, révision", "Les polygones", cotes);
  }

  return { monde: { id: "senegal", titre: "Mon Sénégal", icone: "🇸🇳", couleur: "#c8ecc0", lecons: [] }, lecons };
};
