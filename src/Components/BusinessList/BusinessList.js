import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.js";

export default function BusinessList({ businesses }) {
  return (
    <div className="BusinessList">
      {businesses &&
        businesses.map((business) => {
          return <Business key={business.id} business={business} />;
        })}
    </div>
  );
}
