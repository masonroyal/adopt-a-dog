import * as React from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import styles from './SearchMap.module.scss';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';

const zoom = 13;

function SearchMap({ setGeo }) {
  const center = new LatLng(33.5088, -86.8084);

  return (
    <div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DisplayPosition center={center} setGeo={setGeo} />
      </MapContainer>
    </div>
  );
}

function DisplayPosition({ center, setGeo }) {
  const map = useMap();
  const [position, setPosition] = React.useState(map.getCenter());

  useMapEvents({
    move() {
      setPosition(map.getCenter());

      const bounds = map.getBounds();
      const topLeft = bounds.getNorthWest();
      const bottomRight = bounds.getSouthEast();

      setGeo({
        top_left: {
          lat: parseFloat(bounds.getNorth().toFixed(3)),
          lon: parseFloat(bounds.getWest().toFixed(3)),
        },
        bottom_right: {
          lat: parseFloat(bounds.getSouth().toFixed(3)),
          lon: parseFloat(bounds.getEast().toFixed(3)),
        },
      });
    },
  });

  const onClick = React.useCallback(() => {
    map.setView(center, zoom);
  }, [map, center]);

  return (
    <div>
      <p>
        latitude: {position.lat.toFixed(4)}, longitude:{' '}
        {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
      </p>
    </div>
  );
}

export default SearchMap;
