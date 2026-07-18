import { useMemo, useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";

export default function HomePage() {
  const { pokemons, loading, error, hasMore, onLoadMore } = usePokemonList();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return pokemons;
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [pokemons, query]);

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
        onLoadMore={onLoadMore}
        isFiltering={!!query.trim().length > 0}
      />
    </div>
  );
}
