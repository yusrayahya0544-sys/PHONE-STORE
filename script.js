 // ========== PRODUCT DATABASE ==========
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

// ========== CART FUNCTIONS ==========
function getCart() {
    const cart = localStorage.getItem('phoneCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('phoneCart', JSON.stringify(cart));
    updateCartCounts();
}

function addToCart(productId) {
    let cart = getCart();
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        const product = products.find(p => p.id === productId);
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
    alert('✅ Added to cart!');
    if (typeof displayCart === 'function') displayCart();
}

function updateCartCounts() {
    const cart = getCart();
    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) totalItems += cart[i].quantity;
    const badges = document.querySelectorAll('#cartCount, #cartCount2, #cartCount3, #cartCount4, #cartCount5');
    for (let i = 0; i < badges.length; i++) {
        if (badges[i]) badges[i].textContent = totalItems;
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) newCart.push(cart[i]);
    }
    saveCart(newCart);
    displayCart();
}

function updateQuantity(productId, change) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity += change;
            if (cart[i].quantity <= 0) cart.splice(i, 1);
            break;
        }
    }
    saveCart(cart);
    displayCart();
}

function displayCart() {
    const container = document.getElementById('cartContainer');
    if (!container) return;
    const cart = getCart();
    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 4rem;"><h3>🛒 Your cart is empty</h3><p>Add some phones to get started!</p><button class="btn-primary" onclick="location.href=\'products.html\'">Browse Products</button></div>';
        return;
    }
    let total = 0;
    let cartHtml = '<div class="cart-items">';
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHtml += '<div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap;">' +
            '<div style="display: flex; align-items: center; gap: 1rem;">' +
            '<img src="' + item.image + '" alt="' + item.name + '" style="width: 60px; height: 60px; object-fit: contain; border-radius: 10px;">' +
            '<div><strong>' + item.name + '</strong><br><small>' + item.price.toLocaleString() + ' ETB each</small></div>' +
            '</div>' +
            '<div>' +
            '<button onclick="updateQuantity(' + item.id + ', -1)" style="background: #667eea; color: white; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer;">-</button>' +
            '<span style="margin: 0 1rem;">' + item.quantity + '</span>' +
            '<button onclick="updateQuantity(' + item.id + ', 1)" style="background: #667eea; color: white; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer;">+</button>' +
            '<button onclick="removeFromCart(' + item.id + ')" style="background: #f56565; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 8px; margin-left: 1rem; cursor: pointer;">Remove</button>' +
            '</div>' +
            '<div><strong>' + itemTotal.toLocaleString() + ' ETB</strong></div>' +
            '</div>';
    }
    cartHtml += '<div class="cart-summary" style="text-align: right; padding: 1rem; background: #f7fafc; border-radius: 12px; margin-top: 1rem;">' +
        '<h3>Total: ' + total.toLocaleString() + ' ETB</h3>' +
        '<button class="btn-primary" onclick="checkout()">💳 Proceed to Checkout</button>' +
        '</div></div>';
    container.innerHTML = cartHtml;
}

function checkout() {
    alert('📞 Please contact us on WhatsApp to complete your order!\n\nPhone: +251-930-613306');
    openWhatsApp();
}

// ========== PRODUCT DISPLAY FUNCTIONS ==========
function createProductCard(product, showAddButton = true) {
    const imageHtml = '<img src="' + product.image + '" alt="' + product.name + '" class="product-image" onerror="this.src=\'https://placehold.co/400x400/667eea/white?text=' + product.name.replace(/ /g, '+') + '\'">';
    const priceHtml = product.price ? '<div class="price">💰 ' + product.price.toLocaleString() + ' ETB</div>' : '<div class="price-inquire">💰 Price on Request</div>';
    const addButton = (showAddButton && product.price) ? '<button class="btn-add-cart" onclick="addToCart(' + product.id + ')">🛒 Add to Cart</button>' : '';
    return '<div class="product-card">' +
        imageHtml +
        '<div class="product-title">' + product.name + '</div>' +
        '<div class="product-brand">' + product.brand + '</div>' +
        '<div class="product-desc">' + product.description + '</div>' +
        priceHtml +
        '<div>' +
        '<button class="btn-inquire" onclick="inquirePhone(\'' + product.name + '\')">📞 Inquire</button>' +
        addButton +
        '</div></div>';
}

function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    let html = '';
    for (let i = 0; i < 4 && i < products.length; i++) html += createProductCard(products[i], true);
    container.innerHTML = html;
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const brandFilter = document.getElementById('brandFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    let filtered = [];
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const matchSearch = p.name.toLowerCase().includes(searchTerm);
        const matchBrand = brandFilter === 'all' || p.brand === brandFilter;
 let matchPrice = true;
        if (priceFilter === '0-10000') matchPrice = p.price <= 10000;
        else if (priceFilter === '10000-20000') matchPrice = p.price >= 10000 && p.price <= 20000;
        else if (priceFilter === '20000-30000') matchPrice = p.price >= 20000 && p.price <= 30000;
        else if (priceFilter === '30000+') matchPrice = p.price >= 30000;
        if (matchSearch && matchBrand && matchPrice) filtered.push(p);
    }
    const container = document.getElementById('all-products');
    const noResults = document.getElementById('noResults');
    const productCount = document.getElementById('productCount');
    if (container) {
        if (filtered.length === 0) {
            container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            let html = '';
            for (let i = 0; i < filtered.length; i++) html += createProductCard(filtered[i], true);
            container.innerHTML = html;
            if (noResults) noResults.style.display = 'none';
        }
    }
    if (productCount) productCount.textContent = 'Showing ' + filtered.length + ' of ' + products.length + ' products';
}

function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const brandSelect = document.getElementById('brandFilter');
    const priceSelect = document.getElementById('priceFilter');
    if (searchInput) searchInput.value = '';
    if (brandSelect) brandSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    filterProducts();
}

function displayAllProducts() {
    filterProducts();
}

// ========== CONTACT & UTILITIES ==========
function openWhatsApp() {
    window.open('https://wa.me/251930613306', '_blank');
}

function openTelegram() {
    window.open('https://t.me/musab', '_blank');
}

function sendMessage(event) {
    if (event) event.preventDefault();
    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const message = document.getElementById('contactMessage')?.value || '';
    if (!name  !email  !message) {
        alert('⚠️ Please fill all required fields');
        return false;
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('⚠️ Please enter a valid email address');
        return false;
    }
    const statusEl = document.getElementById('formStatus');
    if (statusEl) {
        statusEl.innerHTML = '✅ Message sent! We will contact you within 24 hours.';
        statusEl.style.color = '#48bb78';
    }
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
    setTimeout(() => { if (statusEl) statusEl.innerHTML = ''; }, 5000);
    return false;
}

function inquirePhone(model) {
    const message = Hello, I'm interested in ${model}. Please share the price and availability.;
    window.open(https://wa.me/251930613306?text=${encodeURIComponent(message)}, '_blank');
}

function scrollToFeatured() {
    const grid = document.querySelector('.products-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

function toggleNav() {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('show');
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    displayCart();
    updateCartCounts();
    console.log('✅ PhoneStore website loaded successfully!');
});
