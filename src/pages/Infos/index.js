import Header from "../../components/Header";

const Infos = () => {
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
  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={3} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div className="mb-12">
            <div className="flex justify-center mb-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 bg-white border border-gray-200 shadow-md shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-800 py-2 px-8 rounded-md">
                Regeln
              </h3>
            </div>
            <ul className="space-y-3">
              {infoTexts.map((item, index) => (
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
              {additiveTexts.map((item, index) => (
                <li
                  key={index}
                  className="overflow-hidden text-left rounded-md bg-white px-6 py-4 shadow dark:bg-gray-900 dark:text-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;
