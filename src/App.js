import "./App.css";
import BusinessList from "./Components/BusinessList/BusinessList";
import SearchBar from "./Components/SearchBar/SearchBar";
import { BusinessDataProvider } from "./Contexts/DataContext";
import useLocation from "./Hooks/useLocation";

function App() {
  // console.log("Async ver: ");
  // console.log(Yelp.search("KFC", "Frankston", "best_match", ""));
  const { lat, long } = useLocation();

  return (
    <div className="App">
      <h1>Yelp Clone</h1>
      <SearchBar lat={lat} long={long} />
      <BusinessList />
    </div>
  );
}

export default App;
