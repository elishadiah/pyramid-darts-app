import Header from "../../components/Header";
import logoImg from "../../assets/img/fc_logo.png";
import { useEffect, useState } from "react";
import constant from "../../helper/constant";

const Home = () => {
  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const [quote, setQuote] = useState(constant.quotes[0]);

  useEffect(() => {
    setQuote(constant.quotes[getRandomInt(0, constant.quotes.length)]);
  }, []);

  return (
    <div className="relative sm:pb-24 text-gray-900 dark:text-gray-100 dark:bg-gray-800 h-screen">
      <div className="relative">
        <Header current={1} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div className="flex flex-col items-center mb-12 mt-24">
            <img className="w-80" src={logoImg} alt="logo-img" />
          </div>
          <div className="flex flex-col items-center mb-12">
            <h1 className="header-text text-6xl w-5/6">Darts Fight Club</h1>
          </div>
          <div className="text-xl shadow-md shadow-gray-300 border border-gray-200 p-4 rounded-md dark:border-gray-800 dark:shadow-gray-700">
            <p>{quote.origin}</p>
            <p>{quote.additive}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
