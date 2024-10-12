window.addEventListener('DOMContentLoaded', () => {
    const filteredContainer = document.querySelector('.filtered-container');

    document.querySelectorAll('.filter-item ul li').forEach(item => {
        item.addEventListener('click', (event) => {
            const filter = event.target.textContent;

            if (!filteredContainer.querySelector(`li[data-filter="${filter}"]`)) {
                addFilterToContainer(filter);
            }
        });
    });

    function addFilterToContainer(filter) {
        const li = document.createElement('li');
        li.setAttribute('data-filter', filter);
        li.innerHTML = `
        ${filter}
        <img src="assets/icons/closeVector.svg" class="close-vector" alt="Supprimer le filtre">
    `;

        li.querySelector('.close-vector').addEventListener('click', () => {
            li.remove();
        });

        filteredContainer.appendChild(li);
    }
});