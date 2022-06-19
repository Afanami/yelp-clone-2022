import React, { useState } from "react";
import { sortByOptions } from "../../Utils/Yelp";
import "./SearchBar.css";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage from "../../Hooks/useLocalStorage";

export default function SearchBar({ lat, long, searchYelp }) {
  const [term, setTerm] = useState(null);
  const [location, setLocation] = useState(null);
  const [sortBy, setSortBy] = useState("best_match");
  const [searchParams, setSearchParams] = useLocalStorage("searchParams", {
    term: term,
    location: location,
    sortBy: sortBy,
  });

  // Helper functions
  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  };

  const validateInput = () => {
    if (
      (term == null || term.trim() === "") &&
      (location == null || location.trim() === "")
    ) {
      return toast.error("Enter a valid business and location!");
    }

    if (term == null || term.trim() === "") {
      return toast.error("Enter a valid business name!");
    }

    if (
      (location == null || location.trim() === "") &&
      lat == null &&
      long == null
    ) {
      return toast.error("Enter a valid location!");
    }

    return true;
  };

  // Render functions
  const renderSortByOptions = () => {
    return Object.entries(sortByOptions).map((sortByOption) => {
      const key = sortByOption[0];
      const value = sortByOption[1];
      return (
        <li
          key={value}
          className={getSortByClass(value)}
          onClick={() => onSortByClickHanlder(value)}>
          {key}
        </li>
      );
    });
  };

  // Handlers
  const onSortByClickHanlder = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const onTermChangeHandler = (event) => {
    if (event.target.value === "") {
      setTerm(null);
    } else {
      setTerm(event.target.value);
    }
  };

  const onLocationChangeHandler = (event) => {
    if (event.target.value === "") {
      setLocation(null);
    } else {
      setLocation(event.target.value);
    }
  };

  const onSearchClickHandler = (event) => {
    event.preventDefault();
    if (validateInput() === true) {
      // If location provided search places around locations
      // else search around user

      setSearchParams({ term: term, location: location, sortBy: sortBy });
      searchYelp(term, location, sortBy, lat, long, 0, true);
    }
  };

  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      if (validateInput() === true) {
        event.preventDefault();

        setSearchParams({ term: term, location: location, sortBy: sortBy });
        searchYelp(term, location, sortBy, lat, long, 0, true);
      }
    }
  };

  return (
    <div className="SearchBar">
      <Toaster />
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input
          placeholder="Search Businesses"
          onChange={onTermChangeHandler}
          onKeyPress={onKeyPressHandler}
          autoFocus
        />
        <input
          placeholder="Where?"
          onChange={onLocationChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
      </div>
      <div className="SearchBar-submit">
        <button onClick={onSearchClickHandler}>Let's Go</button>
      </div>
    </div>
  );
}
