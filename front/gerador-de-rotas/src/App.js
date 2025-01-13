import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';


const App = () => {
  const [startPoint, setStartPoint] = useState("");
  const [distance, setDistance] = useState("");
  const [route, setRoute] = useState(null);

  const handleGenerateRoute = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate-route", {
        startPoint,
        distance: parseFloat(distance),
        userId: 1, // ID de exemplo
      });
      setRoute(response.data);
    } catch (error) {
      console.error("Erro ao gerar rota:", error);
    }
  };

  return (
    <div className="container">
      <h1>Gerador de Rotas</h1>
      <div>
        <label>Ponto de Partida:</label>
        <input
          type="text"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          placeholder="Ex.: Avenida Paulista, SP"
        />
      </div>
      <div>
        <label>Distância (km):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Ex.: 5"
        />
      </div>
      <button onClick={handleGenerateRoute}>Gerar Rota</button>
  
      {route && (
        <div className="route-info">
          <h2>Rota Gerada</h2>
          <p>Confira a rota abaixo:</p>
          <div className="map-container">
            <MapContainer
              center={route.startPoint.coordinates}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={route.startPoint.coordinates}>
                <Popup>Ponto de Partida</Popup>
              </Marker>
              <Polyline positions={route.path} color="blue" />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default App;
