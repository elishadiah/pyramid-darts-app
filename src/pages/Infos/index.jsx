import { useEffect } from "react";
import constant from "../../helper/constant";
import Layout from "../../components/Layout";

const Infos = () => {
  useEffect(() => {}, []);

  return (
    <Layout currentNo={3}>
      <div className="mb-12">
        <div className="flex justify-center mb-4">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 bg-white border border-gray-200 shadow-md shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-800 py-2 px-8 rounded-md">
            Regeln
          </h3>
        </div>
        <ul className="space-y-3">
          {constant.infoTexts.map((item, index) => (
            <li
              key={index}
              className="overflow-hidden text-left rounded-md bg-white px-6 py-4 shadow dark:bg-gray-900 dark:text-gray-100"
            >
              <span className="text-gray-400 dark:text-gray-600">
                {item.title}
                {": "}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex justify-center mb-4">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 bg-white border border-gray-200 shadow-md shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-800 py-2 px-8 rounded-md">
            Zusatz
          </h3>
        </div>
        <ul className="space-y-3">
          {constant.additiveTexts.map((item, index) => (
            <li
              key={index}
              className="overflow-hidden text-left rounded-md bg-white px-6 py-4 shadow dark:bg-gray-900 dark:text-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Infos;
