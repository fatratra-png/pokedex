import { useEffect, useState } from "react";
import { fetchPokemonDetails, fetchPokemonSpecies } from "../api/pokeApi";

export function usePokemonDetail(nameOrId) {
      const [pokemon, setPokemon] = useState(null);
      const [description, setDescription] = useState(' ');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            if (!nameOrId) return;

            let cancelled = false;
            async function load() {
                  setLoading(true);
                  setError(null);
                  setPokemon(null);
                  try {
                        const [detail, desc] = await Promise.all([
                              fetchPokemonDetails(nameOrId),
                              fetchPokemonSpecies(nameOrId),
                        ]);
                        if (!cancelled) {
                              setPokemon(detail);
                              setDescription(desc);
                        }
                  } catch (err) {
                        if (!cancelled) setError(err.message);
                  } finally {
                        if (!cancelled) setLoading(false);
                  }
            }
            load();
            return () => {
                  cancelled = true;
            };
      }, [nameOrId, setDescription]);

      return {pokemon,description,loading,error}
}
 
