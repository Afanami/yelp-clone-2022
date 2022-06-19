import "./App.css";
import { useState, usestate } from "react";
import { Yelp } from "./Utils/Yelp";
import BusinessList from "./Components/BusinessList/BusinessList";
import SearchBar from "./Components/SearchBar/SearchBar";
import { BusinessDataProvider } from "./Contexts/DataContext";
import useLocation from "./Hooks/useLocation";
import { Toaster } from "react-hot-toast";

function App() {
  const [businesses, setBusinesses] = useState(null);
  const { lat, long } = useLocation();

  const searchYelp = async (
    term,
    location,
    sortBy,
    latitude,
    longitude,
    offset
  ) => {
    const businesses = await Yelp.search(
      term,
      location,
      sortBy,
      latitude,
      longitude,
      offset
    );

    setBusinesses(businesses);
  };

  return (
    <div className="App">
      <h1>Yelp Clone</h1>
      <SearchBar lat={lat} long={long} searchYelp={searchYelp} />
      <BusinessList businesses={businesses} />
    </div>
  );
}

export default App;
