document.addEventListener('DOMContentLoaded', function () {
    const descriptionRows = Array.from(document.querySelectorAll('div'))
        .filter(row => row.children.length > 0 && Array.from(row.children).every(child => child.classList.contains('p1')));

    descriptionRows.forEach(function (row) {
        const products = Array.from(row.querySelectorAll('.p1'));
        const images = [];
        let current = row.previousElementSibling;
        while (current && images.length < products.length) {
            if (current.tagName === 'BR') {
                current = current.previousElementSibling;
            } else if (current.tagName === 'IMG') {
                images.unshift(current);
                current = current.previousElementSibling;
            } else {
                break;
            }
        }
        if (images.length !== products.length) return;
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        row.parentNode.insertBefore(productGrid, images[0]);
        products.forEach(function (description, index) {
            const card = document.createElement('div');
            card.className = 'product-card';
            const image = images[index];
            image.classList.add('product-image');
            const name = description.querySelector('strong');
            const details = document.createElement('div');
            details.className = 'product-details';
            details.hidden = true;
            let node = name ? name.nextSibling : null;
            while (node) {
                const next = node.nextSibling;
                details.appendChild(node);
                node = next;
            }
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'details-button';
            button.textContent = 'See Details';
            button.setAttribute('aria-expanded', 'false');
            button.addEventListener('click', function () {
                const isHidden = details.hidden;
                details.hidden = !isHidden;
                button.textContent = isHidden ? 'Hide Details' : 'See Details';
                button.setAttribute('aria-expanded', String(isHidden));
            });

            description.innerHTML = '';
            if (name) description.appendChild(name);
            description.appendChild(button);
            description.appendChild(details);

            card.appendChild(image);
            card.appendChild(description);
            productGrid.appendChild(card);
        });

        row.remove();
    });
});
