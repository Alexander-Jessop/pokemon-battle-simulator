import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPokemonDetails } from "../util/fetchPokemonList";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import FeatureBlock from "../components/FeatureBlock";

const LandingPage = () => {
  const [pokemonIds, setPokemonIds] = useState<number[]>([]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const getRandomPokemonIds = () => {
      const ids: number[] = [];
      while (ids.length < 4) {
        const randomId = Math.floor(Math.random() * 649) + 1;
        if (!ids.includes(randomId)) {
          ids.push(randomId);
        }
      }
      return ids;
    };

    if (pokemonIds.length === 0) {
      setPokemonIds(getRandomPokemonIds());
    }
  }, [pokemonIds]);

  const {
    data: pokemonData,
    isLoading,
    error,
  } = useQuery(["pokemonData", pokemonIds], () =>
    fetchPokemonDetails(pokemonIds)
  );

  if (isLoading || pokemonIds.length === 0) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={(error as Error).message} />;
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-gradient-to-b from-primary-400
    to-primary-700"
    >
      <div
        className="container mx-auto flex flex-1 flex-col
      justify-center text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-white">
          Pokemon Battle Simulator
        </h1>
        <h2 className="mb-4 text-2xl text-white">
          Unleash Your Inner Pokémon Master!
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-white">
          Step into our virtual arena and witness your Pokémon come alive with
          stunning graphics and animations. Each attack, each move, is brought
          to life.
        </p>
      </div>

      <div className="container mx-auto flex flex-1 justify-center px-4">
        <div
          className="grid justify-items-center gap-4 md:grid-cols-2
        lg:grid-cols-3"
        >
          {pokemonData && (
            <>
              <div className="animate-fade-in">
                <FeatureBlock
                  pokemon={pokemonData[0]}
                  title="Pokémon Adventure!"
                  description="Embark on an immersive and enchanting
                  world.Gather a powerful team of Pokémon and embark
                  on an unforgettable adventure that will test your
                  skills, bravery, and determination. Where will you
                  go?"
                  underConstruction={true}
                />
              </div>
              <div className="animate-fade-in">
                <FeatureBlock
                  pokemon={pokemonData[1]}
                  title="Solo Pokemon Battle!"
                  description="Choose your dream team of Pokémon from
                  five different generations and engage in heart-pounding
                  battles against our state-of-the-art AI opponents.
                  Will you emerge as the victorious Pokémon Master?"
                  to="/pokemon-selection"
                />
              </div>
              <div className="animate-fade-in">
                <FeatureBlock
                  pokemon={pokemonData[2]}
                  title="Battle Your Friends!"
                  description="Gather your closest friends, select your
                  dream team of Pokémon from five different generations,
                  and let the battles begin! It's time to settle the score
                  and determine who among you is the true Pokémon Champion!"
                  underConstruction={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
