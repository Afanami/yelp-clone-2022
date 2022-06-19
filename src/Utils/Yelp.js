import { API_KEY } from "./API_KEYS";

export const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Nearest Me": "distance",
};

const CORS = "https://cors-anywhere.herokuapp.com/";
export const LIMIT = 25;

export let Yelp = {
  search: async (term, location, sortBy, latitude, longitude, offset) => {
    let businessesData = null;
    let error = null;
    let total = null;

    try {
      const searchResponse = await fetch(
        `${CORS}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&latitude=${latitude}&longitude=${longitude}&limit=${LIMIT}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );

      if (searchResponse.ok) {
        const searchJSON = await searchResponse.json();

        total = searchJSON.total;

        businessesData =
          (searchJSON.businesses.length > 0 &&
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
            })) ||
          [];
      } else {
        throw Error(`${searchResponse.status} ${searchResponse.statusText}`);
      }
    } catch (err) {
      error = `${err} \n Please check your inputs are valid`;
    }

    return { businessesData, error, total };
  },
};
