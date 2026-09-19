"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"

export const cities: { name: string; location: [number, number] }[] = [
  { name: "Dallas", location: [32.7767, -96.7970] }, { name: "Fort Worth", location: [32.7555, -97.3308] },
  { name: "Plano", location: [33.0198, -96.6989] }, { name: "Frisco", location: [33.1507, -96.8236] },
  { name: "McKinney", location: [33.1972, -96.6398] }, { name: "Irving", location: [32.8140, -96.9489] },
  { name: "Arlington", location: [32.7357, -97.1081] }, { name: "Carrollton", location: [32.9756, -96.8899] },
  { name: "Richardson", location: [32.9483, -96.7299] }, { name: "Allen", location: [33.1032, -96.6706] },
]
function MapFocus({ selected }: { selected: string }) {
  const map = useMap()
  useEffect(() => { const city = cities.find(c => c.name === selected); if (city) map.flyTo(city.location, 11, { animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches, duration: 0.8 }) }, [selected, map])
  return null
}
export default function ServiceMap({ selected }: { selected: string }) {
  return <MapContainer center={[32.96, -96.96]} zoom={9} scrollWheelZoom={false} className="coverage-map" aria-label="Map of the illustrative Dallas–Fort Worth service area"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapFocus selected={selected} />{cities.map(city => <CircleMarker key={city.name} center={city.location} radius={selected === city.name ? 9 : 5} pathOptions={{ color: "var(--primary)", fillColor: "var(--primary)", fillOpacity: 0.8, weight: 2 }}><Tooltip direction="top" permanent={city.name === "Dallas" || city.name === "Fort Worth" || city.name === selected}>{city.name}</Tooltip></CircleMarker>)}</MapContainer>
}
