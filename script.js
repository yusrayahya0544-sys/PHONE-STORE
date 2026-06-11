[11/06/2026 12:58] Yusra: // ========== PRODUCT DATABASE ==========
const products = [
    { id: 1, name: "iPhone 17e", brand: "Apple", price: 25000, image: "iphone 17e.jpg", description: "Latest A18 chip, 48MP camera" },
    { id: 2, name: "Galaxy S26 Ultra", brand: "Samsung", price: 30000, image: "Galaxy S26 Ultra.jpg", description: "200MP camera, S Pen included" },
    { id: 3, name: "Nothing Phone 3", brand: "Nothing", price: 28000, image: "Nothing phone 3.jpg", description: "Glyph interface, unique design" },
    { id: 4, name: "Xiaomi 17 Ultra", brand: "Xiaomi", price: 26000, image: "Xiaomi 17 Ultra.jpg", description: "Leica camera, Snapdragon 8 Gen 4" },
    { id: 5, name: "Samsung Galaxy A15", brand: "Samsung", price: 20000, image: "Samsung Galaxy A15.jpg", description: "Great budget option, 50MP camera" },
    { id: 6, name: "Samsung Galaxy M14", brand: "Samsung", price: 18000, image: "Samsung Galaxy M14.jpg", description: "6000mAh battery, long lasting" },
    { id: 7, name: "Google Pixel 9 Pro", brand: "Google", price: 35000, image: "Google pixel 9 pro.jpg", description: "Best camera phone, pure Android" },
    { id: 8, name: "iPhone 15 Pro", brand: "Apple", price: 45000, image: "iphone 15 pro.jpg", description: "A17 Pro chip, Titanium design" }
];

function getCart() {
    var cart = localStorage.getItem('phoneCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('phoneCart', JSON.stringify(cart));
    updateCartCounts();
}

function addToCart(productId) {
    var cart = getCart();
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
            break;
        }
    }
    if (!found) {
        var product = products.find(function(p) { return p.id === productId; });
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart(cart);
    alert('Added to cart');
    if (typeof displayCart === 'function') displayCart();
}

function updateCartCounts() {
    var cart = getCart();
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems = totalItems + cart[i].quantity;
    }
    var badges = document.querySelectorAll('#cartCount, #cartCount2, #cartCount3, #cartCount4, #cartCount5');
    for (var i = 0; i < badges.length; i++) {
        if (badges[i]) {
            badges[i].textContent = totalItems;
        }
    }
}

function removeFromCart(productId) {
    var cart = getCart();
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    saveCart(newCart);
    displayCart();
}

function updateQuantity(productId, change) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + change;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart(cart);
    displayCart();
}

function displayCart() {
    var container = document.getElementById('cartContainer');
    if (!container) return;
    var cart = getCart();
    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 4rem;"><h3>Your cart is empty</h3><p>Add some phones to get started</p><button class="btn-primary" onclick="location.href=\'products.html\'">Browse Products</button></div>';
        return;
    }
    var total = 0;
    var cartHtml = '<div class="cart-items">';
    for (var i = 0; i < cart.length; i++) {
[11/06/2026 12:58] Yusra: var item = cart[i];
        var itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        cartHtml = cartHtml + '<div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #ccc;">' +
            '<div style="display: flex; align-items: center; gap: 1rem;">' +
            '<img src="' + item.image + '" alt="' + item.name + '" style="width: 60px; height: 60px; object-fit: contain; border-radius: 10px;">' +
            '<div><strong>' + item.name + '</strong><br><small>' + item.price.toLocaleString() + ' ETB each</small></div>' +
            '</div>' +
            '<div>' +
            '<button onclick="updateQuantity(' + item.id + ', -1)">-</button>' +
            '<span style="margin: 0 1rem;">' + item.quantity + '</span>' +
            '<button onclick="updateQuantity(' + item.id + ', 1)">+</button>' +
            '<button onclick="removeFromCart(' + item.id + ')">Remove</button>' +
            '</div>' +
            '<div><strong>' + itemTotal.toLocaleString() + ' ETB</strong></div>' +
            '</div>';
    }
    cartHtml = cartHtml + '<div class="cart-summary" style="text-align: right; padding: 1rem; margin-top: 1rem;">' +
        '<h3>Total: ' + total.toLocaleString() + ' ETB</h3>' +
        '<button class="btn-primary" onclick="checkout()">Proceed to Checkout</button>' +
        '</div></div>';
    container.innerHTML = cartHtml;
}

function checkout() {
    alert('Contact us on WhatsApp: +251-930-613306');
    openWhatsApp();
}

