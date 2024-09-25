class SortComponent extends HTMLElement {
    constructor() {
        super();

        // Créer les éléments (boutons)
        const container = document.createElement('div');
        container.classList.add('sort-container');

        const sortIngredientsButton = document.createElement('button');
        sortIngredientsButton.textContent = 'Ingrédients';
        sortIngredientsButton.id = 'sort-ingredients';

        const sortUstensilsButton = document.createElement('button');
        sortUstensilsButton.textContent = 'Appareils';
        sortUstensilsButton.id = 'sort-appliance';

        const sortApplianceButton = document.createElement('button');
        sortApplianceButton.textContent = 'Ustensiles';
        sortApplianceButton.id = 'sort-ustensils';

        container.appendChild(sortIngredientsButton);
        container.appendChild(sortApplianceButton);
        container.appendChild(sortUstensilsButton);

        this.appendChild(container);

    }
}