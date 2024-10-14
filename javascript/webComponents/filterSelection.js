const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: []
}

window.addEventListener('DOMContentLoaded', () => {
    const filteredContainer = document.querySelector('.filtered-container');
    const cards = Array.from(document.querySelectorAll('.card'));

    // Ajout event listener sur chaque élément de filtre
    document.querySelectorAll('.filter-item ul li').forEach(item => {
        item.addEventListener('click', (event) => {
            const tag = event.target.textContent;
            const filterType = event.target.closest('.filter-item').querySelector('.filter-button').textContent.trim();

            if (!filteredContainer.querySelector(`li[data-filter="${tag}"]`)) {
                addFilter(tag, filterType, item);
                updateTags(tag, filterType, 'add');
                filterCards();
            }
        });
    });

    // Ajout tag au conteneur des filtres sélectionnés
    function addFilter(tag, filterType, filterItem) {
        const li = document.createElement('li');
        li.setAttribute('data-filter', tag);
        li.innerHTML = `
        ${tag}
        <img src="assets/icons/closeVector.svg" class="close-vector" alt="Supprimer le filtre">
    `;

        filterItem.style.display = 'none';

        li.querySelector('.close-vector').addEventListener('click', () => {
            li.remove();
            updateTags(tag, filterType, 'remove');
            filterItem.style.display = '';
            filterCards();
        });

        filteredContainer.appendChild(li);
    }

    function updateTags(tag, filterType, action) {

        const typeMap = {
            'Ingrédients': 'ingredients',
            'Appareils': 'appliances',
            'Ustensiles': 'ustensils'
        }

        const list = selectedTags[typeMap[filterType]];

        if (action === 'add') {
            list.push(tag);
        } else {
            selectedTags[typeMap[filterType]] = list.filter(item => item !== tag);
        }
    }

    function filterCards() {
        cards.forEach(card => {
            const recipeName = card.querySelector('.card-title').textContent;
            const recipe = recipes.find(recipe => recipe.name === recipeName);

            card.style.display = matchesFilters(recipe) ? '' : 'none';
        });
    }

    function matchesFilters(recipe) {
        const checks = {
            ingredients: recipe.ingredients.map(ing => ing.ingredient),
            appliances: [recipe.appliance],
            ustensils: recipe.ustensils
        };

        return ['ingredients', 'appliances', 'ustensils'].every(type =>
            selectedTags[type].every(tag => checks[type].includes(tag))
        );
    }
});