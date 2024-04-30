import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AchievementBody = ({ result, achievement, max, type }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-wrap justify-center items-center gap-x-4">
      <p className="font-semibold">Achievement</p>
      <p className="opacity-70">{achievement}</p>
    </div>
    {type === "season" ? (
      <div className="flex flex-wrap justify-center items-center gap-x-4">
        <p className="font-semibold">Season</p>
        <div className="w-12 h-12">
          <CircularProgressbar
            value={(result / max) * 100}
            text={result ? result : "0"}
            styles={{
              path: {
                stroke: `rgb(34 197 94)`,
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 1s ease 0.5s",
                transformOrigin: "center center",
              },
              text: {
                fill: "#fff",
                fontFamily: "sans-serif",
                fontSize: "2.5rem",
              },
            }}
          />
        </div>
      </div>
    ) : type === "lifetime" ? (
      <div className="flex flex-wrap justify-center items-center gap-x-4">
        <p className="font-semibold">Lifetime</p>
        <div className="w-12 h-12">
          <CircularProgressbar
            value={(result / max) * 100}
            text={result ? result : "0"}
            styles={{
              path: {
                stroke: `rgb(34 197 94)`,
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 1s ease 0.5s",
                transformOrigin: "center center",
              },
              text: {
                fill: "#fff",
                fontFamily: "sans-serif",
                fontSize: "2.5rem",
              },
            }}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-wrap justify-center items-center gap-x-4">
        <p className="font-semibold">Lifetime / Season</p>
        <div className="flex items-center gap-4">
          {
            <div className="w-12 h-12">
              <CircularProgressbar
                value={(result?.lifetime / max) * 100}
                text={result?.lifetime ? result?.lifetime : "0"}
                styles={{
                  path: {
                    stroke: `rgb(34 197 94)`,
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 1s ease 0.5s",
                    transformOrigin: "center center",
                  },
                  text: {
                    fill: "#fff",
                    fontFamily: "sans-serif",
                    fontSize: "2.5rem",
                  },
                }}
              />
            </div>
          }
          {
            <div className="w-12 h-12">
              <CircularProgressbar
                value={(result?.season / max) * 100}
                text={result?.season ? result?.season : "0"}
                styles={{
                  path: {
                    stroke: `rgb(34 197 94)`,
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 1s ease 0.5s",
                    transformOrigin: "center center",
                  },
                  text: {
                    fill: "#fff",
                    fontFamily: "sans-serif",
                    fontSize: "2.5rem",
                  },
                }}
              />
            </div>
          }
        </div>
      </div>
    )}
  </div>
);

export default AchievementBody;
