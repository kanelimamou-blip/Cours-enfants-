/* La bibliothèque : leçons en plus du voyage, communes aux 3 applis et dosées selon la classe.
   window.LECONS_PLUS(classe) renvoie des mondes { id, titre, icone, lecons: [...] }. */
window.LECONS_PLUS = function (classe) {
  const GS = classe === "gs", CI = classe === "ci", CE2 = classe === "ce2";
  const hasard = a => a[Math.floor(Math.random() * a.length)];
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (a, n) => melange(a).slice(0, n);
  const fois = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  // La bonne réponse est toujours la première, le moteur mélange.
  const q = (consigne, scene, bonne, autres, extra) => {
    const vus = new Set([JSON.stringify(bonne.t || bonne.html || bonne.e)]);
    autres = autres.filter(x => { const c = JSON.stringify(x.t || x.html || x.e); return !vus.has(c) && vus.add(c); });
    return Object.assign({ consigne, scene, choix: [bonne].concat(autres), bonne: 0 }, extra || {});
  };
  const img = (e, t, dire) => ({ k: "image", e, t, dire: dire || t });
  const mot = (t, dire) => ({ k: "mots", t, dire: dire || t });
  const phr = (t, dire) => ({ k: "phrase", t, dire: dire || t });
  const ch = n => ({ k: "chiffre", t: String(n), dire: String(n) });
  const html = (h, dire) => ({ k: "html", html: h, dire });
  // Une liste de faits [question, bonne, fausses..., (emoji)] devient une leçon de questions à choix.
  const quiz = (faits, n, forme) => () => tirer(faits, Math.min(n || 8, faits.length)).map(f => {
    const [question, bonne, fausses, e] = f;
    const c = forme || (x => (String(x).length > 22 ? phr(x) : mot(x)));
    return q(question, e ? { k: "image", e } : null, c(bonne), tirer(fausses, 3).map(c), { dire: question });
  });
  const lecons = [];
  const ajouter = (monde, l) => { if (l) lecons.push(Object.assign({ monde }, l)); };

  // ================= MON PAYS, LE SÉNÉGAL =================
  const drapeau = (a, b, c, etoile) => '<svg viewBox="0 0 90 60" width="96" height="64" style="border-radius:6px;box-shadow:0 2px 4px rgba(0,0,0,.2)"><rect width="30" height="60" fill="' + a + '"/><rect x="30" width="30" height="60" fill="' + b + '"/><rect x="60" width="30" height="60" fill="' + c + '"/>' + (etoile ? '<polygon points="45,20 48,28 56,28 50,33 52,41 45,36 38,41 40,33 34,28 42,28" fill="#00853F"/>' : "") + "</svg>";
  const DRAPEAUX = [html(drapeau("#00853F", "#FDEF42", "#E31B23", true), "le drapeau du Sénégal"), html(drapeau("#14B53A", "#FCD116", "#CE1126"), "le drapeau du Mali"), html(drapeau("#CE1126", "#FCD116", "#009460"), "le drapeau de la Guinée"), html(drapeau("#002395", "#FFFFFF", "#ED2939"), "le drapeau de la France")];
  const symboles = [
    () => q("Touche le drapeau du Sénégal", null, DRAPEAUX[0], DRAPEAUX.slice(1), { dire: "Touche le drapeau du Sénégal. Il est vert, jaune, rouge, avec une étoile verte." }),
    () => q("Quel animal est le symbole du Sénégal ?", null, img("🦁", "le lion"), [img("🐘", "l'éléphant"), img("🐒", "le singe"), img("🐊", "le crocodile")]),
    () => q("Quel arbre est le symbole du Sénégal ?", null, img("🌳", "le baobab"), [img("🌴", "le palmier"), img("🌲", "le sapin"), img("🌵", "le cactus")]),
    () => q("De quelle couleur est l'étoile du drapeau ?", { k: "html", html: drapeau("#00853F", "#FDEF42", "#E31B23", true) }, html('<span style="display:inline-block;width:46px;height:46px;border-radius:50%;background:#00853F"></span>', "vert"), [html('<span style="display:inline-block;width:46px;height:46px;border-radius:50%;background:#E31B23"></span>', "rouge"), html('<span style="display:inline-block;width:46px;height:46px;border-radius:50%;background:#2f6fd1"></span>', "bleu")], { disposition: "trois" }),
  ];
  const symbolesPlus = [
    ["Quelle est la capitale du Sénégal ?", "Dakar", ["Saint-Louis", "Thiès", "Touba"], "🏙️"],
    ["Quel jour fête-t-on l'indépendance du Sénégal ?", "le 4 avril", ["le 1er janvier", "le 25 décembre", "le 1er mai"], "🎉"],
    ["Comment s'appelle la monnaie du Sénégal ?", "le franc CFA", ["l'euro", "le dollar", "le dirham"], "🪙"],
    ["Quelle est la devise du Sénégal ?", "Un Peuple, Un But, Une Foi", ["Liberté, Égalité, Fraternité", "Travail, Paix, Patrie", "Union, Force, Victoire"], "📜"],
    ["Comment s'appelle l'hymne national du Sénégal ?", "Le Lion rouge", ["La Marseillaise", "Le Baobab", "Teranga"], "🎶"],
    ["Qui écrit les lois du pays ?", "les députés", ["les maîtres", "les footballeurs", "les marchands"], "🏛️"],
    ["Comment choisit-on le président de la République ?", "par une élection", ["par un tirage au sort", "par un match", "il choisit lui-même"], "🗳️"],
    ["Que veut dire « teranga » ?", "l'hospitalité, bien accueillir", ["la guerre", "la pluie", "la fatigue"], "🤝🏾"],
  ];
  const citoyen = [
    ["Tu as fini ton biscuit. Que fais-tu du papier ?", "Je le jette dans la poubelle", ["Je le jette par terre", "Je le cache sous la table"], "🗑️"],
    ["Un adulte entre dans la maison. Que dis-tu ?", "Bonjour !", ["Rien du tout", "Va-t'en !"], "👋🏾"],
    ["Un camarade est tombé dans la cour. Que fais-tu ?", "Je l'aide à se relever", ["Je me moque de lui", "Je pars en courant"], "🤕"],
    ["Le robinet coule pour rien. Que fais-tu ?", "Je le ferme pour ne pas gaspiller l'eau", ["Je le laisse couler", "Je joue avec l'eau"], "🚰"],
    ["On t'a donné un cadeau. Que dis-tu ?", "Merci !", ["Encore !", "C'est tout ?"], "🎁"],
    ["La maîtresse parle. Que fais-tu ?", "J'écoute en silence", ["Je parle avec mon voisin", "Je dors"], "👩🏾‍🏫"],
    ["Tu veux parler en classe. Que fais-tu ?", "Je lève le doigt", ["Je crie très fort", "Je tape sur la table"], "✋🏾"],
    ["Ton petit frère veut ton jouet. Que fais-tu ?", "Je partage avec lui", ["Je le tape", "Je le casse"], "🧸"],
    ["Que fais-tu des arbres de ton quartier ?", "Je les protège et je les arrose", ["Je casse les branches", "J'arrache les feuilles"], "🌳"],
  ];
  const route = [
    ["Le feu est rouge. Le piéton…", "s'arrête et attend", ["traverse en courant", "danse sur la route"], "🚦"],
    ["Où faut-il traverser la route ?", "sur le passage piéton", ["entre deux voitures", "au milieu du virage"], "🦓"],
    ["Avant de traverser, je regarde…", "à gauche, à droite, puis encore à gauche", ["seulement mon téléphone", "le ciel"], "👀"],
    ["En voiture, je mets…", "ma ceinture de sécurité", ["mon bonnet", "mes lunettes de soleil"], "🚗"],
    ["Sur une moto, il faut porter…", "un casque", ["une casquette", "un foulard"], "🏍️"],
    ["Le ballon est parti sur la route. Que fais-tu ?", "J'appelle un adulte", ["Je cours le chercher", "Je saute sur la route"], "⚽"],
    ["Pour traverser, je donne la main…", "à un adulte", ["à mon petit frère", "à personne"], "🤝🏾"],
    ["Peut-on s'accrocher derrière un car rapide ?", "Non, c'est très dangereux", ["Oui, c'est amusant", "Oui, si on va vite"], "🚌"],
    ["Le feu des piétons est vert. Le piéton…", "peut traverser en regardant bien", ["doit reculer", "doit s'asseoir"], "🟢"],
  ];
  const REGIONS = ["Dakar", "Thiès", "Diourbel", "Fatick", "Kaolack", "Kaffrine", "Kolda", "Kédougou", "Louga", "Matam", "Saint-Louis", "Sédhiou", "Tambacounda", "Ziguinchor"];
  const regions = [
    ["Combien de régions compte le Sénégal ?", "14", ["10", "7", "20"], "🗺️"],
    ["Dans quelle région se trouve la ville sainte de Touba ?", "Diourbel", ["Dakar", "Ziguinchor", "Matam"], "🕌"],
    ["Quelle ville fut la capitale du Sénégal avant Dakar ?", "Saint-Louis", ["Thiès", "Kaolack", "Kolda"], "🌉"],
    ["Quelle région se trouve en Casamance, au bord du fleuve Casamance ?", "Ziguinchor", ["Louga", "Matam", "Thiès"], "🌴"],
    ["Quelle région du sud-est a des montagnes et des mines d'or ?", "Kédougou", ["Dakar", "Louga", "Fatick"], "⛰️"],
    ["Quelle est la plus grande région du Sénégal ?", "Tambacounda", ["Dakar", "Diourbel", "Thiès"], "📏"],
    ["Quelle région est la plus petite mais la plus peuplée ?", "Dakar", ["Tambacounda", "Matam", "Kédougou"], "🏙️"],
    ["Quel fleuve marque la frontière au nord du Sénégal ?", "le fleuve Sénégal", ["le Nil", "le fleuve Gambie", "la Casamance"], "🏞️"],
    ["Quel océan borde le Sénégal à l'ouest ?", "l'océan Atlantique", ["l'océan Indien", "la mer Rouge", "l'océan Pacifique"], "🌊"],
    ["Quel pays se trouve presque à l'intérieur du Sénégal ?", "la Gambie", ["le Mali", "la Mauritanie", "le Maroc"], "🧭"],
    ["Quelle région est célèbre pour son sel et son grand marché ?", "Kaolack", ["Kédougou", "Sédhiou", "Louga"], "🧂"],
    ["Quelle ville est célèbre pour le chemin de fer ?", "Thiès", ["Matam", "Kolda", "Ziguinchor"], "🚂"],
  ];
  const figures = [
    ["Qui fut le premier président du Sénégal ?", "Léopold Sédar Senghor", ["Blaise Diagne", "Youssou Ndour", "Lat Dior"], "📖"],
    ["Léopold Sédar Senghor était président et aussi…", "poète", ["footballeur", "pêcheur", "pilote"], "✍🏾"],
    ["L'université de Dakar porte le nom de quel grand savant ?", "Cheikh Anta Diop", ["Sadio Mané", "Lat Dior", "Mariama Bâ"], "🎓"],
    ["Quel damel du Cayor a résisté à la colonisation ?", "Lat Dior", ["Senghor", "Youssou Ndour", "Blaise Diagne"], "🐎"],
    ["Quelle héroïne de Casamance a résisté à la colonisation ?", "Aline Sitoé Diatta", ["Mariama Bâ", "Ndaté Yalla", "Coumba Gawlo"], "🌾"],
    ["Le grand aéroport de Dakar porte le nom de…", "Blaise Diagne", ["Cheikh Anta Diop", "Lat Dior", "Sadio Mané"], "✈️"],
    ["Qui a écrit le livre « Une si longue lettre » ?", "Mariama Bâ", ["Aline Sitoé Diatta", "Senghor", "Cheikh Anta Diop"], "📚"],
    ["Qui a fondé la ville de Touba ?", "Cheikh Ahmadou Bamba", ["Blaise Diagne", "Lat Dior", "Senghor"], "🕌"],
    ["Quel grand chanteur a fait connaître le mbalax dans le monde ?", "Youssou Ndour", ["Sadio Mané", "Senghor", "Lat Dior"], "🎤"],
    ["Quel Lion a marqué le tir au but de la victoire à la CAN 2022 ?", "Sadio Mané", ["Youssou Ndour", "Cheikh Anta Diop", "Blaise Diagne"], "🏆"],
  ];
  const parcsGS = () => fois(8, () => {
    const A = [["🦁", "le lion"], ["🐘", "l'éléphant"], ["🦒", "la girafe"], ["🦛", "l'hippopotame"], ["🐊", "le crocodile"], ["🐒", "le singe"], ["🦩", "le flamant rose"], ["🐢", "la tortue"], ["🦓", "le zèbre"], ["🐗", "le phacochère"]];
    const [b, ...f] = tirer(A, 3);
    return q("Touche " + b[1], null, img(b[0], b[1]), f.map(x => img(x[0], x[1])), { dire: "Dans les parcs du Sénégal, on peut voir " + b[1] + ". Touche " + b[1] + "." });
  });
  const parcs = [
    ["Dans quel parc vivent des lions et des éléphants ?", "le Niokolo-Koba", ["le Lac Rose", "la plage de Ngor", "le Djoudj"], "🦁"],
    ["Quel parc accueille des millions d'oiseaux, comme les pélicans ?", "le Djoudj", ["le Niokolo-Koba", "Bandia", "Gorée"], "🦩"],
    ["Où peut-on voir des girafes et des rhinocéros près de Mbour ?", "la réserve de Bandia", ["le Djoudj", "le Lac Rose", "Saint-Louis"], "🦒"],
    ["Quel parc a des îles et de la mangrove ?", "le delta du Saloum", ["le Niokolo-Koba", "Bandia", "le Djoudj"], "🌿"],
    ["Près de Saint-Louis, quel parc protège tortues et oiseaux de mer ?", "la Langue de Barbarie", ["le Niokolo-Koba", "Bandia", "Kédougou"], "🐢"],
    ["À quoi sert un parc national ?", "à protéger les animaux et les plantes", ["à construire des maisons", "à jouer au foot", "à chasser"], "🏞️"],
    ["Le Niokolo-Koba est dans quelle partie du pays ?", "le sud-est", ["le nord", "Dakar", "la mer"], "🧭"],
  ];
  ajouter("pays", { id: "symboles", icone: "🇸🇳", titre: "Le drapeau et les symboles", objectif: "Connaître les symboles du Sénégal",
    questions: () => (GS ? fois(8, i => symboles[i % symboles.length]()) : fois(4, i => symboles[i]()).concat(quiz(symbolesPlus.slice(0, CI ? 3 : 8), 4)())) });
  ajouter("pays", { id: "citoyen", icone: "🤝🏾", titre: "Le bon citoyen", objectif: "Bien se comporter avec les autres", questions: quiz(citoyen, 8) });
  ajouter("pays", { id: "route", icone: "🚦", titre: "La sécurité routière", objectif: "Les bons gestes sur la route", questions: quiz(route, 8) });
  ajouter("pays", GS ? { id: "parcs", icone: "🦁", titre: "Les animaux des parcs", objectif: "Nommer les animaux sauvages", questions: parcsGS }
    : { id: "parcs", icone: "🏞️", titre: "Les parcs nationaux", objectif: "Connaître les parcs du Sénégal", questions: CI ? () => parcsGS().slice(0, 5).concat(quiz(parcs.slice(0, 3), 3)()) : quiz(parcs, 7) });
  if (!GS) ajouter("pays", { id: "regions", icone: "🗺️", titre: CI ? "Mon pays" : "Les 14 régions", objectif: CI ? "Quelques grandes villes du Sénégal" : "Situer les régions du Sénégal",
    questions: CI ? quiz([regions[2], regions[6], regions[8], symbolesPlus[0]], 4) : () => quiz(regions, 6)().concat(fois(2, () => { const b = hasard(REGIONS); return q("Laquelle de ces villes est une région du Sénégal ?", { k: "image", e: "🗺️" }, mot(b), tirer(["Bamako", "Abidjan", "Nouakchott", "Banjul", "Conakry", "Bissau"], 3).map(x => mot(x))); })) });
  if (!GS) ajouter("pays", { id: "figures", icone: "⭐", titre: "Les grandes figures", objectif: "Connaître des personnes célèbres du Sénégal", questions: quiz(CI ? [figures[0], figures[8], figures[9]] : figures, CI ? 3 : 8) });

  // ================= LES LANGUES : WOLOF ET ANGLAIS =================
  // [français, wolof, emoji, prononciation pour la voix française]
  const WOLOF = [
    ["merci", "jërëjëf", "🙏🏾", "djeureudjeuf"], ["oui", "waaw", "👍🏾", "waw"], ["non", "déedéet", "👎🏾", "déé déét"], ["l'eau", "ndox", "💧", "ndokh"],
    ["le pain", "mburu", "🥖", "mbourou"], ["le chien", "xaj", "🐕", "khadj"], ["le chat", "muus", "🐈", "mouss"], ["maman", "yaay", "👩🏾", "yaye"],
    ["papa", "baay", "👨🏾", "baye"], ["le riz", "ceeb", "🍚", "tchébe"], ["le poisson", "jën", "🐟", "djeunn"], ["la maison", "kër", "🏠", "keur"],
    ["l'enfant", "xale", "🧒🏾", "khalé"], ["manger", "lekk", "🍽️", "lèk"], ["l'école", "lekkool", "🏫", "lékol"], ["le soleil", "jant", "☀️", "djante"],
    ["la lune", "weer", "🌙", "wère"], ["le mouton", "xar", "🐑", "khar"], ["le cheval", "fas", "🐎", "fasse"], ["l'arbre", "garab", "🌳", "garab"],
    ["le livre", "téere", "📕", "tééré"], ["un", "benn", "1️⃣", "bène"], ["deux", "ñaar", "2️⃣", "gnar"], ["trois", "ñett", "3️⃣", "gnète"],
  ];
  const wolof = () => fois(8, i => {
    const [b, ...f] = tirer(WOLOF, 3);
    if (GS || i % 3 === 0) return q("Écoute le mot wolof. C'est quoi ?", { k: "mots", t: "🔊 " + b[1] }, img(b[2], b[0]), f.map(x => img(x[2], x[0])), { dire: "En wolof, on dit : " + b[3] + ". Qu'est-ce que c'est ?", disposition: "trois" });
    if (i % 3 === 1) return q("Comment dit-on « " + b[0] + " » en wolof ?", { k: "image", e: b[2] }, mot(b[1], b[3]), f.map(x => mot(x[1], x[3])), { dire: "Comment dit-on " + b[0] + " en wolof ?" });
    return q("Que veut dire « " + b[1] + " » ?", null, img(b[2], b[0]), f.map(x => img(x[2], x[0])), { dire: "Que veut dire " + b[3] + " en français ?", disposition: "trois" });
  });
  const salutsWolof = quiz([
    ["Pour dire bonjour en wolof, on dit…", "Salaam aleekum", ["Jërëjëf", "Ba beneen", "Waaw"], "👋🏾"],
    ["On te dit « Salaam aleekum ». Tu réponds…", "Maleekum salaam", ["Déedéet", "Jërëjëf", "Ndox"], "🤝🏾"],
    ["« Na nga def ? » veut dire…", "Comment vas-tu ?", ["Merci beaucoup", "Au revoir", "J'ai faim"], "🙂"],
    ["Pour répondre « je vais bien », on dit…", "Maa ngi fi rekk", ["Xaj", "Mburu", "Ceeb"], "😊"],
    ["« Ba beneen yoon » veut dire…", "À la prochaine fois", ["Bon appétit", "Bonjour", "Merci"], "👋🏾"],
    ["Pour dire merci, on dit…", "Jërëjëf", ["Waaw", "Xar", "Kër"], "🙏🏾"],
  ], 6);
  // Anglais : la voix lit les mots en anglais (lang).
  const EN = [
    ["red", "rouge", "🔴"], ["blue", "bleu", "🔵"], ["green", "vert", "🟢"], ["yellow", "jaune", "🟡"], ["black", "noir", "⚫"], ["white", "blanc", "⚪"],
    ["cat", "le chat", "🐈"], ["dog", "le chien", "🐕"], ["fish", "le poisson", "🐟"], ["bird", "l'oiseau", "🐦"], ["lion", "le lion", "🦁"], ["cow", "la vache", "🐄"],
    ["apple", "la pomme", "🍎"], ["banana", "la banane", "🍌"], ["water", "l'eau", "💧"], ["bread", "le pain", "🍞"], ["book", "le livre", "📕"], ["pen", "le stylo", "🖊️"],
    ["mother", "la mère", "👩🏾"], ["father", "le père", "👨🏾"], ["sun", "le soleil", "☀️"], ["house", "la maison", "🏠"], ["car", "la voiture", "🚗"], ["ball", "le ballon", "⚽"],
  ];
  const NOMBRES_EN = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const anglais = (liste) => () => fois(8, i => {
    const [b, ...f] = tirer(liste, 3);
    if (GS || i % 2 === 0) return q("Écoute bien et touche la bonne image", { k: "mots", t: "🔊 " + (GS ? "" : b[0]) }, img(b[2], b[1]), f.map(x => img(x[2], x[1])), { dire: b[0], lang: "en-GB", disposition: "trois" });
    return q("Comment dit-on « " + b[1] + " » en anglais ?", { k: "image", e: b[2] }, mot(b[0]), f.map(x => mot(x[0])), { dire: "Comment dit-on " + b[1] + " en anglais ?" });
  });
  const anglaisNombres = () => fois(8, () => {
    const n = r(1, GS ? 5 : 10), f = tirer(fois(GS ? 6 : 11, i => i).filter(x => x !== n && x > 0), 2);
    return q("Écoute le nombre en anglais", { k: "mots", t: "🔊" }, ch(n), f.map(ch), { dire: NOMBRES_EN[n], lang: "en-GB", disposition: "trois" });
  });
  const anglaisPolitesse = quiz([
    ["« Hello » veut dire…", "Bonjour", ["Merci", "Au revoir", "S'il te plaît"], "👋🏾"],
    ["« Thank you » veut dire…", "Merci", ["Bonjour", "Pardon", "Oui"], "🙏🏾"],
    ["« Goodbye » veut dire…", "Au revoir", ["Bonjour", "Merci", "Bonne nuit"], "👋🏾"],
    ["« Please » veut dire…", "S'il te plaît", ["Merci", "Pardon", "Non"], "🥺"],
    ["« Yes » veut dire…", "Oui", ["Non", "Peut-être", "Merci"], "👍🏾"],
    ["« My name is… » veut dire…", "Je m'appelle…", ["J'ai faim…", "Je suis grand…", "J'habite…"], "🧒🏾"],
    ["« How are you? » veut dire…", "Comment vas-tu ?", ["Quel âge as-tu ?", "Où vas-tu ?", "Qui es-tu ?"], "🙂"],
    ["« Good morning » veut dire…", "Bonjour (le matin)", ["Bonne nuit", "Bon appétit", "Bravo"], "🌅"],
  ], 8);
  ajouter("langues", { id: "wolof", icone: "🗣️", titre: "Mots wolof", objectif: "Passer du wolof au français", questions: wolof });
  if (!GS) ajouter("langues", { id: "wolof-saluer", icone: "👋🏾", titre: "Saluer en wolof", objectif: "Les salutations en wolof", questions: salutsWolof });
  ajouter("langues", { id: "en-mots", icone: "🇬🇧", titre: "Mes premiers mots d'anglais", objectif: "Couleurs, animaux et objets en anglais", questions: anglais(EN) });
  ajouter("langues", { id: "en-nombres", icone: "🔢", titre: "Compter en anglais", objectif: "Les nombres en anglais", questions: anglaisNombres });
  if (!GS) ajouter("langues", { id: "en-politesse", icone: "🙏🏾", titre: "Dire bonjour en anglais", objectif: "Les mots de politesse en anglais", questions: anglaisPolitesse });

  // ================= FRANÇAIS : CONTES, CHANSONS, MOTS PIÈGES, LECTURE À VOIX HAUTE =================
  const CONTES = [
    { id: "conte-recolte", icone: "🥜", titre: "Leuk et la récolte de Bouki", pages: [
      ["🐇", "Leuk le lièvre est petit, mais il est très malin. Bouki l'hyène est grande, mais elle est très gourmande."],
      ["🌱", "Un jour, Leuk dit à Bouki : « Cultivons un champ ensemble ! » Bouki répond : « D'accord, mais je choisis ma part : moi, je prends tout ce qui pousse au-dessus de la terre ! »"],
      ["🥜", "Leuk sourit et sème… des arachides. Les arachides poussent sous la terre ! À la récolte, Bouki n'a que les feuilles, et Leuk remplit ses sacs d'arachides."],
      ["😠", "Bouki est fâchée : « L'année prochaine, je prends tout ce qui pousse sous la terre ! » Leuk dit : « Comme tu veux. »"],
      ["🌾", "L'année suivante, Leuk sème… du mil. Les grains de mil poussent en haut des tiges ! Bouki n'a que les racines. Leuk a encore gagné."],
      ["💡", "Morale : la gourmandise ne remplace pas la réflexion. Celui qui réfléchit avant de choisir fait les meilleures affaires."],
    ], questions: [
      ["Qui est Leuk ?", "un lièvre", ["une hyène", "un lion", "un singe"], "🐇"],
      ["Comment est Bouki ?", "gourmande", ["très maline", "toute petite", "très gentille"], "🐺"],
      ["Que plante Leuk la première année ?", "des arachides", ["du mil", "des mangues", "du riz"], "🥜"],
      ["Où poussent les arachides ?", "sous la terre", ["en haut des arbres", "dans l'eau", "sur les toits"], "🌱"],
      ["Que plante Leuk la deuxième année ?", "du mil", ["des arachides", "des carottes", "du manioc"], "🌾"],
      ["Qui gagne à la fin ?", "Leuk le lièvre", ["Bouki l'hyène", "personne", "le lion"], "🏆"],
      ["Que nous apprend ce conte ?", "il faut réfléchir avant de choisir", ["il faut manger beaucoup", "il faut dormir", "il ne faut jamais cultiver"], "💡"],
    ] },
    { id: "conte-fleuve", icone: "🐊", titre: "Leuk traverse le fleuve", pages: [
      ["🏞️", "Leuk le lièvre veut aller de l'autre côté du fleuve, où poussent de bonnes herbes. Mais il ne sait pas nager."],
      ["🐊", "Dans l'eau, il voit Diassigue le crocodile. Leuk dit : « Le roi veut savoir combien de crocodiles vivent dans ce fleuve, pour les inviter à une grande fête ! »"],
      ["🐊🐊🐊", "Diassigue est flatté. Il appelle tous ses amis : « Mettez-vous en ligne, d'une rive à l'autre, Leuk va nous compter ! »"],
      ["🐇", "Leuk saute de dos en dos : « Un, deux, trois, quatre… » Et hop ! le voilà de l'autre côté du fleuve."],
      ["😄", "Leuk crie : « Merci pour le pont, mes amis ! Il n'y a pas de fête, mais je suis bien arrivé ! » Les crocodiles sont furieux, mais Leuk est déjà loin."],
      ["💡", "Morale : la ruse peut aider les petits. Mais attention, un jour, quelqu'un pourrait te jouer le même tour !"],
    ], questions: [
      ["Pourquoi Leuk veut-il traverser le fleuve ?", "pour manger de bonnes herbes", ["pour aller à l'école", "pour pêcher", "pour voir le roi"], "🌿"],
      ["Comment s'appelle le crocodile ?", "Diassigue", ["Bouki", "Leuk", "Golo"], "🐊"],
      ["Que raconte Leuk aux crocodiles ?", "qu'il va les compter pour une fête", ["qu'il a peur", "qu'il veut nager", "qu'il est malade"], "🎉"],
      ["Comment Leuk traverse-t-il ?", "il saute sur le dos des crocodiles", ["il nage", "il prend une pirogue", "il vole"], "🐇"],
      ["Y a-t-il vraiment une fête ?", "non, c'était une ruse", ["oui, chez le roi", "oui, chez Bouki", "oui, au marché"], "❓"],
      ["Comment sont les crocodiles à la fin ?", "furieux", ["contents", "endormis", "malades"], "😠"],
    ] },
    { id: "conte-kumba", icone: "👧🏾", titre: "Les deux Kumba", pages: [
      ["👧🏾", "Il était une fois deux filles, toutes les deux appelées Kumba. L'une vivait avec sa maman. L'autre n'avait plus de maman, et on lui donnait tous les travaux difficiles."],
      ["🥣", "Un jour, Kumba sans maman doit aller laver une calebasse très loin, à la mer. Sur le chemin, elle rencontre une vieille femme."],
      ["👵🏾", "La vieille femme lui demande de l'aide. Kumba l'aide gentiment, l'écoute et fait tout ce qu'elle lui conseille, avec politesse."],
      ["🎁", "Pour la remercier, la vieille femme lui donne un œuf magique. Quand Kumba le casse, il en sort de beaux cadeaux pour toute la famille."],
      ["😤", "L'autre Kumba veut aussi des cadeaux. Elle part sur le même chemin, mais elle est impolie avec la vieille femme et refuse de l'aider."],
      ["🥚", "Elle reçoit aussi un œuf… mais il n'en sort rien de bon ! Elle rentre en pleurant."],
      ["💡", "Morale : la gentillesse et la politesse sont de vrais trésors."],
    ], questions: [
      ["Combien y a-t-il de filles appelées Kumba ?", "deux", ["une", "trois", "quatre"], "👧🏾"],
      ["Où Kumba sans maman doit-elle laver la calebasse ?", "à la mer", ["au puits", "à l'école", "au marché"], "🌊"],
      ["Qui rencontre-t-elle sur le chemin ?", "une vieille femme", ["un lion", "le roi", "un pêcheur"], "👵🏾"],
      ["Comment est Kumba sans maman avec la vieille femme ?", "gentille et polie", ["méchante", "impolie", "moqueuse"], "😊"],
      ["Que reçoit-elle ?", "un œuf magique", ["une pirogue", "un mouton", "un livre"], "🥚"],
      ["Pourquoi l'autre Kumba n'a-t-elle rien de bon ?", "parce qu'elle a été impolie", ["parce qu'elle a couru", "parce qu'elle a chanté", "parce qu'elle a dormi"], "😤"],
      ["Que nous apprend ce conte ?", "la gentillesse est un trésor", ["il faut garder les œufs", "il faut aller à la mer", "il faut être riche"], "💡"],
    ] },
  ];
  CONTES.forEach(c => ajouter("francais", { id: c.id, icone: c.icone, titre: "Conte : " + c.titre, objectif: "Écouter un conte et le comprendre", conte: { titre: c.titre, pages: c.pages }, questions: quiz(c.questions, 7) }));

  const CHANSONS = {
    etre: { titre: "La chanson du verbe être", lignes: ["Je suis", "Tu es", "Il est, elle est", "Nous sommes", "Vous êtes", "Ils sont, elles sont"] },
    avoir: { titre: "La chanson du verbe avoir", lignes: ["J'ai", "Tu as", "Il a, elle a", "Nous avons", "Vous avez", "Ils ont, elles ont"] },
    chanter: { titre: "La chanson des verbes en -er", lignes: ["Je chante", "Tu chantes", "Il chante", "Nous chantons", "Vous chantez", "Ils chantent"] },
    futur: { titre: "La chanson du futur", lignes: ["Je jouerai", "Tu joueras", "Il jouera", "Nous jouerons", "Vous jouerez", "Ils joueront"] },
    passe: { titre: "La chanson du passé composé", lignes: ["J'ai mangé", "Tu as mangé", "Il a mangé", "Nous avons mangé", "Vous avez mangé", "Ils ont mangé"] },
  };
  const PRONOMS = ["je", "tu", "il", "nous", "vous", "ils"];
  const conj = (cle, forme) => () => fois(8, () => {
    const l = CHANSONS[cle].lignes, i = r(0, 5), bonne = l[i].split(",")[0].trim(), pr = bonne.split(/[ ']/)[0];
    const fin = bonne.slice(bonne.indexOf(pr) + pr.length).replace(/^'/, "").trim() || bonne;
    const formes = l.map(x => { const b = x.split(",")[0].trim(); return b.slice(b.split(/[ ']/)[0].length).replace(/^'/, "").trim(); });
    const sujet = pr === "J" ? "Je / J'" : pr.charAt(0).toUpperCase() + pr.slice(1);
    return q("Complète : " + sujet + " …", { k: "mots", t: sujet + " ___" }, mot(fin), tirer(formes.filter(x => x !== fin), 2).map(x => mot(x)), { dire: "Complète avec le verbe " + (forme || cle) + ". " + PRONOMS[i] + "…", disposition: "trois" });
  });
  if (CI) ["etre", "avoir"].forEach(v => ajouter("francais", { id: "chanson-" + v, icone: "🎵", titre: CHANSONS[v].titre, objectif: "Chanter puis conjuguer " + v + " au présent", chanson: CHANSONS[v], questions: conj(v, v === "etre" ? "être" : v) }));
  if (CE2) [["etre", "être au présent"], ["avoir", "avoir au présent"], ["chanter", "chanter au présent"], ["futur", "jouer au futur"], ["passe", "manger au passé composé"]].forEach(([v, t]) =>
    ajouter("francais", { id: "chanson-" + v, icone: "🎵", titre: CHANSONS[v].titre, objectif: "Chanter puis conjuguer " + t, chanson: CHANSONS[v], questions: conj(v, t) }));

  const PIEGES = [
    ["Il … un ballon.", "a", ["à"]], ["Je vais … l'école.", "à", ["a"]], ["Fatou … Awa jouent.", "et", ["est"]], ["Le ciel … bleu.", "est", ["et"]],
    ["Ils … contents.", "sont", ["son"]], ["Modou range … cartable.", "son", ["sont"]], ["Les enfants … faim.", "ont", ["on"]], ["… joue au foot.", "On", ["Ont"]],
    ["Tu veux du thé … du jus ?", "ou", ["où"]], ["… habites-tu ?", "Où", ["Ou"]], ["Je mets … chaussures (les miennes).", "mes", ["mais"]], ["Il pleut, … je sors.", "mais", ["mes"]],
    ["Awa lave … mains (les siennes).", "ses", ["ces"]], ["Regarde … oiseaux là-bas !", "ces", ["ses"]],
  ];
  const MOTS_OUTILS = ["le", "la", "les", "un", "une", "et", "est", "il", "elle", "dans", "sur", "avec"];
  if (CE2) ajouter("francais", { id: "pieges", icone: "🪤", titre: "Les mots pièges", objectif: "a / à, et / est, son / sont, on / ont, ou / où…",
    questions: () => tirer(PIEGES, 8).map(([ph, b, f]) => q("Choisis le bon mot", { k: "phrase", t: ph }, mot(b), f.map(x => mot(x)), { dire: "Choisis le bon mot. " + ph.replace("…", "blanc"), disposition: "deux" })) });
  if (CI) ajouter("francais", { id: "outils", icone: "🔤", titre: "Les petits mots", objectif: "Reconnaître les mots outils : le, la, un, et…",
    questions: () => fois(8, () => { const b = hasard(MOTS_OUTILS); return q("Touche le mot « " + b + " »", null, { k: "lettre", t: b, dire: b }, tirer(MOTS_OUTILS.filter(x => x !== b), 3).map(x => ({ k: "lettre", t: x, dire: x })), { dire: "Touche le mot : " + b }); }) });

  const A_LIRE = GS ? [["🐈", "chat"], ["🐟", "poisson"], ["🥭", "mangue"], ["⚽", "ballon"], ["🍌", "banane"], ["🐑", "mouton"], ["🚗", "voiture"], ["🌙", "lune"], ["☀️", "soleil"], ["🐘", "éléphant"], ["🍚", "riz"], ["👗", "robe"]]
    : CI ? [["", "la"], ["", "mi"], ["", "lo"], ["", "ma"], ["🏍️", "moto"], ["🌙", "lune"], ["🛏️", "lit"], ["", "ami"], ["", "lama"], ["", "la mule"], ["", "il a lu"], ["", "Ali a un ami."], ["", "Lili a mal."], ["", "Mila a une moto."]]
    : [["", "Le ballon roule dans la cour."], ["", "Seydina marque un but magnifique."], ["", "Les pêcheurs partent en mer le matin."], ["", "Le baobab est un arbre géant."], ["", "Ma sœur prépare le thiéboudienne."], ["", "Nous irons à Saint-Louis pendant les vacances."], ["", "Le lion est le roi de la savane."], ["", "Les élèves écoutent la maîtresse."], ["", "Il pleut beaucoup en août."], ["", "Le car rapide est plein de couleurs."]];
  ajouter("francais", { id: "voix-haute", icone: "🎙️", titre: GS ? "Je dis le mot" : "Je lis à voix haute", objectif: GS ? "Dire le nom de l'image" : "Lire à voix haute, le téléphone écoute", voixHaute: A_LIRE, questions: () => [] });

  // ================= MATHS =================
  // Horloge en SVG
  const horloge = (h, m) => {
    const a = ((h % 12) + m / 60) * 30 * Math.PI / 180, b = m * 6 * Math.PI / 180;
    let s = '<svg viewBox="0 0 100 100" width="150" height="150"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#2b2118" stroke-width="4"/>';
    for (let i = 1; i <= 12; i++) { const t = i * Math.PI / 6; s += '<text x="' + (50 + 36 * Math.sin(t)).toFixed(1) + '" y="' + (54 - 36 * Math.cos(t)).toFixed(1) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#2b2118" font-family="sans-serif">' + i + "</text>"; }
    return s + '<line x1="50" y1="50" x2="' + (50 + 22 * Math.sin(a)).toFixed(1) + '" y2="' + (50 - 22 * Math.cos(a)).toFixed(1) + '" stroke="#e0533d" stroke-width="6" stroke-linecap="round"/>' +
      '<line x1="50" y1="50" x2="' + (50 + 34 * Math.sin(b)).toFixed(1) + '" y2="' + (50 - 34 * Math.cos(b)).toFixed(1) + '" stroke="#2f6fd1" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#2b2118"/></svg>';
  };
  const dHeure = (h, m) => m === 0 ? (h === 12 ? "midi" : h + (h > 1 ? " heures" : " heure")) : m === 30 ? h + " heures et demie" : m === 15 ? h + " heures et quart" : m === 45 ? (h % 12 + 1) + " heures moins le quart" : h + " heures " + m;
  const heure = () => GS ? quiz([
    ["Quand prends-tu ton petit-déjeuner ?", "le matin", ["la nuit", "le soir"], "🌅"],
    ["Quand dors-tu dans ton lit ?", "la nuit", ["le matin", "à midi"], "🌙"],
    ["Quand le soleil est tout en haut, c'est…", "midi", ["la nuit", "le soir"], "☀️"],
    ["Quand le soleil se couche, c'est…", "le soir", ["le matin", "midi"], "🌇"],
    ["Quand vas-tu à l'école ?", "le matin", ["la nuit", "le soir"], "🏫"],
    ["Quand vois-tu la lune et les étoiles ?", "la nuit", ["le matin", "midi"], "✨"],
    ["Quand le coq chante-t-il ?", "le matin", ["la nuit", "midi"], "🐓"],
  ], 7)() : fois(8, () => {
    const h = r(1, 12), m = CI ? 0 : hasard([0, 0, 30, 15, 45, 30]);
    const autres = new Set(); while (autres.size < 2) { const h2 = r(1, 12), m2 = CI ? 0 : hasard([0, 30, 15, 45]); if (h2 !== h || m2 !== m) autres.add(dHeure(h2, m2)); }
    return q("Quelle heure est-il ?", { k: "html", html: horloge(h, m) }, mot(dHeure(h, m)), [...autres].map(x => mot(x)), { dire: "Regarde l'horloge. La petite aiguille montre les heures. Quelle heure est-il ?", disposition: "trois" });
  });
  // Monnaie CFA
  const piece = v => '<span class="cfa' + (v >= 1000 ? " billet" : "") + '">' + v + (v >= 1000 ? " F" : "") + "</span>";
  const sous = l => l.map(piece).join("");
  const monnaie = () => fois(8, i => {
    if (CI) {
      if (i % 2 === 0) { const v = hasard([5, 10, 25, 50, 100]), f = tirer([5, 10, 25, 50, 100, 200].filter(x => x !== v), 2); return q("Touche la pièce de " + v + " francs", null, html(piece(v), v + " francs"), f.map(x => html(piece(x), x + " francs")), { disposition: "trois" }); }
      const l = tirer([5, 5, 10, 10, 10, 5], r(2, 3)), s = l.reduce((a, b) => a + b, 0);
      return q("Combien d'argent ?", { k: "html", html: sous(l) }, mot(s + " F"), tirer([s + 5, s - 5, s + 10, s - 10].filter(x => x > 0), 2).map(x => mot(x + " F")), { dire: "Compte l'argent. Combien ça fait ?", disposition: "trois" });
    }
    const t = i % 3;
    if (t === 0) { const l = tirer([25, 50, 100, 100, 200, 500, 50, 25, 250], r(3, 4)), s = l.reduce((a, b) => a + b, 0); return q("Combien d'argent ?", { k: "html", html: sous(l) }, mot(s + " F"), tirer([s + 25, s - 25, s + 50, s + 100, s - 50].filter(x => x > 0), 3).map(x => mot(x + " F")), { dire: "Compte l'argent. Combien ça fait en tout ?" }); }
    if (t === 1) { const prix = hasard([150, 175, 250, 300, 350, 400, 450]), paye = prix < 500 ? 500 : 1000, rendu = paye - prix; const art = hasard([["🥖", "Le pain"], ["🥤", "Le jus de bissap"], ["🥜", "Le sachet d'arachides"], ["🍬", "Le paquet de bonbons"]]);
      return q(art[1] + " coûte " + prix + " F. Tu donnes " + paye + " F. On te rend…", { k: "image", e: art[0] }, mot(rendu + " F"), tirer([rendu + 50, rendu - 50, rendu + 100, prix].filter(x => x > 0 && x !== rendu), 3).map(x => mot(x + " F")), { dire: art[1] + " coûte " + prix + " francs. Tu donnes " + paye + " francs. Combien te rend-on ?" }); }
    const [total, unite] = hasard([[1000, 500], [1000, 100], [2000, 1000], [2000, 500], [5000, 1000], [5000, 500], [10000, 5000], [10000, 2000]]), n = total / unite;
    return q("Dans un billet de " + total + " F, combien de " + (unite >= 1000 ? "billets" : "pièces") + " de " + unite + " F ?", { k: "html", html: piece(total) }, ch(n), tirer([n + 1, n - 1, n * 2, n + 5].filter(x => x > 0 && x !== n), 3).map(ch), { dire: "Dans un billet de " + total + " francs, combien de fois " + unite + " francs ?" });
  });
  // Mesures
  const mesures = CI ? quiz([
    ["Qui est le plus grand ?", "la girafe", ["la souris", "le chat"], "📏"], ["Qu'est-ce qui est le plus lourd ?", "l'éléphant", ["la plume", "la fourmi"], "⚖️"],
    ["Qu'est-ce qui est le plus long ?", "le serpent", ["la coccinelle", "la fourmi"], "🐍"], ["Avec quoi mesure-t-on une longueur ?", "une règle", ["une cuillère", "un verre"], "📏"],
    ["Avec quoi pèse-t-on le riz au marché ?", "une balance", ["une règle", "une montre"], "⚖️"], ["Qu'est-ce qui contient le plus d'eau ?", "le seau", ["le verre", "la cuillère"], "🪣"],
    ["Qu'est-ce qui est le plus court ?", "le crayon", ["la table", "le lit"], "✏️"],
  ], 7) : quiz([
    ["1 mètre = combien de centimètres ?", "100 cm", ["10 cm", "1 000 cm", "50 cm"], "📏"], ["1 kilogramme = combien de grammes ?", "1 000 g", ["100 g", "10 g", "500 g"], "⚖️"],
    ["1 kilomètre = combien de mètres ?", "1 000 m", ["100 m", "10 m", "10 000 m"], "🛣️"], ["Pour mesurer un terrain de foot, on utilise…", "le mètre", ["le gramme", "le litre", "le kilogramme"], "🏟️"],
    ["Pour peser un sac de riz, on utilise…", "le kilogramme", ["le mètre", "le litre", "le centimètre"], "🍚"], ["Pour mesurer l'eau d'une bouteille, on utilise…", "le litre", ["le mètre", "le gramme", "le kilomètre"], "🧴"],
    ["Pour mesurer la distance Dakar–Thiès, on utilise…", "le kilomètre", ["le centimètre", "le gramme", "le litre"], "🚌"], ["2 m = combien de cm ?", "200 cm", ["20 cm", "2 000 cm", "120 cm"], "📏"],
    ["3 kg = combien de grammes ?", "3 000 g", ["300 g", "30 g", "3 100 g"], "⚖️"], ["Que mesure une montre ?", "le temps", ["la longueur", "la masse", "la quantité d'eau"], "⌚"],
    ["1 litre et demi, c'est…", "1 L 500 mL", ["1 L 50 mL", "150 L", "15 L"], "🧃"], ["Quel est le plus lourd ?", "1 kg de sable", ["500 g de riz", "200 g de sucre", "100 g de sel"], "⚖️"],
  ], 8);
  // Formes et solides
  const FORMES = [["rond", '<svg viewBox="0 0 60 60" width="64"><circle cx="30" cy="30" r="24" fill="#2f6fd1"/></svg>'], ["carré", '<svg viewBox="0 0 60 60" width="64"><rect x="8" y="8" width="44" height="44" fill="#e0533d"/></svg>'], ["triangle", '<svg viewBox="0 0 60 60" width="64"><polygon points="30,6 55,52 5,52" fill="#2e9e5b"/></svg>'], ["rectangle", '<svg viewBox="0 0 60 60" width="64"><rect x="4" y="16" width="52" height="28" fill="#f5c518"/></svg>']];
  const formes = GS ? () => fois(8, () => { const [b, ...f] = tirer(FORMES.slice(0, 3), 3); return q("Touche le " + b[0], null, html(b[1], "le " + b[0]), f.map(x => html(x[1], "le " + x[0])), { disposition: "trois" }); })
    : quiz([["Combien de côtés a un triangle ?", "3", ["4", "5", "6"], "🔺"], ["Combien de côtés a un carré ?", "4", ["3", "5", "6"], "🟥"], ["Un carré a 4 côtés…", "de la même longueur", ["tous différents", "ronds", "très courts"], "🟥"],
      ["Combien de côtés a un hexagone ?", "6", ["4", "5", "8"], "⬡"], ["À quel solide ressemble un ballon ?", "la sphère", ["le cube", "le cylindre", "le pavé"], "⚽"], ["À quel solide ressemble un dé ?", "le cube", ["la sphère", "le cylindre", "la pyramide"], "🎲"],
      ["À quel solide ressemble une boîte de conserve ?", "le cylindre", ["le cube", "la sphère", "la pyramide"], "🥫"], ["À quel solide ressemble une brique ?", "le pavé", ["la sphère", "le cylindre", "le cône"], "🧱"],
      ["Un angle droit, c'est comme le coin…", "d'une feuille de papier", ["d'un ballon", "d'une assiette", "d'une roue"], "📐"], ["Combien de faces a un cube ?", "6", ["4", "8", "12"], "🎲"]], 8);
  // Problèmes
  const problemes = () => fois(8, () => {
    if (CI) {
      const a = r(1, 5), b = r(1, 4), plus = Math.random() < 0.6 || b > a, e = hasard(["🥭", "🐟", "⚽", "🍬"]);
      const txt = plus ? "Awa a " + a + " " + e + ". Maman lui en donne " + b + ". Combien en a-t-elle maintenant ?" : "Ali a " + a + " " + e + ". Il en mange " + b + ". Combien lui en reste-t-il ?";
      const s = plus ? a + b : a - b; return q(txt, { k: "tas", items: Array(a).fill(e) }, ch(s), tirer([s + 1, s - 1, s + 2, a].filter(x => x >= 0 && x !== s), 2).map(ch), { dire: txt, disposition: "trois" });
    }
    const t = r(0, 3); let txt, s;
    if (t === 0) { const b = r(3, 9); txt = "Seydina marque 2 buts par match. Combien de buts marque-t-il en " + b + " matchs ?"; s = 2 * b; }
    else if (t === 1) { const a = r(20, 60), b = r(5, 19); txt = "Il y a " + a + " moutons dans l'enclos. " + b + " sont vendus pour la Tabaski. Combien en reste-t-il ?"; s = a - b; }
    else if (t === 2) { const n = r(3, 6), p = hasard([25, 50, 100]); txt = "Un beignet coûte " + p + " F. Combien coûtent " + n + " beignets ?"; s = n * p; }
    else { const g = r(2, 5), c = g * r(3, 6); txt = c + " bonbons sont partagés entre " + g + " enfants. Combien chacun en reçoit-il ?"; s = c / g; }
    return q(txt, null, ch(s), tirer([s + 1, s - 1, s + 2, s * 2, s + 10].filter(x => x > 0 && x !== s), 3).map(ch), { dire: txt });
  });
  // Fractions (CE2)
  const tarte = (n, k) => {
    let s = '<svg viewBox="0 0 100 100" width="110" height="110">';
    for (let i = 0; i < n; i++) {
      const a1 = 2 * Math.PI * i / n - Math.PI / 2, a2 = 2 * Math.PI * (i + 1) / n - Math.PI / 2;
      s += '<path d="M50 50 L' + (50 + 44 * Math.cos(a1)).toFixed(2) + " " + (50 + 44 * Math.sin(a1)).toFixed(2) + " A44 44 0 0 1 " + (50 + 44 * Math.cos(a2)).toFixed(2) + " " + (50 + 44 * Math.sin(a2)).toFixed(2) + ' Z" fill="' + (i < k ? "#f08a1c" : "#fff") + '" stroke="#2b2118" stroke-width="2.5"/>';
    }
    return s + "</svg>";
  };
  const NOMS_FR = { 2: "demi", 3: "tiers", 4: "quarts", 5: "cinquièmes", 6: "sixièmes", 8: "huitièmes" };
  const fractions = () => fois(8, i => {
    const n = hasard([2, 3, 4, 4, 5, 6, 8]), k = r(1, n - 1), f = k + "/" + n;
    const autres = new Set(); while (autres.size < 3) { const n2 = hasard([2, 3, 4, 5, 6, 8]), k2 = r(1, n2 - 1); if (k2 + "/" + n2 !== f) autres.add(k2 + "/" + n2); }
    if (i % 2 === 0) return q("Quelle part de la pizza est coloriée ?", { k: "html", html: tarte(n, k) }, ch(f), [...autres].map(ch), { dire: "La pizza est coupée en " + n + " parts égales. " + k + " sont coloriées. Quelle fraction ?" });
    return q("Touche la pizza qui montre " + f, null, html(tarte(n, k), f), [...autres].slice(0, 3).map(x => html(tarte(+x.split("/")[1], +x.split("/")[0]), x)), { dire: "Touche la pizza qui montre " + k + " " + (k > 1 && n === 2 ? "demis" : NOMS_FR[n] || "sur " + n) });
  });
  // Ligne des nombres (GS, CI)
  const ligne = (max, cible, marques) => {
    const w = 300, pas = (w - 30) / max;
    let s = '<svg viewBox="0 0 ' + w + ' 70" width="100%" style="max-width:340px"><line x1="10" y1="40" x2="' + (w - 10) + '" y2="40" stroke="#2b2118" stroke-width="3"/>';
    for (let i = 0; i <= max; i++) { const x = 15 + i * pas; s += '<line x1="' + x + '" y1="32" x2="' + x + '" y2="48" stroke="#2b2118" stroke-width="2"/>' + (marques.includes(i) ? '<text x="' + x + '" y="66" font-size="13" text-anchor="middle" font-weight="700" fill="#2b2118" font-family="sans-serif">' + i + "</text>" : ""); }
    const x = 15 + cible * pas; return s + '<text x="' + x + '" y="24" font-size="20" text-anchor="middle">⬇️</text><text x="' + x + '" y="66" font-size="15" text-anchor="middle" font-weight="800" fill="#e0533d" font-family="sans-serif">?</text></svg>';
  };
  const ligneNombres = () => fois(8, i => {
    const max = GS ? 5 : hasard([10, 10, 20]), c = r(1, max - 1), pas = max === 20 ? 5 : GS ? 1 : 2;
    const marques = fois(max + 1, j => j).filter(j => j % pas === 0 && j !== c);
    if (GS && i % 2) { const s = [1, 2, 3, 4, 5], k = r(1, 3); return q("Quel nombre manque ?", { k: "mots", t: s.map((x, j) => j === k ? "?" : x).join("  ") }, ch(s[k]), tirer(s.filter(x => x !== s[k]), 2).map(ch), { disposition: "trois", dire: "Quel nombre manque dans la file : " + s.map((x, j) => j === k ? "?" : x).join(", ") }); }
    return q("Quel nombre se cache sous la flèche ?", { k: "html", html: ligne(max, c, marques) }, ch(c), tirer([c - 1, c + 1, c + 2, c - 2].filter(x => x >= 0 && x <= max), 2).map(ch), { disposition: "trois", dire: "Regarde la ligne des nombres. Quel nombre se cache sous la flèche ?" });
  });
  const tables = () => fois(8, () => { const a = r(2, 9), b = r(2, 10); return q(a + " × " + b + " = ?", null, ch(a * b), tirer([a * b + a, a * b - a, a * b + 1, a * (b + 2), a * b - 1].filter(x => x > 0 && x !== a * b), 3).map(ch), { dire: a + " fois " + b }); });

  ajouter("maths", { id: "heure", icone: "🕐", titre: GS ? "Le matin, le midi, le soir" : "Lire l'heure", objectif: GS ? "Les moments de la journée" : CI ? "Lire les heures pleines" : "Heures, demies et quarts", questions: heure });
  if (!GS) ajouter("maths", { id: "monnaie", icone: "🪙", titre: "L'argent : le franc CFA", objectif: CI ? "Reconnaître les pièces et compter" : "Compter l'argent et rendre la monnaie", questions: monnaie });
  if (!GS) ajouter("maths", { id: "mesures", icone: "📏", titre: CI ? "Long, lourd, plein" : "Les mesures", objectif: CI ? "Comparer longueurs et masses" : "Mètres, grammes, litres", questions: mesures });
  ajouter("maths", { id: "formes", icone: "🔷", titre: GS ? "Les formes" : CI ? "Formes et solides" : "Polygones et solides", objectif: "Reconnaître formes et solides", questions: formes });
  if (!GS) ajouter("maths", { id: "problemes", icone: "🧩", titre: "Petits problèmes", objectif: "Comprendre une histoire et calculer", questions: problemes });
  if (CE2) ajouter("maths", { id: "fractions", icone: "🍕", titre: "Les fractions", objectif: "Lire et reconnaître une fraction", questions: fractions });
  if (CE2) ajouter("maths", { id: "tables", icone: "✖️", titre: "Les tables de multiplication", objectif: "Tables de 2 à 9", questions: tables });
  if (!CE2) ajouter("maths", { id: "ligne", icone: "📐", titre: "La ligne des nombres", objectif: "Placer les nombres dans l'ordre", questions: ligneNombres });

  // ================= POUR ALLER PLUS LOIN (CM1 pour le CE2 ; les autres reprennent la classe du dessus) =================
  if (CE2) {
    ajouter("loin", { id: "cm1-grands", icone: "🔢", titre: "Les grands nombres", objectif: "Lire les nombres jusqu'au million", questions: quiz([
      ["Comment écrit-on « mille deux cents » ?", "1 200", ["120", "12 000", "1 020"], "🔢"], ["Comment écrit-on « dix mille » ?", "10 000", ["1 000", "100 000", "10 0000"], "🔢"],
      ["Dans 45 731, quel est le chiffre des milliers ?", "5", ["4", "7", "3"], "🔢"], ["Quel est le plus grand nombre ?", "100 001", ["99 999", "10 001", "100 000"], "🔢"],
      ["Un million, c'est…", "1 000 000", ["100 000", "10 000", "1 000"], "💰"], ["Arrondis 4 870 à la centaine :", "4 900", ["4 800", "5 000", "4 870"], "🎯"],
      ["Combien de centaines dans 3 000 ?", "30", ["3", "300", "3 000"], "🔢"], ["La population du Sénégal est d'environ…", "18 millions", ["18 mille", "180", "1 800"], "🇸🇳"],
    ], 8) });
    ajouter("loin", { id: "cm1-imparfait", icone: "⏳", titre: "L'imparfait", objectif: "Conjuguer à l'imparfait", chanson: { titre: "La chanson de l'imparfait", lignes: ["Je jouais", "Tu jouais", "Il jouait", "Nous jouions", "Vous jouiez", "Ils jouaient"] }, questions: quiz([
      ["Hier, je … au foot.", "jouais", ["jouerai", "joue", "jouait"], "⚽"], ["Autrefois, nous … à Thiès.", "habitions", ["habitons", "habiterons", "habitaient"], "🏠"],
      ["Quand il était petit, il … du lait.", "buvait", ["boit", "boira", "buvais"], "🥛"], ["Avant, vous … tôt.", "dormiez", ["dormez", "dormirez", "dormions"], "😴"],
      ["Les enfants … dans la cour.", "chantaient", ["chantait", "chantent", "chanteront"], "🎶"], ["Tu … beaucoup de livres.", "lisais", ["lis", "liras", "lisait"], "📚"],
    ], 6) });
    ajouter("loin", { id: "cm1-aires", icone: "📐", titre: "Périmètres", objectif: "Calculer le tour d'une figure", questions: () => fois(8, () => {
      const c = r(2, 9), L = r(3, 12), l = r(2, L - 1), carre = Math.random() < 0.5, s = carre ? 4 * c : 2 * (L + l);
      const txt = carre ? "Un carré a des côtés de " + c + " m. Quel est son périmètre ?" : "Un rectangle mesure " + L + " m de long et " + l + " m de large. Quel est son périmètre ?";
      return q(txt, { k: "image", e: carre ? "🟥" : "▭" }, mot(s + " m"), tirer([s + 2, s - 2, carre ? c * c : L * l, s + 4].filter(x => x > 0 && x !== s), 3).map(x => mot(x + " m")), { dire: txt });
    }) });
  }
  // Fiches : chaque leçon a un id unique par classe.
  const MONDES = [["pays", "Mon pays, le Sénégal", "🇸🇳"], ["langues", "Les langues", "🗣️"], ["francais", "Contes, chansons et lecture", "📚"], ["maths", "Maths en plus", "🧮"], ["loin", "Pour aller plus loin", "🚀"]];
  return MONDES.map(([id, titre, icone]) => ({ id, titre, icone, lecons: lecons.filter(l => l.monde === id).map(l => Object.assign({}, l, { id: classe + "-plus-" + l.id, monde: undefined })) })).filter(m => m.lecons.length);
};
