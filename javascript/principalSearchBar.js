// Fonction recherche à partir de 3 caractères
function threeCharactersListener() {
    const searchInput = document.querySelector('.search-bar input');

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim(); // Supprimer les espaces inutiles

        if (query.length >= 3) {
            filteredBySearch = searchRecipesWithReturn(query);  // Mettre à jour avec les résultats de la recherche
        } else {
            filteredBySearch = recipes;  // Si moins de 3 caractères, restaurer toutes les recettes
        }

        // Vérifier s'il y a des résultats
        if (filteredBySearch.length === 0) {
            displayNoResultsMessage(query); // Afficher un message si aucun résultat trouvé
        } else {
            // Régénérer les cartes avec les résultats de la recherche principale
            generateCards(filteredBySearch);
        }

        // Appliquer les filtres sur les résultats de la recherche principale
        filterCards();
    });
}

// Fonction de recherche utilisant des boucles
function searchRecipesWithReturn(query) {
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );
}

// Fonction pour afficher un message lorsqu'aucune recette n'est trouvée
function displayNoResultsMessage(query) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';  // Vider le conteneur

    const message = `
        <div class="no-results-message">
            Aucune recette ne contient « ${query} ». Vous pouvez essayer « tarte aux pommes », « poisson », etc.
        </div>
    `;
    cardsContainer.innerHTML = message;
}

// Lancement de l'écouteur lors du chargement de la page
window.addEventListener('DOMContentLoaded', threeCharactersListener);
