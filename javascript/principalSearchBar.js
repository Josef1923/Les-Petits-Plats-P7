// Fonction recherche à partir de 3 caractères
function threeCharactersListener() {
    const searchInput = document.querySelector('.search-bar input');

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim(); // Supprimer les espaces inutiles

        if (query.length >= 3) {
            filteredBySearch = searchRecipesWithLoopFor(query);  // Mettre à jour avec les résultats de la recherche
        } else {
            filteredBySearch = recipes;  // Si moins de 3 caractères, restaurer toutes les recettes
        }

        // Vérifier s'il y a des résultats
        if (filteredBySearch.length === 0) {
            displayNoResultsMessage(query); // Afficher le message si aucun résultat n'est trouvé
        } else {
            generateCards(filteredBySearch); // Générer les cartes normalement si des résultats existent
        }

    });
}

// Fonction de recherche utilisant des boucles
function searchRecipesWithLoopFor(query) {
    let filteredRecipes = [];

    // Boucler sur les recettes
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];

        // Vérifier si le nom, la description ou les ingrédients correspondent à la requête
        if (recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
            )) {
            // Ajouter la recette filtrée au tableau des résultats
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes; // Retourner les recettes filtrées
}


// Fonction pour afficher un message si aucun résultat n'est trouvé
function displayNoResultsMessage(query) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = `
        <div class="no-results-message">
            <p>Aucune recette ne contient '${query}'. Vous pouvez essayer de chercher "tarte aux pommes", "poisson", etc.</p>
        </div>
    `;
}

// Lancement de l'écouteur lors du chargement de la page
window.addEventListener('DOMContentLoaded', threeCharactersListener);
