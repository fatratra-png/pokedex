import { Link, useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import Loader from "../components/Loader";
import PokemonDetail from "../components/PokemonDetail";

export default function DetailPage() {
  const { name } = useParams();
  const { pokemon, description, loading, error } = usePokemonDetail(name);

  return <div className="screen">
      <Link to="/" className="back-link">
        &larr; Back to list
      </Link>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {pokemon && <PokemonDetail pokemon={pokemon} description={description} />}
    </div>;
}
