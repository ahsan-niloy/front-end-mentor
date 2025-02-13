import { useState } from "react";

const food = [
  { category: "Pizza", name: "Margherita Pizza", price: 12.0 },
  { category: "Pizza", name: "Pepperoni Pizza", price: 14.0 },
  { category: "Burger", name: "Cheeseburger", price: 8.5 },
  { category: "Burger", name: "Cheeseburger", price: 8.5 },
  { category: "Pasta", name: "Spaghetti Carbonara", price: 10.0 },
  { category: "Pasta", name: "Spaghetti Carbonara", price: 10.0 },
  { category: "Pasta", name: "Fettuccine Alfredo", price: 11.0 },
];

export default function Items() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }
  function handleRemoveOneItemFromCart(itemName) {
    setCart((prevCart) => {
      let removed = false;
      return prevCart.filter((item) => {
        if (item.name === itemName && !removed) {
          removed = true; // Mark first occurrence as removed
          return false; // Remove this one occurrence
        }
        return true; // Keep the rest
      });
    });
  }

  function handleRemoveFromCart(itemName) {
    setCart(cart.filter((item) => item.name !== itemName));
  }

  // Remove duplicates and count occurrences
  const countedItems = cart.reduce((acc, item) => {
    const key = item.name;

    if (!acc[key]) {
      acc[key] = { ...item, count: 1 };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {});

  // Convert object back to an array
  const uniqueCartItems = Object.values(countedItems);

  return (
    <div>
      {food.map((item, index) => {
        const cartItem = countedItems[item.name]; // Get the item from countedItems
        return (
          <div key={index}>
            <div>{item.category}</div>
            <div>{item.name}</div>
            <div>${item.price}</div>
            {cartItem ? (
              ""
            ) : (
              <button onClick={() => addToCart(item)}>Add to cart</button>
            )}
            <div>{cartItem ? cartItem.count : ""}</div>
            {cartItem ? (
              <div>
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => handleRemoveOneItemFromCart(item.name)}>
                  -
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}

      <h2>Cart</h2>
      {uniqueCartItems.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          <div>
            @ ${item.price} ${item.price * item.count}
          </div>
          <div>Quantity: {item.count}</div>
          <button onClick={() => handleRemoveFromCart(item.name)}>
            remove
          </button>
        </div>
      ))}
    </div>
  );
}
