export default function Loader({ label = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader_ball" />
      <span>{label}</span>
    </div>
  );
}
