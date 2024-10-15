//Fonction de tri via input filter

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
