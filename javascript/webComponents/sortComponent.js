class FilterComponent extends HTMLElement {
    constructor() {
        super();

        // Créer le conteneur des boutons
        const container = document.createElement('div');
        container.classList.add('filter-container');

        // Créer le conteneur pour chaque bouton et son dropdown
        const filterItemIngredients = this.createFilterItem('Ingrédients');
        const filterItemAppliances = this.createFilterItem('Appareils');
        const filterItemUstensils = this.createFilterItem('Ustensiles');

        // Ajouter les filtres dans le conteneur
        container.appendChild(filterItemIngredients);
        container.appendChild(filterItemAppliances);
        container.appendChild(filterItemUstensils);

        // Ajouter le conteneur au Shadow DOM ou DOM du composant
        this.appendChild(container);
    }

    // Méthode pour créer un conteneur de filtre avec un bouton et son dropdown
    createFilterItem(filterType) {
        const filterItem = document.createElement('div');
        filterItem.classList.add('filter-item');

        const filterButton = document.createElement('button');
        const icon = document.createElement('img');
        icon.src = 'assets/icons/vector1.svg'; // Icon par défaut

        filterButton.innerHTML = `${filterType}`;
        filterButton.appendChild(icon);

        const dropdown = this.createDropdown(filterType);
        dropdown.classList.add('hidden');

        filterItem.appendChild(filterButton);
        filterItem.appendChild(dropdown);

        // Attacher l'événement sur tout le bouton
        filterButton.addEventListener('click', () => {
            this.toggleDropdown(dropdown, icon);
        });

        return filterItem;
    }

    // Méthode pour créer un dropdown avec une icône SVG uniquement, alignée à droite
    createDropdown(filterType) {
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        // Créer l'input avec une bordure visible
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = ''; // Pas de texte
        searchInput.classList.add('svg-input'); // Classe pour styliser l'input

        // Créer l'icône SVG
        const svgIcon = document.createElement('img');
        svgIcon.src = 'assets/icons/loop2.svg';
        svgIcon.classList.add('dropdown-icon');

        // Ajouter l'input et l'icône dans le dropdown
        dropdown.appendChild(searchInput);
        dropdown.appendChild(svgIcon);

        // Créer la liste d'options
        const optionsList = document.createElement('ul');
        optionsList.innerHTML = `
            <li>${filterType} Option 1</li>
            <li>${filterType} Option 2</li>
            <li>${filterType} Option 3</li>
        `;
        dropdown.appendChild(optionsList);

        return dropdown;
    }


    // Méthode pour basculer l'affichage du dropdown et changer l'icône
    toggleDropdown(dropdown, icon) {
        dropdown.classList.toggle('hidden');
        if (dropdown.classList.contains('hidden')) {
            icon.src = 'assets/icons/vector1.svg';
        } else {
            icon.src = 'assets/icons/vector2.svg';
        }
    }
}

// Déclarer le Web Component
customElements.define('filter-component', FilterComponent);