import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Flex } from '@chakra-ui/react';


export default function Map() {

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Latitude: {position.lat} - Longitude: {position.lng}</Popup>
      </Marker>
    )
  }
  return (
    <Flex my={2} mx='auto'>
      <MapContainer center={[-0.12625,  -67.0745186]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "30rem", width: "50rem" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVucnlsZWFvIiwiYSI6ImNsZHAwbng0aTBzdXozb280Y3ZtcnQzY3AifQ.X-Bxo29mmk6yZzLYRnfo4w`}
        />
        <LocationMarker />
      </MapContainer>
    </Flex>
  );
}
