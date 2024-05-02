const SummaryStaticCard = ({result}) => {
    console.log('profile--card-->>>', result)
  return (
    <div className="flex flex-wrap gap-4 lg:justify-between">
      <div className="border border-t-4 border-t-green-600 p-4 rounded-md w-full lg:w-48p">
        <p className="font-bold text-left text-2xl border border-0 border-b-2 pb-2">
          Overall
        </p>
        <div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">Average</p>
            <p className="p-2 text-xl font-medium">{result?.overall?.MatchAvg}</p>
          </div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">Doubles</p>
            <p className="p-2 text-xl font-medium">{result?.overall?.Doubles}</p>
          </div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">First 9</p>
            <p className="p-2 text-xl font-medium">{result?.overall?.First9Avg}</p>
          </div>
        </div>
      </div>
      <div className="border border-t-4 border-t-green-600 p-4 rounded-md w-full lg:w-48p">
        <p className="font-bold text-left text-2xl border border-0 border-b-2 pb-2">
          Current Month
        </p>
        <div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">Average</p>
            <p className="p-2 text-xl font-medium">{result?.season?.matchAvg}</p>
          </div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">Doubles</p>
            <p className="p-2 text-xl font-medium">{result?.season?.doubles}</p>
          </div>
          <div className="py-2 flex justify-between">
            <p className="p-2 text-xl font-semibold">First 9</p>
            <p className="p-2 text-xl font-medium">{result?.season?.first9Avg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStaticCard;
