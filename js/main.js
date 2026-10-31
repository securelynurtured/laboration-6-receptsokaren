"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Henriette Heikki 
 */

// Find the form, input and validation message in the page.
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");

// Run handleSearch when the user submits the form.
searchForm.addEventListener("submit", handleSearch);

function handleSearch(event) {
    // Keep the browser from reloading the page when the form is submitted.
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        errorMessage.textContent = "Skriv en sökfras för att söka efter recept.";
        return;
    }

    // Clear any previous validation error after a valid search.
    errorMessage.textContent = "";

   fetchRecipes(searchTerm);
}

// Fetch recipes matching the user's search.
async function fetchRecipes(searchTerm) {
    message.textContent = "Hämtar recept...";

    try {
        const url = "https://dummyjson.com/recipes/search?q=" + encodeURIComponent(searchTerm);
        const response = await fetch(url);

        console.log("Server response:", response);
    } catch (error) {
        message.textContent = "Det gick inte att hämta recept. Försök igen.";
        console.error("Request failed:", error);
    }
}