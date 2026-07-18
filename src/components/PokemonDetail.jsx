import { typeColor } from "../constants/types";
import { spriteUrl } from "../api/pokeApi";

export default function PokemonDetail({ pokemon, description }) {
  const paddedId = String(pokemon.id).padStart(3, "0");
  const mainType = pokemon.types[0].type.name;
  const accent = typeColor(mainType);

  return (
    <div className="detail" style={{ "--accent": accent }}>
      <div className="detail_header">
        <span className="detail_id">#{paddedId}</span>
        <h1>{pokemon.name}</h1>
      </div>
      <div className="detail_types">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="type_badge"
            style={{ backgroundColor: typeColor(t.type.name) }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
      <img
        className="detail_sprite"
        src={spriteUrl(pokemon.id)}
        alt={pokemon.name}
      />
      {description && <p className="detail_description">{description}</p>}
      <div className="detail_meta">
        <div>
          <span className="detail_meta-label">Height</span>
          <span>{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div>
          <span className="detail_meta-label">Weight</span>
          <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
      </div>
      <h2>Stats</h2>
      <div className="detail_stats">
        {pokemon.stats.map((s) => (
          <div key={s.stat.name} className="stat_row">
            <span className="stat-row_label">
              {s.stat.name.replace("-", " ")}
            </span>
            <div className="stat-row_bar">
              <div
                className="stat-row_fill"
                style={{
                  width: `${Math.min(100, (s.base_stat / 180) * 100)}%`,
                }}
              />
            </div>
            <span className="stat-row_value">{s.base_stat}</span>
          </div>
        ))}
      </div>
      <h2>Abilities</h2>
      <ul className="detail_abilities">
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name} className="detail_ability">
            {a.ability.name.replace("-", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
