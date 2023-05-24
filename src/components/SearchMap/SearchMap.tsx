import * as React from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styles from './SearchMap.module.scss';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';

interface SearchMapProps {
  setGeo: React.Dispatch<{}>;
}

function SearchMap({ setGeo }: SearchMapProps) {
  const center = new LatLng(33.5088, -86.8084);
  const zoom = 13;

  return (
    <div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MemoDisplayPosition setGeo={setGeo} />
      </MapContainer>
    </div>
  );
}

interface DisplayPositionProps {
  setGeo: React.Dispatch<{}>;
}

function DisplayPosition({ setGeo }: DisplayPositionProps) {
  const map = useMap();

  useMapEvents({
    move() {
      const bounds = map.getBounds();

      setGeo({
        top_left: {
          lat: parseFloat(bounds.getNorth().toFixed(4)),
          lon: parseFloat(bounds.getWest().toFixed(4)),
        },
        bottom_right: {
          lat: parseFloat(bounds.getSouth().toFixed(4)),
          lon: parseFloat(bounds.getEast().toFixed(4)),
        },
      });
    },
  });

  // const onClick = React.useCallback(() => {
  //   map.setView(center, zoom);
  // }, [map, center]);

  return (
    <div>
      <p>
        {/* latitude: {position.lat.toFixed(4)}, longitude:{' '}
        {position.lng.toFixed(4)}
        <Button onClick={onClick}>reset</Button> */}
      </p>
    </div>
  );
}

const MemoDisplayPosition = React.memo(DisplayPosition);

export default SearchMap;
