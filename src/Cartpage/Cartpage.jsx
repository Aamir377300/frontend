import React, { useEffect, useState } from "react";

function Cartpage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("myCart")) || [];

    setCart(cartData);
  }, []);

  // Function to update the quantity of a cart item
function updateQuantity(index, change){
    // Make a copy of the existing cart to avoid direct mutation (important for state updates)
    const updatedCart = [...cart];
  
    // Update the quantity of the item at the given index.
    // If quantity is not already defined, default to 1, then apply the change (+1 or -1)
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + change;
  
    // If the quantity becomes 0 or less after the update, remove the item from the cart
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1); // remove 1 item at the current index
    }
  
    // Update the cart state with the modified cart
    setCart(updatedCart);
  
    // Also update the localStorage to keep the cart data persistent
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };
  
  // Function to calculate the total price of all items in the cart
  function getTotal(){
    return cart.reduce((acc, item) => {
      // For each item, get the quantity (default to 1 if undefined)
      const quantity = item.quantity || 1;
  
      // Add the total price of this item (price × quantity) to the accumulator
      return acc + item.price * quantity;
    }, 0); // Initial value of accumulator is 0
  };


  return (
    <div>
      <div>
        {cart.map((cart_me_jo_hoga, index) => {
          return (
            <div key={index}>
              <img
                className="product-image"
                src={cart_me_jo_hoga.image}
                alt="Error"
              />
              <p className="product-para">{cart_me_jo_hoga.name}</p>
              <p className="product-para">{cart_me_jo_hoga.description}</p>
              <p className="product-para">{cart_me_jo_hoga.price}</p>
              <div>
            <button onClick={() => updateQuantity(index, -1)}>-</button>
            <button onClick={() => updateQuantity(index, 1)}>+</button>
          </div>
            </div>
            
          );
        })}
      </div>

      <h3>Total: ₹{getTotal()}</h3>
      <button>Buy Now</button>

    </div>

    
  );
}

export default Cartpage;
