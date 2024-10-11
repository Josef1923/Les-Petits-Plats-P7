class FiltersComponents extends HTMLElement {
    constructor() {
        super();

        // Extraire ingrédients, appareils et ustensiles des recettes
        const ingredients = this.getAllIngredients();
        const appliances = this.getAllAppliances();
        const ustensils = this.getAllUstensils();

        // Créer le conteneur des filtres
        this.innerHTML = `
            <div class="filter-container">
                ${this.createFilterItemHTML('Ingrédients', ingredients)}
                ${this.createFilterItemHTML('Appareils', appliances)}
                ${this.createFilterItemHTML('Ustensiles', ustensils)}
            </div>
        `;

        // Interaction avec les dropdowns
        this.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const dropdown = button.nextElementSibling;
                const icon = button.querySelector('img');
                this.toggleDropdown(dropdown, icon, button);
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
                    <input type="text" class="svg-input" placeholder="">
                    <img src="assets/icons/magnifyingGlassFilter.svg" class="dropdown-icon" alt="Recherche">
                    <ul>
                        ${options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Méthode pour basculer l'affichage du dropdown
    toggleDropdown(dropdown, icon, button) {

        dropdown.classList.toggle('hidden');
        dropdown.classList.toggle('active');

        if (dropdown.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
            button.classList.add('active');
        } else {
            icon.style.transform = 'rotate(0deg)';
            button.classList.remove('active');
        }
    }


    //Extraction ingrédients
    getAllIngredients() {

        return Array.from(
            new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))
        ).sort();
    }

    // Extraction appareils
    getAllAppliances() {

        return Array.from(
            new Set(recipes.flatMap(recipe => recipe.appliance))
        ).sort();
    }

    // Extraction ustensiles
    getAllUstensils() {

        return Array.from(
            new Set(recipes.flatMap(recipe => recipe.ustensils))
        ).sort();
    }
}

// Déclarer le Web Component
customElements.define('filters-components', FiltersComponents);
