class FiltersComponents extends HTMLElement {
    constructor() {
        super();

        // Créer le conteneur des filtres
        this.innerHTML = `<div class="filter-container"></div>`;
    }

    // Maj des filtres selon les recettes visibles
    updateFilters(recipes) {
        const ingredients = this.getIngredientsFromRecipes(recipes);
        const appliances = this.getAppliancesFromRecipes(recipes);
        const ustensils = this.getUstensilsFromRecipes(recipes);

        // Créer le conteneur des filtres
        this.querySelector('.filter-container').innerHTML = `
            ${this.createFilterItemHTML('Ingrédients', ingredients)}
            ${this.createFilterItemHTML('Appareils', appliances)}
            ${this.createFilterItemHTML('Ustensiles', ustensils)}
        `;

        // Interaction avec les dropdowns
        this.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const dropdown = button.nextElementSibling;
                this.handleDropdown(dropdown, button);
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
                    <input type="text" class="svg-input" placeholder=""  tabindex="0">
                    <img src="assets/icons/magnifyingGlassFilter.svg" class="dropdown-icon" alt="Recherche">
                    <ul>
                        ${options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Extraction des ingrédients depuis les recettes visibles
    getIngredientsFromRecipes(recipes) {
        return Array.from(
            new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))
        ).sort();
    }

    // Extraction des appareils depuis les recettes visibles
    getAppliancesFromRecipes(recipes) {
        return Array.from(
            new Set(recipes.map(recipe => recipe.appliance))
        ).sort();
    }

    // Extraction des ustensiles depuis les recettes visibles
    getUstensilsFromRecipes(recipes) {
        return Array.from(
            new Set(recipes.flatMap(recipe => recipe.ustensils))
        ).sort();
    }

    // Bascule affichage du dropdown
    handleDropdown(dropdown, button) {

        const isActive = dropdown.classList.contains('active');

        // Fermer tous les autres dropdowns ouverts
        this.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
            if (activeDropdown !== dropdown) {
                activeDropdown.classList.remove('active');
                activeDropdown.classList.add('hidden');
                activeDropdown.previousElementSibling.classList.remove('active');
            }
        });

        // Si le dropdown cliqué est déjà ouvert, on le ferme
        if (isActive) {
            dropdown.classList.remove('active');
            dropdown.classList.add('hidden');
            button.classList.remove('active');
        } else {
            // Sinon, on ouvre le dropdown
            dropdown.classList.remove('hidden');
            dropdown.classList.add('active');
            button.classList.add('active');

            // Focus sur l'input à l'intérieur du dropdown après l'ouverture sinon ca modifie le css
            const input = dropdown.querySelector('input');
            if (input) {
                dropdown.addEventListener('transitionend', function handler() {
                    input.focus();
                    dropdown.removeEventListener('transitionend', handler);
                })
            }
        }
    }
}

// Déclarer le Web Component
customElements.define('filters-components', FiltersComponents);