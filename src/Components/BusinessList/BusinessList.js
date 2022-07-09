import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.js";

export default function BusinessList({ businesses, error }) {
  if (error) {
    return (
      <div className="BusinessList">
        Request Error! This was likely due to CORS. Please enable CORS demo
        through console.
      </div>
    );
  } else if (businesses && businesses.length === 0) {
    return <div className="BusinessList">No Data Found!</div>;
  } else {
    return (
      <div className="BusinessList">
        {businesses &&
          Array.isArray(businesses) &&
          businesses.map((business) => {
            return <Business key={business.id} business={business} />;
          })}
      </div>
    );
  }
}
