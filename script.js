document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ⚙️ CONFIGURATION (THE CONST YOU WERE LOOKING FOR)
    // ==========================================
    // Change this to your Render URL after deploying (e.g., "https://shiv-shakti-api.onrender.com/api/products")
    const API_BASE_URL = "https://shivshakti-backend-5fg4.onrender.com/api/products"; 

    // ==========================================
    // 📱 MOBILE MENU LOGIC
    // ==========================================
    const toggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav-links');
    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = toggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // ==========================================
    // 🛍️ CATEGORY PAGE LOGIC (Fetches from Database)
    // ==========================================
    const productGrid = document.getElementById('product-grid');
    const categoryTitle = document.getElementById('category-title');

    // We check if these elements exist to know if we are on the 'category.html' page
    if (productGrid && categoryTitle) {
        
        // 1. Get the category type from the URL (e.g., category.html?type=kitchen)
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');

        if (type) {
            // Set Title based on URL param
            categoryTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            
            // Show loading state
            productGrid.innerHTML = '<p style="text-align:center; font-size:1.2rem;">Loading products from database...</p>';

            // 2. Fetch Data from Backend API
            fetchProducts(type);
        } else {
            categoryTitle.textContent = "Category Not Found";
            productGrid.innerHTML = "<p>Please return to home and select a category.</p>";
        }
    }

    async function fetchProducts(category) {
        try {
            // Fetch request to your Node.js server
            const response = await fetch(`${API_BASE_URL}?category=${category}`);
            const products = await response.json();

            // Clear loading message
            productGrid.innerHTML = '';

            if (products.length > 0) {
                products.forEach(product => {
                    // Create Card HTML
                    const card = document.createElement('div');
                    card.className = 'card';
                    // Note: API uses 'image_url' (Postgres) vs 'img' (Hardcoded JS)
                    card.innerHTML = `
                        <div class="card-img-wrap">
                            <img src="${product.image_url}" alt="${product.name}" onerror="this.src='https://placehold.co/400?text=No+Image'">
                        </div>
                        <div class="card-body">
                            <h4>${product.name}</h4>
                            <p style="font-size:0.9rem; color:#666;">Click for details</p>
                        </div>
                    `;
                    
                    // Add Click Event for Modal
                    card.addEventListener('click', () => openModal(product));
                    productGrid.appendChild(card);
                });
            } else {
                productGrid.innerHTML = '<p style="text-align:center;">No products found in this category yet.</p>';
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            productGrid.innerHTML = '<p style="text-align:center; color:red;">Failed to load products. Is the server running?</p>';
        }
    }

    // ==========================================
    // 🖼️ MODAL POPUP LOGIC
    // ==========================================
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal) {
        window.openModal = (product) => {
            // Update Modal Content with Database Data
            document.getElementById('modal-img').src = product.image_url;
            document.getElementById('modal-title').textContent = product.name;
            document.getElementById('modal-desc').textContent = product.description; // Postgres uses 'description'
            
            // Format Price
            const priceEl = document.querySelector('.modal-price');
            if(product.price) {
                priceEl.textContent = `Price: ₹${product.price}`;
            } else {
                priceEl.textContent = "Available in Wholesale";
            }
            
            modal.style.display = "block";
        };

        window.closeModal = () => {
            modal.style.display = "none";
        };

        closeModalBtn.addEventListener('click', closeModal);

        // Close if clicked outside
        window.onclick = (event) => {
            if (event.target == modal) {
                closeModal();
            }
        };
    }
});
