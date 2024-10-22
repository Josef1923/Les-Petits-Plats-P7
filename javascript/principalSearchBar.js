// Fonction recherche à partir de 3 caractères
function threeCharactersListener() {
    const searchInput = document.querySelector('.search-bar input');

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();// Supprimer les espaces inutiles

        if (query.length >= 3) {
            const results = searchRecipesWithLoopFor(query);
            generateCards(results);
        } else {
            generateCards(recipes)
        };
    });
}

// Fonction de recherche utilisant des boucles
function searchRecipesWithLoopFor(query) {
    let filteredRecipes = [];

    // Boucler des les recettes
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