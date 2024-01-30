import Header from "../../components/Header";
import { BackgroundImage } from "../../components/BackgroundImage";

const Home = () => {
  return (
    <div className="relative sm:pb-24">
      <BackgroundImage className="-bottom-14 -top-36" />
      <div className="relative">
        <Header current={1} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">DeceptiConf - </span> Welkom bij de
            ultieme dartspeluitdaging!
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
            <p>
              Ben je klaar om je nauwkeurigheid, precisie en strategie op het
              dartbord te testen? Zoek niet verder! Onze dartspeluitdaging is
              ontworpen om je vaardigheden tot het uiterste te drijven en je een
              onvergetelijke ervaring te bezorgen.
            </p>
            <p>
              Of je nu een beginner of een doorgewinterde professional bent, ons
              spel is ontworpen voor alle vaardigheidsniveaus. Scherp je doel en
              gooi je pijlen met precisie om de roos te raken. Daag jezelf uit
              om de hoogste scores te halen en te concurreren met vrienden,
              familie of zelfs spelers van over de hele wereld.
            </p>
            <p>
              Dus, ben jij klaar om de Challenge aan te gaan? Pak je darts,
              richt goed en laat het spel beginnen! Maak je klaar om de sensatie
              te ervaren van het raken van de roos, het veroveren van piramides
              en het worden van een dartlegende. Begin vandaag nog aan je reis
              en kijk of jij het in je hebt om naar de top te stijgen in de
              wereld van Challenge!
            </p>
          </div>

          {/* <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ["Speakers", "18"],
              ["People Attending", "2,091"],
              ["Venue", "Staples Center"],
              ["Location", "Los Angeles"],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
