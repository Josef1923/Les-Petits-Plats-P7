class Card {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = `assets/recettes/${recipe.image}`;
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
    }

    // Génére le HTML
    generateCard() {
        // Générer la liste des ingrédients avec quantité
        const ingredientsHTML = this.ingredients.map(ingredient => `
            <div class="ingredient">
                ${ingredient.ingredient} 
                ${ingredient.quantity ? `<p class="quantity">${ingredient.quantity}${ingredient.unit ? " " + ingredient.unit : ""}</p>` : ""}
            </div>
        `).join('');

        //HTML de la card
        return `
    <div class="card">
        <div class="recipe-time">
            <span>${this.time} min</span>
        </div>
        <img src="${this.image}" class="card-img-top" alt="${this.name}">
        <div class="card-body">
            <h2 class="card-title">${this.name}</h2>
            <h3 class="recipe-titles">RECETTE</h3>
            <p class="card-text">${this.description}</p>
            <h3 class="ingredient-title">INGRÉDIENTS</h3>
            <div class="ingredients">
                ${ingredientsHTML}
            </div>
        </div>
    </div>
    `;
    }
}

// Fonction pour insérer toutes les cards dans le conteneur
function generateCards(recipes) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';  // Vider le conteneur avant d'ajouter les nouvelles cartes

    // Générer les cartes pour chaque recette
    recipes.forEach(recipe => {
        const card = new Card(recipe);
        cardsContainer.innerHTML += card.generateCard();
    });

    // Après la génération des cartes, mettre à jour les filtres disponibles
    const filtersComponent = document.querySelector('filters-components');
    if (filtersComponent) {
        filtersComponent.updateFilters(recipes);  // Mise à jour des options du dropdown
    }
}

generateCards(recipes);