// Sélectionner tous les champs d'input et toutes les listes
const inputs = document.querySelectorAll('.svg-input');
const filterContainers = document.querySelectorAll('.filter-item');

// Pour chaque input, ajouter un écouteur d'événement
inputs.forEach((input, index) => {
    const listItems = filterContainers[index].querySelectorAll('ul li');

    // Ajouter un événement sur l'input pour chaque champ
    input.addEventListener('input', function () {
        const inputEntry = input.value.toLowerCase();

        // Ne filtrer que si 3 caractères ou plus ont été tapés
        if (inputEntry.length >= 3) {
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();

                // Afficher les éléments qui correspondent au filtre
                if (text.includes(inputEntry)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            // Si moins de 3 caractères, afficher tous les éléments
            listItems.forEach(item => {
                item.style.display = '';
            });
        }
    });
});
