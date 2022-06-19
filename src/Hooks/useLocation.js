import { useEffect, useState } from "react";

export default function useLocation() {
  const [userLocation, setUserLocation] = useState({
    lat: null,
    long: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);

  return userLocation;
}
