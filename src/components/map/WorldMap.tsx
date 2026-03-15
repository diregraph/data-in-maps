"use client";

import { useRef } from "react";
import Map, { NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Free vector tiles via OpenFreeMap — no API key required
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function WorldMap() {
  const mapRef = useRef(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 20,
        zoom: 2,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={MAP_STYLE}
    >
      <NavigationControl position="top-right" />
    </Map>
  );
}
