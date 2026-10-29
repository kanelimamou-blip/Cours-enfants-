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
    livre: [
      { apres: "ci-p1-l1", e: "🧒🏾⚽", texte: "Ali a un ballon. Ali a un ami. Allez, on joue !" },
      { apres: "ci-p1-l2", e: "🚗💨", texte: "Une auto rouge file sur la route. Elle va vite, très vite !" },
      { apres: "ci-p1-l3", e: "🤼🏾", texte: "Le lutteur salue la foule. Il est fort comme un lion." },
      { apres: "ci-p1-l4", e: "🚌🏟️", texte: "Le bus jaune est plein. Tout le monde va au stade." },
      { apres: "ci-p1-l5", e: "🦙", texte: "Lili a lu. Lola a lu. Le lama a lu !" },
      { apres: "ci-p1-l6", e: "🏍️", texte: "Mimi a mal. Mamie a la moto. Moi, j'ai le ballon !" },
      { apres: "ci-p1-l7", e: "🦙🤼🏾", texte: "Ma mamie a un lama. Le lama mime le lutteur. Ali rit !" },
    ],
    habillage: {
      lutte: true,
      jeux: {
        ballons: { nom: "Les jongles", e: "⚽", aide: "Touche le bon ballon pour ne pas le laisser tomber !" },
        pirogue: { nom: "La course de voitures", e: "🏎️", aide: "Réponds vite pour gagner la course !" },
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
