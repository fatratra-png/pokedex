import { Link } from "react-router-dom";
import { spriteUrl } from "../api/pokeApi";

// FIX: PokemonCard must receive the `pokemon` prop (passed by PokemonList as pokemon={p}).
// Previously the component had no parameters and referenced an undefined `pokemon`,
// throwing on `pokemon.is` and crashing the whole tree (app would flash then disappear).
export default function PokemonCard({ pokemon }) {
  const { id, name } = pokemon;
  const paddedId = String(id).padStart(3, "0");

  return (
    <Link to={`/pokemon/${name}`} className="poke-card">
      <span className="poke-card_id">#{paddedId}</span>
      <img
        src={spriteUrl(id)}
        alt={name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
        }}
      />
      <span className="poke-card_name">{name}</span>
    </Link>
  );
}
