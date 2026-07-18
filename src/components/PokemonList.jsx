import PokemonCard from "./PokemonCard";
import Loader from "./Loader";

export default function PokemonList({
  pokemons,
  loading,
  error,
  hasMore,
  onLoadMore,
  isFiltering,
}) {
  if (error) {
    return <p className="error-box">Impossible to load the pokemons:{error}</p>;
  }
  if (loading && pokemons.length === 0) {
    return <Loader label="Connecting to the Pokedex..." />;
  }
  if (pokemons.length === 0) {
    return <p className="empty-box">No pokemon matching.</p>;
  }
  return (
    <>
      <div className="poke-grid">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      {hasMore && !isFiltering && (
        <button className="load-more" onClick={onLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
