/* Contenu de l'appli Grande Section. Préscolaire sénégalais, palier 1 : début d'année. */
(function () {
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const NOMBRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];
  const de = mot => (/^[aeiouyéèêœh]/i.test(mot) ? "d'" : "de ") + mot;
  function q(consigne, scene, bonne, autres, extra) {
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  }
  const img = ([nom, e, art]) => ({ k: "image", e, dire: (art || "") + nom });

  // ---------- PARLER ET LIRE ----------
  const COULEURS = [["rouge", "#e0533d"], ["bleu", "#2f6fd1"], ["jaune", "#f5c518"], ["vert", "#2e9e5b"], ["orange", "#f08a1c"], ["violet", "#8a4fd6"]];
  const tache = ([nom, c]) => ({ k: "html", html: '<span style="display:block;width:64px;height:64px;border-radius:50%;background:' + c + '"></span>', dire: nom });
  function couleurs() {
    return () => fois(8, i => {
      const c = COULEURS[i % COULEURS.length];
      return q("Touche le " + c[0], null, tache(c), tirer(COULEURS.filter(x => x !== c), 2).map(tache), { dire: "Touche la couleur " + c[0] + ".", disposition: "trois" });
    });
  }

  const VOYELLES = ["A", "E", "I", "O", "U"];
  const CONSONNES = ["M", "L", "P", "T", "B", "S", "R", "N"];
  const NOM_LETTRE = { A: "a", E: "e", I: "i", O: "o", U: "u", M: "aime", L: "elle", P: "pé", T: "té", B: "bé", S: "esse", R: "erre", N: "aine" };
  const lettre = l => ({ k: "lettre", t: l, dire: "la lettre " + NOM_LETTRE[l] });
  function reconnaitre(liste, pool) {
    return () => fois(8, i => {
      const l = liste[i % liste.length];
      return q("Touche la lettre " + l, null, lettre(l), tirer(pool.filter(x => x !== l), 2).map(lettre), { dire: "Touche la lettre " + NOM_LETTRE[l] + ".", disposition: "trois" });
    });
  }
  function pareilles() {
    const pool = VOYELLES.concat(CONSONNES);
    return () => fois(8, () => {
      const l = hasard(pool);
      return q("Trouve la même lettre", { k: "lettre", t: l }, { k: "lettre", t: l }, tirer(pool.filter(x => x !== l), 2).map(x => ({ k: "lettre", t: x })),
        { dire: "Regarde bien la lettre. Trouve la même.", disposition: "trois" });
    });
  }

  // Premier son : le mot commence par…
  const DEBUTS = {
    A: [["ananas", "🍍"], ["avion", "✈️"], ["arbre", "🌳"], ["abeille", "🐝"]],
    O: [["orange", "🍊"], ["os", "🦴"], ["oreille", "👂"], ["oiseau", "🐦"]],
    M: [["mangue", "🥭"], ["moto", "🏍️"], ["mouton", "🐑"], ["maison", "🏠"]],
    L: [["lion", "🦁"], ["lune", "🌙"], ["lit", "🛏️"], ["lapin", "🐇"]],
    P: [["poisson", "🐟"], ["pomme", "🍎"], ["poule", "🐔"], ["pied", "🦶"]],
    B: [["banane", "🍌"], ["ballon", "⚽"], ["bébé", "👶"], ["bus", "🚌"]],
  };
  function premierSon() {
    const cles = Object.keys(DEBUTS);
    const nomSon = { A: "a", O: "o", M: "mmm", L: "lll", P: "p", B: "b" };
    return () => fois(8, i => {
      const l = cles[i % cles.length];
      const bon = hasard(DEBUTS[l]);
      const autres = tirer(cles.filter(x => x !== l).flatMap(x => DEBUTS[x]), 2);
      return q("Quel mot commence par " + l + " ?", { k: "lettre", t: l }, { k: "image", e: bon[1], t: bon[0], dire: bon[0] },
        autres.map(([m, e]) => ({ k: "image", e, t: m, dire: m })), { dire: "Quel mot commence par le son " + nomSon[l] + " ? Écoute bien.", disposition: "trois" });
    });
  }

  const ANIMAUX = [["lion", "🦁", "le "], ["chèvre", "🐐", "la "], ["mouton", "🐑", "le "], ["poule", "🐔", "la "], ["vache", "🐄", "la "], ["cheval", "🐎", "le "], ["chat", "🐈", "le "], ["chien", "🐕", "le "], ["éléphant", "🐘", "l'"], ["girafe", "🦒", "la "], ["singe", "🐒", "le "], ["poisson", "🐟", "le "]];
  const FRUITS = [["mangue", "🥭", "la "], ["banane", "🍌", "la "], ["orange", "🍊", "l'"], ["pastèque", "🍉", "la "], ["noix de coco", "🥥", "la "], ["citron", "🍋", "le "], ["arachide", "🥜", "l'"], ["tomate", "🍅", "la "], ["oignon", "🧅", "l'"], ["carotte", "🥕", "la "]];
  function imagier(liste) {
    return () => tirer(liste, 8).map(x => q("Touche " + x[2] + x[0], null, img(x), tirer(liste.filter(y => y !== x), 2).map(img), { dire: "Touche " + x[2] + x[0] + ".", disposition: "trois" }));
  }

  // ---------- COMPTER ----------
  const OBJETS = [["mangues", "🥭"], ["poissons", "🐟"], ["chèvres", "🐐"], ["ballons", "⚽"], ["étoiles", "⭐"], ["poules", "🐔"]];
  const tas = (n, e) => ({ k: "tas", items: fois(n, () => e) });
  const chiffre = n => ({ k: "chiffre", t: String(n), dire: NOMBRES[n] });
  function compter(max) {
    return () => fois(8, () => {
      const n = 1 + Math.floor(Math.random() * max);
      const [pl, e] = hasard(OBJETS);
      const autres = tirer(fois(max + 1, i => i + 1).filter(x => x !== n), 2);
      return q("Combien " + de(pl) + " ?", tas(n, e), chiffre(n), autres.map(chiffre), { dire: "Compte avec ton doigt. Combien " + de(pl) + " ?" });
    });
  }
  function montrer(max) {
    return () => fois(8, () => {
      const n = 1 + Math.floor(Math.random() * max);
      const [, e] = hasard(OBJETS);
      const autres = tirer(fois(max, i => i + 1).filter(x => x !== n), 2);
      return q("Où y en a-t-il " + NOMBRES[n] + " ?", chiffre(n), tas(n, e), autres.map(x => tas(x, e)), { dire: "Trouve le groupe où il y en a " + NOMBRES[n] + ".", disposition: "trois" });
    });
  }

  const FORMES = {
    rond: '<svg viewBox="0 0 100 100" width="72" height="72" aria-label="rond"><circle cx="50" cy="50" r="40" fill="#2f6fd1"/></svg>',
    carré: '<svg viewBox="0 0 100 100" width="72" height="72" aria-label="carré"><rect x="14" y="14" width="72" height="72" fill="#e0533d"/></svg>',
    triangle: '<svg viewBox="0 0 100 100" width="72" height="72" aria-label="triangle"><polygon points="50,10 92,88 8,88" fill="#2e9e5b"/></svg>',
  };
  function formes() {
    const noms = Object.keys(FORMES);
    const f = n => ({ k: "html", html: FORMES[n], dire: "le " + n });
    return () => fois(8, i => { const n = noms[i % 3]; return q("Touche le " + n, null, f(n), noms.filter(x => x !== n).map(f), { dire: "Touche le " + n + ".", disposition: "trois" }); });
  }

  function intrus() {
    const familles = [ANIMAUX, FRUITS];
    return () => fois(8, () => {
      const fa = hasard(familles), autre = familles.find(x => x !== fa);
      const pareils = tirer(fa, 2), bizarre = hasard(autre);
      return q("Lequel n'est pas de la même famille ?", null, img(bizarre), pareils.map(img), { dire: "Regarde bien. Lequel n'est pas comme les autres ?", disposition: "trois" });
    });
  }

  function suites() {
    const motifs = [["🔴", "🔵"], ["🥭", "🍌"], ["⭐", "🌙"], ["🐔", "🐐"], ["🟢", "🟡"], ["🔺", "⚪"]];
    return () => fois(8, i => {
      const [a, b] = hasard(motifs);
      const trois = i >= 4;
      const c = trois ? hasard(["⚽", "🐟", "🍉"]) : null;
      const motif = trois ? [a, b, c] : [a, b];
      const suite = fois(trois ? 5 : 5, k => motif[k % motif.length]);
      const bon = motif[suite.length % motif.length];
      const choix = [bon].concat(motif.filter(x => x !== bon)).concat(trois ? [] : [hasard(["🍎", "🐈", "🌳"])]);
      return q("Qu'est-ce qui vient après ?", { k: "tas", items: suite.concat(["❓"]) }, { k: "image", e: bon }, choix.slice(1).map(e => ({ k: "image", e })),
        { dire: "Regarde la suite. Qu'est-ce qui vient après ?", disposition: "trois" });
    });
  }

  function grandPetit() {
    const taille = (e, px) => ({ k: "html", html: '<span style="font-size:' + px + 'px;line-height:1">' + e + "</span>" });
    return () => fois(8, i => {
      const [, e] = hasard(OBJETS);
      const g = i % 2 === 0;
      return q("Touche le plus " + (g ? "grand" : "petit"), null, taille(e, g ? 70 : 24), (g ? [24, 44] : [44, 70]).map(t => taille(e, t)), { dire: "Touche le plus " + (g ? "grand." : "petit."), disposition: "trois" });
    });
  }

  // ---------- DÉCOUVRIR ----------
  function cris() {
    const C = [["Qui fait meuh ?", "🐄", "la vache"], ["Qui fait bêê ?", "🐑", "le mouton"], ["Qui fait cot cot ?", "🐔", "la poule"], ["Qui fait miaou ?", "🐈", "le chat"], ["Qui fait ouaf ouaf ?", "🐕", "le chien"], ["Qui rugit très fort ?", "🦁", "le lion"], ["Qui fait hi han ?", "🫏", "l'âne"], ["Qui fait coin coin ?", "🦆", "le canard"]];
    return () => melange(C).map(([qq, e, nom]) => q(qq, null, { k: "image", e, dire: nom }, tirer(C.filter(x => x[1] !== e), 2).map(x => ({ k: "image", e: x[1], dire: x[2] })), { disposition: "trois" }));
  }
  const CORPS = [["yeux", "👀", "les "], ["oreille", "👂", "l'"], ["nez", "👃", "le "], ["bouche", "👄", "la "], ["main", "✋", "la "], ["pied", "🦶", "le "], ["dents", "🦷", "les "]];
  function propre() {
    const B = [
      ["Avant de manger, je…", ["🧼", "me lave les mains"], [["📺", "regarde la télé"], ["⚽", "joue"]]],
      ["Le soir, avant de dormir, je…", ["🪥", "me brosse les dents"], [["🍬", "mange un bonbon"], ["📱", "prends le téléphone"]]],
      ["Je jette le papier…", ["🗑️", "dans la poubelle"], [["🛣️", "par terre"], ["🛏️", "sous le lit"]]],
      ["Quand je tousse, je mets…", ["💪🏾", "mon coude"], [["🙌🏾", "rien du tout"], ["🍽️", "le plat"]]],
      ["Je bois…", ["🚰", "de l'eau propre"], [["🌧️", "l'eau de la flaque"], ["🪣", "l'eau sale"]]],
      ["Pour être propre, je…", ["🚿", "me lave"], [["😴", "dors"], ["🎨", "me salis"]]],
    ];
    const it = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(B).concat(tirer(B, 2)).map(([c, b, m]) => q(c, null, it(b), m.map(it), { disposition: "ligne", dire: c.replace("…", "") + " quoi ?" }));
  }

  // ---------- CUISINE ----------
  const PLATS = [["thiéboudienne", "🍛", "le "], ["yassa", "🍗", "le "], ["mafé", "🍲", "le "], ["thiakry", "🥣", "le "], ["bissap", "🌺", "le "], ["pastels", "🥟", "les "], ["beignets", "🍩", "les "], ["pain", "🥖", "le "]];
  function ingredients() {
    const I = [
      ["Pour le thiéboudienne, il faut du…", ["🐟", "poisson"], [["🍫", "chocolat"], ["🍦", "glace"]]],
      ["Pour le thiéboudienne, il faut aussi du…", ["🍚", "riz"], [["🍬", "bonbon"], ["🍪", "biscuit"]]],
      ["Pour le yassa, on coupe beaucoup d'…", ["🧅", "oignons"], [["🍓", "fraises"], ["🍫", "chocolat"]]],
      ["Pour le yassa, on presse du…", ["🍋", "citron"], [["🧀", "fromage"], ["🍩", "beignet"]]],
      ["Le mafé est fait avec de la pâte d'…", ["🥜", "arachide"], [["🍎", "pomme"], ["🍇", "raisin"]]],
      ["Pour le thiakry, on met du…", ["🥛", "lait caillé"], [["🧅", "oignon"], ["🌶️", "piment"]]],
      ["Le bissap est fait avec des…", ["🌺", "fleurs d'hibiscus"], [["🐟", "poissons"], ["🥔", "pommes de terre"]]],
      ["Pour faire les beignets, il faut de la…", ["🌾", "farine"], [["🐟", "poisson"], ["🧂", "sel seulement"]]],
    ];
    const it = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(I).map(([c, b, m]) => q(c, null, it(b), m.map(it), { disposition: "trois", dire: c.replace("…", "") + " quoi ?" }));
  }
  function recette() {
    const R = [["🍅", "tomates"], ["🧅", "oignons"], ["🥕", "carottes"], ["🐟", "poissons"], ["🍋", "citrons"]];
    return () => fois(8, () => {
      const n = 1 + Math.floor(Math.random() * 5), [e, nom] = hasard(R);
      const autres = tirer([1, 2, 3, 4, 5].filter(x => x !== n), 2);
      return q("Mets " + n + " " + nom + " dans la marmite", { k: "phrase", t: "🍲 " + n + " " + nom }, tas(n, e), autres.map(x => tas(x, e)), { dire: "La recette dit : " + NOMBRES[n] + " " + nom + ". Touche le bon groupe.", disposition: "trois" });
    });
  }
  function etapes() {
    const E = [
      ["Avant de cuisiner, d'abord je…", ["🧼", "me lave les mains"], [["🍽️", "mange"], ["🛏️", "vais au lit"]]],
      ["À la fin du repas, je…", ["🧽", "fais la vaisselle"], [["🛒", "vais au marché"], ["🔪", "coupe les légumes"]]],
      ["Avant de cuire le riz, je…", ["🛒", "l'achète au marché"], [["🍽️", "le mange"], ["🗑️", "le jette"]]],
      ["Quand le plat est prêt, on…", ["🍽️", "mange ensemble"], [["🛒", "va au marché"], ["🌱", "plante le riz"]]],
      ["Le matin, on prend…", ["🥖", "le petit-déjeuner"], [["🍛", "le dîner"], ["🌙", "le goûter de la nuit"]]],
      ["À midi, au Sénégal, on mange souvent…", ["🍛", "le thiéboudienne"], [["🥣", "les céréales"], ["🎂", "un gâteau"]]],
      ["La marmite est chaude, je…", ["🧤", "fais attention"], [["✋🏾", "la touche"], ["🏃🏾", "cours autour"]]],
      ["Pour servir le bissap bien frais, je le mets…", ["🧊", "au frais"], [["🔥", "sur le feu"], ["☀️", "au soleil"]]],
    ];
    const it = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(E).map(([c, b, m]) => q(c, null, it(b), m.map(it), { disposition: "ligne", dire: c.replace("…", "") + " quoi ?" }));
  }
  const VETEMENTS = [["robe", "👗", "la "], ["boubou", "🥻", "le "], ["chapeau", "👒", "le "], ["foulard", "🧣", "le "], ["sandales", "🩴", "les "], ["baskets", "👟", "les "], ["sac", "👜", "le "], ["lunettes", "🕶️", "les "], ["pantalon", "👖", "le "]];
  function habits() {
    const M = [
      ["Il fait très chaud, je mets…", ["🩴", "des sandales"], [["🧥", "un gros manteau"], ["🧤", "des gants"]]],
      ["Pour la Tabaski, je mets mon beau…", ["🥻", "boubou"], [["🩱", "maillot de bain"], ["🥾", "bottes"]]],
      ["Il y a beaucoup de soleil, je protège mes yeux avec…", ["🕶️", "des lunettes"], [["🧦", "des chaussettes"], ["🧣", "un foulard"]]],
      ["Pour aller à la plage, je prends…", ["🩱", "mon maillot"], [["🧥", "mon manteau"], ["🎒", "mon cartable"]]],
      ["Pour aller à l'école, je prends…", ["🎒", "mon cartable"], [["👜", "le sac de maman"], ["🩱", "mon maillot"]]],
      ["Il pleut, je prends…", ["☂️", "un parapluie"], [["🕶️", "des lunettes"], ["🩴", "des sandales"]]],
    ];
    const it = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(M).concat(imagier(VETEMENTS)().slice(0, 2)).map(x => Array.isArray(x) ? q(x[0], null, it(x[1]), x[2].map(it), { disposition: "ligne", dire: x[0].replace("…", "") + " quoi ?" }) : x);
  }

  // ---------- DOCTEURE ----------
  const TROUSSE = [["stéthoscope", "🩺", "le "], ["pansement", "🩹", "le "], ["thermomètre", "🌡️", "le "], ["seringue", "💉", "la "], ["médicament", "💊", "le "], ["masque", "😷", "le "], ["blouse", "🥼", "la "]];
  function quiSoigne() {
    const D = [
      ["Qui soigne les dents ?", ["🦷", "le dentiste"]], ["Qui soigne les bébés et les enfants ?", ["👶🏾", "la pédiatre"]], ["Qui soigne les yeux ?", ["👁️", "l'ophtalmologue"]],
      ["Qui répare les os cassés ?", ["🦴", "l'orthopédiste"]], ["Qui opère à l'hôpital ?", ["🏥", "la chirurgienne"]], ["Qui soigne les animaux ?", ["🐶", "le vétérinaire"]],
      ["Qui aide les mamans à avoir leur bébé ?", ["🤰🏾", "la sage-femme"]], ["Qui écoute ton cœur avec un stéthoscope ?", ["🩺", "la docteure"]],
    ];
    const it = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(D).map(([c, b]) => q(c, null, it(b), tirer(D.filter(x => x[1] !== b), 2).map(x => it(x[1])), { disposition: "trois" }));
  }
  function bobos() {
    return () => fois(8, i => {
      if (i % 2) {
        const S = [["Le bébé a chaud et de la fièvre. Je prends…", "🌡️", "le thermomètre", ["🩹", "🦷"]], ["Mon ami s'est coupé le doigt. Je mets…", "🩹", "un pansement", ["🌡️", "💉"]], ["Pour écouter le cœur, j'utilise…", "🩺", "le stéthoscope", ["🩹", "💊"]], ["Avant de soigner, la docteure se lave…", "🧼", "les mains", ["🦶", "🍽️"]]][i % 4 === 1 ? 0 : i % 4 === 3 ? 1 : Math.floor(Math.random() * 4)];
        return q(S[0], null, { k: "image", e: S[1], dire: S[2] }, S[3].map(e => ({ k: "image", e })), { disposition: "trois", dire: S[0].replace("…", "") + " quoi ?" });
      }
      const n = 1 + Math.floor(Math.random() * 5);
      return q("Le nounours a " + n + " bobo" + (n > 1 ? "s" : "") + ". Combien de pansements ?", { k: "tas", items: ["🧸"].concat(fois(n, () => "🔴")) }, chiffre(n), tirer([1, 2, 3, 4, 5].filter(x => x !== n), 2).map(chiffre), { dire: "Compte les bobos du nounours. Combien de pansements faut-il ?" });
    });
  }

  window.CONTENU = {
    id: "gs",
    titreAppli: "Mon école GS",
    version: "Palier 1",
    prenom: "Bineta",
    classe: "Grande Section",
    avatar: "🦋",
    feminin: true,
    coin: true,
    habillage: {
      boutique: [["🎀", "Nœud", 20], ["🕶️", "Lunettes", 30], ["👒", "Chapeau de paille", 30], ["🌸", "Fleur", 30], ["🧣", "Foulard", 40], ["👜", "Sac", 50], ["💍", "Bague", 60], ["👗", "Robe de fête", 80], ["👑", "Couronne", 120]],
    },
    lettresATracer: ["A", "E", "I", "O", "U", "M", "L", "P", "B", "T"],
    comptines: [
      { titre: "Un, deux, trois, nous irons au bois", e: "🍒", lignes: [["Un, deux, trois,", "1️⃣"], ["nous irons au bois,", "🌳"], ["quatre, cinq, six,", "4️⃣"], ["cueillir des cerises,", "🍒"], ["sept, huit, neuf,", "7️⃣"], ["dans mon panier neuf,", "🧺"], ["dix, onze, douze,", "🔟"], ["elles seront toutes rouges !", "🔴"]] },
      { titre: "Une souris verte", e: "🐭", lignes: [["Une souris verte", "🐭"], ["qui courait dans l'herbe,", "🌿"], ["je l'attrape par la queue,", "✋🏾"], ["je la montre à ces messieurs.", "👨🏾‍👨🏾‍👦🏾"], ["Ces messieurs me disent :", "🗣️"], ["trempez-la dans l'huile,", "🫒"], ["trempez-la dans l'eau,", "💧"], ["ça fera un escargot tout chaud !", "🐌"]] },
      { titre: "Les jours de la semaine", e: "📅", lignes: [["Lundi, on va à l'école,", "🏫"], ["mardi, on apprend des lettres,", "🔤"], ["mercredi, on compte jusqu'à dix,", "🔢"], ["jeudi, on chante en classe,", "🎵"], ["vendredi, on dessine,", "🎨"], ["samedi, on joue dehors,", "⚽"], ["et dimanche, on se repose en famille !", "🏠"]] },
      { titre: "Les voyelles", e: "🅰️", lignes: [["A comme ananas,", "🍍"], ["E comme éléphant,", "🐘"], ["I comme igloo,", "🧊"], ["O comme orange,", "🍊"], ["U comme lune, tu l'entends ?", "🌙"], ["A, E, I, O, U, je les connais tous !", "⭐"]] },
      { titre: "Les couleurs", e: "🌈", lignes: [["Rouge comme la tomate,", "🍅"], ["jaune comme le soleil,", "☀️"], ["vert comme la feuille,", "🍃"], ["bleu comme la mer,", "🌊"], ["orange comme la mangue,", "🥭"], ["et toutes ensemble, c'est l'arc-en-ciel !", "🌈"]] },
    ],
    coloriages: [
      { id: "poisson", titre: "Le poisson", svg: '<svg viewBox="0 0 300 220" role="img" aria-label="Poisson à colorier"><rect data-z="eau" x="2" y="2" width="296" height="216" rx="14" fill="#fff"/><path data-z="queue" d="M60 110 L10 60 L10 160 Z" fill="#fff"/><ellipse data-z="corps" cx="150" cy="110" rx="95" ry="58" fill="#fff"/><path data-z="nageoire" d="M140 55 Q160 15 190 52 Z" fill="#fff"/><path data-z="raie" d="M120 70 Q135 110 120 150 L140 152 Q155 110 140 68 Z" fill="#fff"/><circle data-z="oeil" cx="205" cy="95" r="12" fill="#fff"/><circle data-z="bulle1" cx="262" cy="60" r="10" fill="#fff"/><circle data-z="bulle2" cx="275" cy="30" r="7" fill="#fff"/><path data-z="algue" d="M40 215 Q30 185 45 170 Q55 190 50 215 Z" fill="#fff"/></svg>' },
      { id: "case", titre: "La case", svg: '<svg viewBox="0 0 300 220" role="img" aria-label="Case à colorier"><rect data-z="ciel" x="2" y="2" width="296" height="160" rx="14" fill="#fff"/><circle data-z="soleil" cx="250" cy="45" r="25" fill="#fff"/><rect data-z="sol" x="2" y="160" width="296" height="58" fill="#fff"/><rect data-z="mur" x="80" y="100" width="140" height="80" fill="#fff"/><path data-z="toit" d="M60 105 L150 35 L240 105 Z" fill="#fff"/><rect data-z="porte" x="135" y="130" width="30" height="50" fill="#fff"/><rect data-z="fenetre" x="95" y="120" width="25" height="22" fill="#fff"/><path data-z="arbre" d="M25 160 L35 100 L45 160 Z" fill="#fff"/><circle data-z="feuillage" cx="35" cy="95" r="22" fill="#fff"/></svg>' },
      { id: "fleur", titre: "La fleur", svg: '<svg viewBox="0 0 300 220" role="img" aria-label="Fleur à colorier"><rect data-z="fond" x="2" y="2" width="296" height="216" rx="14" fill="#fff"/><rect data-z="tige" x="145" y="110" width="10" height="100" fill="#fff"/><ellipse data-z="feuille" cx="180" cy="170" rx="28" ry="12" fill="#fff"/><circle data-z="p1" cx="150" cy="55" r="26" fill="#fff"/><circle data-z="p2" cx="190" cy="85" r="26" fill="#fff"/><circle data-z="p3" cx="175" cy="128" r="26" fill="#fff"/><circle data-z="p4" cx="125" cy="128" r="26" fill="#fff"/><circle data-z="p5" cx="110" cy="85" r="26" fill="#fff"/><circle data-z="coeur" cx="150" cy="95" r="22" fill="#fff"/><circle data-z="papillon" cx="250" cy="45" r="14" fill="#fff"/></svg>' },
    ],

    vitesse: 0.75,
    paliers: [{ id: "p1", titre: "Palier 1", periode: "octobre à décembre" }],
    mondes: [
      { id: "parler", titre: "Parler et lire", icone: "🗣️", couleur: "#ffd9a8", lecons: [
        { id: "gs-p1-l1", palier: "p1", icone: "🎨", titre: "Les couleurs", objectif: "Nommer six couleurs", questions: couleurs() },
        { id: "gs-p1-l2", palier: "p1", icone: "A", titre: "Les lettres A, E, I, O, U", objectif: "Reconnaître les voyelles en capitales", questions: reconnaitre(VOYELLES, VOYELLES) },
        { id: "gs-p1-l3", palier: "p1", icone: "👀", titre: "La même lettre", objectif: "Discriminer visuellement les lettres", questions: pareilles() },
        { id: "gs-p1-l4", palier: "p1", icone: "M", titre: "Les lettres M, L, P, B", objectif: "Reconnaître des consonnes en capitales", questions: reconnaitre(["M", "L", "P", "B"], ["M", "L", "P", "B", "T", "S", "R"]) },
        { id: "gs-p1-l5", palier: "p1", icone: "👂", titre: "Le premier son", objectif: "Entendre le son au début d'un mot", questions: premierSon() },
        { id: "gs-p1-l6", palier: "p1", icone: "🦁", titre: "Les animaux", objectif: "Enrichir le vocabulaire", questions: imagier(ANIMAUX) },
        { id: "gs-p1-l7", palier: "p1", icone: "🥭", titre: "Au marché", objectif: "Nommer fruits et légumes du marché", questions: imagier(FRUITS) },
      ] },
      { id: "compter", titre: "Compter", icone: "🔢", couleur: "#bfe3c9", lecons: [
        { id: "gs-p1-c1", palier: "p1", icone: "3", titre: "Je compte jusqu'à 3", objectif: "Dénombrer jusqu'à 3", questions: compter(3) },
        { id: "gs-p1-c2", palier: "p1", icone: "5", titre: "Je compte jusqu'à 5", objectif: "Dénombrer jusqu'à 5", questions: compter(5) },
        { id: "gs-p1-c3", palier: "p1", icone: "🐟", titre: "Le bon nombre", objectif: "Associer un chiffre à une quantité", questions: montrer(5) },
        { id: "gs-p1-c4", palier: "p1", icone: "🔺", titre: "Les formes", objectif: "Reconnaître rond, carré, triangle", questions: formes() },
        { id: "gs-p1-c5", palier: "p1", icone: "🐘", titre: "Grand et petit", objectif: "Comparer des tailles", questions: grandPetit() },
        { id: "gs-p1-c6", palier: "p1", icone: "🔴", titre: "Les suites", objectif: "Continuer un rythme", questions: suites() },
      ] },
      { id: "cuisine", titre: "La cuisine", icone: "🍲", couleur: "#ffd1b3", lecons: [
        { id: "gs-p1-k1", palier: "p1", icone: "🍛", titre: "Les plats de chez nous", objectif: "Nommer les plats sénégalais (vocabulaire)", questions: imagier(PLATS) },
        { id: "gs-p1-k2", palier: "p1", icone: "🧅", titre: "Les ingrédients", objectif: "Vocabulaire des aliments", questions: ingredients() },
        { id: "gs-p1-k3", palier: "p1", icone: "🍅", titre: "Je compte pour la recette", objectif: "Associer un nombre et une quantité", questions: recette() },
        { id: "gs-p1-k4", palier: "p1", icone: "⏱️", titre: "Avant, après", objectif: "Ordonner les moments (se repérer dans le temps)", questions: etapes() },
      ] },
      { id: "docteure", titre: "Docteure Binta", icone: "🩺", couleur: "#ffd6e7", lecons: [
        { id: "gs-p1-m1", palier: "p1", icone: "🩺", titre: "La trousse de la docteure", objectif: "Vocabulaire du soin", questions: imagier(TROUSSE) },
        { id: "gs-p1-m2", palier: "p1", icone: "🦷", titre: "Qui soigne quoi ?", objectif: "Les métiers de la santé", questions: quiSoigne() },
        { id: "gs-p1-m3", palier: "p1", icone: "🩹", titre: "Soigner le nounours", objectif: "Compter jusqu'à 5, gestes de soin", questions: bobos() },
      ] },
      { id: "decouvrir", titre: "Découvrir", icone: "🌍", couleur: "#bcdcf5", lecons: [
        { id: "gs-p1-d1", palier: "p1", icone: "🧍🏾", titre: "Mon corps", objectif: "Nommer les parties du corps", questions: imagier(CORPS) },
        { id: "gs-p1-d2", palier: "p1", icone: "🐄", titre: "Qui fait ce bruit ?", objectif: "Reconnaître les animaux familiers", questions: cris() },
        { id: "gs-p1-d3", palier: "p1", icone: "🧩", titre: "L'intrus", objectif: "Classer par familles", questions: intrus() },
        { id: "gs-p1-d4", palier: "p1", icone: "🧼", titre: "Je suis propre", objectif: "Connaître les gestes d'hygiène", questions: propre() },
        { id: "gs-p1-d5", palier: "p1", icone: "👗", titre: "Je m'habille", objectif: "Vocabulaire des vêtements, selon le temps", questions: habits() },
      ] },
    ],
  };
})();
