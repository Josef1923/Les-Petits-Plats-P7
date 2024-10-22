const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

let filteredBySearch = recipes; // resultats recherche principale

window.addEventListener('DOMContentLoaded', () => {
    const filteredContainer = document.querySelector('.filtered-container');
    let cards


    // Event listener sur les élément de filtre
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const tag = event.target.textContent.trim();
            const filterType = event.target.closest('.filter-item').querySelector('.filter-button').textContent.trim();

            if (!filteredContainer.querySelector(`li[data-filter="${tag}"]`)) {
                addFilter(tag, filterType, event.target);
                updateTags(tag, filterType, 'add');
                filterCards();
            }
        }
    });

    // Ajout tag dans le conteneur des filtres 
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

    // Maj des tags sélectionnés
    function updateTags(tag, filterType, action) {
        const typeMap = {
            'Ingrédients': 'ingredients',
            'Appareils': 'appliances',
            'Ustensiles': 'ustensils'
        };

        const list = selectedTags[typeMap[filterType]];

        if (action === 'add') {
            list.push(tag);
        } else {
            selectedTags[typeMap[filterType]] = list.filter(item => item !== tag);
        }
    }

    // Filtre des cards selon les filtres sélectionnés
    function filterCards() {
        // Filtrer les recettes basées sur les résultats de la recherche principale
        const filteredRecipes = filteredBySearch.filter(recipe => matchesFilters(recipe));

        // Régénérer les cartes uniquement pour les recettes filtrées
        generateCards(filteredRecipes);

        // Récupérer les nouvelles cartes après la régénération
        cards = Array.from(document.querySelectorAll('.card'));

        // Mettre à jour les filtres disponibles après filtrage
        const filtersComponent = document.querySelector('filters-components');
        if (filtersComponent) {
            filtersComponent.updateFilters(filteredRecipes);
        }

        // Masquer les filtres déjà sélectionnés 
        hideSelectedFilters();
    }

    // Vérifier si une recette correspond aux filtres sélectionnés
    function matchesFilters(recipe) {
        const checks = {
            ingredients: recipe.ingredients.map(ing => ing.ingredient),
            appliances: [recipe.appliance],
            ustensils: recipe.ustensils
        };

        // Vérifier si la recette correspond à tous les tags actifs
        return ['ingredients', 'appliances', 'ustensils'].every(type =>
            selectedTags[type].every(tag => checks[type].includes(tag))
        );
    }

    // Masquer les éléments de filtre déjà sélectionnés
    function hideSelectedFilters() {
        document.querySelectorAll('.filter-item ul li').forEach(filterItem => {
            const tag = filterItem.textContent.trim();

            // Vérifier si le tag est déjà sélectionné
            const isSelected = Object.values(selectedTags).some(tags => tags.includes(tag));
            filterItem.style.display = isSelected ? 'none' : '';
        });
    }
});
