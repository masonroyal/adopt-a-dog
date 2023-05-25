import * as React from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface SearchMapDisplayPositionProps {
  setGeo: React.Dispatch<{}>;
}

function SearchMapDisplayPosition({ setGeo }: SearchMapDisplayPositionProps) {
  const [localGeo, setLocalGeo] = React.useState({} as any);
  const map = useMap();

  useMapEvents({
    move(event) {
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

  return <></>;
}

export default SearchMapDisplayPosition;
