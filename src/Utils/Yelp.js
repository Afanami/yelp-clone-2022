import { API_KEY } from "../API_KEYS/API_KEYS";

export const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Nearest Me": "distance",
};

const CORS = "https://cors-anywhere.herokuapp.com/";
export let Yelp = {
  search: async (term, location, sortBy, latitude, longitude, offset) => {
    try {
      const searchResponse = await fetch(
        `${CORS}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&latitude=${latitude}&longitude=${longitude}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );

      if (searchResponse.ok) {
        const searchJSON = await searchResponse.json();

        return (
          searchJSON.businesses.length &&
          searchJSON.businesses.map((business) => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              distance: business.distance,
              isClosed: business.is_closed,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
              url: business.url,
            };
          })
        );
      } else {
        throw new Error(searchResponse.status);
      }
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  },
};
