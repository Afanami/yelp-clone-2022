import React from "react";
import "./Business.css";

const DEFAULT_IMAGE =
  "https://s3-media0.fl.yelpcdn.com/assets/public/large_empty_biz_skyline.yji-0e6572ba15d839878b7a.svg";

export default function Business({ business }) {
  const {
    imageSrc,
    name,
    address,
    city,
    state,
    zipCode,
    distance,
    // isClosed,
    category,
    rating,
    reviewCount,
    url,
  } = business;

  return (
    <div className="Business">
      <div className="image-container">
        <a href={url} target="_blank" rel="noreferrer">
          <img src={imageSrc ? imageSrc : DEFAULT_IMAGE} alt={`${category}`} />
        </a>
      </div>
      <div className="Business-headers">
        <h2>{name}</h2>
        <h4>{Math.round(distance / 100) / 10} km</h4>
      </div>
      <div className="Business-information">
        <div className="Business-address">
          <a
            href={`https://www.google.co.nz/maps/place/${address}`}
            target="_blank"
            rel="noreferrer">
            <p>{address}</p>
            <p>{city}</p>
            <p>{`${state} ${zipCode}`}</p>
          </a>
        </div>
        <div className="Business-reviews">
          <h3>{category}</h3>
          <h3 className="rating">{`${rating} stars`}</h3>
          <p>{`${reviewCount} reviews`}</p>
        </div>
      </div>
    </div>
  );
}
