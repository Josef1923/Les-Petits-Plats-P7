const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

window.addEventListener('DOMContentLoaded', () => {
    const filteredContainer = document.querySelector('.filtered-container');

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

    // Filtrage des cartes selon les filtres sélectionnés
    function filterCards() {
        if (!recipes || recipes.length === 0) {
            console.error("Aucune recette disponible.");
            return;
        }

        const filteredRecipes = recipes.filter(recipe => matchesFilters(recipe));

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