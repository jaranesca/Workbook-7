document.addEventListener('DOMContentLoaded', function() {
    const searchTypeSelect = document.getElementById('search-type');
    const categorySelectContainer = document.getElementById('category-select-container');
    const categoriesSelect = document.getElementById('categories');
    const productsList = document.getElementById('products-list');

    searchTypeSelect.addEventListener('change', function() {
        const selectedValue = searchTypeSelect.value;
        if (selectedValue === 'category') {
            fetchCategories();
            categorySelectContainer.style.display = 'block';
        } else {
            categorySelectContainer.style.display = 'none';
            if (selectedValue === 'all') {
                fetchProducts();
            }
        }
    });

    categoriesSelect.addEventListener('change', function() {
        const categoryId = categoriesSelect.value;
        fetchProductsByCategory(categoryId);
    });

    function fetchCategories() {
        fetch('http://localhost:8081/api/categories')
            .then(response => response.json())
            .then(data => {
                categoriesSelect.innerHTML = data.map(category => `<option value="${category.categoryId}">${category.name}</option>`).join('');
            });
    }

    function fetchProducts() {
        fetch('http://localhost:8081/api/products')
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            });
    }

    function fetchProductsByCategory(categoryId) {
        fetch(`http://localhost:8081/api/products?categoryId=${categoryId}`)
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            });
    }

    function displayProducts(products) {
        productsList.innerHTML = products.map(product => `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <a href="details.html?id=${product.productId}" class="btn btn-primary">See Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
