"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Henriette Heikki
 */

// Hämta formuläret, sökfältet och elementet för valideringsfel från sidan.
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");

// Kör handleSearch när användaren skickar formuläret.
searchForm.addEventListener("submit", handleSearch);

function handleSearch(event) {
  // Förhindra att sidan laddas om när formuläret skickas.
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    errorMessage.textContent = "Skriv en sökfras för att söka efter recept.";
    return;
  }

  // Ta bort tidigare valideringsfel när sökfrasen är giltig.
  errorMessage.textContent = "";

  fetchRecipes(searchTerm);
}

// Hämta recept som matchar användarens sökfras.
async function fetchRecipes(searchTerm) {
  message.textContent = "Hämtar recept...";

  try {
    const url =
      "https://dummyjson.com/recipes/search?q=" +
      encodeURIComponent(searchTerm);
    const response = await fetch(url);

    // Avbryt om servern returnerade en HTTP-status som visar ett fel.
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    // Läs JSON-svaret och omvandla det till ett JavaScript-objekt.
    const data = await response.json();

    message.textContent = "";
    console.log("Recipe data:", data);
  } catch (error) {
    message.textContent = "Det gick inte att hämta recept. Försök igen.";
    console.error("Request failed:", error);
  }
}
