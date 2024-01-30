import Header from "../../components/Header";
import logoImg from "../../assets/img/fc_logo.png";

const Home = () => {
  return (
    <div>
      <Header current={1} />
      <div className="flex justify-center items-center">
        <img src={logoImg} className="w-auto h-32" alt="logo-img" />
      </div>
      <div className="p-8 text-gray-900 dark:text-white">
        <h1 className="text-xl font-bold mt-8 mb-4">Darts Fight Club</h1>
        <p className="text-md font-normal mb-4">
          "Alles was du nicht checkst, checkt irgendwann dich"
        </p>
        <p className="text-md font-normal mb-4">
          "Von dem Geld, das wir nicht haben, kaufen wir Dinge, die wir nicht
          brauchen, um ein Niveau zu erreichen, das niemandem imponiert."
        </p>
        <p className="text-md font-normal mb-4">
          "Wir sind Dartspieler. Wir sind Abfallprodukte der allgenmeinen
          Leistungssport-Obsessionen!"
        </p>
        <p className="text-md font-normal mb-4">
          "Wenn Menschen denken, dass du checkst, passen sie erst richtig auf."
        </p>
        <p className="text-md font-normal mb-4">
          "Zuerst musst du wissen, nicht fürchten, wissen, dass du einmal das
          große Singlefeld verpassen wirst. "
        </p>
      </div>
    </div>
  );
};

export default Home;
