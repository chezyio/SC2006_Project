"use client";
import React, { useState } from "react";

const YourComponent = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const apiKey = "AIzaSyCROvUUEuV8QkcF8F2tHGRP5QdH3WsmZG8";

    const handleSearch = async () => {
        try {
            // Construct the URL for the Text Search API.
            const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}&key=${apiKey}`;

            // Send a GET request to the API.
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Request failed");
            }

            // Parse the JSON response.
            const data = await response.json();

            // Extract the search results (e.g., hawker information).
            const results = data.results || [];

            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a hawker"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results:</h2>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.place_id}>{result.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default YourComponent;
