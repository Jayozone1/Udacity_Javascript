/*

/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
let products = [
  {
      name: "Product 1",
      price: 20.00,
      description: "A description of Product 1",
      quantity: 5,
      productId: 1,
      image:"C:\Users\hp\Desktop\Learnings\Udacity\cd2073-intro-to-js-1-project-starter\starter\src\images"
  },
  {
      name: "Product 2",
      price: 30.00,
      description: "A description of Product 2",
      quantity: 10,
      productId: 2,
      image:"https://unsplash.com/photos/green-round-fruits-in-tilt-shift-lens-pBBtycTzY6M"
  },
  {
      name: "Product 3",
      price: 40.00,
      description: "A description of Product 3",
      quantity: 15,
      productId: 3,
      image:"https://www.istockphoto.com/search/search-by-asset?affiliateredirect=true&assetid=1456103316&assettype=image&utm_campaign=srp_photos_zsr&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fstrawberry.jpg&utm_medium=affiliate&utm_source=unsplash&utm_term=strawberry.jpg%3A%3A%3A"
  },
  {
    name: "Product 4",
    price: 40.00,
    description: "A description of Product 3",
    quantity: 15,
    productId: 3,
    image:"https://www.istockphoto.com/search/search-by-asset?affiliateredirect=true&assetid=1456103316&assettype=image&utm_campaign=srp_photos_zsr&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fstrawberry.jpg&utm_medium=affiliate&utm_source=unsplash&utm_term=strawberry.jpg%3A%3A%3A"
}
]


/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
let shoppingCart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {

    let productInCart = shoppingCart.find(item => item.productId === productId);

    if (productInCart) {
        // If the product is already in the cart, increase its quantity
        productInCart.quantity++
    } else {
      let product = {
        productId: productId,
        name: "Sample Product",
        price: 20.00,
        quantity: 1
      };
      shoppingCart.push(product);

    }
}
/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId){
    // Find the product in the cart based on the productId
    let product = shoppingCart.find(item => item.productId === productId);

    if  (product) {
      //Increase the quantity of the found product
      product.quantity++;

    }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  //Find the product in the cart based on the productId
  let productIndex = shoppingCart.find(item => item.productId === productId);

  if (productIndex !== -1) {
      //Decrease the quantity of the found product
      shoppingCart[productIndex].quantity--;

      //If the quantity reaches 0, remove the product from the cart
      if (shoppingCart[ProductIndex].quantity === 0) {
          shoppingCart.splice(productIndex, 1);
      }

  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  let productIndex = shoppingCart.find(item => item.productId === productId);

  if (productIndex !== -1) {
    // Set the quantity of the found product to 0
    shoppingCart[productIndex].quantity = 0;

    // Remove the product from the cart
    shoppingCart.splice(productIndex, 1);
  }

}


/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
    let totalCost = 0;

    for (let i = 0; i < shoppingCart.length; i++) {
      let product = shoppingCart[i];
      totalCost += product.price * product.quantity;
    }

    return totalCost;
}




/* Create a function called emptyCart that empties the products from the cart */
//define a function to empty the shoppingCart
function emptyCart() {
    shoppingCart = [];
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
//Functions to handle Payment
function pay(amount) {
    let totalCost = cartTotal();// This gets the total cost of products in the cart.
    let change = amount - totalCost; //Calculate the change by deducting the amount from the totalCost

    return change;

}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
