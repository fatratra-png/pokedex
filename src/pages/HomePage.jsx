import { useMemo, useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";

export default function HomePage() {
  const { pokemon, loading, error, hasMore, loadMore } = usePokemonList();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return pokemon;
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [pokemon, query]);

  return (
    <div className="screen">
      <SearchBar
        value={query}
        onChange={setQuery}
        resultCount={filtered.length}
      />
      <PokemonList
        pokemons={filtered}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
        // FIX: compute a real boolean instead of `!!x.length > 0` (which compares a
        // boolean to 0 and only worked by coincidence).
        isFiltering={query.trim().length > 0}
      />
    </div>
  );
}
