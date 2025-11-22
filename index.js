// --- Product Database ---
const productsDB = {
    channels: [
        { id: 1, name: "Soft Close Channel", desc: "Premium Zinc finish, 45kg load capacity. Available in 10-24 inches.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Soft+Close" },
        { id: 2, name: "Telescopic Channel", desc: "Heavy duty ball bearing slides. Smooth operation.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Telescopic" },
        { id: 3, name: "Push-to-Open", desc: "Touch release mechanism for handle-less drawers.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Push+Open" },
        { id: 4, name: "Quadra Channel", desc: "Undermount slide for invisible fitting.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Quadra" }
    ],
    kitchen: [
        { id: 5, name: "Wicker Basket", desc: "Natural looking vegetable storage basket.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Basket" },
        { id: 6, name: "Magic Corner", desc: "Universal magic corner for blind space utilization.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Corner" },
        { id: 7, name: "Pantry Unit", desc: "Tall unit for dry grocery storage.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Pantry" },
        { id: 8, name: "Cutlery Organizer", desc: "PVC high grade adjustable cutlery tray.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Tray" }
    ],
    handles: [
        { id: 9, name: "G-Profile Handle", desc: "Rose Gold finish, 3 meter length for wardrobes.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=G-Profile" },
        { id: 10, name: "Antique Knob", desc: "Brass antique finish knob for classic drawers.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Knob" },
        { id: 11, name: "Concealed Handle", desc: "Modern black matte concealed handle.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Concealed" },
        { id: 12, name: "Main Door Handle", desc: "SS 304 Grade textured handle for main doors.", img: "https://placehold.co/400x400/f5f5f5/8b5a2b?text=Door+Handle" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Toggle Logic
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

    // 2. Category Page Logic (Only runs if on category.html)
    const productGrid = document.getElementById('product-grid');
    const categoryTitle = document.getElementById('category-title');

    if (productGrid && categoryTitle) {
        // Get category from URL (e.g., category.html?type=kitchen)
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');

        if (type && productsDB[type]) {
            // Set Title
            categoryTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            
            // Render Products
            productsDB[type].forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-img-wrap">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <div class="card-body">
                        <h4>${product.name}</h4>
                        <p>Click for details</p>
                    </div>
                `;
                // Add Click Event for Modal
                card.addEventListener('click', () => openModal(product));
                productGrid.appendChild(card);
            });
        } else {
            categoryTitle.textContent = "Category Not Found";
            productGrid.innerHTML = "<p>Please select a valid category from the home page.</p>";
        }
    }

    // 3. Modal Logic
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal) {
        window.openModal = (product) => {
            document.getElementById('modal-img').src = product.img;
            document.getElementById('modal-title').textContent = product.name;
            document.getElementById('modal-desc').textContent = product.desc;
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