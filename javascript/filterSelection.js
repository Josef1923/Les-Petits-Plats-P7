const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

let filteredBySearch = []; // Variable pour stocker les recettes filtrées par la recherche

window.addEventListener('DOMContentLoaded', () => {
    const filteredContainer = document.querySelector('.filtered-container');
    threeCharactersListener(); // Lancer l'écouteur de recherche

    // Event listener sur les éléments de filtre
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'LI') {
            const tag = target.textContent.trim();
            const filterType = target.closest('.filter-item').querySelector('.filter-button').textContent.trim().toLowerCase();

            if (!filteredContainer.querySelector(`li[data-filter="${tag}"]`)) {
                addFilter(tag, filterType, target);
                updateTags(tag, filterType, 'add');
                filterCards();
            }
        }
    });

    // Ajout du tag dans le conteneur des filtres
    function addFilter(tag, filterType, filterItem) {
        const li = document.createElement('li');
        li.setAttribute('data-filter', tag);
        li.innerHTML = `
            ${tag}
            <img src="assets/icons/closeVector.svg" class="close-vector" alt="Supprimer le filtre">
        `;

        // Masquer <li> sélectionné dans la liste des filtres
        filterItem.style.display = 'none';

        // Suppression du tag
        li.querySelector('.close-vector').addEventListener('click', () => {
            li.remove();
            updateTags(tag, filterType, 'remove');
            filterItem.style.display = '';
            filterCards();
        });

        // Ajouter filtre sélectionné au conteneur
        filteredContainer.appendChild(li);
    }

    // Mise à jour des tags sélectionnés
    function updateTags(tag, filterType, action) {
        const typeMap = {
            'ingrédients': 'ingredients',
            'appareils': 'appliances',
            'ustensiles': 'ustensils'
        };

        const list = selectedTags[typeMap[filterType]];

        if (action === 'add') {
            list.push(tag);
        } else {
            selectedTags[typeMap[filterType]] = list.filter(item => item !== tag);
        }
    }

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
                filterCards(); // Appel à la fonction de filtrage
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

    // Filtrage des cartes selon les filtres sélectionnés et les résultats de recherche
    function filterCards() {
        if (!recipes || recipes.length === 0) {
            console.error("Aucune recette disponible.");
            return;
        }

        const filteredRecipes = (filteredBySearch.length > 0 ? filteredBySearch : recipes)
            .filter(recipe => matchesFilters(recipe));

        // Générer les cartes seulement pour les recettes filtrées
        generateCards(filteredRecipes);

        // Mettre à jour les filtres disponibles après filtrage
        const filtersComponent = document.querySelector('filters-components');
        if (filtersComponent) {
            filtersComponent.updateFilters(filteredRecipes);
        }
    }

    // Vérification si une recette correspond aux filtres sélectionnés
    function matchesFilters(recipe) {
        const { ingredients, appliances, ustensils } = selectedTags;

        // Vérifier les ingrédients
        const recipeIngredients = recipe.ingredients.map(ing => ing.ingredient ? ing.ingredient.toLowerCase() : '');
        const ingredientsMatch = ingredients.every(tag => recipeIngredients.includes(tag.toLowerCase()));

        // Vérifier l'appareil (appliance)
        const applianceMatch = appliances.length === 0 || appliances.some(tag => recipe.appliance.toLowerCase() === tag.toLowerCase());

        // Vérifier les ustensiles
        const recipeUstensils = recipe.ustensils.map(ustensil => ustensil ? ustensil.toLowerCase() : '');
        const ustensilsMatch = ustensils.every(tag => recipeUstensils.includes(tag.toLowerCase()));

        return ingredientsMatch && applianceMatch && ustensilsMatch;
    }

    // Initialisation de la page avec toutes les cartes
    generateCards(recipes);
});