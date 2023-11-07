import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { addData, deleteQuest } from './utils/firebase.js';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 34.0292077,
  lng: -118.420331
};

function App() {
  const [markers, setMarkers] = useState([]);
  const GOOGLE_MAPS_API_KEY = "AIzaSyB8n0QbPSd-sKzACRt2ngR61LJjdPO2OOo";
  const [map, setMap] = useState(null);

  useEffect(() => {
    return () => {
      // delete quest when user leaves the page
      deleteQuest();
    }
  }, [])
  const _onClick = async (e) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const markersCopy = [...markers];
      if (!markersCopy.some((m) => m.lat === lat && m.lng === lng)) {
        markersCopy.push({lat, lng});
        await addData(lat, lng, markersCopy.length).then(() => setMarkers(markersCopy))
      }
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })

  const onLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(async (map) => {
    setMap(null)
    await deleteQuest();
  }, [])

  const Markers = markers.length && markers.map((value, index) => 
    <Marker
      key={index}
      position={{ lat: value.lat, lng: value.lng}}
      label={`${index + 1}`}
    />
  )

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={_onClick}
        key={GOOGLE_MAPS_API_KEY}
      >
        {Markers}
      </GoogleMap>
  ) : <></>
}

export default App;
