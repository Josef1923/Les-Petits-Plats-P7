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

        // Régénérer les cartes avec les résultats de la recherche principale
        generateCards(filteredBySearch);

        // Appliquer les filtres sur les résultats de la recherche principale
        filterCards();
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

// Lancement de l'écouteur lors du chargement de la page
window.addEventListener('DOMContentLoaded', threeCharactersListener);
