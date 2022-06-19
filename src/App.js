import "./App.css";
import { useState } from "react";
import { Yelp, LIMIT } from "./Utils/Yelp";
import BusinessList from "./Components/BusinessList/BusinessList";
import SearchBar from "./Components/SearchBar/SearchBar";
import useLocation from "./Hooks/useLocation";
import LinearProgress from "@mui/material/LinearProgress";
import useLocalStorage from "./Hooks/useLocalStorage";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [businesses, setBusinesses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let { lat, long } = useLocation();
  // const [currentOffset, setCurrentOffset] = useState(0);
  // const [hasMore, setHasMore] = useState(true);
  // const [searchParams, setSearchParams] = useLocalStorage("searchParams");

  const searchYelp = async (
    term,
    location,
    sortBy,
    latitude,
    longitude,
    offset,
    searchBar
  ) => {
    setIsLoading(true);
    let length;

    // if (searchBar) {
    //   setCurrentOffset(0);
    // } else {
    //   setCurrentOffset(offset + 10);
    // }

    if (location != null && location.trim() !== "") {
      lat = 0;
      long = 0;
    }

    const { businessesData, error } = await Yelp.search(
      term,
      location,
      sortBy,
      latitude,
      longitude,
      offset
    );

    // console.log(total);

    // console.log(currentOffset);
    // if (businesses && businesses.length > 0) {
    //   length = businesses.length + businessesData.length;
    // } else {
    //   length = businessesData.length;
    // }
    // console.log(length);

    // if (length >= total) {
    //   setHasMore(false);
    // } else {
    //   setHasMore(true);
    // }

    if (searchBar) {
      setBusinesses(businessesData);
    } else {
      setBusinesses([...businesses, ...businessesData]);
    }

    console.log([businesses, error]);

    setError(error);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Yelp Clone</h1>
      <SearchBar lat={lat} long={long} searchYelp={searchYelp} />
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <BusinessList businesses={businesses} error={error} />
      )}
    </div>
  );
}

export default App;

// <InfiniteScroll
// dataLength={businesses ? businesses.length : 0} //This is important field to render the next data
// next={() => {
//   searchYelp(
//     searchParams.term,
//     searchParams.location,
//     searchParams.sortBy,
//     lat,
//     long,
//     currentOffset
//   );
// }}
// hasMore={hasMore}
// loader={<h4>Loading...</h4>}
// endMessage={
//   <p style={{ textAlign: "center", paddingBottom: "5%" }}>
//     <b>Yay! You have seen it all</b>
//   </p>
// }>
// </InfiniteScroll>
