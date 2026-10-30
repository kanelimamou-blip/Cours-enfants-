window.TOUS_CONTENUS = window.TOUS_CONTENUS || {};
(function () { const garde = window.CONTENU;
/* Contenu de l'appli CI. Programme sénégalais (CEB, étape 1), palier 1 : début d'année. */
(function () {
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const de = mot => (/^[aeiouyéèêœh]/i.test(mot) ? "d'" : "de ") + mot;
  const NOMBRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];

  // Une question à choix : la bonne réponse est toujours la première, le moteur mélange.
  function q(consigne, scene, bonne, autres, extra) {
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  }

  // ---------- LIRE ----------
  const VOYELLES = ["a", "i", "o", "u", "e", "é"];
  const SON = { a: "a", i: "i", o: "o", u: "u", e: "e", "é": "é" };
  function lettre(l) { return { k: "lettre", t: l, dire: "la lettre " + SON[l] }; }

  function reconnaitre(cibles, total) {
    return () => fois(8, i => {
      const c = cibles[i % cibles.length];
      const autres = tirer(total.filter(x => x !== c), 3);
      return q("Touche la lettre " + c, null, lettre(c), autres.map(lettre), { dire: "Touche la lettre " + SON[c] + "." });
    });
  }

  // Mots illustrés : chaque mot liste les sons de voyelle qu'on y entend.
  const MOTS = [
    ["chat", "🐈", "a"], ["ananas", "🍍", "a"], ["avion", "✈️", "a"], ["sac", "👜", "a"], ["vache", "🐄", "a"], ["banane", "🍌", "a"],
    ["riz", "🍚", "i"], ["lit", "🛏️", "i"], ["tigre", "🐯", "i"], ["girafe", "🦒", "ia"], ["piment", "🌶️", "i"],
    ["moto", "🏍️", "o"], ["robe", "👗", "o"], ["os", "🦴", "o"], ["pomme", "🍎", "o"], ["stylo", "🖊️", "io"],
    ["lune", "🌙", "u"], ["bus", "🚌", "u"], ["jus", "🧃", "u"], ["tortue", "🐢", "ou"], ["plume", "🪶", "u"],
    ["bébé", "👶", "é"], ["café", "☕", "aé"], ["vélo", "🚲", "éo"], ["école", "🏫", "éo"], ["éléphant", "🐘", "é"],
  ].map(([mot, e, sons]) => ({ mot, e, sons }));
  const image = m => ({ k: "image", e: m.e, t: m.mot, dire: m.mot });

  function entendre(sons) {
    return () => fois(8, i => {
      const s = sons[i % sons.length];
      const avec = MOTS.filter(m => m.sons.includes(s));
      const sans = MOTS.filter(m => !m.sons.includes(s) && !(s === "u" && m.mot.includes("u")) && !(s === "o" && m.mot.includes("ou")));
      return q("Dans quel mot entends-tu « " + s + " » ?", { k: "lettre", t: s }, image(hasard(avec)), tirer(sans, 2).map(image),
        { dire: "Dans quel mot entends-tu le son " + SON[s] + " ? Écoute bien." });
    });
  }

  function syllabes(cons, deja) {
    const syl = c => VOYELLES.map(v => c + v);
    return () => {
      const toutes = deja.concat([cons]).flatMap(syl);
      const miennes = syl(cons);
      return fois(8, i => {
        if (i % 2 === 0) {
          const s = hasard(miennes);
          return q("Touche la syllabe que tu entends", null, { k: "lettre", t: s, dire: s }, tirer(toutes.filter(x => x !== s), 3).map(x => ({ k: "lettre", t: x, dire: x })), { dire: "Touche : " + s + "." });
        }
        const v = hasard(VOYELLES), s = cons + v;
        return q(cons + " et " + v + ", ça fait…", { k: "mots", t: cons + " + " + v }, { k: "lettre", t: s, dire: s },
          tirer(miennes.filter(x => x !== s), 2).map(x => ({ k: "lettre", t: x, dire: x })), { dire: "La lettre " + cons + " avec " + SON[v] + ", ça fait quoi ?" });
      });
    };
  }

  const PETITS_MOTS = [["ami", "🧒"], ["lama", "🦙"], ["mamie", "👵"], ["mule", "🫏"], ["lime", "🪚"], ["mimi", "🐱"], ["la", ""], ["le", ""], ["ma", ""], ["mollo", ""]];
  function lireMots() {
    const ecrits = PETITS_MOTS.map(m => m[0]);
    return () => tirer(PETITS_MOTS.slice(0, 6), 6).concat(tirer(PETITS_MOTS.slice(6, 9), 2)).map(([m]) =>
      q("Touche le mot que tu entends", null, { k: "mots", t: m, dire: m }, tirer(ecrits.filter(x => x !== m), 2).map(x => ({ k: "mots", t: x, dire: x })), { dire: "Touche le mot : " + m + "." , disposition: "ligne" }));
  }

  // ---------- COMPTER ----------
  const OBJETS = [["mangue", "mangues", "🥭"], ["poisson", "poissons", "🐟"], ["chèvre", "chèvres", "🐐"], ["ballon", "ballons", "⚽"], ["arachide", "arachides", "🥜"], ["œuf", "œufs", "🥚"], ["étoile", "étoiles", "⭐"]];
  const tas = (n, e) => ({ k: "tas", items: fois(n, () => e) });
  const chiffre = n => ({ k: "chiffre", t: String(n), dire: NOMBRES[n] });

  function compter(min, max) {
    return () => fois(8, () => {
      const n = min + Math.floor(Math.random() * (max - min + 1));
      const [, pl, e] = hasard(OBJETS);
      const autres = tirer(fois(max - min + 3, i => Math.max(1, min - 1) + i).filter(x => x !== n && x > 0 && x <= 10), 2);
      return q("Combien " + de(pl) + " ?", tas(n, e), chiffre(n), autres.map(chiffre), { dire: "Compte bien. Combien " + de(pl) + " ?" });
    });
  }

  function nombres1a5() {
    return () => fois(8, i => {
      const n = 1 + Math.floor(Math.random() * 5);
      const autres = tirer([1, 2, 3, 4, 5].filter(x => x !== n), 2);
      if (i % 2 === 0) return q("Touche le nombre " + NOMBRES[n], null, chiffre(n), autres.map(chiffre), { dire: "Touche le nombre " + NOMBRES[n] + "." });
      const [, pl, e] = hasard(OBJETS);
      return q("Où y a-t-il " + n + " " + (n > 1 ? pl : OBJETS.find(o => o[2] === e)[0]) + " ?", chiffre(n), tas(n, e), autres.map(x => tas(x, e)),
        { dire: "Trouve le groupe où il y en a " + NOMBRES[n] + ".", disposition: "trois" });
    });
  }

  function plusMoins() {
    return () => fois(8, i => {
      const [, pl, e] = hasard(OBJETS);
      const a = 1 + Math.floor(Math.random() * 7);
      let b; do { b = 1 + Math.floor(Math.random() * 7); } while (Math.abs(a - b) < 2);
      const grand = Math.max(a, b), petit = Math.min(a, b);
      if (i % 3 === 2) {
        const n = 2 + Math.floor(Math.random() * 5);
        return q("Touche le groupe qui en a autant", tas(n, e), tas(n, e), [tas(n + 2, e), tas(Math.max(1, n - 1), e)], { dire: "Regarde bien. Touche le groupe où il y en a autant." });
      }
      return i % 3 === 0
        ? q("Où y a-t-il le plus " + de(pl) + " ?", null, tas(grand, e), [tas(petit, e)], { dire: "Où y a-t-il le plus " + de(pl) + " ?" })
        : q("Où y a-t-il le moins " + de(pl) + " ?", null, tas(petit, e), [tas(grand, e)], { dire: "Où y a-t-il le moins " + de(pl) + " ?" });
    });
  }

  const FORMES = {
    rond: '<svg viewBox="0 0 100 100" width="76" height="76" aria-label="rond"><circle cx="50" cy="50" r="40" fill="#3b82c4"/></svg>',
    carré: '<svg viewBox="0 0 100 100" width="76" height="76" aria-label="carré"><rect x="14" y="14" width="72" height="72" fill="#e0533d"/></svg>',
    triangle: '<svg viewBox="0 0 100 100" width="76" height="76" aria-label="triangle"><polygon points="50,10 92,88 8,88" fill="#2e9e5b"/></svg>',
    rectangle: '<svg viewBox="0 0 100 100" width="76" height="76" aria-label="rectangle"><rect x="4" y="28" width="92" height="44" fill="#f0a020"/></svg>',
  };
  function formes() {
    const noms = Object.keys(FORMES);
    const forme = n => ({ k: "html", html: FORMES[n], dire: "un " + n });
    return () => fois(8, i => {
      const n = noms[i % noms.length];
      return i < 4
        ? q("Touche le " + n, null, forme(n), noms.filter(x => x !== n).slice(0, 3).map(forme), { dire: "Touche le " + n + "." })
        : q("Comment s'appelle cette forme ?", forme(noms[(i + 1) % 4]), { k: "mots", t: noms[(i + 1) % 4], dire: noms[(i + 1) % 4] },
            tirer(noms.filter(x => x !== noms[(i + 1) % 4]), 2).map(x => ({ k: "mots", t: x, dire: x })), { dire: "Comment s'appelle cette forme ?", disposition: "ligne" });
    });
  }

  function grandPetit() {
    const taille = (e, px) => ({ k: "html", html: '<span style="font-size:' + px + 'px;line-height:1">' + e + "</span>" });
    return () => fois(8, i => {
      const [s, , e] = hasard(OBJETS);
      const tailles = [26, 44, 70];
      const plusGrand = i % 2 === 0;
      return q("Touche " + (plusGrand ? "le plus grand" : "le plus petit"), null, taille(e, plusGrand ? 70 : 26), (plusGrand ? [26, 44] : [44, 70]).map(t => taille(e, t)),
        { dire: "Touche " + (plusGrand ? "le plus grand." : "le plus petit."), disposition: "trois" });
    });
  }

  // ---------- DÉCOUVRIR ----------
  function imagier(liste, consigne, n) {
    // liste : [nom, emoji, article]
    return () => tirer(liste, Math.min(8, liste.length)).concat(tirer(liste, 8)).slice(0, n || 8).map(([nom, e, art]) =>
      q(consigne + " " + art + nom, null, { k: "image", e, dire: art + nom }, tirer(liste.filter(x => x[0] !== nom), 2).map(([n2, e2, a2]) => ({ k: "image", e: e2, dire: a2 + n2 })),
        { dire: consigne + " " + art + nom + ".", disposition: "trois" }));
  }
  const CORPS = [["yeux", "👀", "les "], ["oreille", "👂", "l'"], ["nez", "👃", "le "], ["bouche", "👄", "la "], ["main", "✋", "la "], ["pied", "🦶", "le "], ["dents", "🦷", "les "], ["cheveux", "💇", "les "]];
  const ECOLE = [["cartable", "🎒", "le "], ["crayon", "✏️", "le "], ["règle", "📏", "la "], ["livre", "📕", "le "], ["ciseaux", "✂️", "les "], ["cahier", "📒", "le "], ["craie", "🖍️", "la "], ["école", "🏫", "l'"]];
  const FAMILLE = [["papa", "👨🏾", ""], ["maman", "👩🏾", ""], ["grand-père", "👴🏾", "le "], ["grand-mère", "👵🏾", "la "], ["bébé", "👶🏾", "le "], ["frère", "👦🏾", "le "], ["sœur", "👧🏾", "la "]];

  function sens() {
    const SENS = [["Avec quoi je vois ?", "👀", "les yeux"], ["Avec quoi j'entends ?", "👂", "les oreilles"], ["Avec quoi je sens les odeurs ?", "👃", "le nez"], ["Avec quoi je goûte ?", "👅", "la langue"], ["Avec quoi je touche ?", "✋", "les mains"]];
    return () => fois(8, i => {
      const [question, e, nom] = SENS[i % SENS.length];
      return q(question, null, { k: "image", e, dire: nom }, tirer(SENS.filter(s => s[1] !== e), 2).map(s => ({ k: "image", e: s[1], dire: s[2] })), { dire: question, disposition: "trois" });
    });
  }

  function hygiene() {
    const BONS = [
      ["Avant de manger, je…", ["🧼", "me lave les mains"], [["📺", "regarde la télé"], ["⚽", "joue au ballon"]]],
      ["Après les toilettes, je…", ["🧼", "me lave les mains"], [["🍬", "mange un bonbon"], ["🛏️", "vais au lit"]]],
      ["Le matin et le soir, je…", ["🪥", "me brosse les dents"], [["🍭", "mange des sucreries"], ["📱", "joue au téléphone"]]],
      ["Pour être propre, chaque jour je…", ["🚿", "me lave"], [["🧦", "garde mes chaussettes"], ["😴", "dors"]]],
      ["Pour boire, je prends…", ["🚰", "de l'eau propre"], [["🌧️", "l'eau de la flaque"], ["🪣", "l'eau du seau sale"]]],
      ["Quand j'éternue, je…", ["💪🏾", "mets mon coude"], [["🗣️", "éternue sur mon ami"], ["🍽️", "éternue sur le plat"]]],
      ["Je jette mes papiers…", ["🗑️", "dans la poubelle"], [["🛣️", "dans la rue"], ["🏫", "dans la classe"]]],
      ["Avant de manger une mangue, je…", ["💧", "la lave"], [["🦶", "la pose par terre"], ["🐐", "la donne à la chèvre"]]],
    ];
    const item = ([e, t]) => ({ k: "image", e, t, dire: t });
    return () => melange(BONS).map(([consigne, bon, mauvais]) => q(consigne, null, item(bon), mauvais.map(item), { disposition: "ligne", dire: consigne.replace("…", "") + " quoi ?" }));
  }

  window.CONTENU = {
    id: "ci",
    titreAppli: "Mon école CI",
    version: "Palier 1",
    prenom: "Soubeyrou",
    classe: "Cours d'Initiation",
    avatar: "🦁",
    avatars: ["🦁", "👦🏾", "🏎️", "🤼🏾", "🐒", "🦸🏾‍♂️", "🐯", "🤖"],
    motsDuJour: [
      ["la voiture", "🚗", "La voiture roule vite sur la route."], ["le lutteur", "🤼🏾", "Le lutteur est fort et courageux."], ["le stade", "🏟️", "Les supporters chantent au stade."], ["le camion", "🚚", "Le camion transporte du sable."],
      ["le singe", "🐒", "Le singe saute de branche en branche."], ["la pirogue", "🛶", "Le pêcheur part en pirogue."], ["le marché", "🧺", "Maman achète des tomates au marché."], ["le baobab", "🌳", "Le baobab est un arbre géant."],
      ["le cartable", "🎒", "Je range mes cahiers dans mon cartable."], ["l'ardoise", "🔲", "J'écris sur mon ardoise."], ["le maître", "🧑🏾‍🏫", "Le maître écrit au tableau."], ["la récréation", "🛝", "À la récréation, je joue avec mes amis."],
      ["le tambour", "🥁", "Le tambour fait boum boum."], ["le soleil", "☀️", "Le soleil chauffe très fort à midi."], ["la mer", "🌊", "La mer est bleue et salée."], ["le moteur", "⚙️", "Le moteur fait vroum."],
      ["le pneu", "🛞", "La voiture a quatre pneus."], ["le feu rouge", "🚦", "Au feu rouge, on s'arrête."], ["le casque", "⛑️", "À moto, on met un casque."], ["le pêcheur", "🎣", "Le pêcheur attrape des poissons."],
      ["la chèvre", "🐐", "La chèvre mange de l'herbe."], ["le mouton", "🐑", "On achète un mouton pour la Tabaski."], ["l'avion", "✈️", "L'avion vole très haut."], ["la lune", "🌙", "La lune éclaire la nuit."],
      ["le pain", "🥖", "Le boulanger fait du pain."], ["la famille", "👨🏾‍👩🏾‍👧🏾‍👦🏾", "J'aime ma famille."], ["le frère", "👦🏾", "Mon frère joue au ballon."], ["la sœur", "👧🏾", "Ma sœur aime cuisiner."],
      ["le jardin", "🌱", "Les légumes poussent dans le jardin."], ["la fourmi", "🐜", "La fourmi est petite mais forte."], ["le champion", "🏆", "Le champion lève la coupe."], ["la course", "🏁", "Qui va gagner la course ?"],
      ["l'arbitre", "🧑🏾‍⚖️", "L'arbitre siffle la fin du match."], ["le drapeau", "🇸🇳", "Le drapeau du Sénégal est vert, jaune et rouge."], ["la gourde", "🧴", "Je bois de l'eau dans ma gourde."], ["le rire", "😂", "Mon rire fait rire tout le monde."],
      ["la blague", "🤭", "J'aime faire des blagues."], ["le bus", "🚌", "Le bus emmène les enfants."], ["la moto", "🏍️", "La moto fait beaucoup de bruit."], ["le garage", "🔧", "Le mécanicien répare la voiture au garage."],
    ],
    livre: [
      { apres: "ci-p1-l1", e: "🧒🏾⚽", texte: "Ali a un ballon. Ali a un ami. Allez, on joue !" },
      { apres: "ci-p1-l2", e: "🚗💨", texte: "Une auto rouge file sur la route. Elle va vite, très vite !" },
      { apres: "ci-p1-l3", e: "🤼🏾", texte: "Le lutteur salue la foule. Il est fort comme un lion." },
      { apres: "ci-p1-l4", e: "🚌🏟️", texte: "Le bus jaune est plein. Tout le monde va au stade." },
      { apres: "ci-p1-l5", e: "🦙", texte: "Lili a lu. Lola a lu. Le lama a lu !" },
      { apres: "ci-p1-l6", e: "🏍️", texte: "Mimi a mal. Mamie a la moto. Moi, j'ai le ballon !" },
      { apres: "ci-p1-l7", e: "🦙🤼🏾", texte: "Ma mamie a un lama. Le lama mime le lutteur. Ali rit !" },
    ],
    mascotte: {
      e: "🐒", nom: "Malice",
      debut: ["Hé {prenom}, parie que tu n'y arrives pas !", "Hi hi, celle-là est trop dure pour toi !", "Je te regarde, champion…", "Prêt ? Moi je suis plus rapide que toi !"],
      bon: ["Quoi ?! Tu m'as eu !", "Pfff… pas mal, pas mal.", "Ok, tu es plus fort que moi.", "Hé ! C'est de la triche, tu es trop fort !", "Bon d'accord… bravo."],
      faux: ["Hi hi hi ! Raté !", "Je t'ai eu ! Essaie encore.", "Oups ! Allez, tu peux le faire.", "Même moi j'ai failli me tromper !"],
    },
    habillage: {
      lutte: true, taupes: true,
      grades: ["Petit mbër", "Lutteur du quartier", "Lutteur des navétanes", "Lutteur de l'arène", "Champion de Dakar", "Roi des arènes", "Légende de la lutte"],
      jeux: {
        ballons: { nom: "Les jongles", e: "⚽", aide: "Touche le bon ballon pour ne pas le laisser tomber !" },
        pirogue: { nom: "La course de voitures", e: "🏎️", aide: "Réponds vite pour gagner la course !" },
        taupes: { nom: "Les taupes farceuses", e: "🕳️", aide: "Tape vite la bonne réponse avant qu'elle se cache !" },
        lutte: { nom: "La lutte", e: "🤼🏾", aide: "Chaque bonne réponse pousse ton adversaire. Fais-le tomber : bàkk !" },
      },
      ciel: "tribune", mobiles: { peche: "poisson", ballons: "balle" }, prises: { peche: "🐟", ballons: "⚽" },
      monture: "🏎️", montureRival: "🚙", passager: " ", rival: ["", "Le rival"], course: "route",
      victoire: "Tu as gagné la course !", defaite: "La voiture rivale est arrivée avant toi",
    },

    paliers: [{ id: "p1", titre: "Palier 1", periode: "octobre à décembre" }],
    mondes: [
      { id: "lire", titre: "Lire", icone: "📖", couleur: "#ffd9a8", lecons: [
        { id: "ci-p1-l1", palier: "p1", icone: "a", titre: "Les voyelles a, i, o", objectif: "Reconnaître les lettres a, i, o", questions: reconnaitre(["a", "i", "o"], ["a", "i", "o", "u", "e"]) },
        { id: "ci-p1-l2", palier: "p1", icone: "u", titre: "Les voyelles u, e, é", objectif: "Reconnaître toutes les voyelles", questions: reconnaitre(["u", "e", "é"], VOYELLES) },
        { id: "ci-p1-l3", palier: "p1", icone: "👂", titre: "J'entends a, i, o", objectif: "Repérer un son de voyelle dans un mot", questions: entendre(["a", "i", "o"]) },
        { id: "ci-p1-l4", palier: "p1", icone: "👂", titre: "J'entends u et é", objectif: "Repérer un son de voyelle dans un mot", questions: entendre(["u", "é"]) },
        { id: "ci-p1-l5", palier: "p1", icone: "l", titre: "La lettre l : la, li, lo", objectif: "Lire les syllabes avec l", questions: syllabes("l", []) },
        { id: "ci-p1-l6", palier: "p1", icone: "m", titre: "La lettre m : ma, mi, mo", objectif: "Lire les syllabes avec m", questions: syllabes("m", ["l"]) },
        { id: "ci-p1-l7", palier: "p1", icone: "📝", titre: "Je lis mes premiers mots", objectif: "Lire des mots avec l, m et les voyelles", questions: lireMots() },
      ] },
      { id: "compter", titre: "Compter", icone: "🔢", couleur: "#bfe3c9", lecons: [
        { id: "ci-p1-c1", palier: "p1", icone: "🥭", titre: "Je compte jusqu'à 5", objectif: "Dénombrer une collection de 1 à 5", questions: compter(1, 5) },
        { id: "ci-p1-c2", palier: "p1", icone: "5", titre: "Les nombres de 1 à 5", objectif: "Associer le nombre et la quantité", questions: nombres1a5() },
        { id: "ci-p1-c3", palier: "p1", icone: "⚖️", titre: "Plus, moins, autant", objectif: "Comparer deux collections", questions: plusMoins() },
        { id: "ci-p1-c4", palier: "p1", icone: "🐟", titre: "Je compte jusqu'à 9", objectif: "Dénombrer une collection de 6 à 9", questions: compter(6, 9) },
        { id: "ci-p1-c5", palier: "p1", icone: "🔺", titre: "Les formes", objectif: "Reconnaître rond, carré, triangle, rectangle", questions: formes() },
        { id: "ci-p1-c6", palier: "p1", icone: "🐘", titre: "Grand et petit", objectif: "Comparer des tailles", questions: grandPetit() },
      ] },
      { id: "decouvrir", titre: "Découvrir", icone: "🌍", couleur: "#bcdcf5", lecons: [
        { id: "ci-p1-d1", palier: "p1", icone: "🧍🏾", titre: "Mon corps", objectif: "Nommer les parties du corps", questions: imagier(CORPS, "Touche") },
        { id: "ci-p1-d2", palier: "p1", icone: "👀", titre: "Mes cinq sens", objectif: "Associer chaque sens à un organe", questions: sens() },
        { id: "ci-p1-d3", palier: "p1", icone: "🧼", titre: "Je suis propre", objectif: "Connaître les gestes d'hygiène", questions: hygiene() },
        { id: "ci-p1-d4", palier: "p1", icone: "🎒", titre: "Ma classe", objectif: "Nommer le matériel de l'école", questions: imagier(ECOLE, "Touche") },
        { id: "ci-p1-d5", palier: "p1", icone: "👨‍👩‍👧", titre: "Ma famille", objectif: "Nommer les membres de la famille", questions: imagier(FAMILLE, "Touche") },
      ] },
    ],
  };
})();

window.TOUS_CONTENUS["ci"] = window.CONTENU; window.CONTENU = garde; })();
(function () { const garde = window.CONTENU;
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
    avatars: ["🦋", "👧🏾", "👸🏾", "🧚🏾‍♀️", "👩🏾‍⚕️", "👩🏾‍🍳", "🦄", "🐱"],
    lectureAuto: true,
    motsDuJour: [
      ["le soleil", "☀️", "Le soleil brille dans le ciel."], ["la lune", "🌙", "La lune brille la nuit."], ["le mouton", "🐑", "Le mouton dit bêê."], ["la mangue", "🥭", "La mangue est sucrée."],
      ["le poisson", "🐟", "Le poisson nage dans la mer."], ["la pluie", "🌧️", "La pluie mouille la terre."], ["l'arbre", "🌳", "L'arbre a des feuilles vertes."], ["le bateau", "⛵", "Le bateau flotte sur l'eau."],
      ["la maison", "🏠", "J'habite dans une maison."], ["le chat", "🐈", "Le chat boit du lait."], ["la fleur", "🌸", "La fleur sent bon."], ["le pain", "🥖", "Le matin, je mange du pain."],
      ["le riz", "🍚", "Maman cuisine le riz."], ["la main", "✋", "J'ai cinq doigts à chaque main."], ["l'étoile", "⭐", "Les étoiles brillent la nuit."], ["le lait", "🥛", "Le lait est blanc."],
      ["la tortue", "🐢", "La tortue marche doucement."], ["le cheval", "🐎", "Le cheval court vite."], ["la robe", "👗", "Ma robe est jolie."], ["la docteure", "👩🏾‍⚕️", "La docteure soigne les malades."],
      ["la cuillère", "🥄", "Je mange avec une cuillère."], ["le marché", "🧺", "On achète des légumes au marché."], ["l'oignon", "🧅", "L'oignon pique les yeux."], ["la tomate", "🍅", "La tomate est rouge."],
      ["le livre", "📕", "J'ouvre mon livre."], ["le crayon", "✏️", "J'écris avec un crayon."], ["l'école", "🏫", "Je vais à l'école le matin."], ["le ballon", "⚽", "Le ballon est rond."],
      ["l'oiseau", "🐦", "L'oiseau chante dans l'arbre."], ["la chaussure", "👟", "Je mets mes chaussures."], ["le vent", "🌬️", "Le vent souffle fort."], ["la banane", "🍌", "La banane est jaune."],
      ["le bébé", "👶🏾", "Le bébé dort."], ["la voiture", "🚗", "La voiture roule sur la route."], ["le lion", "🦁", "Le lion est le roi de la savane."], ["la plage", "🏖️", "On joue sur la plage."],
      ["le cœur", "❤️", "Je t'aime de tout mon cœur."], ["la brosse à dents", "🪥", "Je me brosse les dents."], ["le savon", "🧼", "Je me lave les mains avec du savon."], ["le bissap", "🍹", "Le bissap est rouge et frais."],
    ],
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

window.TOUS_CONTENUS["gs"] = window.CONTENU; window.CONTENU = garde; })();
(function () { const garde = window.CONTENU;
/* Contenu de l'appli CE2. Programme sénégalais (CEB, étape 2), palier 1 : début d'année. */
(function () {
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const entre = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const fmt = n => n.toLocaleString("fr-FR");
  function q(consigne, scene, bonne, autres, extra) {
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  }
  const phrase = t => ({ k: "phrase", t, dire: t });
  const mot = t => ({ k: "mots", t: String(t), dire: String(t) });
  const unique = (bon, faux) => Array.from(new Set(faux.map(String))).filter(x => x !== String(bon));

  // Nombres en lettres (orthographe traditionnelle)
  const U = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  const D = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };
  function cent(n) {
    if (n < 17) return U[n];
    if (n < 20) return "dix-" + U[n - 10];
    if (n < 70) { const d = Math.floor(n / 10), u = n % 10; return D[d] + (u === 0 ? "" : u === 1 ? " et un" : "-" + U[u]); }
    if (n < 80) return n === 71 ? "soixante et onze" : "soixante-" + cent(n - 60);
    return n === 80 ? "quatre-vingts" : "quatre-vingt-" + cent(n - 80);
  }
  function mille(n) {
    const c = Math.floor(n / 100), r = n % 100;
    if (!c) return cent(r);
    const tete = c === 1 ? "cent" : U[c] + " cent" + (r === 0 ? "s" : "");
    return r ? tete + " " + cent(r) : tete;
  }
  function enLettres(n) {
    if (n === 0) return "zéro";
    const m = Math.floor(n / 1000), r = n % 1000;
    const tete = !m ? "" : m === 1 ? "mille" : U[m] + " mille";
    return r ? (tete ? tete + " " : "") + mille(r) : tete;
  }

  // ---------- FRANÇAIS ----------
  const PHRASES = [
    ["Awa mange une mangue juteuse.", "mange", "mangue"],
    ["Le pêcheur répare sa pirogue.", "répare", "pirogue"],
    ["Les enfants jouent dans la cour.", "jouent", "cour"],
    ["Moussa lit un livre de contes.", "lit", "livre"],
    ["La maîtresse écrit au tableau.", "écrit", "tableau"],
    ["Mon père vend du poisson au marché.", "vend", "poisson"],
    ["Fatou porte un seau d'eau.", "porte", "seau"],
    ["Les élèves chantent l'hymne national.", "chantent", "élèves"],
    ["Grand-mère prépare le thiéboudienne.", "prépare", "grand-mère"],
    ["Le berger conduit ses moutons au puits.", "conduit", "berger"],
    ["Le vent souffle sur la plage.", "souffle", "plage"],
    ["Neymar dribble le défenseur.", "dribble", "défenseur"],
    ["Le gardien arrête le penalty.", "arrête", "gardien"],
    ["Seydina marque un but magnifique.", "marque", "but"],
    ["L'ailier centre vers l'attaquant.", "centre", "attaquant"],
    ["Les supporters chantent dans le stade.", "chantent", "stade"],
    ["L'entraîneur explique la tactique.", "explique", "entraîneur"],
  ];
  function nomVerbe() {
    return () => tirer(PHRASES, 8).map(([p, v, n], i) => {
      const mots = p.replace(/[.,]/g, "").split(" ").filter(m => m.length > 2 && m !== v && m !== n);
      return i % 2 === 0
        ? q("Quel mot est le verbe ?", phrase(p), mot(v), tirer(mots, 2).concat([n]).map(mot), { disposition: "ligne" })
        : q("Quel mot est un nom ?", phrase(p), mot(n), tirer(mots.filter(m => !/^(un|une|le|la|les|du|des|sa|ses|au|dans|sur|mon|de)$/i.test(m)), 1).concat([v]).map(mot), { disposition: "ligne" });
    });
  }

  const GENRE = [["baobab", "le"], ["pirogue", "la"], ["marché", "le"], ["calebasse", "la"], ["tam-tam", "le"], ["case", "la"], ["puits", "le"], ["natte", "la"], ["soleil", "le"], ["plage", "la"], ["mouton", "le"], ["route", "la"], ["arbre", "l'"], ["école", "l'"], ["fleuve", "le"], ["boutique", "la"]];
  function genre() {
    return () => tirer(GENRE, 8).map(([m, art]) => q("Quel déterminant va avec ce nom ?", { k: "mots", t: "… " + m }, mot(art), ["le", "la", "l'"].filter(x => x !== art).map(mot), { disposition: "trois" }));
  }

  const PLURIELS = [["un cheval", "des chevaux", ["des chevals", "des chevaus"]], ["un journal", "des journaux", ["des journals", "des journauxs"]], ["un oiseau", "des oiseaux", ["des oiseaus", "des oiseau"]], ["un bateau", "des bateaux", ["des bateaus", "des bateau"]],
    ["un jeu", "des jeux", ["des jeus", "des jeu"]], ["un animal", "des animaux", ["des animals", "des animale"]], ["une mangue", "des mangues", ["des mangue", "des manguex"]], ["un enfant", "des enfants", ["des enfant", "des enfantx"]],
    ["un tableau", "des tableaux", ["des tableaus", "des tableau"]], ["un hôpital", "des hôpitaux", ["des hôpitals", "des hôpitale"]], ["un caillou", "des cailloux", ["des caillous", "des caillou"]], ["une ville", "des villes", ["des ville", "des villex"]]];
  function pluriel() {
    return () => tirer(PLURIELS, 8).map(([s, p, f]) => q("Écris au pluriel", { k: "mots", t: s }, mot(p), f.map(mot), { disposition: "ligne" }));
  }

  const PRONOMS = ["je", "tu", "il", "nous", "vous", "ils"];
  const ETRE = ["suis", "es", "est", "sommes", "êtes", "sont"], AVOIR = ["ai", "as", "a", "avons", "avez", "ont"];
  function etreAvoir() {
    return () => fois(8, i => {
      const t = i % 2 ? AVOIR : ETRE, nom = i % 2 ? "avoir" : "être";
      const k = entre(0, 5);
      const sujet = k === 0 && t === AVOIR ? "j'" : PRONOMS[k] + " ";
      return q("Conjugue le verbe " + nom + " au présent", { k: "phrase", t: sujet + "…" }, mot(t[k]), tirer(t.filter((x, j) => j !== k), 2).map(mot), { disposition: "trois" });
    });
  }
  const VERBES_ER = ["chanter", "jouer", "danser", "parler", "porter", "regarder", "laver", "marcher"];
  function verbesEr() {
    const fin = ["e", "es", "e", "ons", "ez", "ent"];
    return () => fois(8, () => {
      const v = hasard(VERBES_ER), rad = v.slice(0, -2), k = entre(0, 5);
      const formes = fin.map(f => rad + f);
      const sujet = PRONOMS[k];
      const faux = unique(formes[k], [rad + "er", rad + "é"].concat(formes)).slice(0, 2);
      return q("Conjugue « " + v + " » au présent", { k: "phrase", t: (sujet === "je" && /^[aeiouh]/.test(v) ? "j'" : sujet + " ") + "…" }, mot(formes[k]), faux.map(mot), { disposition: "trois" });
    });
  }

  const HOMO = [
    ["Awa … un cahier neuf.", "a", "à"], ["Je vais … l'école.", "à", "a"], ["Il … faim ce matin.", "a", "à"], ["Nous allons … Thiès.", "à", "a"],
    ["Mamadou … sa sœur jouent.", "et", "est"], ["Le ciel … bleu.", "est", "et"], ["Il … grand … fort.", "est … et", "et … est"], ["Le marché … plein de monde.", "est", "et"],
    ["Elle … une robe … fleurs.", "a … à", "à … a"], ["Le pain … chaud.", "est", "et"],
    ["Neymar … marqué un but.", "a", "à"], ["Il passe le ballon … son coéquipier.", "à", "a"], ["Le gardien … grand … rapide.", "est … et", "et … est"], ["Le match … fini.", "est", "et"],
  ];
  function homophones() {
    return () => tirer(HOMO, 8).map(([p, b, f]) => q("Complète avec le bon mot", phrase(p), mot(b), [mot(f)], { disposition: "" }));
  }

  const TEXTES = [
    { texte: "Samedi, Awa accompagne sa grand-mère au marché de Tilène. Elles achètent trois kilos de riz, des oignons et du poisson frais. Sur le chemin du retour, il commence à pleuvoir. Elles s'abritent sous un grand baobab jusqu'à la fin de la pluie.",
      questions: [["Où vont Awa et sa grand-mère ?", "au marché", ["à l'école", "à la plage"]], ["Combien de kilos de riz achètent-elles ?", "trois", ["deux", "cinq"]], ["Que se passe-t-il sur le chemin ?", "il pleut", ["il fait nuit", "elles se perdent"]], ["Où s'abritent-elles ?", "sous un baobab", ["dans une boutique", "dans un car"]]] },
    { texte: "Chaque mercredi, Seydina s'entraîne à l'école de foot de son quartier. Son entraîneur lui apprend à faire des passes courtes, comme au Barça. « Le ballon court plus vite que le joueur », répète-t-il. Samedi, l'équipe a gagné trois buts à un. Seydina, ailier gauche, a marqué le dernier but après un beau dribble.",
      questions: [["Quand Seydina s'entraîne-t-il ?", "le mercredi", ["le dimanche", "le lundi"]], ["Quel style de passes apprend-il ?", "des passes courtes", ["des longs ballons", "des passes en retrait"]], ["Quel est le score du match ?", "trois buts à un", ["un but à zéro", "deux buts partout"]], ["À quel poste joue Seydina ?", "ailier gauche", ["gardien", "défenseur central"]], ["Que veut dire l'entraîneur avec sa phrase ?", "il faut faire circuler le ballon", ["il faut courir sans le ballon", "il faut tirer de loin"]]] },
    { texte: "Ibou habite à Joal, au bord de la mer. Chaque matin, il regarde les pirogues partir à la pêche. Son oncle est pêcheur. Le soir, Ibou l'aide à décharger les poissons et à ranger les filets. Plus tard, il veut devenir capitaine de bateau.",
      questions: [["Où habite Ibou ?", "à Joal", ["à Dakar", "à Kédougou"]], ["Quel est le métier de son oncle ?", "pêcheur", ["boulanger", "maçon"]], ["Que fait Ibou le soir ?", "il aide son oncle", ["il dort", "il va à la plage"]], ["Que veut-il devenir ?", "capitaine de bateau", ["médecin", "pêcheur"]]] },
  ];
  function lecture() {
    return () => melange(TEXTES).flatMap(t => t.questions.map(([qq, b, f]) => q(qq, { k: "texte", t: t.texte }, phrase(b), f.map(phrase), { disposition: "ligne" })));
  }

  // ---------- MATHÉMATIQUES ----------
  function lireNombres() {
    return () => fois(8, i => {
      const n = entre(1001, 9999);
      const voisins = unique(n, [n + 100, n - 10, Number(String(n).split("").reverse().join("")), Math.floor(n / 1000) * 1000 + (n % 100), n + 1000 > 9999 ? n - 1000 : n + 1000]);
      return i % 2
        ? q("Écris ce nombre en chiffres", { k: "phrase", t: enLettres(n) }, mot(fmt(n)), tirer(voisins.filter(x => +x > 0 && +x < 10000).map(x => fmt(+x)), 2).map(mot), { disposition: "ligne" })
        : q("Comment se lit ce nombre ?", { k: "mots", t: fmt(n) }, phrase(enLettres(n)), tirer(voisins.filter(x => +x > 999 && +x < 10000), 2).map(x => phrase(enLettres(+x))), { disposition: "ligne" });
    });
  }
  function rangs() {
    const RANGS = ["milliers", "centaines", "dizaines", "unités"];
    return () => fois(8, () => {
      const chiffres = tirer([1, 2, 3, 4, 5, 6, 7, 8, 9], 4);
      const n = Number(chiffres.join("")), r = entre(0, 3);
      return q("Quel est le chiffre des " + RANGS[r] + " ?", { k: "mots", t: fmt(n) }, mot(chiffres[r]), chiffres.filter((c, j) => j !== r).map(mot), {});
    });
  }
  function comparer() {
    return () => fois(8, i => {
      if (i % 2) {
        const a = entre(1000, 9999);
        const b = hasard([a, a + entre(1, 9) * hasard([1, 10, 100]), a - entre(1, 9) * hasard([1, 10, 100])]);
        const s = a < b ? "<" : a > b ? ">" : "=";
        return q("Quel signe faut-il mettre ?", { k: "mots", t: fmt(a) + "  …  " + fmt(b) }, mot(s), ["<", ">", "="].filter(x => x !== s).map(mot), { disposition: "trois" });
      }
      const base = entre(1000, 9000);
      const nombres = unique(-1, [base, base + entre(1, 9) * 10, base + entre(1, 9) * 100, base - entre(1, 9)]).map(Number).slice(0, 3);
      const max = Math.max(...nombres);
      return q("Quel est le plus grand nombre ?", null, mot(fmt(max)), nombres.filter(x => x !== max).map(x => mot(fmt(x))), { disposition: "trois" });
    });
  }
  function operations() {
    return () => fois(8, i => {
      const plus = i % 2 === 0;
      const a = entre(1200, 6000), b = entre(150, plus ? 3500 : a - 100);
      const r = plus ? a + b : a - b;
      const faux = unique(r, [r + 10, r - 100, r + 100, r - 10, plus ? r - 1000 : r + 1000]).filter(x => +x > 0);
      return q("Calcule", { k: "mots", t: fmt(a) + (plus ? " + " : " − ") + fmt(b) + " =" }, mot(fmt(r)), tirer(faux, 2).map(x => mot(fmt(+x))), { disposition: "trois" });
    });
  }
  function tables(de, a) {
    return () => fois(8, () => {
      const t = entre(de, a), n = entre(2, 10), r = t * n;
      const faux = unique(r, [r + t, r - t, r + 1, (t + 1) * n, r - 2]).filter(x => +x > 0);
      return q("Combien font…", { k: "mots", t: t + " × " + n }, mot(r), tirer(faux, 2).map(mot), { disposition: "trois", dire: t + " fois " + n + " ?" });
    });
  }
  function problemes() {
    const P = [
      () => { const n = entre(3, 8), p = hasard([100, 125, 150, 200, 250]); return ["Awa achète " + n + " mangues à " + p + " F l'une. Combien paie-t-elle ?", n * p, [n * p + p, n * p - p, n + p]]; },
      () => { const s = hasard([500, 1000, 2000]), p = entre(2, 9) * 25; return ["Moussa a " + fmt(s) + " F. Il achète un pain à " + p + " F. Combien lui reste-t-il ?", s - p, [s + p, s - p + 100, s - p - 50]]; },
      () => { const c = entre(3, 6), n = entre(18, 45); return ["Un car rapide transporte " + n + " passagers. Combien de passagers dans " + c + " cars ?", c * n, [c * n + n, c + n, c * n - 10]]; },
      () => { const t = entre(45, 70), f = entre(20, t - 15); return ["Dans une classe de " + t + " élèves, il y a " + f + " filles. Combien y a-t-il de garçons ?", t - f, [t + f, t - f + 10, t - f - 1]]; },
      () => { const s = entre(4, 9), k = hasard([25, 50]); return ["Un sac de riz pèse " + k + " kg. Combien pèsent " + s + " sacs ?", s * k, [s * k + k, s + k, s * k - 10]]; },
      () => { const t = entre(1200, 4800), v = entre(800, 3900); return ["Pour le match, " + fmt(t) + " supporters sont dans la tribune nord et " + fmt(v) + " dans la tribune sud. Combien sont-ils en tout ?", t + v, [t + v + 100, t - v, t + v - 1000]]; },
      () => { const m = entre(3, 9), b = entre(2, 4); return ["Neymar marque " + b + " buts par mois. Combien de buts marque-t-il en " + m + " mois ?", b * m, [b * m + b, b + m, b * m - 1]]; },
      () => { const p = entre(6, 9), n = entre(4, 9); return ["Un ballon coûte " + p + " 000 F. L'école de foot en achète " + n + ". Combien paie-t-elle ?", p * 1000 * n, [p * 1000 * n + 1000, p * 1000 + n, p * 100 * n]]; },
      () => { const a = entre(1200, 3000), b = entre(900, 2500); return ["Le matin, la boutique gagne " + fmt(a) + " F et l'après-midi " + fmt(b) + " F. Combien gagne-t-elle dans la journée ?", a + b, [a + b + 100, a - b, a + b - 1000]]; },
    ];
    return () => melange(P).concat(tirer(P, 2)).map(f => { const [enonce, r, faux] = f(); return q("Résous le problème", { k: "texte", t: enonce }, mot(fmt(r)), tirer(unique(r, faux).filter(x => +x > 0), 2).map(x => mot(fmt(+x))), { disposition: "trois" }); });
  }
  function mesures() {
    const M = [
      ["1 m = … cm", "100", ["10", "1 000"]], ["1 km = … m", "1 000", ["100", "10"]], ["1 kg = … g", "1 000", ["100", "10"]], ["1 heure = … minutes", "60", ["100", "30"]],
      ["2 m 30 cm = … cm", "230", ["2 030", "23"]], ["300 cm = … m", "3", ["30", "300"]], ["1 jour = … heures", "24", ["12", "60"]], ["1 L = … cL", "100", ["10", "1 000"]],
      ["Pour mesurer la longueur de la cour, j'utilise le…", "mètre", ["kilogramme", "litre"]], ["Pour peser du riz, j'utilise le…", "kilogramme", ["mètre", "litre"]], ["Pour mesurer l'eau d'un seau, j'utilise le…", "litre", ["mètre", "gramme"]],
    ];
    return () => tirer(M, 8).map(([e, b, f]) => q("Complète", { k: "phrase", t: e }, mot(b), f.map(mot), { disposition: "trois" }));
  }

  // ---------- DÉCOUVRIR (ESVS) ----------
  function quiz(liste) {
    return () => tirer(liste, Math.min(8, liste.length)).map(([qq, b, f]) => q(qq, null, phrase(b), f.map(phrase), { disposition: "ligne" }));
  }
  const SENEGAL = [
    ["Quelle est la capitale du Sénégal ?", "Dakar", ["Thiès", "Saint-Louis"]],
    ["Quel océan borde le Sénégal ?", "l'océan Atlantique", ["l'océan Indien", "la mer Rouge"]],
    ["Quel pays est au nord du Sénégal ?", "la Mauritanie", ["la Guinée", "la Gambie"]],
    ["Quel pays est à l'est du Sénégal ?", "le Mali", ["la Mauritanie", "le Maroc"]],
    ["Quel pays est presque entouré par le Sénégal ?", "la Gambie", ["le Mali", "la Guinée-Bissau"]],
    ["Quels pays sont au sud du Sénégal ?", "la Guinée et la Guinée-Bissau", ["le Mali et la Mauritanie", "la Gambie et le Mali"]],
    ["Quel fleuve a donné son nom au pays ?", "le fleuve Sénégal", ["le fleuve Gambie", "la Casamance"]],
    ["Combien le Sénégal compte-t-il de régions ?", "14", ["10", "20"]],
    ["Laquelle est une région du Sénégal ?", "Kaolack", ["Bamako", "Banjul"]],
    ["Dans quelle région se trouve Ziguinchor ?", "au sud, en Casamance", ["au nord, près du fleuve", "à l'est, près du Mali"]],
  ];
  const SYMBOLES = [
    ["Quelles sont les couleurs du drapeau du Sénégal ?", "vert, jaune, rouge", ["bleu, blanc, rouge", "vert, blanc, orange"]],
    ["Qu'y a-t-il au milieu du drapeau ?", "une étoile verte", ["un lion", "un baobab"]],
    ["Quelle est la devise du Sénégal ?", "Un Peuple, Un But, Une Foi", ["Liberté, Égalité, Fraternité", "Unité, Travail, Progrès"]],
    ["Quand le Sénégal est-il devenu indépendant ?", "le 4 avril 1960", ["le 1er janvier 1960", "le 4 avril 1980"]],
    ["Quel animal est le symbole du Sénégal ?", "le lion", ["l'éléphant", "l'aigle"]],
    ["Quel arbre est un symbole du Sénégal ?", "le baobab", ["le cocotier", "le manguier"]],
    ["Comment commence l'hymne national ?", "Pincez tous vos koras…", ["Allons enfants…", "Debout, frères…"]],
    ["Quel jour fête-t-on l'indépendance ?", "le 4 avril", ["le 1er mai", "le 25 décembre"]],
  ];
  const EAU = [
    ["Quand l'eau gèle, elle devient…", "de la glace", ["de la vapeur", "du sable"]],
    ["Quand l'eau bout, elle se transforme en…", "vapeur", ["glace", "sel"]],
    ["La glace est de l'eau à l'état…", "solide", ["liquide", "gazeux"]],
    ["L'eau du robinet est à l'état…", "liquide", ["solide", "gazeux"]],
    ["Une eau qu'on peut boire sans danger est une eau…", "potable", ["salée", "boueuse"]],
    ["L'eau de la mer est…", "salée", ["sucrée", "potable"]],
    ["Les nuages sont formés de…", "petites gouttes d'eau", ["fumée", "poussière"]],
    ["Pour rendre l'eau du puits plus sûre, on peut…", "la faire bouillir", ["la mettre au soleil", "y ajouter du sable"]],
  ];
  const SANTE = [
    ["Quel insecte transmet le paludisme ?", "le moustique", ["la mouche", "la fourmi"]],
    ["Pour se protéger du paludisme la nuit, on dort sous…", "une moustiquaire", ["une natte", "un drap"]],
    ["Les moustiques pondent dans…", "les eaux stagnantes", ["le sable sec", "les arbres"]],
    ["Pour éviter les maladies, avant de manger on…", "se lave les mains au savon", ["boit du thé", "court"]],
    ["Le vaccin sert à…", "protéger contre les maladies", ["faire grandir", "soigner les dents"]],
    ["Pour avoir des dents saines, on…", "se brosse les dents chaque jour", ["mange beaucoup de bonbons", "boit du soda"]],
    ["Lequel est un aliment de construction (qui fait grandir) ?", "le poisson", ["le sucre", "l'huile"]],
    ["Lequel donne de l'énergie ?", "le riz", ["l'eau", "le sel"]],
  ];
  const PLANTES = [
    ["De quoi une plante a-t-elle besoin pour vivre ?", "d'eau, de lumière et d'air", ["de sable seulement", "de sel"]],
    ["Quelle partie de la plante est dans la terre ?", "la racine", ["la feuille", "la fleur"]],
    ["Quelle partie donne les graines ?", "le fruit", ["la tige", "la racine"]],
    ["Comment s'appelle le fruit du baobab ?", "le pain de singe", ["la mangue", "le bissap"]],
    ["L'arachide pousse…", "sous la terre", ["en haut d'un arbre", "dans l'eau"]],
    ["Quand pousse le mil au Sénégal ?", "pendant l'hivernage", ["en saison sèche", "jamais"]],
    ["Que fait la tige ?", "elle porte les feuilles et transporte la sève", ["elle mange les insectes", "elle produit de l'eau"]],
    ["Planter des arbres permet de…", "lutter contre l'avancée du désert", ["faire plus de bruit", "salir l'eau"]],
  ];

  // ---------- FOOT ----------
  const POSTES = [
    ["Quel joueur a le droit de prendre le ballon avec les mains ?", "le gardien", ["l'ailier", "le milieu"]],
    ["Quel joueur court sur le côté gauche pour attaquer, comme Neymar au Barça ?", "l'ailier gauche", ["le défenseur central", "le gardien"]],
    ["Qui joue au milieu de la défense, devant le gardien ?", "le défenseur central", ["l'avant-centre", "l'ailier droit"]],
    ["Le latéral gauche joue…", "en défense, sur le côté gauche", ["dans les buts", "en attaque au centre"]],
    ["Qui organise le jeu et distribue les passes au milieu du terrain ?", "le milieu de terrain", ["le gardien", "l'arbitre"]],
    ["L'avant-centre a surtout pour mission de…", "marquer des buts", ["arrêter les tirs", "siffler les fautes"]],
    ["Combien de joueurs a une équipe sur le terrain ?", "11", ["10", "12"]],
    ["Qui fait respecter les règles pendant le match ?", "l'arbitre", ["l'entraîneur", "le capitaine"]],
  ];
  const REGLES = [
    ["Combien dure un match de football ?", "90 minutes (2 × 45)", ["60 minutes", "100 minutes"]],
    ["Que montre l'arbitre pour une faute très grave ?", "un carton rouge", ["un carton vert", "un carton bleu"]],
    ["Deux cartons jaunes dans le même match, ça donne…", "un carton rouge", ["un penalty", "un corner"]],
    ["Le ballon sort derrière ta ligne de but, touché en dernier par un défenseur : c'est…", "un corner", ["une touche", "un penalty"]],
    ["Une faute dans la surface de réparation donne…", "un penalty", ["une touche", "un corner"]],
    ["Pour remettre le ballon en jeu après une sortie sur le côté, on fait…", "une touche avec les mains", ["un coup de pied", "un corner"]],
    ["Un attaquant plus près du but que l'avant-dernier défenseur au moment de la passe est…", "hors-jeu", ["en forme", "remplaçant"]],
    ["À quelle distance du but tire-t-on un penalty ?", "11 mètres", ["5 mètres", "30 mètres"]],
  ];
  const SCHEMAS = [
    ["Dans un 4-3-3, combien y a-t-il de défenseurs ?", "4", ["3", "5"]],
    ["Dans un 4-3-3, combien y a-t-il d'attaquants ?", "3", ["4", "2"]],
    ["4 + 3 + 3 = 10 joueurs de champ. Avec le gardien, ça fait…", "11 joueurs", ["10 joueurs", "12 joueurs"]],
    ["Dans un 4-4-2, combien de milieux ?", "4", ["2", "3"]],
    ["Dans le 4-3-3 du Barça, où joue l'ailier gauche ?", "devant, côté gauche", ["derrière, au centre", "dans les buts"]],
    ["Un 3-5-2 compte combien de joueurs de champ ?", "10", ["11", "9"]],
    ["Le terrain mesure 100 m de long. La moitié, c'est…", "50 m", ["25 m", "100 m"]],
    ["Un match commence à 16 h 00 et dure 1 h 45 avec la mi-temps. Il finit à…", "17 h 45", ["17 h 15", "18 h 00"]],
  ];
  const BARCA = [
    ["Le style du Barça repose surtout sur…", "la possession du ballon", ["les longs ballons", "la défense à 11"]],
    ["Pour garder le ballon, les joueurs du Barça font surtout…", "des passes courtes", ["des tirs de loin", "des dégagements"]],
    ["Que fait l'équipe juste après avoir perdu le ballon ?", "elle presse tout de suite pour le récupérer", ["elle recule tout au fond", "elle s'arrête"]],
    ["Trois joueurs proches qui se font des passes forment…", "un triangle", ["un carré", "une ligne droite"]],
    ["Comment s'appelle le centre de formation du Barça ?", "la Masia", ["le Camp Nou", "la Liga"]],
    ["Comment s'appelle le grand stade du Barça ?", "le Camp Nou", ["le Bernabéu", "le Parc des Princes"]],
    ["« Tiki-taka » veut dire un jeu fait de…", "passes rapides et courtes", ["dribbles seuls", "têtes"]],
    ["Pour bien recevoir une passe, il faut…", "regarder autour de soi avant", ["fermer les yeux", "rester immobile"]],
  ];
  const STARS = [
    ["De quel pays est Neymar ?", "le Brésil", ["l'Argentine", "le Portugal"]],
    ["À quel poste Neymar jouait-il au Barça ?", "ailier gauche", ["gardien", "défenseur central"]],
    ["Avec qui Neymar formait-il le trio « MSN » au Barça ?", "Messi et Suárez", ["Mané et Salah", "Xavi et Iniesta"]],
    ["Quel numéro Neymar portait-il au Barça ?", "le 11", ["le 1", "le 4"]],
    ["Comment surnomme-t-on l'équipe du Sénégal ?", "les Lions de la Teranga", ["les Éléphants", "les Aigles"]],
    ["Quelle Coupe d'Afrique le Sénégal a-t-il gagnée pour la première fois ?", "la CAN 2021", ["la CAN 2002", "la CAN 1990"]],
    ["Quel joueur sénégalais a marqué le tir au but de la victoire en finale de la CAN 2021 ?", "Sadio Mané", ["El Hadji Diouf", "Kalidou Koulibaly"]],
    ["Dans quel village est né Sadio Mané ?", "Bambali", ["Joal", "Podor"]],
  ];

  // Placement sur le terrain (4-3-3) : mini-terrain dessiné avec un joueur en surbrillance.
  const PLACES = [["le gardien", 50, 92], ["le latéral gauche", 14, 70], ["le défenseur central", 38, 75], ["le latéral droit", 86, 70], ["le milieu défensif", 50, 58], ["le milieu gauche", 26, 45], ["le milieu droit", 74, 45], ["l'ailier gauche", 16, 20], ["l'avant-centre", 50, 13], ["l'ailier droit", 84, 20]];
  function terrain(x, y, petit) {
    const w = petit ? 70 : 120, h = petit ? 92 : 156;
    return { k: "html", html: '<svg viewBox="0 0 100 130" width="' + w + '" height="' + h + '" aria-hidden="true"><rect x="1" y="1" width="98" height="128" rx="6" fill="#4caf50" stroke="#fff" stroke-width="2"/><line x1="1" y1="65" x2="99" y2="65" stroke="#fff" stroke-width="1.5"/><circle cx="50" cy="65" r="12" fill="none" stroke="#fff" stroke-width="1.5"/><rect x="30" y="1" width="40" height="16" fill="none" stroke="#fff" stroke-width="1.5"/><rect x="30" y="113" width="40" height="16" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="' + x + '" cy="' + (y * 1.3) + '" r="8" fill="#a50044" stroke="#fff" stroke-width="2.5"/></svg>' };
  }
  function placement() {
    return () => fois(8, i => {
      const [nom, x, y] = PLACES[(i * 3 + entre(0, 9)) % PLACES.length];
      const autres = tirer(PLACES.filter(p => p[0] !== nom), 2);
      return i % 2
        ? q("Où joue " + nom + " ? (on attaque vers le haut)", null, Object.assign(terrain(x, y, true), { dire: nom }), autres.map(([n2, x2, y2]) => Object.assign(terrain(x2, y2, true), { dire: n2 })), { disposition: "trois" })
        : q("Quel est ce poste ?", terrain(x, y, false), phrase(nom), autres.map(a => phrase(a[0])), { disposition: "ligne" });
    });
  }

  window.CONTENU = {
    id: "ce2",
    titreAppli: "Mon école CE2 · Foot",
    version: "Palier 1",
    prenom: "Seydina",
    classe: "CE2",
    avatar: "🧒🏾",
    avatars: ["🧒🏾", "⚽", "🦸🏾‍♂️", "🧑🏾‍🚀", "🦅", "🐐", "🏃🏾‍♂️", "🥷🏾"],
    motsDuJour: [
      ["la tactique", "📋", "La tactique, c'est le plan de jeu de l'équipe."], ["le dribble", "⚽", "Il fait un dribble pour passer le défenseur."], ["l'effort", "💪🏾", "Sans effort, on ne progresse pas."], ["la patience", "⏳", "La patience aide à réussir."],
      ["le respect", "🤝", "Le respect de l'arbitre est important."], ["la victoire", "🏆", "L'équipe fête sa victoire."], ["le courage", "🦁", "Il faut du courage pour tirer un penalty."], ["l'entraînement", "🏃🏾", "L'entraînement rend plus fort."],
      ["le coéquipier", "👬🏾", "Je fais une passe à mon coéquipier."], ["la défense", "🛡️", "La défense protège le but."], ["l'attaquant", "🎯", "L'attaquant marque des buts."], ["le capitaine", "©️", "Le capitaine encourage son équipe."],
      ["la concentration", "🧠", "La concentration aide à bien répondre."], ["le supporter", "📣", "Le supporter chante pour son équipe."], ["le continent", "🌍", "Le Sénégal est sur le continent africain."], ["la capitale", "🏙️", "Dakar est la capitale du Sénégal."],
      ["le fleuve", "🏞️", "Le fleuve Sénégal coule vers l'océan."], ["l'océan", "🌊", "L'océan Atlantique borde Dakar."], ["le désert", "🏜️", "Il fait très chaud dans le désert."], ["la récolte", "🌾", "La récolte d'arachide arrive en octobre."],
      ["le climat", "🌦️", "Au Sénégal, le climat est chaud."], ["l'hivernage", "🌧️", "Pendant l'hivernage, il pleut beaucoup."], ["la boussole", "🧭", "La boussole indique le nord."], ["le kilomètre", "📏", "Le stade est à deux kilomètres."],
      ["la seconde", "⏱️", "Le sprinteur court en quelques secondes."], ["le double", "✖️", "Le double de 6, c'est 12."], ["la moitié", "➗", "La moitié de 10, c'est 5."], ["le verbe", "🔤", "Le verbe dit ce que l'on fait."],
      ["le sujet", "👤", "Le sujet fait l'action."], ["la phrase", "📝", "Une phrase commence par une majuscule."], ["le dictionnaire", "📚", "Je cherche le mot dans le dictionnaire."], ["l'histoire", "📜", "L'histoire raconte le passé."],
      ["l'énergie", "⚡", "Le soleil nous donne de l'énergie."], ["la santé", "🍎", "Bien manger, c'est bon pour la santé."], ["le muscle", "🦵🏾", "Les muscles font bouger le corps."], ["l'arbitre", "🧑🏾‍⚖️", "L'arbitre siffle une faute."],
      ["le penalty", "🥅", "Il tire le penalty en pleine lucarne."], ["le pressing", "🏃🏾‍♂️", "Le pressing sert à récupérer vite le ballon."], ["la passe", "👟", "Une bonne passe arrive dans les pieds."], ["le trophée", "🏆", "Le trophée brille dans la vitrine."],
      ["l'ambition", "🚀", "Mon ambition est de devenir champion."], ["la solidarité", "🫶🏾", "La solidarité, c'est s'aider les uns les autres."], ["le stade", "🏟️", "Le stade Abdoulaye Wade est à Diamniadio."], ["la nation", "🇸🇳", "Les Lions jouent pour toute la nation."],
    ],
    vitesse: 1.25,
    voixAuto: false,
    habillage: {
      a: "·",
      grades: ["Espoir du quartier", "Centre de formation", "Équipe réserve", "Titulaire", "Capitaine", "Star mondiale", "Ballon d'or"],
      lieux: [
        ["Le terrain du quartier", "quartier", "👟", "des crampons"], ["L'école de foot", "quartier", "🧦", "des chaussettes de match"], ["Le tournoi Navétanes", "quartier", "🥁", "un tam-tam de supporter"],
        ["Les petits ponts", "quartier", "🎽", "un maillot d'entraînement"], ["Le match de rue", "quartier", "⚽", "un ballon"], ["L'académie", "senegal", "📋", "un carnet de tactique"],
        ["Stade Demba-Diop", "senegal", "🥅", "des filets de but"], ["Le derby de Dakar", "senegal", "📣", "un mégaphone"], ["Stade Léopold-Senghor", "senegal", "🧤", "des gants de gardien"],
        ["La sélection U17", "senegal", "🥉", "une médaille de bronze"], ["Stade Abdoulaye-Wade", "senegal", "🦁", "l'écharpe des Lions"], ["Les Lions de la Teranga", "senegal", "🥈", "une médaille d'argent"],
        ["Le départ en Europe", "europe", "✈️", "un billet d'avion"], ["La Masia", "europe", "🏫", "le badge de la Masia"], ["Barça Atlètic", "europe", "🎖️", "un brassard de capitaine"],
        ["Premier match au Camp Nou", "europe", "🏟️", "le Camp Nou"], ["El Clásico", "europe", "🔥", "le feu du Clásico"], ["La Liga", "europe", "🥇", "une médaille d'or"],
        ["La Coupe du Roi", "europe", "👑", "la couronne du Roi"], ["Le Ballon d'or", "europe", "🌟", "une étoile dorée"], ["La Ligue des champions", "europe", "⭐", "l'étoile des champions"],
        ["Le quart de finale", "europe", "🎺", "une trompette"], ["La demi-finale", "europe", "🏅", "une médaille"], ["Le Mondial", "europe", "🌍", "le globe du Mondial"],
        ["La CAN", "senegal", "💚", "la fierté des Lions"], ["Le retour au quartier", "quartier", "🏠", "la maison"],
      ],
      decors: { quartier: ["Au quartier", "#f3d9a6"], senegal: ["Au Sénégal", "#b8e3b0"], europe: ["À Barcelone", "#c9d6f2"] },
      boss: { nom: "Finale", zone: "La grande finale", e: "🏆", animal: "le trophée de la finale", titre: "La grande finale", rival: "Le gardien", aide: "Marque avant que le gardien adverse ne s'organise !", bloque: "Gagne toutes les étapes pour jouer la finale !", fond: "#e8c7d2" },
      jeux: {
        peche: { nom: "Les passes", e: "🎯", aide: "Passe le ballon au bon coéquipier, comme au Barça !" },
        ballons: { nom: "Les jongles", e: "⚽", aide: "Touche le bon ballon pour ne pas le laisser tomber !" },
        pirogue: { nom: "La contre-attaque", e: "🏃🏾", aide: "Réponds vite pour marquer avant le défenseur !" },
        match: { nom: "Le match", e: "🎙️", aide: "Chaque bonne réponse fait avancer ton équipe. Marque plus de buts que l'adversaire !" },
      },
      match: true,
      cartes: [
        { nom: "Lamine Yamal", poste: "ATT", pays: "🇪🇸", note: 86 }, { nom: "Pedri", poste: "MIL", pays: "🇪🇸", note: 87 }, { nom: "Édouard Mendy", poste: "G", pays: "🇸🇳", note: 84 },
        { nom: "Kalidou Koulibaly", poste: "DEF", pays: "🇸🇳", note: 86 }, { nom: "Gavi", poste: "MIL", pays: "🇪🇸", note: 84 }, { nom: "Ismaïla Sarr", poste: "ATT", pays: "🇸🇳", note: 82 },
        { nom: "Abdou Diallo", poste: "DEF", pays: "🇸🇳", note: 80 }, { nom: "Idrissa Gueye", poste: "MIL", pays: "🇸🇳", note: 82 }, { nom: "Nicolas Jackson", poste: "ATT", pays: "🇸🇳", note: 81 },
        { nom: "Jordi Alba", poste: "DEF", pays: "🇪🇸", note: 86 }, { nom: "Pape Matar Sarr", poste: "MIL", pays: "🇸🇳", note: 80 }, { nom: "Ronald Araujo", poste: "DEF", pays: "🇺🇾", note: 85 },
        { nom: "El Hadji Diouf", poste: "ATT", pays: "🇸🇳", note: 85 }, { nom: "Gerard Piqué", poste: "DEF", pays: "🇪🇸", note: 88 }, { nom: "Frenkie de Jong", poste: "MIL", pays: "🇳🇱", note: 86 },
        { nom: "Ter Stegen", poste: "G", pays: "🇩🇪", note: 88 }, { nom: "Dani Alves", poste: "DEF", pays: "🇧🇷", note: 88 }, { nom: "Sergio Busquets", poste: "MIL", pays: "🇪🇸", note: 89 },
        { nom: "Carles Puyol", poste: "DEF", pays: "🇪🇸", note: 89 }, { nom: "Sadio Mané", poste: "ATT", pays: "🇸🇳", note: 89 }, { nom: "Xavi", poste: "MIL", pays: "🇪🇸", note: 92 },
        { nom: "Luis Suárez", poste: "ATT", pays: "🇺🇾", note: 91 }, { nom: "Andrés Iniesta", poste: "MIL", pays: "🇪🇸", note: 93 }, { nom: "Ronaldinho", poste: "ATT", pays: "🇧🇷", note: 93 },
        { nom: "Lionel Messi", poste: "ATT", pays: "🇦🇷", note: 98 }, { nom: "Neymar Jr", poste: "ATT", pays: "🇧🇷", note: 95 },
      ],
      eau: "terrain", ciel: "tribune", mobiles: { peche: "joueur", ballons: "balle" }, bateau: "⚽", prises: { peche: "🎯", ballons: "⚽" },
      monture: "🏃🏾", montureRival: "🏃🏻", passager: "⚽", rival: ["🛡️", "Le défenseur"], course: "pelouse",
      victoire: "But ! Tu as marqué avant le défenseur !", defaite: "Le défenseur a récupéré le ballon",
      album: { titre: "Mes trophées", aide: "Chaque étape gagnée te donne un objet de ta carrière.", nouveau: "Nouveau trophée : " },
      boutique: [["🧢", "Casquette", 20], ["🕶️", "Lunettes", 30], ["🎧", "Casque", 40], ["🧤", "Gants", 40], ["🎖️", "Brassard", 60], ["💛", "Cœur jaune", 50], ["⭐", "Étoile", 80], ["🦁", "Lion", 100], ["👑", "Couronne", 120]],
    },
    paliers: [{ id: "p1", titre: "Palier 1", periode: "octobre à décembre" }],
    mondes: [
      { id: "francais", titre: "Français", icone: "📖", couleur: "#ffd9a8", lecons: [
        { id: "ce2-p1-f1", palier: "p1", icone: "🔤", titre: "Le nom et le verbe", objectif: "Reconnaître le nom et le verbe dans une phrase", questions: nomVerbe() },
        { id: "ce2-p1-f2", palier: "p1", icone: "♀", titre: "Le, la ou l' ?", objectif: "Genre des noms", questions: genre() },
        { id: "ce2-p1-f3", palier: "p1", icone: "➕", titre: "Le pluriel des noms", objectif: "Pluriel en -s, -x, -aux", questions: pluriel() },
        { id: "ce2-p1-f4", palier: "p1", icone: "✍️", titre: "Être et avoir au présent", objectif: "Conjuguer être et avoir", questions: etreAvoir() },
        { id: "ce2-p1-f5", palier: "p1", icone: "🎵", titre: "Les verbes en -er au présent", objectif: "Conjuguer les verbes du 1er groupe", questions: verbesEr() },
        { id: "ce2-p1-f6", palier: "p1", icone: "⚖️", titre: "a ou à, et ou est", objectif: "Homophones grammaticaux", questions: homophones() },
        { id: "ce2-p1-f7", palier: "p1", icone: "📚", titre: "Je lis et je comprends", objectif: "Compréhension d'un texte court", questions: lecture() },
      ] },
      { id: "maths", titre: "Mathématiques", icone: "🔢", couleur: "#bfe3c9", lecons: [
        { id: "ce2-p1-m1", palier: "p1", icone: "🔢", titre: "Les nombres jusqu'à 9 999", objectif: "Lire et écrire les nombres", questions: lireNombres() },
        { id: "ce2-p1-m2", palier: "p1", icone: "🧱", titre: "Milliers, centaines, dizaines", objectif: "Valeur des chiffres", questions: rangs() },
        { id: "ce2-p1-m3", palier: "p1", icone: "📊", titre: "Comparer et ranger", objectif: "Comparer des nombres", questions: comparer() },
        { id: "ce2-p1-m4", palier: "p1", icone: "➕", titre: "Additions et soustractions", objectif: "Calculer avec des nombres à 4 chiffres", questions: operations() },
        { id: "ce2-p1-m5", palier: "p1", icone: "✖️", titre: "Tables de 2 à 5", objectif: "Mémoriser les tables", questions: tables(2, 5) },
        { id: "ce2-p1-m6", palier: "p1", icone: "✖️", titre: "Tables de 6 à 9", objectif: "Mémoriser les tables", questions: tables(6, 9) },
        { id: "ce2-p1-m7", palier: "p1", icone: "💰", titre: "Problèmes du marché", objectif: "Résoudre des problèmes en francs CFA", questions: problemes() },
        { id: "ce2-p1-m8", palier: "p1", icone: "📏", titre: "Les mesures", objectif: "Longueurs, masses, durées, capacités", questions: mesures() },
      ] },
      { id: "foot", titre: "Foot", icone: "⚽", couleur: "#ffd1dc", lecons: [
        { id: "ce2-p1-s1", palier: "p1", icone: "🧤", titre: "Les postes", objectif: "Gardien, défenseurs, milieux, attaquants", questions: quiz(POSTES) },
        { id: "ce2-p1-s2", palier: "p1", icone: "🟨", titre: "Les règles du jeu", objectif: "Règles de base du football", questions: quiz(REGLES) },
        { id: "ce2-p1-s3", palier: "p1", icone: "📋", titre: "Le 4-3-3", objectif: "Lire un schéma tactique (et calculer)", questions: quiz(SCHEMAS) },
        { id: "ce2-p1-s4", palier: "p1", icone: "🔵", titre: "Le style Barça", objectif: "Possession, passes courtes, pressing", questions: quiz(BARCA) },
        { id: "ce2-p1-s5", palier: "p1", icone: "⭐", titre: "Les stars et les Lions", objectif: "Culture foot : Neymar, les Lions du Sénégal", questions: quiz(STARS) },
        { id: "ce2-p1-s6", palier: "p1", icone: "📍", titre: "Le placement", objectif: "Se repérer sur le terrain (gauche, droite, haut, bas)", questions: placement() },
      ] },
      { id: "decouvrir", titre: "Découvrir", icone: "🌍", couleur: "#bcdcf5", lecons: [
        { id: "ce2-p1-d1", palier: "p1", icone: "🗺️", titre: "Le Sénégal et ses voisins", objectif: "Géographie du Sénégal", questions: quiz(SENEGAL) },
        { id: "ce2-p1-d2", palier: "p1", icone: "🇸🇳", titre: "Les symboles du pays", objectif: "Éducation civique", questions: quiz(SYMBOLES) },
        { id: "ce2-p1-d3", palier: "p1", icone: "💧", titre: "L'eau", objectif: "États de l'eau et eau potable", questions: quiz(EAU) },
        { id: "ce2-p1-d4", palier: "p1", icone: "🦟", titre: "Ma santé", objectif: "Paludisme, hygiène, alimentation", questions: quiz(SANTE) },
        { id: "ce2-p1-d5", palier: "p1", icone: "🌱", titre: "Les plantes", objectif: "Besoins et parties de la plante", questions: quiz(PLANTES) },
      ] },
    ],
  };
})();

window.TOUS_CONTENUS["ce2"] = window.CONTENU; window.CONTENU = garde; })();
