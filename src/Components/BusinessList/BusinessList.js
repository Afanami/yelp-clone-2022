import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.js";
import toast, { Toaster } from "react-hot-toast";

export default function BusinessList({ businesses, error }) {
  if (error) {
    toast.error(error);
    return <Toaster />;
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
