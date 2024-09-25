class SortComponent extends HTMLElement {
    constructor() {
        super();

        // Créer le conteneur des boutons
        const container = document.createElement('div');
        container.classList.add('sort-container');

        // Bouton pour Ingrédients
        const sortIngredientsButton = document.createElement('button');
        sortIngredientsButton.innerHTML = 'Ingrédients <img src="assets/icons/vector1.svg">';
        sortIngredientsButton.id = 'sort-ingredients';

        // Bouton pour Appareils
        const sortApplianceButton = document.createElement('button');
        sortApplianceButton.innerHTML = 'Appareils <img src="assets/icons/vector1.svg">';
        sortApplianceButton.id = 'sort-appliance';

        // Bouton pour Ustensiles
        const sortUstensilsButton = document.createElement('button');
        sortUstensilsButton.innerHTML = 'Ustensiles <img src="assets/icons/vector1.svg">';
        sortUstensilsButton.id = 'sort-ustensils';

        // Ajouter les boutons dans le conteneur
        container.appendChild(sortIngredientsButton);
        container.appendChild(sortApplianceButton);
        container.appendChild(sortUstensilsButton);

        // Ajouter le conteneur au Shadow DOM ou DOM du composant
        this.appendChild(container);
    }
}

// Déclarer le Web Component
customElements.define('sort-component', SortComponent);
