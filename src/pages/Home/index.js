import Header from "../../components/Header";
import logoImg from "../../assets/img/fc_logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const texts = [
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
      origin:
        "Wenn Menschen denken, dass du stirbst, hören sie dir richtig zu.",
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
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-100 dark:bg-gray-800 h-screen">
      <div className="relative">
        <Header current={1} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div className="flex flex-col items-center mb-12 mt-24">
            <img className="w-80" src={logoImg} alt="logo-img" />
          </div>
          <div className="flex flex-col items-center mb-12">
            <h1 className="header-text text-6xl w-5/6">Darts Fight Club</h1>
          </div>

          <Slider {...settings}>
            {texts.map((item, index) => (
              <div key={index} className="slider-wrapper">
                <div className="max-w-xl rounded-lg flex shadow-md shadow-gray-600 m-2">
                  <div className="w-2/5 flex items-center">
                    <img
                      className="object-cover w-full p-4"
                      src={logoImg}
                      alt="card-img"
                    />
                  </div>
                  <div className="px-6 py-4 w-3/5 flex flex-col justify-center">
                    <p className="mb-2 text-md leading-normal text-justify text-gray-900 dark:text-gray-100">
                      {item.origin}
                    </p>
                    <p className="mb-2 text-md leading-normal text-justify text-gray-400 dark:text-gray-400">
                      {item.additive}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
