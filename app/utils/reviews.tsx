// export const getReviews = async (hawkerName: string) => {
//     try {
// const apiKey = "AIzaSyBM9BasUsyu6KQezk9i09qGEG9V8tsgmsw";
//         const query = hawkerName;

//         // Step 1: Text Search to find places
//         const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
//         const textSearchResponse = await fetch(textSearchUrl);
//         const textSearchData = await textSearchResponse.json();

//         // Extract the place_id from the results (assuming the first result)
//         const placeId = textSearchData.results[0]
//             ? textSearchData.results[0].place_id
//             : null;

//         if (placeId) {
//             // Step 2: Place Details API to get reviews for the identified place
//             const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
//             const placeDetailsResponse = await fetch(placeDetailsUrl);
//             const placeDetailsData = await placeDetailsResponse.json();

//             // Handle the reviews for the place
//             const reviews = placeDetailsData.result.reviews;
//             return reviews;
//         } else {
//             console.log("No place found with the given query.");
//             return [];
//         }
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         return [];
//     }
// };

export const getReviews = async (hawkerName: string) => {
    try {
        const apiKey = process.env.GOOGLE_API;
        const query = hawkerName;

        // Step 1: Text Search to find places
        const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
        const textSearchResponse = await fetch(textSearchUrl);
        const textSearchData = await textSearchResponse.json();

        // Extract the place_id from the results (assuming the first result)
        const placeId = textSearchData.results[0]
            ? textSearchData.results[0].place_id
            : null;

        if (placeId) {
            // Step 2: Place Details API to get reviews for the identified place
            const fields = "reviews,opening_hours,photos"; // Add additional fields as needed
            const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
            const placeDetailsResponse = await fetch(placeDetailsUrl);
            const placeDetailsData = await placeDetailsResponse.json();

            // Handle the reviews for the place
            const reviews = placeDetailsData.result.reviews;
            const opening_hours = placeDetailsData.result.opening_hours;
            const photos = placeDetailsData.result.photos;

            // Retrieve photo URLs
            const photoUrls = photos.map((photo) => {
                // Use the `photo_reference` to construct the photo URL
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${photo.photo_reference}&key=${apiKey}`;
            });

            return { reviews, opening_hours, photoUrls };
        } else {
            console.log("No place found with the given query.");
            return { reviews: [], opening_hours: null, photoUrls: null };
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return { reviews: [], opening_hours: null, photoUrls: null };
    }
};
