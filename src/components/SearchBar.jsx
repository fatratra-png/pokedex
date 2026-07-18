export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar">
      <span className="search-bar_led" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a pokemon"
        aria-label="Search a pokemon by its name"
      />
      {value && (
        <span className="search-bar_count">
          {resultCount} result{resultCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
