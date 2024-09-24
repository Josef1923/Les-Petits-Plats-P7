class sortComponent extends HTMLElement {
    constructor() {
        super();

        const container = document.createElement('div');
        container.classList.add('search-container');
        container.innerHTML = `
        <div class="search-container">
        <input type="text">
        </div>
        `;

        this.appendChild(container);
    }

}

customElements.define('sort-component', sortComponent)