function createProductCard(product, showAddButton) {
    if (showAddButton === undefined) showAddButton = true;
    var imageHtml = '<img src="' + product.image + '" alt="' + product.name + '" class="product-image" style="width:100%; height:180px; object-fit:contain; border-radius:12px; margin-bottom:1rem;">';
    var priceHtml = product.price ? '<div class="price">' + product.price.toLocaleString() + ' ETB</div>' : '<div class="price-inquire">Price on Request</div>';
    var addButton = (showAddButton && product.price) ? '<button class="btn-add-cart" onclick="addToCart(' + product.id + ')">Add to Cart</button>' : '';
    return '<div class="product-card" style="background:white; border-radius:20px; padding:1.5rem; text-align:center; margin:1rem; box-shadow:0 4px 12px rgba(0,0,0,0.1);">' +
        imageHtml +
        '<div class="product-title">' + product.name + '</div>' +
        '<div class="product-brand">' + product.brand + '</div>' +
        '<div class="product-desc">' + product.description + '</div>' +
        priceHtml +
        '<div>' +
        '<button class="btn-inquire" onclick="inquirePhone(\'' + product.name + '\')">Inquire</button> ' +
        addButton +
        '</div></div>';
}

function displayFeaturedProducts() {
    var container = document.getElementById('featured-products');
    if (!container) return;
    var html = '';
    for (var i = 0; i < 4 && i < products.length; i++) {
        html = html + createProductCard(products[i], true);
    }
    container.innerHTML = html;
}

function filterProducts() {
    var searchInput = document.getElementById('searchInput');
    var brandSelect = document.getElementById('brandFilter');
    var priceSelect = document.getElementById('priceFilter');
    var searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    var brandFilter = brandSelect ? brandSelect.value : 'all';
    var priceFilter = priceSelect ? priceSelect.value : 'all';
    var filtered = [];
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        var matchSearch = p.name.toLowerCase().indexOf(searchTerm) !== -1;
        var matchBrand = brandFilter === 'all' || p.brand === brandFilter;
        var matchPrice = true;
        if (priceFilter !== 'all') {
[11/06/2026 12:58] Yusra: if (priceFilter === '0-10000') matchPrice = p.price <= 10000;
            else if (priceFilter === '10000-20000') matchPrice = p.price >= 10000 && p.price <= 20000;
            else if (priceFilter === '20000-30000') matchPrice = p.price >= 20000 && p.price <= 30000;
            else if (priceFilter === '30000+') matchPrice = p.price >= 30000;
        }
        if (matchSearch && matchBrand && matchPrice) {
            filtered.push(p);
        }
    }
    var container = document.getElementById('all-products');
    var noResults = document.getElementById('noResults');
    var productCount = document.getElementById('productCount');
    if (container) {
        if (filtered.length === 0) {
            container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            var html = '';
            for (var i = 0; i < filtered.length; i++) {
                html = html + createProductCard(filtered[i], true);
            }
            container.innerHTML = html;
            if (noResults) noResults.style.display = 'none';
        }
    }
    if (productCount) {
        productCount.textContent = 'Showing ' + filtered.length + ' of ' + products.length + ' products';
    }
}

function clearFilters() {
    var searchInput = document.getElementById('searchInput');
    var brandSelect = document.getElementById('brandFilter');
    var priceSelect = document.getElementById('priceFilter');
    if (searchInput) searchInput.value = '';
    if (brandSelect) brandSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    filterProducts();
}

function displayAllProducts() {
    filterProducts();
}

function openWhatsApp() {
    window.open('https://wa.me/251930613306', '_blank');
}

function openTelegram() {
    window.open('https://t.me/musab', '_blank');
}

function sendMessage(event) {
    if (event) event.preventDefault();
    var name = document.getElementById('contactName') ? document.getElementById('contactName').value : '';
    var email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : '';
    var message = document.getElementById('contactMessage') ? document.getElementById('contactMessage').value : '';
    if (!name  !email  !message) {
        alert('Please fill all required fields');
        return false;
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('Please enter a valid email address');
        return false;
    }
    var statusEl = document.getElementById('formStatus');
    if (statusEl) {
        statusEl.innerHTML = 'Message sent. We will contact you within 24 hours.';
        statusEl.style.color = '#48bb78';
    }
    if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
    if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
    if (document.getElementById('contactMessage')) document.getElementById('contactMessage').value = '';
    setTimeout(function() {
        if (statusEl) statusEl.innerHTML = '';
    }, 5000);
    return false;
}

function inquirePhone(model) {
    var message = 'Hello, I am interested in ' + model + '. Please share the price and availability.';
    window.open('https://wa.me/251930613306?text=' + encodeURIComponent(message), '_blank');
}

function scrollToFeatured() {
    var grid = document.querySelector('.products-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

function toggleNav() {
    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    displayCart();
    updateCartCounts();
    console.log('PhoneStore website loaded successfully');
});
