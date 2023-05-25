import * as React from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styles from './SearchMap.module.scss';
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngBounds, map } from 'leaflet';
import { GeoBounds } from '@/types';

interface SearchMapProps {
  setGeo: React.Dispatch<{}>;
  geo: GeoBounds;
  children?: React.ReactNode;
}

function SearchMap({ geo, setGeo, children }: SearchMapProps) {
  // const LazyDisplayPosition = React.lazy(() => DisplayPosition);
  const center = new LatLng(33.5088, -86.8084);
  const zoom = 13;
  const mapRef = React.useRef<any>(null);

  const handleMapMove = () => {
    const map = mapRef.current;

    if (map) {
      const bounds: LatLngBounds = map.getBounds();

      console.log({ bounds });

      setGeo({
        top_left: {
          lat: bounds.getNorth(),
          lon: bounds.getWest(),
        },
        bottom_right: {
          lat: bounds.getSouth(),
          lon: bounds.getEast(),
        },
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        // ref={mapRef}

        ref={mapRef}
        // whenReady={() => {
        //   mapRef.current = map;
        // }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
        <DisplayPosition handleMapMove={handleMapMove} setGeo={setGeo} />
      </MapContainer>
    </div>
  );
}

interface DisplayPositionProps {
  setGeo: React.Dispatch<{}>;
}

function DisplayPosition({ handleMapMove, setGeo }: DisplayPositionProps) {
  // const [localGeo, setLocalGeo] = React.useState({} as any);
  // const map = useMap();
  useMapEvents({
    moveend: handleMapMove,
  });
  // useMapEvents({
  //   move() {
  //     const bounds = map.getBounds();
  //     setGeo({
  //       top_left: {
  //         lat: parseFloat(bounds.getNorth().toFixed(4)),
  //         lon: parseFloat(bounds.getWest().toFixed(4)),
  //       },
  //       bottom_right: {
  //         lat: parseFloat(bounds.getSouth().toFixed(4)),
  //         lon: parseFloat(bounds.getEast().toFixed(4)),
  //       },
  //     });
  //   },
  // });

  // const onClick = React.useCallback(() => {
  //   map.setView(center, zoom);
  // }, [map, center]);

  return <></>;
}

export default SearchMap;
