class FiltersComponents extends HTMLElement {
    constructor() {
        super();

        // Créer le conteneur des filtres
        this.innerHTML = `<div class="filter-container"></div>`;
    }

    // Maj des filtres selon les recettes visibles
    updateFilters(recipes, selectedTags) {
        let ingredients = this.getIngredientsFromRecipes(recipes);
        let appliances = this.getAppliancesFromRecipes(recipes);
        let ustensils = this.getUstensilsFromRecipes(recipes);

        if (selectedTags !== undefined) {
            ingredients = ingredients.filter(ingredient => !selectedTags.ingredients.includes(ingredient));
            appliances = appliances.filter(appliance => !selectedTags.appliances.includes(appliance));
            ustensils = ustensils.filter(ustensil => !selectedTags.ustensils.includes(ustensil));
        }

        // Créer le conteneur des filtres
        this.querySelector('.filter-container').innerHTML = `
        <div class="filters-dropdowns">
            ${this.createFilterItemHTML('Ingrédients', ingredients)}
            ${this.createFilterItemHTML('Appareils', appliances)}
            ${this.createFilterItemHTML('Ustensiles', ustensils)}
        </div>
        <div class="recipe-counter">
            ${recipes.length} recettes
        </div>
    `;

        // Interaction avec les dropdowns
        this.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const dropdown = button.nextElementSibling;
                this.handleDropdown(dropdown, button);
            });
        });

        const inputs = document.querySelectorAll('.svg-input');
        const filterContainers = document.querySelectorAll('.filter-item');


        inputs.forEach((input, index) => {
            const listItems = filterContainers[index].querySelectorAll('ul li');

            input.addEventListener('input', function () {
                const inputEntry = input.value.toLowerCase();

                listItems.forEach(item => {
                    const text = item.textContent.toLowerCase();

                    if (text.includes(inputEntry)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Générer le HTML filtre avec liste
    createFilterItemHTML(filterType, options) {
        return `
            <div class="filter-item">
                <button class="filter-button">
                    ${filterType} <img src="assets/icons/vector1.svg" alt="Icone">
                </button>
                <div class="dropdown hidden">
                    <input type="search" class="svg-input" placeholder="" aria-label="${filterType} Search" tabindex="0">
                    <img src="assets/icons/magnifyingGlassFilter.svg" class="dropdown-icon" alt="Recherche">
                    <ul>
                        ${options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Extraction des ingrédients avec première lettre en majuscule
    getIngredientsFromRecipes(recipes) {
        return Array.from(
            new Set(
                recipes.flatMap(recipe =>
                    recipe.ingredients.map(ingredient =>
                        this.capitalize(ingredient.ingredient)
                    )
                )
            )
        ).sort();
    }

    // Extraction des appareils avec première lettre en majuscule
    getAppliancesFromRecipes(recipes) {
        return Array.from(
            new Set(
                recipes.flatMap(recipe =>
                    this.capitalize(recipe.appliance)
                )
            )
        ).sort();
    }

    // Extraction des ustensiles avec première lettre en majuscule
    getUstensilsFromRecipes(recipes) {
        return Array.from(
            new Set(
                recipes.flatMap(recipe =>
                    recipe.ustensils.map(ustensil =>
                        this.capitalize(ustensil)
                    )
                )
            )
        ).sort();
    }

    // Fonction utilitaire pour mettre la première lettre en majuscule
    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Bascule affichage du dropdown
    handleDropdown(dropdown, button) {
        const isActive = dropdown.classList.contains('active');

        // Fermer tous les dropdowns ouverts
        document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
            activeDropdown.classList.remove('active');
            activeDropdown.classList.add('hidden');
            activeDropdown.previousElementSibling.classList.remove('active');
        });

        // Ouvrir le dropdown
        if (!isActive) {
            dropdown.classList.remove('hidden');
            dropdown.classList.add('active');
            button.classList.add('active');

            // Focus sur l'input si présent
            const input = dropdown.querySelector('input');
            if (input) {
                dropdown.addEventListener('transitionend', function handler() {
                    input.focus();
                    dropdown.removeEventListener('transitionend', handler);
                });
            }
        }
    }
}


// Déclarer le Web Component
customElements.define('filters-components', FiltersComponents);