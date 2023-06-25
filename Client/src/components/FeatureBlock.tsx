import React, { useState } from "react";
import PokemonImage from "./pokemon/PokemonVsImage";
import { IPokeDetails } from "../types/PokemonType";
import { Link } from "react-router-dom";

interface Props {
  pokemon: IPokeDetails;
  title: string;
  description: string;
  to?: string;
  underConstruction?: boolean;
}

const FeatureBlock = ({
  pokemon,
  title,
  description,
  to,
  underConstruction,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="mx-auto mb-12 max-w-sm lg:mb-0">
      <div className="rounded-lg bg-secondary-700 shadow-lg">
        <div className="flex justify-center">
          <div
            className="-mt-8 inline-block rounded-full bg-primary-100
          p-4 text-white shadow-md transition-colors hover:bg-primary-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {to ? (
              <Link to={to}>
                <PokemonImage pokemon={pokemon} ringColor="ring-blue-500" />
              </Link>
            ) : (
              <PokemonImage pokemon={pokemon} ringColor="ring-blue-500" />
            )}
            {underConstruction && isHovered && (
              <div
                className="absolute rounded-md bg-gray-800 p-2 text-xs
              text-white"
              >
                Under Construction
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <h5 className="mb-4 text-center text-lg font-semibold text-white">
            {title}
          </h5>
          <p className="mb-4 text-center text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureBlock;
