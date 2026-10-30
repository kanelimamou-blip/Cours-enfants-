// Synchronisation commune (applis enfants et appli Papa) via Firebase, chargé à la demande.
window.Synchro = (function () {
  const V = "10.12.2";
  let pret = null;
  const charger = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  function demarrer() {
    if (!window.FIREBASE_CONFIG) return Promise.resolve(null);
    if (pret) return pret;
    pret = (async () => {
      const base = "https://www.gstatic.com/firebasejs/" + V + "/";
      await charger(base + "firebase-app-compat.js");
      await Promise.all([charger(base + "firebase-auth-compat.js"), charger(base + "firebase-firestore-compat.js")]);
      if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
      await firebase.auth().signInAnonymously();
      return firebase.firestore();
    })().catch(e => { pret = null; console.warn("Synchro indisponible", e); return null; });
    return pret;
  }
  function nouveauCode() {
    const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = crypto.getRandomValues(new Uint8Array(12));
    const c = [...r].map(x => a[x % a.length]).join("");
    return c.slice(0, 4) + "-" + c.slice(4, 8) + "-" + c.slice(8);
  }
  const normaliser = c => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^(.{4})(.{4})(.{4})$/, "$1-$2-$3");
  const valide = c => /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(c);
  return { demarrer, nouveauCode, normaliser, valide };
})();
