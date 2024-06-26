import { useEffect, useState } from "react";
import logoImg from "../../assets/img/fc_logo.png";
import constant from "../../helper/constant";
import { getRandomInt } from "../../helper/helper.js";
import images from "../../helper/images.js";
import TopPlaces from "../../components/Home/TopPlaces.jsx";
import Layout from "../../components/Layout.jsx";

const Home = () => {
  const [quote, setQuote] = useState(constant.quotes[0]);

  useEffect(() => {
    setQuote(constant.quotes[getRandomInt(0, constant.quotes.length)]);
  }, []);

  return (
    <Layout currentNo={1}>
      <div className="flex flex-col items-center mb-12 mt-24">
        <img className="w-80" src={logoImg} alt="logo-img" />
      </div>
      <div className="flex flex-col items-center mb-12">
        <h1 className="header-text text-6xl w-5/6">Darts Fight Club</h1>
      </div>
      <div className="flex flex-wrap lg:gap-4 items-center">
        <div className="flex lg:flex-1 lg:h-48 items-center gap-4 text-md sm:text-xl md:text-2xl text-white text-left mx-auto font-semibold bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end shadow-md shadow-gray-300 border border-gray-200 p-4 mb-4 rounded-xl dark:border-gray-800 dark:shadow-gray-700">
          <div className="w-1/5">
            <img className="w-40" src={images.MOVIE} alt="board" />
          </div>
          <p className="w-4/5">{quote.origin}</p>
        </div>
        <div className="flex lg:flex-1 lg:h-48 items-center gap-4 text-xl md:text-2xl text-white text-left mx-auto font-semibold bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end shadow-md shadow-gray-300 border border-gray-200 p-4 mb-4 rounded-xl dark:border-gray-800 dark:shadow-gray-700">
          <div className="w-1/5">
            <img className="w-40" src={images.BOARD3} alt="board" />
          </div>
          <p className="w-4/5">{quote.additive}</p>
        </div>
      </div>
      <TopPlaces current={true} />
      <TopPlaces current={false} />
    </Layout>
  );
};

export default Home;
