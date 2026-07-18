import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <div className="device">
      <div className="device_top">
        <span className="device_lens" aria-hidden="true" />
        <span
          className="device_light device_light--yellow"
          aria-hidden="true"
        />
        <span className="device_light device_light--green" aria-hidden="true" />
        <h1 className="device_title">Pokedex</h1>
      </div>

      <main className="device_screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:name" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
