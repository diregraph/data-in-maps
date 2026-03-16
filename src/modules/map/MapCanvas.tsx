"use client"

import { useRef } from "react"

import "maplibre-gl/dist/maplibre-gl.css"
import Map, {
  NavigationControl,
  type MapRef as RMapRef,
} from "react-map-gl/maplibre"

import { useMapStore } from "./store"

// TODO: replace with createTileProvider().getStyleURL() once tile-providers are wired up
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty"

/**
 * MapCanvas — the MapLibre GL JS wrapper.
 *
 * Always consumed via dynamic import with ssr: false at the usage site.
 * Never import this directly into a Server Component.
 */
export function MapCanvas() {
  const { viewport, setViewport, setReady, setMapInstance } = useMapStore()
  const internalRef = useRef<RMapRef>(null)

  function handleLoad() {
    setMapInstance(internalRef.current?.getMap() ?? null)
    setReady(true)
  }

  return (
    <Map
      ref={internalRef}
      longitude={viewport.longitude}
      latitude={viewport.latitude}
      zoom={viewport.zoom}
      bearing={viewport.bearing ?? 0}
      pitch={viewport.pitch ?? 0}
      mapStyle={MAP_STYLE}
      onMove={(e) =>
        setViewport({
          longitude: e.viewState.longitude,
          latitude: e.viewState.latitude,
          zoom: e.viewState.zoom,
          bearing: e.viewState.bearing,
          pitch: e.viewState.pitch,
        })
      }
      onLoad={handleLoad}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />
    </Map>
  )
}
