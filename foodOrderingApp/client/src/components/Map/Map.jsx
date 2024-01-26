import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
import classes from "./map.module.css";

const Map = ({ readonly, location, onChange }) => {
  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={[4.1554, 9.2312]}
        zoom={15}
        dragging={!readonly}
        touchZoom={!readonly}
        scrollWheelZoom={!readonly}
        doubleClickZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <findButtonAndMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
};

export default Map;

const findButtonAndMarker = ({ readonly, location, onChange }) => {
  const [position, setPosition] = useState(location);

  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      return;
    }
    if (position) onChange(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      !readonly && setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  return (
    <>
      {!readonly && (
        <button
          className={classes.find_location}
          onClick={() => map.locate()}
          type="button"
        >
          Find My Location
        </button>
      )}

      {position && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
};
