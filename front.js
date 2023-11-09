let currencySymbol = "$";

let products = [
  {
    name: "Cherry",
    price: 20.0,
    description: "A description of Product 1",
    quantity: 0,
    productId: 1,
    image: "assets/cherry.jpg",
  },
  {
    name: "Strawberry",
    price: 30.0,
    description: "A description of Product 2",
    quantity: 0,
    productId: 2,
    image: "assets/strawberry.jpg",
  },
  {
    name: "Orange",
    price: 40.0,
    description: "A description of Product 3",
    quantity: 0,
    productId: 3,
    image: "assets/orange.jpg",
  },
];

let cart = [];

// Draws product list
export function drawProducts() {
  let productList = document.querySelector(".product-list");
  let productItems = "";
  products.forEach((element) => {
    productItems += `
         <div data-productId='${element.productId}'>
            <div>
            <img src='${element.image}'/>
            </div>
            <div class="product-details">
            <h3>${element.name}</h3>
            <p>Price: ${currencySymbol}${element.price}</p>
            <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
  });
  // use innerHTML so that products only drawn once
  productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
  let cartList = document.querySelector(".cart-list");
  // clear cart before drawing
  let cartItems = "";
  cart.forEach((element) => {
    let itemTotal = element.price * element.quantity;

    cartItems += `
            <div data-productId='${element.productId}'>
              <div class="cart-details">
              <h3>${element.name}</h3>
              <p>Price: ${currencySymbol}${element.price}</p>
              <p>Quantity: ${element.quantity}</p>
              <p>total: ${currencySymbol}${itemTotal}</p>
              <div>
              <button class="qup">+</button>
              <button class="qdown">-</button>
              <button class="remove">remove</button>
              </div>
              </div>
            </div>
        `;
  });
  // use innerHTML so that cart products only drawn once
  cart.length
    ? (cartList.innerHTML = cartItems)
    : (cartList.innerHTML = "Cart Empty");
}

// Draws checkout
function drawCheckout() {
  let checkout = document.querySelector(".cart-total");
  checkout.innerHTML = "";

  // run cartTotal() from script.js
  let cartSum = cartTotal();

  let div = document.createElement("div");
  div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}`;
  checkout.append(div);
}

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
// drawCheckout();

document.querySelector(".products").addEventListener("click", (e) => {
  let productId = e.target.parentNode.getAttribute("data-productId");
  productId *= 1;
  addProductToCart(productId);
  drawCart();
  drawCheckout();
});

// Event delegation used to support dynamically added cart items
document.querySelector(".cart").addEventListener("click", (e) => {
  // Helper nested higher order function to use below
  // Must be nested to have access to the event target
  // Takes in a cart function as an agrument
  function runCartFunction(fn) {
    let productId = e.target.parentNode.getAttribute("data-productId");
    productId *= 1;
    for (let i = cart.length - 1; i > -1; i--) {
      if (cart[i].productId === productId) {
        let productId = cart[i].productId;
        fn(productId);
      }
    }
    // force cart and checkout redraw after cart function completes
    drawCart();
    drawCheckout();
  }

  // check the target's class and run function based on class
  if (e.target.classList.contains("remove")) {
    // run removeProductFromCart() from script.js
    runCartFunction(removeProductFromCart);
  } else if (e.target.classList.contains("qup")) {
    // run increaseQuantity() from script.js
    runCartFunction(increaseQuantity);
  } else if (e.target.classList.contains("qdown")) {
    // run decreaseQuantity() from script.js
    runCartFunction(decreaseQuantity);
  }
});

document.querySelector(".pay").addEventListener("click", (e) => {
  e.preventDefault();

  // Get input cash received field value, set to number
  let amount = document.querySelector(".received").value;
  amount *= 1;

  // Set cashReturn to return value of pay()
  let cashReturn = pay(amount);

  let paymentSummary = document.querySelector(".pay-summary");
  let div = document.createElement("div");

  // If total cash received is greater than cart total thank customer
  // Else request additional funds
  if (cashReturn >= 0) {
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
            <p>Thank you!</p>
        `;
  } else {
    // reset cash field for next entry
    document.querySelector(".received").value = "";
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Remaining Balance: ${cashReturn}$</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
  }

  paymentSummary.append(div);
});

/* Standout suggestions */
/* Begin remove all items from cart */
// function dropCart(){
//     let shoppingCart = document.querySelector('.empty-btn');
//     let div = document.createElement("button");
//     div.classList.add("empty");
//     div.innerHTML =`Empty Cart`;
//     shoppingCart.append(div);
// }
// dropCart();

// document.querySelector('.empty-btn').addEventListener('click', (e) => {
//     if (e.target.classList.contains('empty')){
//         emptyCart();
//         drawCart();
//         drawCheckout();
//     }
// })
/* End all items from cart */

/* Begin currency converter */
// function currencyBuilder(){
//     let currencyPicker = document.querySelector('.currency-selector');
//     let select = document.createElement("select");
//     select.classList.add("currency-select");
//     select.innerHTML = `<option value="USD">USD</option>
//                         <option value="EUR">EUR</option>
//                         <option value="YEN">YEN</option>`;
//     currencyPicker.append(select);
// }
// currencyBuilder();

// document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
//     switch(event.target.value){
//         case 'EUR':
//             currencySymbol = '€';
//             break;
//         case 'YEN':
//             currencySymbol = '¥';
//             break;
//         default:
//             currencySymbol = '$';
//             break;
//      }

//     currency(event.target.value);
//     drawProducts();
//     drawCart();
//     drawCheckout();
// });
/* End currency converter */
/* End standout suggestions */
