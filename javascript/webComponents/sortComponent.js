class FilterComponent extends HTMLElement {
    constructor() {
        super();

        // Créer le conteneur des boutons
        const container = document.createElement('div');
        container.classList.add('filter-container');

        // Bouton pour Ingrédients
        const filterIngredientsButton = document.createElement('button');
        filterIngredientsButton.innerHTML = 'Ingrédients <img src="assets/icons/vector1.svg">';
        filterIngredientsButton.id = 'filter-ingredients';

        // Bouton pour Appareils
        const filterApplianceButton = document.createElement('button');
        filterApplianceButton.innerHTML = 'Appareils <img src="assets/icons/vector1.svg">';
        filterApplianceButton.id = 'filter-appliance';

        // Bouton pour Ustensiles
        const filterUstensilsButton = document.createElement('button');
        filterUstensilsButton.innerHTML = 'Ustensiles <img src="assets/icons/vector1.svg">';
        filterUstensilsButton.id = 'filter-ustensils';

        // Ajouter les boutons dans le conteneur
        container.appendChild(filterIngredientsButton);
        container.appendChild(filterApplianceButton);
        container.appendChild(filterUstensilsButton);

        // Ajouter le conteneur au Shadow DOM ou DOM du composant
        this.appendChild(container);
    }
}

// Déclarer le Web Component
customElements.define('filter-component', FilterComponent);
