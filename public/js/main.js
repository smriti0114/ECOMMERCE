// ==== Products Array ====
const products = [
  {
    id: 1,
    title: "Autumn Hoodie",
    price: 264.9,
    image:
      "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",
  },
  {
    id: 2,
    title: "FUSION HOODIE",
    price: 295,
    image:
      "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
  },
  {
    id: 3,
    title: "Chestnut Brown",
    price: 74.9,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQaRA1OjNqXYUaJninqTZDjiozrD-8f3dzh54lugfUDyXgdNuCn58QlOIAWMveVjVRRLnUiyxfOt6TH3OV4yo2LC8gCr1uGx4Bj7iN1eablVDZHOQJLJUl_3hQ&usqp=CAc",
  },
  {
    id: 4,
    title: "Nike Sportswear",
    price: 80,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
  },
  {
    id: 5,
    title: "Champion BASIC",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
  },
  {
    id: 6,
    title: "Cotton Hoodie",
    price: 395,
    image:
      "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
  },
  {
    id: 7,
    title: "CLASSIC CREWNECK",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
  },
  {
    id: 8,
    title: "TAPE HOODED",
    price: 79.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
  },
];

// ==== DOM Elements ====
const productList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==== Render Products on Home Page ====
function renderProducts() {
  if (!productList) return;

  productList.innerHTML = products
    .map((product) => {
      return `
        <div class="product">
          <img src="${product.image}" alt="${product.title}" class="product-img"/>
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">₹${product.price.toFixed(2)}</p>
            <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
          </div>
        </div>
      `;
    })
    .join("");
    //add to cart
    const addToCartButton = document.getElementsByClassName('add-to-cart');
    for(let i=0; i<addToCartButton.length; i++){
      const addToCartButton = addToCartButton[i];
      addToCartButton.addEventListener('click', addToCart);
    }
}


// ==== Render Cart Page ====
function renderCartItems() {
  if (!cartItemsElement || !cartTotalElement) return;

  cartItemsElement.innerHTML = "";
  let total = 0;

  //total amount
0
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    cartItemsElement.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <h2 class="cart-item-title">${product.title}</h2>
          <input 
            class="cart-item-quantity" 
            type="number" 
            value="${item.quantity}" 
            min="1" 
            data-id="${item.id}" 
          />
        </div>
        <h2 class="cart-item-price">₹${itemTotal.toFixed(2)}</h2>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
    `;
  });

  cartTotalElement.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  attachCartEvents();
}

//Attach Events for Remove
function attachCartEvents() {
  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });
  });


  // Attach change event to quantity inputs
  document.querySelectorAll(".cart-item-quantity").forEach((input) => {
    input.addEventListener("change", () => {
      const id = parseInt(input.dataset.id);
      const qty = parseInt(input.value);
      const item = cart.find((item) => item.id === id);
      if (item && qty > 0) {
        item.quantity = qty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
        updateCartIcon();
      }
    });
  });
}

// ==== Add to Cart Click Handler ====
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.dataset.id);
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: id, quantity: 1 });
    }
    //change add to cart text to added
    event.target.textContent = "Added";
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
  }
});

// ==== Init: Load correct content based on page ====
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
  } else {
    renderProducts();
  }
});

//cart icon quantity
const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.setAttribute('data-quantity', totalQuantity);
}
updateCartIcon();

function updateCartIconOnCartChange(){
  updateCartIcon();
} 
window.addEventListener('storage',updateCartIconOnCartChange);

function updateCartIcon(){
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.setAttribute('data-quantity', totalQuantity);
}

