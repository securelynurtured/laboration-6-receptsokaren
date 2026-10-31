"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: DITT NAMN
 */

// Find the form, input and validation message in the page.
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");

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

    // Temporary check: fetching recipes will be added in the next step.
    console.log("Search term:", searchTerm);
}

