import { QueryClient } from "react-query";
import { fetchPokemonList } from "./fetchPokemonList";

export const prefetchPokemonList = async (
  queryClient: QueryClient,
  currentGeneration: number,
  page: number,
  limit: number
) => {
  await queryClient.prefetchQuery(["pokemonList", page, limit], () =>
    fetchPokemonList(currentGeneration, page, limit)
  );
};
