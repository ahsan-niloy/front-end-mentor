import { useState } from "react";
import CartItems from "./cartItems";
// images
import applePie from "./assets/Apple Pie.jpg";
import cheeseburger from "./assets/Cheeseburger.jpg";
import chocolateLavaCake from "./assets/Chocolate Lava Cake.jpg";
import fettuccineAlfredo from "./assets/Fettuccine Alfredo.jpg";
import margheritaPizza from "./assets/Margherit Pizza.jpg";
import pepperoniPizza from "./assets/Pepperoni Pizza.jpg";
import spaghettiCarbonara from "./assets/Spaghetti Carbonara.jpg";
import strawberryCheesecake from "./assets/Strawberry Cheesecake.jpg";
import tiramisu from "./assets/Tiramisu.jpg";
import addToCartIcon from "./assets/add-to-playlist-svgrepo-com.svg";

const food = [
  {
    category: "Pizza",
    name: "Margherita Pizza",
    price: 12.0,
    image: margheritaPizza,
  },
  {
    category: "Pizza",
    name: "Pepperoni Pizza",
    price: 14.0,
    image: pepperoniPizza,
  },
  { category: "Burger", name: "Cheeseburger", price: 8.5, image: cheeseburger },
  {
    category: "Pasta",
    name: "Spaghetti Carbonara",
    price: 10.0,
    image: spaghettiCarbonara,
  },
  {
    category: "Pasta",
    name: "Fettuccine Alfredo",
    price: 11.0,
    image: fettuccineAlfredo,
  },
  {
    category: "Dessert",
    name: "Chocolate Lava Cake",
    price: 6.5,
    image: chocolateLavaCake,
  },
  {
    category: "Dessert",
    name: "Strawberry Cheesecake",
    price: 7.5,
    image: strawberryCheesecake,
  },
  { category: "Dessert", name: "Tiramisu", price: 8.5, image: tiramisu },
  { category: "Dessert", name: "Apple Pie", price: 9.5, image: applePie },
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
    <main className="bg-[#FCF8F6] p-4">
      <h1 className="text-4xl font-black mb-4">Menu</h1>
      <div className="flex flex-col md:flex-row gap-6 flex-wrap">
        {food.map((item, index) => {
          const cartItem = countedItems[item.name]; // Get the item from countedItems
          return (
            <div key={index}>
              <div className="w-full md:min-w-[280px] md:max-w-[300px] h-[250px] relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover rounded-xl ${
                    cartItem ? "outline-2 outline-[#C73B0E]" : ""
                  }`}
                />
                <div className="z-20 absolute bottom-[-25px] left-1/2 -translate-x-1/2 ">
                  {cartItem == undefined ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="font-semibold bg-white border-2 border-[#C73B0E] py-2 px-6 rounded-full flex gap-1 justify-center items-center whitespace-nowrap"
                    >
                      <img src={addToCartIcon} alt={addToCartIcon} />
                      Add to cart
                    </button>
                  ) : (
                    ""
                  )}

                  {cartItem ? (
                    <div className="flex flex-row gap-10 bg-[#C73B0E] text-white font-semibold py-3 px-4 rounded-full">
                      <button
                        onClick={() => addToCart(item)}
                        className="w-[25px] p-[4px] leading-none rounded-full border border-white"
                      >
                        +
                      </button>
                      <div>{cartItem ? cartItem.count : ""}</div>
                      <button
                        onClick={() => handleRemoveOneItemFromCart(item.name)}
                        className="w-[25px] p-[4px] leading-none rounded-full border border-white"
                      >
                        -
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mt-4 text-[14px] text-[#9B908B]">
                {item.category}
              </div>
              <div className="font-semibold">{item.name}</div>
              <div className="font-semibold text-[#C73B0E] text-[18px]">
                ${item.price}
              </div>
            </div>
          );
        })}
      </div>
      <CartItems
        cartItems={uniqueCartItems}
        handleRemoveFromCart={handleRemoveFromCart}
        totalCartItems={cart.length}
      />
    </main>
  );
}
