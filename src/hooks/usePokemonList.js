import { useEffect, useState, useCallback } from "react";
import { fetchPokemonPage, extractPokemonIdFromUrl } from "../api/pokeApi";

const PAGE_SIZE = 24;

export function usePokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (currentOffset) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonPage(PAGE_SIZE, currentOffset);
      const withIds = data.results.map((p) => ({
        name: p.name,
        id: extractPokemonIdFromUrl(p.url),
      }));
      setPokemon((prev) => [...prev, ...withIds]);
      setHasMore(data.results.length === PAGE_SIZE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(offset);
  }, [offset, loadPage]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + PAGE_SIZE);
    }
  };

  return { pokemon, loading, error, hasMore, loadMore };
}


