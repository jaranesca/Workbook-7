document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetailsContainer = document.getElementById('product-details');

    if (!productId) {
        window.location.href = 'index.html';
    } else {
        fetchProductDetails(productId);
    }

    function fetchProductDetails(id) {
        fetch(`http://localhost:8081/api/products/${id}`)
            .then(response => response.json())
            .then(product => {
                displayProductDetails(product);
            });
    }

    function displayProductDetails(product) {
        productDetailsContainer.innerHTML = `
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
        `;
    }
});
