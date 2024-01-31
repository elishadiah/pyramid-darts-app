import Header from "../../components/Header";

const Home = () => {
  const texts = [
    "Alles was du besitzt, besitzt irgendwann dich.",
    "Von dem Geld, das wir nicht haben, kaufen wir Dinge, die wir nicht brauchen, um Leuten zu imponieren, die wir nicht mögen.",
    "Wir sind Konsumenten. Wir sind Abfallprodukte der allgemeinen Lifestyle-Obsessionen!",
    "Wenn Menschen denken, dass du stirbst, hören sie dir richtig zu.",
    "Zuerst musst du wissen, nicht fürchten, sondern wissen, dass du einmal sterben wirst.",
    "Erst nachdem wir alles verloren haben, haben wir die Freiheit, alles zu tun.",
    "Kleine Benimmfrage: Wenn ich vorbei gehe… Wende ich Ihnen den Arsch oder den Schritt zu?",
    "Ich will, dass du mich schlägst, so hart wie du nur kannst!",
    "Wir wurden durch das Fernsehen aufgezogen in dem Glauben, dass wir alle irgendwann mal Millionäre werden, Filmgötter, Rockstars. Werden wir aber nicht! Und das wird uns langsam klar! Und wir sind kurz, ganz kurz vorm Ausrasten.",
    "Wir sind die Zweitgeborenen der Geschichte, Leute. Männer ohne Zweck, ohne Ziel. Wir haben keinen großen Krieg, keine große Depression. Unser großer Krieg ist kein spiritueller, unsere große Depression ist unser Leben.",
    "Du hast mich in einer seltsamen Phase meines Lebens getroffen…",
    "Willkommen im Fight Club! Die erste Regel des Fight Club lautet: Ihr verliert kein Wort über den Fight Club! Die zweite Regel des Fight Club lautet: Ihr verliert kein Wort über den Fight Club!",
  ];
  return (
    <div className="relative sm:pb-24 bg-indigo-50 dark:bg-gray-800">
      <div className="relative">
        <Header current={1} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl dark:text-gray-200">
            <span className="sr-only">DeceptiConf - </span> Willkommen zur
            ultimativen Dartspiel-Herausforderung!
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900 text-left dark:text-gray-300">
            <p>Alles was du nicht checkst, checkt irgendwann dich</p>
            <p>
              Von dem Geld, das wir nicht haben, kaufen wir Dinge, die wir nicht
              brauchen, um ein Niveau zu erreichen, das niemandem imponiert.
            </p>
            <p>
              Wir sind Dartspieler. Wir sind Abfallprodukte der allgemeinen
              Leistungssport-Obsessionen!
            </p>
            <p>
              Wenn Menschen denken, dass du checkst, passen sie erst richtig
              auf.
            </p>
            <p>
              Zuerst musst du wissen, nicht fürchten, wissen, dass du einmal das
              große Singlefeld verpassen wirst.
            </p>
            <p>
              Erst nachdem wir das Spiel verloren haben, haben wir die Freiheit,
              alles zu checken
            </p>
            <p>
              Kleine Benimmfrage: Wenn ich zum Handshake gehe, habe ich da meine
              Darts schon geholt oder stecken die noch?
            </p>
            <p>Ich will, dass du scorest, so hart wie du nur kannst</p>
            <p>
              Wir wurden durch das Fernsehen aufgezogen in dem Glauben, dass wir
              alle irgendwann mal Profis werden, Bühnenspieler, Rockstars.
              Werden wir aber nicht! Und das wird uns langsam klar! Und wir sind
              kurz, ganz kurz vorm Ausrasten.
            </p>
            <p>
              Wir sind die Zweitgeborenen der Geschichte, Leute. Menschen ohne
              Zweck, ohne Ziel. Wir haben keinen großen Krieg, keine große
              Depression. Unser großer Krieg ist ein mentaler, unsere große
              Depression ist die doppel 1.
            </p>
            <p>
              Darts hat mich in einer seltsamen Phase meines Lebens getroffen…
            </p>
            <p>
              Willkommen im Darts Fight Club! Die erste Regel des Fight
              DartsClub lautet: Ihr verliert ab und zu mal ein Wort über den
              Darts Fight Club. Die zweite Regel des Fight Club lautet: : Ihr
              verliert ab und zu mal EIN WORT über den Darts Fight Club.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </div>
  );
};

export default Home;
