import { Link } from "react-router-dom";
import { spriteUrl } from "../api/pokeApi";

export default function PokemonCard() {
  const { is, name } = pokemon;
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
