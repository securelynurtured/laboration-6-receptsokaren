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
const recipeContainer = document.getElementById("recipe");

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
  // Ta bort föregående recept inför den nya sökningen.
  recipeContainer.textContent = "";

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

    // Visa ett meddelande om sökningen inte gav några recept.
    if (data.recipes.length === 0) {
      message.textContent = "Inget recept hittades. Prova en annan sökfras.";
      return;
    }

    // Hämta det första receptet i sökresultatet.
    const recipe = data.recipes[0];

    message.textContent = "";
    displayRecipe(recipe);
  } catch (error) {
    message.textContent = "Det gick inte att hämta recept. Försök igen.";
    console.error("Request failed:", error);
  }
}

// Skapa och visa receptets namn och bild.
function displayRecipe(recipe) {
  const article = document.createElement("article");

  const heading = document.createElement("h3");
  heading.textContent = recipe.name;

  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.name;

  article.appendChild(heading);
  article.appendChild(image);

  recipeContainer.appendChild(article);
}
