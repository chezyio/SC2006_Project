import React from "react";

const page = () => {
    const apiKey = "AIzaSyBM9BasUsyu6KQezk9i09qGEG9V8tsgmsw";
    // const apiUrl =
    //     "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    const query = "Adam Road Food Centre"; // Replace with the text you want to search for
    const fieldMask = "reviews,user_ratings_total, parkingOptions"; // Specify the fields you want to retrieve

    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;

    fetch(textSearchUrl)
        .then((response) => response.json())
        .then((data) => {
            // Extract the place_id from the results (assuming the first result)
            const placeId = data.results[0] ? data.results[0].place_id : null;

            if (placeId) {
                // Step 2: Place Details API to get reviews for the identified place
                const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

                fetch(placeDetailsUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        // Handle the reviews for the place
                        const reviews = data.result.reviews;
                        console.log(reviews);
                    })
                    .catch((error) => {
                        // Handle errors in the Place Details API request
                        console.error(error);
                    });
            } else {
                console.log("No place found with the given query.");
            }
        })
        .catch((error) => {
            // Handle errors in the Text Search API request
            console.error(error);
        });
    return <div>page</div>;
};

export default page;
