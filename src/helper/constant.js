const quotes = [
  {
    origin: "Alles was du besitzt, besitzt irgendwann dich.",
    additive: "Alles was du nicht checkst, checkt irgendwann dich",
  },
  {
    origin:
      "Von dem Geld, das wir nicht haben, kaufen wir Dinge, die wir nicht brauchen, um Leuten zu imponieren, die wir nicht mögen.",
    additive:
      "Von dem Geld, das wir nicht haben, kaufen wir Dinge, die wir nicht brauchen, um ein Niveau zu erreichen, das niemandem imponiert.",
  },
  {
    origin:
      "Wir sind Konsumenten. Wir sind Abfallprodukte der allgemeinen Lifestyle-Obsessionen!",
    additive:
      "Wir sind Dartspieler. Wir sind Abfallprodukte der allgemeinen Leistungssport-Obsessionen!",
  },
  {
    origin: "Wenn Menschen denken, dass du stirbst, hören sie dir richtig zu.",
    additive:
      "Wenn Menschen denken, dass du checkst, passen sie erst richtig auf.",
  },
  {
    origin:
      "Zuerst musst du wissen, nicht fürchten, sondern wissen, dass du einmal sterben wirst.",
    additive:
      "Zuerst musst du wissen, nicht fürchten, wissen, dass du einmal das große Singlefeld verpassen wirst.",
  },
  {
    origin:
      "Erst nachdem wir alles verloren haben, haben wir die Freiheit, alles zu tun.",
    additive:
      "Erst nachdem wir das Spiel verloren haben, haben wir die Freiheit, alles zu checken",
  },
  {
    origin:
      "Kleine Benimmfrage: Wenn ich vorbei gehe… Wende ich Ihnen den Arsch oder den Schritt zu?",
    additive:
      "Kleine Benimmfrage: Wenn ich zum Handshake gehe, habe ich da meine Darts schon geholt oder stecken die noch?",
  },
  {
    origin: "Ich will, dass du mich schlägst, so hart wie du nur kannst!",
    additive: "Ich will, dass du scorest, so hart wie du nur kannst",
  },
  {
    origin:
      "Wir wurden durch das Fernsehen aufgezogen in dem Glauben, dass wir alle irgendwann mal Millionäre werden, Filmgötter, Rockstars.",
    additive:
      "Wir wurden durch das Fernsehen aufgezogen in dem Glauben, dass wir alle irgendwann mal Millionäre werden, Filmgötter, Rockstars.",
  },
  {
    origin:
      "Werden wir aber nicht! Und das wird uns langsam klar! Und wir sind kurz, ganz kurz vorm Ausrasten.",
    additive:
      "Werden wir aber nicht! Und das wird uns langsam klar! Und wir sind kurz, ganz kurz vorm Ausrasten.",
  },
  {
    origin:
      "Wir sind die Zweitgeborenen der Geschichte, Leute. Männer ohne Zweck, ohne Ziel.",
    additive:
      "Wir sind die Zweitgeborenen der Geschichte, Leute. Menschen ohne Zweck, ohne Ziel.",
  },
  {
    origin:
      "Wir haben keinen großen Krieg, keine große Depression. Unser großer Krieg ist kein spiritueller, unsere große Depression ist unser Leben.",
    additive:
      "Wir haben keinen großen Krieg, keine große Depression. Unser großer Krieg ist ein mentaler, unsere große Depression ist die doppel 1.",
  },
  {
    origin: "Du hast mich in einer seltsamen Phase meines Lebens getroffen…",
    additive:
      "Darts hat mich in einer seltsamen Phase meines Lebens getroffen…",
  },
  {
    origin: "Willkommen im Fight Club!",
    additive: "Willkommen im Darts Fight Club!",
  },
  {
    origin:
      "Die erste Regel des Fight Club lautet: Ihr verliert kein Wort über den Fight Club!",
    additive:
      "Die erste Regel des Fight DartsClub lautet: Ihr verliert ab und zu mal ein Wort über den Darts Fight Club.",
  },
  {
    origin:
      "Die zweite Regel des Fight Club lautet: Ihr verliert kein Wort über den Fight Club!",
    additive:
      "Die zweite Regel des Fight Club lautet: Ihr verliert ab und zu mal EIN WORT über den Darts Fight Club.",
  },
];

const navigation = [
  { name: "Home", to: "/", current: 1 },
  { name: "Pyramid", to: "/pyramid", current: 2 },
  { name: "Infos", to: "/infos", current: 3 },
  { name: "Profile", to: "/profile-summary", current: 4 },
  { name: "Calendar", to: "/schedule", current: 5 },
  { name: "Events", to: "/events", current: 6 },
  { name: "Ranking", to: "/ranking-table", current: 7 },
];

const userMenuItems = [
  { name: "Your Profile", to: "/profile-summary" },
  { name: "Settings", to: "/settings" },
];

const profileMenuItems = [
  { name: "Summary", to: "/profile-summary" },
  { name: `Pyramid Achievements`, to: "/profile-achievements-pyramid" },
  { name: "Fight Club Achievements", to: "/profile-achievements-participation" },
  { name: "Personal Achievements", to: "/profile-achievements-personal" },
  { name: "My Calendar", to: "/profile-calendar" },
];

const infoTexts = [
  {
    title: "Regel1",
    text: " Ihr verliert ab und zu mal ein Wort über den Darts Fight Club.",
  },
  {
    title: "Regel2",
    text: " Ihr verliert AB UND ZU mal ein Wort über den Darts Fight Club.",
  },
  {
    title: "Regel3",
    text: " Wenn jemand 3 legs gecheckt hat, ist der Kampf vorbei.",
  },
  {
    title: "Regel4",
    text: " Es spielen jeweils nur 2.",
  },
  {
    title: "Regel5",
    text: " Nur eine Herausforderung auf einmal.",
  },
  {
    title: "Regel6",
    text: " Hemden, Hosen.",
  },
  {
    title: "Regel7",
    text: " Die Kämpfe dauern genau solange, wie vorgeschrieben.",
  },
  {
    title: "Regel8",
    text: " und letzte Regel: Wer neu ist im Fight Club, muss herausfordern.",
  },
];

const additiveTexts = [
  "1. Ihr fordert nach oben oder zur Seite.",
  "2. Die Kämpfe dauern 501DO, BO 5.",
  "3. Wer herausgefordert wird, muss reagieren.",
  "4. Jeden 28. im Monat wird der Clubchef unter den Top 4 ermittelt.",
];

// const URL = "http://localhost:4000";
const URL = 'https://backend.dartsfightclub.de';

const constant = {
  quotes,
  navigation,
  userMenuItems,
  profileMenuItems,
  infoTexts,
  additiveTexts,
  URL
};

export default constant;
